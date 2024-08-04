import { BigNumber, utils } from 'ethers';
import { ProtocolAction } from '../commons/types';
import { gasLimitRecommendations } from '../commons/utils';
import { StkABPTMigrator__factory } from './typechain/StkABPTMigrator__factory';
export class StkABPTMigratorService {
    constructor(contractAddress) {
        this.contractAddress = contractAddress;
        this.contractInterface = StkABPTMigrator__factory.createInterface();
    }
    migrate(user, amount, tokenOutAmountsMin, poolOutAmountMin) {
        const tx = {
            data: this.contractInterface.encodeFunctionData('migrateStkABPT', [
                amount,
                tokenOutAmountsMin,
                poolOutAmountMin,
            ]),
            to: this.contractAddress,
            from: user,
            gasLimit: BigNumber.from(gasLimitRecommendations[ProtocolAction.default].recommended),
        };
        return tx;
    }
    migrateWithPermit({ user, amount, tokenOutAmountsMin, poolOutAmountMin, signature, deadline, }) {
        const { v, r, s } = utils.splitSignature(signature);
        const tx = {
            data: this.contractInterface.encodeFunctionData('migrateStkABPTWithPermit', [amount, deadline, v, r, s, tokenOutAmountsMin, poolOutAmountMin]),
            to: this.contractAddress,
            from: user,
            gasLimit: BigNumber.from(gasLimitRecommendations[ProtocolAction.default].recommended),
        };
        return tx;
    }
}
//# sourceMappingURL=index.js.map