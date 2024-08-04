"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernanceCoreService = void 0;
const ethers_1 = require("ethers");
const types_1 = require("../../commons/types");
const utils_1 = require("../../commons/utils");
const GovernanceCore__factory_1 = require("../typechain/factories/GovernanceCore__factory");
class GovernanceCoreService {
    constructor(governanceCoreContractAddress, provider) {
        this._contractInterface = GovernanceCore__factory_1.GovernanceCore__factory.createInterface();
        this._contractInstance = GovernanceCore__factory_1.GovernanceCore__factory.connect(governanceCoreContractAddress, provider);
    }
    async getProposalCount() {
        const count = await this._contractInstance.getProposalsCount();
        return count.toNumber();
    }
    updateRepresentativesForChain(user, representatives) {
        const actionTx = {
            data: this._contractInterface.encodeFunctionData('updateRepresentativesForChain', [representatives]),
            to: this._contractInstance.address,
            from: user,
            gasLimit: ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.updateRepresentatives].limit),
        };
        return actionTx;
    }
}
exports.GovernanceCoreService = GovernanceCoreService;
//# sourceMappingURL=index.js.map