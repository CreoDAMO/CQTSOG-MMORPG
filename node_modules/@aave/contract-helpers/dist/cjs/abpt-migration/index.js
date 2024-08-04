"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StkABPTMigratorService = void 0;
const ethers_1 = require("ethers");
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const StkABPTMigrator__factory_1 = require("./typechain/StkABPTMigrator__factory");
class StkABPTMigratorService {
    constructor(contractAddress) {
        this.contractAddress = contractAddress;
        this.contractInterface = StkABPTMigrator__factory_1.StkABPTMigrator__factory.createInterface();
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
            gasLimit: ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.default].recommended),
        };
        return tx;
    }
    migrateWithPermit({ user, amount, tokenOutAmountsMin, poolOutAmountMin, signature, deadline, }) {
        const { v, r, s } = ethers_1.utils.splitSignature(signature);
        const tx = {
            data: this.contractInterface.encodeFunctionData('migrateStkABPTWithPermit', [amount, deadline, v, r, s, tokenOutAmountsMin, poolOutAmountMin]),
            to: this.contractAddress,
            from: user,
            gasLimit: ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.default].recommended),
        };
        return tx;
    }
}
exports.StkABPTMigratorService = StkABPTMigratorService;
//# sourceMappingURL=index.js.map