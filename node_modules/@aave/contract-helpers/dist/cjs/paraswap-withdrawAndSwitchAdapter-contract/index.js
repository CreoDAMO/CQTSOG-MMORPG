"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawAndSwitchAdapterService = void 0;
const tslib_1 = require("tslib");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const methodValidators_1 = require("../commons/validators/methodValidators");
const paramValidators_1 = require("../commons/validators/paramValidators");
const paraswap_liquiditySwapAdapter_contract_1 = require("../paraswap-liquiditySwapAdapter-contract");
const ParaSwapWithdrawSwapAdapter__factory_1 = require("./typechain/ParaSwapWithdrawSwapAdapter__factory");
class WithdrawAndSwitchAdapterService extends BaseService_1.default {
    constructor(provider, withdrawSwitchAdapterAddress) {
        super(provider, ParaSwapWithdrawSwapAdapter__factory_1.ParaSwapWithdrawSwapAdapter__factory);
        this.withdrawAndSwitchAdapterAddress = withdrawSwitchAdapterAddress !== null && withdrawSwitchAdapterAddress !== void 0 ? withdrawSwitchAdapterAddress : '';
        this.contractInterface =
            ParaSwapWithdrawSwapAdapter__factory_1.ParaSwapWithdrawSwapAdapter__factory.createInterface();
        this.withdrawAndSwitch = this.withdrawAndSwitch.bind(this);
    }
    withdrawAndSwitch({ user, assetToSwitchFrom, assetToSwitchTo, amountToSwitch, minAmountToReceive, permitParams, augustus, switchCallData, switchAll, }) {
        const actionTx = {};
        const txData = this.contractInterface.encodeFunctionData('withdrawAndSwap', [
            assetToSwitchFrom,
            assetToSwitchTo,
            amountToSwitch,
            minAmountToReceive,
            switchAll
                ? (0, paraswap_liquiditySwapAdapter_contract_1.augustusFromAmountOffsetFromCalldata)(switchCallData)
                : 0,
            switchCallData,
            augustus,
            permitParams,
        ]);
        actionTx.to = this.withdrawAndSwitchAdapterAddress;
        actionTx.data = txData;
        actionTx.from = user;
        return actionTx;
    }
}
tslib_1.__decorate([
    methodValidators_1.WithdrawAndSwitchValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('assetToSwitchFrom')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('assetToSwitchTo')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('augustus')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amountToSwitch')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('minAmountToReceive')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], WithdrawAndSwitchAdapterService.prototype, "withdrawAndSwitch", null);
exports.WithdrawAndSwitchAdapterService = WithdrawAndSwitchAdapterService;
//# sourceMappingURL=index.js.map