import { PopulatedTransaction, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { EthereumTransactionTypeExtended, tEthereumAddress } from '../commons/types';
import { IERC20ServiceInterface } from '../erc20-contract';
import { IDebtTokenBase, IDebtTokenBaseInterface } from './typechain/IDebtTokenBase';
export interface BaseDebtTokenInterface {
    approveDelegation: (args: ApproveDelegationType) => EthereumTransactionTypeExtended;
    generateApproveDelegationTxData: (args: ApproveDelegationType) => PopulatedTransaction;
    approvedDelegationAmount: (args: Omit<ApproveDelegationType, 'amount'>) => Promise<number>;
    isDelegationApproved: (args: DelegationApprovedType) => Promise<boolean>;
}
export declare type ApproveDelegationType = {
    user: tEthereumAddress;
    delegatee: tEthereumAddress;
    debtTokenAddress: tEthereumAddress;
    amount: string;
};
export declare type DelegationApprovedType = {
    debtTokenAddress: tEthereumAddress;
    allowanceGiver: tEthereumAddress;
    allowanceReceiver: tEthereumAddress;
    amount: string;
    nativeDecimals?: boolean;
};
export declare class BaseDebtToken extends BaseService<IDebtTokenBase> implements BaseDebtTokenInterface {
    readonly erc20Service: IERC20ServiceInterface;
    readonly debtTokenInterface: IDebtTokenBaseInterface;
    constructor(provider: providers.Provider, erc20Service: IERC20ServiceInterface);
    approveDelegation({ user, delegatee, debtTokenAddress, amount }: ApproveDelegationType): EthereumTransactionTypeExtended;
    approvedDelegationAmount({ user, delegatee, debtTokenAddress, }: Omit<ApproveDelegationType, 'amount'>): Promise<number>;
    generateApproveDelegationTxData({ user, delegatee, debtTokenAddress, amount }: ApproveDelegationType): PopulatedTransaction;
    isDelegationApproved({ debtTokenAddress, allowanceGiver, allowanceReceiver, amount, nativeDecimals, }: DelegationApprovedType): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map