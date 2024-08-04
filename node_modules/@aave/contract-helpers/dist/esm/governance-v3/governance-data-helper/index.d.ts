import { providers } from 'ethers';
export declare enum AccessLevel {
    /** Do not use */
    None = 0,
    /** listing assets, changes of assets params, updates of the protocol etc */
    Short_Executor = 1,
    /** payloads controller updates */
    Long_Executor = 2
}
export declare enum ProposalV3State {
    /** proposal does not exist */
    Null = 0,
    /** created, waiting for a cooldown to initiate the balances snapshot */
    Created = 1,
    /** balances snapshot set, voting in progress */
    Active = 2,
    /** voting results submitted, but proposal is under grace period when guardian can cancel it */
    Queued = 3,
    /** results sent to the execution chain(s) */
    Executed = 4,
    /** voting was not successful */
    Failed = 5,
    /** got cancelled by guardian, or because proposition power of creator dropped below allowed minimum */
    Cancelled = 6,
    Expired = 7
}
export declare type ProposalPayload = {
    chain: number;
    accessLevel: AccessLevel;
    payloadsController: string;
    payloadId: number;
};
export declare type ProposalV3 = {
    state: ProposalV3State;
    accessLevel: AccessLevel;
    creationTime: number;
    votingDuration: number;
    votingActivationTime: number;
    queuingTime: number;
    cancelTimestamp: number;
    creator: string;
    votingPortal: string;
    snapshotBlockHash: string;
    ipfsHash: string;
    forVotes: string;
    againstVotes: string;
    cancellationFee: string;
    payloads: ProposalPayload[];
};
export declare type ProposalData = {
    id: string;
    votingChainId: number;
    proposalData: ProposalV3;
};
export declare type VotingConfig = {
    accessLevel: AccessLevel;
    config: {
        coolDownBeforeVotingStart: string;
        votingDuration: string;
        quorum: string;
        differential: string;
        minPropositionPower: string;
    };
};
export declare type Constants = {
    votingConfigs: VotingConfig[];
    precisionDivider: string;
    cooldownPeriod: string;
    expirationTime: string;
    cancellationFee: string;
};
export declare type Representative = {
    chainId: number;
    representative: string;
};
export declare type Rpresented = {
    chainId: number;
    votersRepresented: string[];
};
export interface GovernanceDataHelperInterface {
    getConstants: (govCore: string, accessLevels: number[]) => Promise<Constants>;
    getProposalsData: (govCore: string, from: number, to: number, pageSize: number) => Promise<ProposalData[]>;
    getRepresentationData: (govCore: string, wallet: string, chainIds: number[]) => Promise<{
        Representatives: Representative[];
        Represented: Rpresented[];
    }>;
}
export declare class GovernanceDataHelperService implements GovernanceDataHelperInterface {
    private readonly _contract;
    constructor(governanceDataHelperContractAddress: string, provider: providers.Provider);
    getConstants(govCore: string, accessLevels: number[]): Promise<Constants>;
    getProposalsData(govCore: string, from: number, to: number, pageSize: number): Promise<ProposalData[]>;
    getRepresentationData(govCore: string, wallet: string, chainIds: number[]): Promise<{
        Representatives: Representative[];
        Represented: Rpresented[];
    }>;
}
//# sourceMappingURL=index.d.ts.map