import { splitSignature } from '@ethersproject/bytes';
import BaseService from '../commons/BaseService';
import { BaseTokenWrapper__factory } from './typechain/TokenWrapper_factory';
export class TokenWrapperService extends BaseService {
    constructor(provider, tokenWrapperAddress) {
        super(provider, BaseTokenWrapper__factory);
        this.tokenWrapperAddress = tokenWrapperAddress;
        this.contractInterface = BaseTokenWrapper__factory.createInterface();
        this._contract = BaseTokenWrapper__factory.connect(tokenWrapperAddress, provider);
    }
    async getTokenInForTokenOut(amount) {
        return this._contract.getTokenInForTokenOut(amount);
    }
    async getTokenOutForTokenIn(amount) {
        return this._contract.getTokenOutForTokenIn(amount);
    }
    supplyToken(amount, onBehalfOf, referralCode) {
        const data = this.contractInterface.encodeFunctionData('supplyToken', [
            amount,
            onBehalfOf,
            referralCode,
        ]);
        return {
            to: this.tokenWrapperAddress,
            from: onBehalfOf,
            data,
        };
    }
    supplyTokenWithPermit({ amount, onBehalfOf, referralCode, deadline, signature, }) {
        const sig = splitSignature(signature);
        const permitStruct = {
            deadline,
            v: sig.v,
            r: sig.r,
            s: sig.s,
        };
        const data = this.contractInterface.encodeFunctionData('supplyTokenWithPermit', [amount, onBehalfOf, referralCode, permitStruct]);
        return {
            to: this.tokenWrapperAddress,
            from: onBehalfOf,
            data,
        };
    }
    withdrawToken(amount, user) {
        const data = this.contractInterface.encodeFunctionData('withdrawToken', [
            amount,
            user,
        ]);
        return {
            to: this.tokenWrapperAddress,
            from: user,
            data,
        };
    }
    withdrawTokenWithPermit(amount, user, deadline, signature) {
        const sig = splitSignature(signature);
        const permitStruct = {
            deadline,
            v: sig.v,
            r: sig.r,
            s: sig.s,
        };
        const data = this.contractInterface.encodeFunctionData('withdrawTokenWithPermit', [amount, user, permitStruct]);
        return {
            to: this.tokenWrapperAddress,
            from: user,
            data,
        };
    }
}
//# sourceMappingURL=index.js.map