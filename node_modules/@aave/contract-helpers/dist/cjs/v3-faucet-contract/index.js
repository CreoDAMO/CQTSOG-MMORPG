"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V3FaucetService = void 0;
const tslib_1 = require("tslib");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const methodValidators_1 = require("../commons/validators/methodValidators");
const paramValidators_1 = require("../commons/validators/paramValidators");
const IERC20FaucetOwnable__factory_1 = require("./typechain/IERC20FaucetOwnable__factory");
class V3FaucetService extends BaseService_1.default {
    constructor(provider, faucetAddress) {
        super(provider, IERC20FaucetOwnable__factory_1.IERC20FaucetOwnable__factory);
        this.faucetAddress = faucetAddress !== null && faucetAddress !== void 0 ? faucetAddress : '';
    }
    /**
     * @dev This mint function will only work if the IERC20FaucetOwnable "isPermissioned()" boolean getter returns "false".
     * If the "isPermissioned" returns true, them only the owner can sign the function.
     */
    mint({ userAddress, reserve, tokenSymbol, owner }) {
        const defaultAmount = (0, utils_1.valueToWei)('1000', 18);
        const amount = utils_1.mintAmountsPerToken[tokenSymbol]
            ? utils_1.mintAmountsPerToken[tokenSymbol]
            : defaultAmount;
        const faucetV3Contract = this.getContractInstance(this.faucetAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => faucetV3Contract.populateTransaction.mint(reserve, userAddress, amount),
            from: owner !== null && owner !== void 0 ? owner : userAddress,
            value: utils_1.DEFAULT_NULL_VALUE_ON_TX,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.FAUCET_V2_MINT,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async isPermissioned() {
        const faucetV3Contract = this.getContractInstance(this.faucetAddress);
        return faucetV3Contract.isPermissioned();
    }
}
tslib_1.__decorate([
    methodValidators_1.FaucetValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('userAddress')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Array)
], V3FaucetService.prototype, "mint", null);
exports.V3FaucetService = V3FaucetService;
//# sourceMappingURL=index.js.map