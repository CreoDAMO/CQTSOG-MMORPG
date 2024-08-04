import { BytesLike, providers } from 'ethers';
export declare type InitialProposals = {
    id: number;
    snapshotBlockHash: BytesLike;
};
export declare enum VotingMachineProposalState {
    NotCreated = 0,
    Active = 1,
    Finished = 2,
    SentToGovernance = 3
}
declare type Proposal = {
    id: string;
    sentToGovernance: boolean;
    startTime: number;
    endTime: number;
    votingClosedAndSentTimestamp: number;
    forVotes: string;
    againstVotes: string;
    creationBlockNumber: number;
    votingClosedAndSentBlockNumber: number;
};
export declare type VotingMachineProposal = {
    proposalData: Proposal;
    votedInfo: {
        support: boolean;
        votingPower: string;
    };
    strategy: string;
    dataWarehouse: string;
    votingAssets: string[];
    hasRequiredRoots: boolean;
    voteConfig: {
        votingDuration: string;
        l1ProposalBlockHash: BytesLike;
    };
    state: VotingMachineProposalState;
};
export interface VotingMachineDataHelperInterface {
    getProposalsData: (votingMachineContractAddress: string, proposals: InitialProposals[], userAddress?: string) => Promise<VotingMachineProposal[]>;
}
export declare class VotingMachineDataHelperService implements VotingMachineDataHelperInterface {
    private readonly _contract;
    constructor(votingMachineDataHelperContractAddress: string, provider: providers.Provider);
    getProposalsData(votingMachineContractAddress: string, proposals: InitialProposals[], userAddress?: string): Promise<VotingMachineProposal[]>;
}
export {};
//# sourceMappingURL=index.d.ts.map