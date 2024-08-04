"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenWrapperService = void 0;
const tslib_1 = require("tslib");
const bytes_1 = require("@ethersproject/bytes");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const TokenWrapper_factory_1 = require("./typechain/TokenWrapper_factory");
class TokenWrapperService extends BaseService_1.default {
    constructor(provider, tokenWrapperAddress) {
        super(provider, TokenWrapper_factory_1.BaseTokenWrapper__factory);
        this.tokenWrapperAddress = tokenWrapperAddress;
        this.contractInterface = TokenWrapper_factory_1.BaseTokenWrapper__factory.createInterface();
        this._contract = TokenWrapper_factory_1.BaseTokenWrapper__factory.connect(tokenWrapperAddress, provider);
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
        const sig = (0, bytes_1.splitSignature)(signature);
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
        const sig = (0, bytes_1.splitSignature)(signature);
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
exports.TokenWrapperService = TokenWrapperService;
//# sourceMappingURL=index.js.map