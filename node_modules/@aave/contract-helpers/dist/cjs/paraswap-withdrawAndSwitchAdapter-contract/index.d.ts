import { BytesLike, PopulatedTransaction, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { PermitSignature, tEthereumAddress } from '../commons/types';
import { ParaSwapWithdrawSwapAdapter, ParaSwapWithdrawSwapAdapterInterface } from './typechain/ParaSwapWithdrawSwapAdapter';
export declare type WithdrawAndSwitchMethodType = {
    user: tEthereumAddress;
    assetToSwitchFrom: tEthereumAddress;
    assetToSwitchTo: tEthereumAddress;
    amountToSwitch: string;
    minAmountToReceive: string;
    permitParams: PermitSignature;
    switchCallData: BytesLike;
    augustus: tEthereumAddress;
    switchAll: boolean;
};
export interface WithdrawSwitchAdapterInterface {
    withdrawAndSwitch: (args: WithdrawAndSwitchMethodType) => PopulatedTransaction;
}
export declare class WithdrawAndSwitchAdapterService extends BaseService<ParaSwapWithdrawSwapAdapter> implements WithdrawSwitchAdapterInterface {
    readonly withdrawAndSwitchAdapterAddress: string;
    readonly contractInterface: ParaSwapWithdrawSwapAdapterInterface;
    constructor(provider: providers.Provider, withdrawSwitchAdapterAddress?: string);
    withdrawAndSwitch({ user, assetToSwitchFrom, assetToSwitchTo, amountToSwitch, minAmountToReceive, permitParams, augustus, switchCallData, switchAll, }: WithdrawAndSwitchMethodType): PopulatedTransaction;
}
//# sourceMappingURL=index.d.ts.map