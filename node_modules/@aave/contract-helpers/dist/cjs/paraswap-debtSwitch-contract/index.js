"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtSwitchAdapterService = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const utils_1 = require("../commons/utils");
const ParaSwapDebtSwitchAdapter__factory_1 = require("./typechain/ParaSwapDebtSwitchAdapter__factory");
class DebtSwitchAdapterService extends BaseService_1.default {
    constructor(provider, debtSwitchAddress) {
        super(provider, ParaSwapDebtSwitchAdapter__factory_1.ParaSwapDebtSwapAdapter__factory);
        this.debtSwitchAddress = debtSwitchAddress !== null && debtSwitchAddress !== void 0 ? debtSwitchAddress : '';
        this.contractInterface = ParaSwapDebtSwitchAdapter__factory_1.ParaSwapDebtSwapAdapter__factory.createInterface();
        this.debtSwitch = this.debtSwitch.bind(this);
    }
    debtSwitch({ user, debtAssetUnderlying, debtRepayAmount, debtRateMode, newAssetDebtToken, newAssetUnderlying, maxNewDebtAmount, repayAll, txCalldata, augustus, extraCollateralAsset, extraCollateralAmount, creditDelegationPermit, collateralPermit, }) {
        const callDataEncoded = ethers_1.utils.defaultAbiCoder.encode(['bytes', 'address'], [txCalldata, augustus]);
        const txParamsStruct = {
            debtAsset: debtAssetUnderlying,
            debtRepayAmount,
            debtRateMode,
            newDebtAsset: newAssetUnderlying,
            maxNewDebtAmount,
            offset: repayAll ? (0, utils_1.augustusToAmountOffsetFromCalldata)(txCalldata) : 0,
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
exports.DebtSwitchAdapterService = DebtSwitchAdapterService;
//# sourceMappingURL=index.js.map