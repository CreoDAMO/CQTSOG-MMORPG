import { utils, } from 'ethers';
import BaseService from '../commons/BaseService';
import { augustusToAmountOffsetFromCalldata } from '../commons/utils';
import { ParaSwapDebtSwapAdapter__factory } from './typechain/ParaSwapDebtSwitchAdapter__factory';
export class DebtSwitchAdapterService extends BaseService {
    constructor(provider, debtSwitchAddress) {
        super(provider, ParaSwapDebtSwapAdapter__factory);
        this.debtSwitchAddress = debtSwitchAddress !== null && debtSwitchAddress !== void 0 ? debtSwitchAddress : '';
        this.contractInterface = ParaSwapDebtSwapAdapter__factory.createInterface();
        this.debtSwitch = this.debtSwitch.bind(this);
    }
    debtSwitch({ user, debtAssetUnderlying, debtRepayAmount, debtRateMode, newAssetDebtToken, newAssetUnderlying, maxNewDebtAmount, repayAll, txCalldata, augustus, extraCollateralAsset, extraCollateralAmount, creditDelegationPermit, collateralPermit, }) {
        const callDataEncoded = utils.defaultAbiCoder.encode(['bytes', 'address'], [txCalldata, augustus]);
        const txParamsStruct = {
            debtAsset: debtAssetUnderlying,
            debtRepayAmount,
            debtRateMode,
            newDebtAsset: newAssetUnderlying,
            maxNewDebtAmount,
            offset: repayAll ? augustusToAmountOffsetFromCalldata(txCalldata) : 0,
            paraswapData: callDataEncoded,
            extraCollateralAsset,
            extraCollateralAmount,
        };
        const creditDelParamsStruct = Object.assign({ debtToken: newAssetDebtToken }, creditDelegationPermit);
        const permitInput = Object.assign({ aToken: extraCollateralAsset }, collateralPermit);
        const actionTx = {};
        const txData = this.contractInterface.encodeFunctionData('swapDebt', [
            txParamsStruct,
            creditDelParamsStruct,
            permitInput,
        ]);
        actionTx.to = this.debtSwitchAddress;
        actionTx.data = txData;
        actionTx.from = user;
        return actionTx;
    }
}
//# sourceMappingURL=index.js.map