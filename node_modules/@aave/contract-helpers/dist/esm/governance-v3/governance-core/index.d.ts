import { PopulatedTransaction, providers } from 'ethers';
import { ChainId } from '../../commons/types';
export interface GovernanceCoreServiceInterface {
    getProposalCount: () => Promise<number>;
    updateRepresentativesForChain: (user: string, representatives: Array<{
        representative: string;
        chainId: ChainId;
    }>) => PopulatedTransaction;
}
export declare class GovernanceCoreService implements GovernanceCoreServiceInterface {
    private readonly _contractInterface;
    private readonly _contractInstance;
    constructor(governanceCoreContractAddress: string, provider: providers.Provider);
    getProposalCount(): Promise<number>;
    updateRepresentativesForChain(user: string, representatives: Array<{
        representative: string;
        chainId: ChainId;
    }>): PopulatedTransaction;
}
//# sourceMappingURL=index.d.ts.map