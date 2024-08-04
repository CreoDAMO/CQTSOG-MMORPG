import { PopulatedTransaction, providers } from 'ethers';
import { tEthereumAddress, ENS } from '../../commons/types';
import { MetaDelegateHelper } from '../typechain/MetaDelegateHelper';
export declare enum DelegationType {
    VOTING = 0,
    PROPOSITION = 1,
    ALL = 2
}
export declare type MetaDelegateParams = {
    delegator: string;
    delegatee: string;
    underlyingAsset: string;
    deadline: string;
    v: number;
    r: string;
    s: string;
    delegationType: number;
};
export declare type DelegateMetaSigParams = {
    underlyingAsset: tEthereumAddress;
    delegatee: tEthereumAddress | ENS;
    delegationType: DelegationType;
    delegator: tEthereumAddress;
    increaseNonce: boolean;
    governanceTokenName: string;
    nonce: string;
    connectedChainId: number;
    deadline: string;
};
export declare class MetaDelegateHelperService {
    readonly _contract: MetaDelegateHelper;
    readonly _contractInterface: import("../typechain/MetaDelegateHelper").MetaDelegateHelperInterface;
    private readonly metaDelegateHelperContractAddress;
    constructor(metaDelegateHelperContractAddress: string, provider: providers.Provider);
    batchMetaDelegate(user: string, delegateParams: MetaDelegateParams[]): PopulatedTransaction;
    prepareV3DelegateByTypeSignature({ underlyingAsset, delegatee, delegationType, delegator, increaseNonce, governanceTokenName, nonce, connectedChainId, deadline, }: DelegateMetaSigParams): Promise<string>;
}
//# sourceMappingURL=index.d.ts.map