"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernanceDataHelperService = exports.ProposalV3State = exports.AccessLevel = void 0;
const GovernanceDataHelper__factory_1 = require("../typechain/factories/GovernanceDataHelper__factory");
var AccessLevel;
(function (AccessLevel) {
    /** Do not use */
    AccessLevel[AccessLevel["None"] = 0] = "None";
    /** listing assets, changes of assets params, updates of the protocol etc */
    AccessLevel[AccessLevel["Short_Executor"] = 1] = "Short_Executor";
    /** payloads controller updates */
    AccessLevel[AccessLevel["Long_Executor"] = 2] = "Long_Executor";
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
var ProposalV3State;
(function (ProposalV3State) {
    /** proposal does not exist */
    ProposalV3State[ProposalV3State["Null"] = 0] = "Null";
    /** created, waiting for a cooldown to initiate the balances snapshot */
    ProposalV3State[ProposalV3State["Created"] = 1] = "Created";
    /** balances snapshot set, voting in progress */
    ProposalV3State[ProposalV3State["Active"] = 2] = "Active";
    /** voting results submitted, but proposal is under grace period when guardian can cancel it */
    ProposalV3State[ProposalV3State["Queued"] = 3] = "Queued";
    /** results sent to the execution chain(s) */
    ProposalV3State[ProposalV3State["Executed"] = 4] = "Executed";
    /** voting was not successful */
    ProposalV3State[ProposalV3State["Failed"] = 5] = "Failed";
    /** got cancelled by guardian, or because proposition power of creator dropped below allowed minimum */
    ProposalV3State[ProposalV3State["Cancelled"] = 6] = "Cancelled";
    ProposalV3State[ProposalV3State["Expired"] = 7] = "Expired";
})(ProposalV3State = exports.ProposalV3State || (exports.ProposalV3State = {}));
class GovernanceDataHelperService {
    constructor(governanceDataHelperContractAddress, provider) {
        this._contract = GovernanceDataHelper__factory_1.GovernanceDataHelper__factory.connect(governanceDataHelperContractAddress, provider);
    }
    async getConstants(govCore, accessLevels) {
        const data = await this._contract.getConstants(govCore, accessLevels);
        const votingConfigs = data.votingConfigs.map(votingConfig => {
            return {
                accessLevel: votingConfig.accessLevel,
                config: {
                    coolDownBeforeVotingStart: votingConfig.config.coolDownBeforeVotingStart.toString(),
                    votingDuration: votingConfig.config.votingDuration.toString(),
                    quorum: votingConfig.config.yesThreshold.toString(),
                    differential: votingConfig.config.yesNoDifferential.toString(),
                    minPropositionPower: votingConfig.config.minPropositionPower.toString(),
                },
            };
        });
        return {
            votingConfigs,
            precisionDivider: data.precisionDivider.toString(),
            cooldownPeriod: data.cooldownPeriod.toString(),
            expirationTime: data.expirationTime.toString(),
            cancellationFee: data.cancellationFee.toString(),
        };
    }
    async getProposalsData(govCore, from, to, pageSize) {
        const data = await this._contract.getProposalsData(govCore, from, to, pageSize);
        return data.map(proposalData => {
            return {
                id: proposalData.id.toString(),
                votingChainId: proposalData.votingChainId.toNumber(),
                proposalData: {
                    state: proposalData.proposalData.state,
                    accessLevel: proposalData.proposalData.accessLevel,
                    creationTime: proposalData.proposalData.creationTime,
                    votingDuration: proposalData.proposalData.votingDuration,
                    votingActivationTime: proposalData.proposalData.votingActivationTime,
                    queuingTime: proposalData.proposalData.queuingTime,
                    cancelTimestamp: proposalData.proposalData.cancelTimestamp,
                    creator: proposalData.proposalData.creator,
                    votingPortal: proposalData.proposalData.votingPortal,
                    snapshotBlockHash: proposalData.proposalData.snapshotBlockHash,
                    ipfsHash: proposalData.proposalData.ipfsHash,
                    forVotes: proposalData.proposalData.forVotes.toString(),
                    againstVotes: proposalData.proposalData.againstVotes.toString(),
                    cancellationFee: proposalData.proposalData.cancellationFee.toString(),
                    payloads: proposalData.proposalData.payloads.map(payload => {
                        return {
                            chain: payload.chain.toNumber(),
                            accessLevel: payload.accessLevel,
                            payloadsController: payload.payloadsController,
                            payloadId: payload.payloadId,
                        };
                    }),
                },
            };
        });
    }
    async getRepresentationData(govCore, wallet, chainIds) {
        const data = await this._contract.getRepresentationData(govCore, wallet, chainIds);
        return {
            Representatives: data[0].map(representative => {
                return {
                    chainId: representative.chainId.toNumber(),
                    representative: representative.representative,
                };
            }),
            Represented: data[1].map(represented => {
                return {
                    chainId: represented.chainId.toNumber(),
                    votersRepresented: represented.votersRepresented,
                };
            }),
        };
    }
}
exports.GovernanceDataHelperService = GovernanceDataHelperService;
//# sourceMappingURL=index.js.map