import { BigNumberish, BytesLike, PopulatedTransaction, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { ParaSwapDebtSwapAdapter, ParaSwapDebtSwapAdapterInterface } from './typechain/ParaSwapDebtSwitchAdapter';
export declare type DebtSwitchType = {
    user: string;
    debtAssetUnderlying: string;
    debtRepayAmount: string;
    debtRateMode: number;
    newAssetDebtToken: string;
    newAssetUnderlying: string;
    maxNewDebtAmount: string;
    extraCollateralAsset: string;
    extraCollateralAmount: string;
    repayAll: boolean;
    txCalldata: string;
    augustus: string;
    creditDelegationPermit: {
        value: BigNumberish;
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
    };
    collateralPermit: {
        value: BigNumberish;
        deadline: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
    };
};
export interface ParaswapDebtSwitchInterface {
    debtSwitch: (args: DebtSwitchType) => PopulatedTransaction;
}
export declare class DebtSwitchAdapterService extends BaseService<ParaSwapDebtSwapAdapter> implements ParaswapDebtSwitchInterface {
    readonly debtSwitchAddress: string;
    readonly contractInterface: ParaSwapDebtSwapAdapterInterface;
    constructor(provider: providers.Provider, debtSwitchAddress?: string);
    debtSwitch({ user, debtAssetUnderlying, debtRepayAmount, debtRateMode, newAssetDebtToken, newAssetUnderlying, maxNewDebtAmount, repayAll, txCalldata, augustus, extraCollateralAsset, extraCollateralAmount, creditDelegationPermit, collateralPermit, }: DebtSwitchType): PopulatedTransaction;
}
//# sourceMappingURL=index.d.ts.map