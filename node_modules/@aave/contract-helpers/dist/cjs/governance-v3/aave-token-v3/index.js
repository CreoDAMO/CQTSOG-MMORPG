"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AaveTokenV3Service = exports.GovernancePowerType = void 0;
const ethers_1 = require("ethers");
const AaveTokenV3__factory_1 = require("../typechain/factories/AaveTokenV3__factory");
var GovernancePowerType;
(function (GovernancePowerType) {
    GovernancePowerType[GovernancePowerType["VOTING"] = 0] = "VOTING";
    GovernancePowerType[GovernancePowerType["PROPOSITION"] = 1] = "PROPOSITION";
    GovernancePowerType[GovernancePowerType["ALL"] = 2] = "ALL";
})(GovernancePowerType = exports.GovernancePowerType || (exports.GovernancePowerType = {}));
class AaveTokenV3Service {
    constructor(tokenAddress, provider) {
        this._contractInterface = AaveTokenV3__factory_1.AaveTokenV3__factory.createInterface();
        this._contract = AaveTokenV3__factory_1.AaveTokenV3__factory.connect(tokenAddress, provider);
    }
    async balanceOf(user) {
        return this._contract.balanceOf(user);
    }
    async getPowerAt(blockNumber, user, delegationType) {
        return this._contract.functions.getPowerCurrent(user, delegationType, {
            blockTag: blockNumber,
        });
    }
    async getPowers(user) {
        const powers = await this._contract.getPowersCurrent(user);
        return {
            votingPower: powers[0],
            propositionPower: powers[1],
        };
    }
    async getDelegateeData(user) {
        const data = await this._contract.getDelegates(user);
        return {
            votingDelegatee: data[0],
            propositionDelegatee: data[1],
        };
    }
    getDelegateTxData(user, delegateTo, type) {
        const tx = {};
        if (type === GovernancePowerType.ALL) {
            tx.data = this._contractInterface.encodeFunctionData('delegate', [
                delegateTo,
            ]);
        }
        else {
            tx.data = this._contractInterface.encodeFunctionData('delegateByType', [
                delegateTo,
                type,
            ]);
        }
        return Object.assign(Object.assign({}, tx), { to: this._contract.address, from: user, gasLimit: ethers_1.BigNumber.from('100000') });
    }
    async getEip712Domain() {
        return this._contract.functions.eip712Domain();
    }
}
exports.AaveTokenV3Service = AaveTokenV3Service;
//# sourceMappingURL=index.js.map