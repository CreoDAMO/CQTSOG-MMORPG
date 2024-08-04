import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { EthereumTransactionTypeExtended } from '../commons/types';
import { IAaveGovernanceV2 } from './typechain/IAaveGovernanceV2';
import { GovGetProposalsType, GovGetProposalType, GovGetVotingAtBlockType, GovSubmitVoteType, GovGetTokensVotingPower as GovGetPower, GovGetVoteOnProposal, Proposal, Power, ProposalRPC, Vote, GovDelegateTokensByTypeBySig, GovDelegateTokensBySig } from './types';
export declare type Options = {
    blockTag?: string;
};
export declare const humanizeProposal: (rawProposal: ProposalRPC) => Proposal;
export interface AaveGovernanceInterface {
    submitVote: (args: GovSubmitVoteType) => EthereumTransactionTypeExtended[];
    getProposal: (args: GovGetProposalType) => Promise<Proposal>;
    getProposals: (args: GovGetProposalsType) => Promise<Proposal[]>;
    getVotingPowerAt: (args: GovGetVotingAtBlockType) => Promise<string>;
    getTokensPower: (args: GovGetPower) => Promise<Power[]>;
    getVoteOnProposal: (args: GovGetVoteOnProposal) => Promise<Vote>;
    getProposalsCount: () => Promise<number>;
}
declare type AaveGovernanceServiceConfig = {
    GOVERNANCE_ADDRESS: string;
    GOVERNANCE_HELPER_ADDRESS?: string;
    ipfsGateway?: string;
};
export declare class AaveGovernanceService extends BaseService<IAaveGovernanceV2> implements AaveGovernanceInterface {
    readonly aaveGovernanceV2Address: string;
    readonly aaveGovernanceV2HelperAddress: string;
    constructor(provider: providers.Provider, config: AaveGovernanceServiceConfig);
    submitVote({ user, proposalId, support }: GovSubmitVoteType): EthereumTransactionTypeExtended[];
    getProposals({ skip, limit, }: GovGetProposalsType): Promise<Proposal[]>;
    getProposal({ proposalId }: GovGetProposalType): Promise<Proposal>;
    getVotingPowerAt({ user, block, strategy }: GovGetVotingAtBlockType): Promise<string>;
    getTokensPower({ user, tokens }: GovGetPower, opts?: Options): Promise<Power[]>;
    getVoteOnProposal({ proposalId, user }: GovGetVoteOnProposal): Promise<Vote>;
    getProposalsCount(): Promise<number>;
    delegateTokensBySig({ user, tokens, data }: GovDelegateTokensBySig): Promise<EthereumTransactionTypeExtended[]>;
    delegateTokensByTypeBySig({ user, tokens, data }: GovDelegateTokensByTypeBySig): Promise<EthereumTransactionTypeExtended[]>;
}
export {};
//# sourceMappingURL=index.d.ts.map