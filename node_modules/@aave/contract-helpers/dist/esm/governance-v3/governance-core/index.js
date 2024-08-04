import { BigNumber } from 'ethers';
import { ProtocolAction } from '../../commons/types';
import { gasLimitRecommendations } from '../../commons/utils';
import { GovernanceCore__factory } from '../typechain/factories/GovernanceCore__factory';
export class GovernanceCoreService {
    constructor(governanceCoreContractAddress, provider) {
        this._contractInterface = GovernanceCore__factory.createInterface();
        this._contractInstance = GovernanceCore__factory.connect(governanceCoreContractAddress, provider);
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
            gasLimit: BigNumber.from(gasLimitRecommendations[ProtocolAction.updateRepresentatives].limit),
        };
        return actionTx;
    }
}
//# sourceMappingURL=index.js.map