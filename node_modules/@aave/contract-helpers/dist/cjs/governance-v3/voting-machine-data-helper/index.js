"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingMachineDataHelperService = exports.VotingMachineProposalState = void 0;
const index_1 = require("../typechain/index");
var VotingMachineProposalState;
(function (VotingMachineProposalState) {
    VotingMachineProposalState[VotingMachineProposalState["NotCreated"] = 0] = "NotCreated";
    VotingMachineProposalState[VotingMachineProposalState["Active"] = 1] = "Active";
    VotingMachineProposalState[VotingMachineProposalState["Finished"] = 2] = "Finished";
    VotingMachineProposalState[VotingMachineProposalState["SentToGovernance"] = 3] = "SentToGovernance";
})(VotingMachineProposalState = exports.VotingMachineProposalState || (exports.VotingMachineProposalState = {}));
class VotingMachineDataHelperService {
    constructor(votingMachineDataHelperContractAddress, provider) {
        this._contract = index_1.VotingMachineDataHelper__factory.connect(votingMachineDataHelperContractAddress, provider);
    }
    async getProposalsData(votingMachineContractAddress, proposals, userAddress) {
        const data = await this._contract.getProposalsData(votingMachineContractAddress, proposals, userAddress !== null && userAddress !== void 0 ? userAddress : '0x0');
        return data.map(proposal => {
            return {
                proposalData: {
                    id: proposal.proposalData.id.toString(),
                    sentToGovernance: proposal.proposalData.sentToGovernance,
                    startTime: proposal.proposalData.startTime,
                    endTime: proposal.proposalData.endTime,
                    votingClosedAndSentTimestamp: proposal.proposalData.votingClosedAndSentTimestamp,
                    forVotes: proposal.proposalData.forVotes.toString(),
                    againstVotes: proposal.proposalData.againstVotes.toString(),
                    creationBlockNumber: proposal.proposalData.creationBlockNumber.toNumber(),
                    votingClosedAndSentBlockNumber: proposal.proposalData.votingClosedAndSentBlockNumber.toNumber(),
                },
                votedInfo: {
                    support: proposal.votedInfo.support,
                    votingPower: proposal.votedInfo.votingPower.toString(),
                },
                strategy: proposal.strategy,
                dataWarehouse: proposal.dataWarehouse,
                votingAssets: proposal.votingAssets,
                hasRequiredRoots: proposal.hasRequiredRoots,
                voteConfig: {
                    votingDuration: proposal.voteConfig.votingDuration.toString(),
                    l1ProposalBlockHash: proposal.voteConfig.l1ProposalBlockHash,
                },
                state: proposal.state,
            };
        });
    }
}
exports.VotingMachineDataHelperService = VotingMachineDataHelperService;
//# sourceMappingURL=index.js.map