import { BigNumber } from 'ethers';
import { AaveTokenV3__factory } from '../typechain/factories/AaveTokenV3__factory';
export var GovernancePowerType;
(function (GovernancePowerType) {
    GovernancePowerType[GovernancePowerType["VOTING"] = 0] = "VOTING";
    GovernancePowerType[GovernancePowerType["PROPOSITION"] = 1] = "PROPOSITION";
    GovernancePowerType[GovernancePowerType["ALL"] = 2] = "ALL";
})(GovernancePowerType || (GovernancePowerType = {}));
export class AaveTokenV3Service {
    constructor(tokenAddress, provider) {
        this._contractInterface = AaveTokenV3__factory.createInterface();
        this._contract = AaveTokenV3__factory.connect(tokenAddress, provider);
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
        return Object.assign(Object.assign({}, tx), { to: this._contract.address, from: user, gasLimit: BigNumber.from('100000') });
    }
    async getEip712Domain() {
        return this._contract.functions.eip712Domain();
    }
}
//# sourceMappingURL=index.js.map