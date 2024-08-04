"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WETHGatewayService = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const baseDebtToken_contract_1 = require("../baseDebtToken-contract");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const methodValidators_1 = require("../commons/validators/methodValidators");
const paramValidators_1 = require("../commons/validators/paramValidators");
const IWETHGateway__factory_1 = require("./typechain/IWETHGateway__factory");
class WETHGatewayService extends BaseService_1.default {
    constructor(provider, erc20Service, wethGatewayAddress) {
        super(provider, IWETHGateway__factory_1.IWETHGateway__factory);
        this.erc20Service = erc20Service;
        this.baseDebtTokenService = new baseDebtToken_contract_1.BaseDebtToken(this.provider, this.erc20Service);
        this.wethGatewayAddress = wethGatewayAddress !== null && wethGatewayAddress !== void 0 ? wethGatewayAddress : '';
        this.depositETH = this.depositETH.bind(this);
        this.withdrawETH = this.withdrawETH.bind(this);
        this.repayETH = this.repayETH.bind(this);
        this.borrowETH = this.borrowETH.bind(this);
        this.wethGatewayInstance = IWETHGateway__factory_1.IWETHGateway__factory.createInterface();
        this.generateDepositEthTxData = (args) => {
            var _a, _b;
            const txData = this.wethGatewayInstance.encodeFunctionData('depositETH', [
                args.lendingPool,
                (_a = args.onBehalfOf) !== null && _a !== void 0 ? _a : args.user,
                (_b = args.referralCode) !== null && _b !== void 0 ? _b : '0',
            ]);
            const actionTx = {
                data: txData,
                to: this.wethGatewayAddress,
                from: args.user,
                value: ethers_1.BigNumber.from(args.amount),
                gasLimit: ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.deposit].limit),
            };
            return actionTx;
        };
        this.generateBorrowEthTxData = (args) => {
            var _a;
            const numericRateMode = args.interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
            const txData = this.wethGatewayInstance.encodeFunctionData('borrowETH', [
                args.lendingPool,
                args.amount,
                numericRateMode,
                (_a = args.referralCode) !== null && _a !== void 0 ? _a : '0',
            ]);
            const actionTx = {
                data: txData,
                to: this.wethGatewayAddress,
                from: args.user,
                gasLimit: ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.borrowETH].limit),
            };
            return actionTx;
        };
        this.generateRepayEthTxData = ({ interestRateMode, lendingPool, amount, user, onBehalfOf, }) => {
            const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
            const txData = this.wethGatewayInstance.encodeFunctionData('repayETH', [
                lendingPool,
                amount,
                numericRateMode,
                onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
            ]);
            const actionTx = {
                data: txData,
                to: this.wethGatewayAddress,
                from: user,
                value: ethers_1.BigNumber.from(amount),
                gasLimit: ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.repayETH].limit),
            };
            return actionTx;
        };
    }
    depositETH({ lendingPool, user, amount, onBehalfOf, referralCode, }) {
        const convertedAmount = (0, utils_1.valueToWei)(amount, 18);
        const wethGatewayContract = this.getContractInstance(this.wethGatewayAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => wethGatewayContract.populateTransaction.depositETH(lendingPool, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user, referralCode !== null && referralCode !== void 0 ? referralCode : '0'),
            from: user,
            value: convertedAmount,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async borrowETH({ lendingPool, user, amount, debtTokenAddress, interestRateMode, referralCode, }) {
        const txs = [];
        const convertedAmount = (0, utils_1.valueToWei)(amount, 18);
        const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
        if (!debtTokenAddress) {
            throw new Error(`To borrow ETH you need to pass the stable or variable WETH debt Token Address corresponding the interestRateMode`);
        }
        const delegationApproved = await this.baseDebtTokenService.isDelegationApproved({
            debtTokenAddress,
            allowanceGiver: user,
            allowanceReceiver: this.wethGatewayAddress,
            amount,
        });
        if (!delegationApproved) {
            const approveDelegationTx = this.baseDebtTokenService.approveDelegation({
                user,
                delegatee: this.wethGatewayAddress,
                debtTokenAddress,
                amount: ethers_1.constants.MaxUint256.toString(),
            });
            txs.push(approveDelegationTx);
        }
        const wethGatewayContract = this.getContractInstance(this.wethGatewayAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => wethGatewayContract.populateTransaction.borrowETH(lendingPool, convertedAmount, numericRateMode, referralCode !== null && referralCode !== void 0 ? referralCode : '0'),
            from: user,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.borrowETH),
        });
        return txs;
    }
    async withdrawETH({ lendingPool, user, amount, onBehalfOf, aTokenAddress, }) {
        const txs = [];
        const { isApproved, approve } = this.erc20Service;
        const convertedAmount = amount === '-1'
            ? ethers_1.constants.MaxUint256.toString()
            : (0, utils_1.valueToWei)(amount, 18);
        const approved = await isApproved({
            token: aTokenAddress,
            user,
            spender: this.wethGatewayAddress,
            amount,
        });
        if (!approved) {
            const approveTx = approve({
                user,
                token: aTokenAddress,
                spender: this.wethGatewayAddress,
                amount: ethers_1.constants.MaxUint256.toString(),
            });
            txs.push(approveTx);
        }
        const wethGatewayContract = this.getContractInstance(this.wethGatewayAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => wethGatewayContract.populateTransaction.withdrawETH(lendingPool, convertedAmount, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user),
            from: user,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.withdrawETH),
        });
        return txs;
    }
    repayETH({ lendingPool, user, amount, interestRateMode, onBehalfOf, }) {
        const convertedAmount = (0, utils_1.valueToWei)(amount, 18);
        const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
        const wethGatewayContract = this.getContractInstance(this.wethGatewayAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => wethGatewayContract.populateTransaction.repayETH(lendingPool, convertedAmount, numericRateMode, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user),
            gasSurplus: 30,
            from: user,
            value: convertedAmount,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
}
tslib_1.__decorate([
    methodValidators_1.WETHValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('lendingPool')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.is0OrPositiveAmount)('referralCode')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Array)
], WETHGatewayService.prototype, "depositETH", null);
tslib_1.__decorate([
    methodValidators_1.WETHValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('lendingPool')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('debtTokenAddress')),
    tslib_1.__param(0, (0, paramValidators_1.is0OrPositiveAmount)('referralCode')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WETHGatewayService.prototype, "borrowETH", null);
tslib_1.__decorate([
    methodValidators_1.WETHValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('lendingPool')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveOrMinusOneAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('aTokenAddress')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WETHGatewayService.prototype, "withdrawETH", null);
tslib_1.__decorate([
    methodValidators_1.WETHValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('lendingPool')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Array)
], WETHGatewayService.prototype, "repayETH", null);
exports.WETHGatewayService = WETHGatewayService;
//# sourceMappingURL=index.js.map