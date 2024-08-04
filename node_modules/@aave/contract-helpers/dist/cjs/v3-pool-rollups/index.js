"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L2Pool = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_2 = require("../commons/utils");
const methodValidators_1 = require("../commons/validators/methodValidators");
const paramValidators_1 = require("../commons/validators/paramValidators");
const IPool__factory_1 = require("../v3-pool-contract/typechain/IPool__factory");
const IL2Pool__factory_1 = require("./typechain/IL2Pool__factory");
const L2Encoder__factory_1 = require("./typechain/L2Encoder__factory");
class L2Pool extends BaseService_1.default {
    constructor(provider, l2PoolConfig) {
        super(provider, IL2Pool__factory_1.IL2Pool__factory);
        const { l2PoolAddress, encoderAddress } = l2PoolConfig !== null && l2PoolConfig !== void 0 ? l2PoolConfig : {};
        this.l2PoolAddress = l2PoolAddress !== null && l2PoolAddress !== void 0 ? l2PoolAddress : '';
        this.encoderAddress = encoderAddress !== null && encoderAddress !== void 0 ? encoderAddress : '';
        this.encoderInterface = L2Encoder__factory_1.L2Encoder__factory.createInterface();
        this.l2PoolContractInstance = IL2Pool__factory_1.IL2Pool__factory.createInterface();
        this.poolContractInstance = IPool__factory_1.IPool__factory.createInterface();
        this.generateSupplyTxData = ({ user, reserve, onBehalfOf, amount, referralCode, }) => {
            const actionTx = {};
            const txData = this.poolContractInstance.encodeFunctionData('supply', [
                reserve,
                amount,
                onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
                referralCode !== null && referralCode !== void 0 ? referralCode : '0',
            ]);
            actionTx.to = this.l2PoolAddress;
            actionTx.from = user;
            actionTx.data = txData;
            return actionTx;
        };
        this.generateBorrowTxData = ({ user, reserve, amount, numericRateMode, referralCode, onBehalfOf, }) => {
            const actionTx = {};
            const txData = this.poolContractInstance.encodeFunctionData('borrow', [
                reserve,
                amount,
                numericRateMode,
                referralCode !== null && referralCode !== void 0 ? referralCode : '0',
                onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
            ]);
            actionTx.to = this.l2PoolAddress;
            actionTx.from = user;
            actionTx.data = txData;
            actionTx.gasLimit = ethers_1.BigNumber.from(utils_2.gasLimitRecommendations[types_1.ProtocolAction.borrow].limit);
            return actionTx;
        };
        this.generateSupplyWithPermitTxData = ({ user, reserve, amount, onBehalfOf, referralCode, deadline, permitR, permitS, permitV, }) => {
            const actionTx = {};
            const txData = this.poolContractInstance.encodeFunctionData('supplyWithPermit', [
                reserve,
                amount,
                onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
                referralCode !== null && referralCode !== void 0 ? referralCode : '0',
                deadline,
                permitV,
                permitR,
                permitS,
            ]);
            actionTx.to = this.l2PoolAddress;
            actionTx.from = user;
            actionTx.data = txData;
            return actionTx;
        };
        this.generateEncodedSupplyTxData = ({ encodedTxData, user, }) => {
            const actionTx = {};
            const txData = this.l2PoolContractInstance.encodeFunctionData('supply', [
                encodedTxData,
            ]);
            actionTx.to = this.l2PoolAddress;
            actionTx.data = txData;
            actionTx.from = user;
            actionTx.gasLimit = ethers_1.BigNumber.from(utils_2.gasLimitRecommendations[types_1.ProtocolAction.supply].limit);
            return actionTx;
        };
        this.generateEncodedBorrowTxData = ({ encodedTxData, user, }) => {
            const actionTx = {};
            const txData = this.l2PoolContractInstance.encodeFunctionData('borrow', [
                encodedTxData,
            ]);
            actionTx.to = this.l2PoolAddress;
            actionTx.data = txData;
            actionTx.from = user;
            actionTx.gasLimit = ethers_1.BigNumber.from(utils_2.gasLimitRecommendations[types_1.ProtocolAction.borrow].limit);
            return actionTx;
        };
        this.generateEncodedSupplyWithPermitTxData = ({ encodedTxData, signature, user, }) => {
            const actionTx = {};
            const decomposedSignature = (0, utils_1.splitSignature)(signature);
            const txData = this.l2PoolContractInstance.encodeFunctionData('supplyWithPermit', [encodedTxData, decomposedSignature.r, decomposedSignature.s]);
            actionTx.to = this.l2PoolAddress;
            actionTx.data = txData;
            actionTx.from = user;
            actionTx.gasLimit = ethers_1.BigNumber.from(utils_2.gasLimitRecommendations[types_1.ProtocolAction.supplyWithPermit].limit);
            return actionTx;
        };
        this.generateEncodedRepayTxData = ({ encodedTxData, user }) => {
            const actionTx = {};
            const txData = this.l2PoolContractInstance.encodeFunctionData('repay', [
                encodedTxData,
            ]);
            actionTx.to = this.l2PoolAddress;
            actionTx.data = txData;
            actionTx.from = user;
            actionTx.gasLimit = ethers_1.BigNumber.from(utils_2.gasLimitRecommendations[types_1.ProtocolAction.repay].limit);
            return actionTx;
        };
        this.generateEncodedRepayWithPermitTxData = ({ encodedTxData, user, signature, }) => {
            const actionTx = {};
            const decomposedSignature = (0, utils_1.splitSignature)(signature);
            const txData = this.l2PoolContractInstance.encodeFunctionData('repayWithPermit', [encodedTxData, decomposedSignature.r, decomposedSignature.s]);
            actionTx.to = this.l2PoolAddress;
            actionTx.data = txData;
            actionTx.from = user;
            actionTx.gasLimit = ethers_1.BigNumber.from(utils_2.gasLimitRecommendations[types_1.ProtocolAction.repayWithPermit].limit);
            return actionTx;
        };
        this.generateEncodedRepayWithATokensTxData = ({ encodedTxData, user }) => {
            const actionTx = {};
            const txData = this.l2PoolContractInstance.encodeFunctionData('repayWithATokens', [encodedTxData]);
            actionTx.to = this.l2PoolAddress;
            actionTx.data = txData;
            actionTx.from = user;
            actionTx.gasLimit = ethers_1.BigNumber.from(utils_2.gasLimitRecommendations[types_1.ProtocolAction.repayWithATokens].limit);
            return actionTx;
        };
    }
    async supply({ user, reserve, amount, referralCode }, txs) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeSupplyParams(reserve, amount, referralCode !== null && referralCode !== void 0 ? referralCode : 0);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.supply(encodedParams),
            from: user,
            value: (0, utils_2.getTxValue)(reserve, amount),
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.supply),
        });
        return txs;
    }
    async supplyWithPermit({ user, reserve, amount, deadline, referralCode, permitR, permitS, permitV, }, txs) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeSupplyWithPermitParams(reserve, amount, referralCode !== null && referralCode !== void 0 ? referralCode : 0, deadline, permitV, permitR, permitS);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.supplyWithPermit(encodedParams[0], permitR, permitS),
            from: user,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback),
        });
        return txs;
    }
    async withdraw({ user, reserve, amount, }) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeWithdrawParams(reserve, amount);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.withdraw(encodedParams),
            from: user,
            action: types_1.ProtocolAction.withdraw,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback, types_1.ProtocolAction.supply),
            },
        ];
    }
    async borrow({ user, reserve, amount, numericRateMode, referralCode, }) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeBorrowParams(reserve, amount, numericRateMode, referralCode !== null && referralCode !== void 0 ? referralCode : 0);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.borrow(encodedParams),
            from: user,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async repay({ reserve, user, amount, numericRateMode }, txs) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeRepayParams(reserve, amount, numericRateMode);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.repay(encodedParams),
            from: user,
            value: (0, utils_2.getTxValue)(reserve, amount),
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.repay),
        });
        return txs;
    }
    async repayWithPermit({ user, reserve, amount, numericRateMode, permitR, permitS, permitV, deadline, }, txs) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeRepayWithPermitParams(reserve, amount, numericRateMode, deadline, permitV, permitR, permitS);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.repayWithPermit(encodedParams[0], permitR, permitS),
            from: user,
            value: (0, utils_2.getTxValue)(reserve, amount),
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.repay),
        });
        return txs;
    }
    async repayWithATokens({ reserve, user, amount, numericRateMode }, txs) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeRepayWithATokensParams(reserve, amount, numericRateMode);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.repayWithATokens(encodedParams),
            from: user,
            value: (0, utils_2.getTxValue)(reserve, amount),
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.repay),
        });
        return txs;
    }
    async swapBorrowRateMode({ reserve, numericRateMode, user, }) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeSwapBorrowRateMode(reserve, numericRateMode);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.swapBorrowRateMode(encodedParams),
            from: user,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async setUserUseReserveAsCollateral({ reserve, usageAsCollateral, user, }) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeSetUserUseReserveAsCollateral(reserve, usageAsCollateral);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.setUserUseReserveAsCollateral(encodedParams),
            from: user,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async liquidationCall({ liquidator, liquidatedUser, debtReserve, collateralReserve, debtToCover, getAToken, }, txs) {
        const encoder = this.getEncoder();
        const encodedParams = await encoder.encodeLiquidationCall(collateralReserve, debtReserve, liquidatedUser, debtToCover, getAToken !== null && getAToken !== void 0 ? getAToken : false);
        const l2PoolContract = this.getContractInstance(this.l2PoolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => l2PoolContract.populateTransaction.liquidationCall(encodedParams[0], encodedParams[1]),
            from: liquidator,
            value: (0, utils_2.getTxValue)(debtReserve, debtToCover),
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation([], txCallback, types_1.ProtocolAction.liquidationCall),
        });
        return txs;
    }
    getEncoder() {
        if (!this.encoderContract && this.encoderAddress !== '') {
            this.encoderContract = L2Encoder__factory_1.L2Encoder__factory.connect(this.encoderAddress, this.provider);
        }
        return this.encoderContract;
    }
}
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "supply", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__param(0, (0, paramValidators_1.isDeadline32Bytes)('deadline')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "supplyWithPermit", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "withdraw", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "borrow", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "repay", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__param(0, (0, paramValidators_1.isDeadline32Bytes)('deadline')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "repayWithPermit", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "repayWithATokens", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "swapBorrowRateMode", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "setUserUseReserveAsCollateral", null);
tslib_1.__decorate([
    methodValidators_1.L2PValidator,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], L2Pool.prototype, "liquidationCall", null);
exports.L2Pool = L2Pool;
//# sourceMappingURL=index.js.map