import { __decorate, __metadata, __param } from "tslib";
import BaseService from '../commons/BaseService';
import { WithdrawAndSwitchValidator } from '../commons/validators/methodValidators';
import { isEthAddress, isPositiveAmount, } from '../commons/validators/paramValidators';
import { augustusFromAmountOffsetFromCalldata } from '../paraswap-liquiditySwapAdapter-contract';
import { ParaSwapWithdrawSwapAdapter__factory } from './typechain/ParaSwapWithdrawSwapAdapter__factory';
export class WithdrawAndSwitchAdapterService extends BaseService {
    constructor(provider, withdrawSwitchAdapterAddress) {
        super(provider, ParaSwapWithdrawSwapAdapter__factory);
        this.withdrawAndSwitchAdapterAddress = withdrawSwitchAdapterAddress !== null && withdrawSwitchAdapterAddress !== void 0 ? withdrawSwitchAdapterAddress : '';
        this.contractInterface =
            ParaSwapWithdrawSwapAdapter__factory.createInterface();
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
                ? augustusFromAmountOffsetFromCalldata(switchCallData)
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
__decorate([
    WithdrawAndSwitchValidator,
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('assetToSwitchFrom')),
    __param(0, isEthAddress('assetToSwitchTo')),
    __param(0, isEthAddress('augustus')),
    __param(0, isPositiveAmount('amountToSwitch')),
    __param(0, isPositiveAmount('minAmountToReceive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], WithdrawAndSwitchAdapterService.prototype, "withdrawAndSwitch", null);
//# sourceMappingURL=index.js.map