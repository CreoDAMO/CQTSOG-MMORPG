"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDebtToken = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const methodValidators_1 = require("../commons/validators/methodValidators");
const paramValidators_1 = require("../commons/validators/paramValidators");
const IDebtTokenBase__factory_1 = require("./typechain/IDebtTokenBase__factory");
class BaseDebtToken extends BaseService_1.default {
    constructor(provider, erc20Service) {
        super(provider, IDebtTokenBase__factory_1.IDebtTokenBase__factory);
        this.erc20Service = erc20Service;
        this.debtTokenInterface = IDebtTokenBase__factory_1.IDebtTokenBase__factory.createInterface();
    }
    approveDelegation({ user, delegatee, debtTokenAddress, amount }) {
        const debtTokenContract = this.getContractInstance(debtTokenAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => debtTokenContract.populateTransaction.approveDelegation(delegatee, amount),
            from: user,
        });
        return {
            tx: txCallback,
            txType: types_1.eEthereumTxType.ERC20_APPROVAL,
            gas: this.generateTxPriceEstimation([], txCallback),
        };
    }
    async approvedDelegationAmount({ user, delegatee, debtTokenAddress, }) {
        const debtTokenContract = this.getContractInstance(debtTokenAddress);
        const allowance = await debtTokenContract.borrowAllowance(user, delegatee);
        const decimals = await this.erc20Service.decimalsOf(debtTokenAddress);
        return Number(ethers_1.ethers.utils.formatUnits(allowance, decimals));
    }
    generateApproveDelegationTxData({ user, delegatee, debtTokenAddress, amount }) {
        const txData = this.debtTokenInterface.encodeFunctionData('approveDelegation', [delegatee, amount]);
        const approveDelegationTx = {
            data: txData,
            to: debtTokenAddress,
            from: user,
            gasLimit: ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.creditDelegationApproval]
                .recommended),
        };
        return approveDelegationTx;
    }
    async isDelegationApproved({ debtTokenAddress, allowanceGiver, allowanceReceiver, amount, nativeDecimals, }) {
        const decimals = await this.erc20Service.decimalsOf(debtTokenAddress);
        const debtTokenContract = this.getContractInstance(debtTokenAddress);
        const delegatedAllowance = await debtTokenContract.borrowAllowance(allowanceGiver, allowanceReceiver);
        const amountBNWithDecimals = nativeDecimals
            ? ethers_1.BigNumber.from(amount)
            : ethers_1.BigNumber.from((0, utils_1.valueToWei)(amount, decimals));
        return delegatedAllowance.gte(amountBNWithDecimals);
    }
}
tslib_1.__decorate([
    methodValidators_1.DebtTokenValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('delegatee')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('debtTokenAddress')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], BaseDebtToken.prototype, "approveDelegation", null);
tslib_1.__decorate([
    methodValidators_1.DebtTokenValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('delegatee')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('debtTokenAddress')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BaseDebtToken.prototype, "approvedDelegationAmount", null);
tslib_1.__decorate([
    methodValidators_1.DebtTokenValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('delegatee')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('debtTokenAddress')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], BaseDebtToken.prototype, "generateApproveDelegationTxData", null);
tslib_1.__decorate([
    methodValidators_1.DebtTokenValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('debtTokenAddress')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('allowanceGiver')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('allowanceReceiver')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BaseDebtToken.prototype, "isDelegationApproved", null);
exports.BaseDebtToken = BaseDebtToken;
//# sourceMappingURL=index.js.map