import { __decorate, __metadata, __param } from "tslib";
import BaseService from '../commons/BaseService';
import { eEthereumTxType, } from '../commons/types';
import { mintAmountsPerToken, DEFAULT_NULL_VALUE_ON_TX, valueToWei, } from '../commons/utils';
import { FaucetValidator } from '../commons/validators/methodValidators';
import { isEthAddress } from '../commons/validators/paramValidators';
import { IERC20FaucetOwnable__factory } from './typechain/IERC20FaucetOwnable__factory';
export class V3FaucetService extends BaseService {
    constructor(provider, faucetAddress) {
        super(provider, IERC20FaucetOwnable__factory);
        this.faucetAddress = faucetAddress !== null && faucetAddress !== void 0 ? faucetAddress : '';
    }
    /**
     * @dev This mint function will only work if the IERC20FaucetOwnable "isPermissioned()" boolean getter returns "false".
     * If the "isPermissioned" returns true, them only the owner can sign the function.
     */
    mint({ userAddress, reserve, tokenSymbol, owner }) {
        const defaultAmount = valueToWei('1000', 18);
        const amount = mintAmountsPerToken[tokenSymbol]
            ? mintAmountsPerToken[tokenSymbol]
            : defaultAmount;
        const faucetV3Contract = this.getContractInstance(this.faucetAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => faucetV3Contract.populateTransaction.mint(reserve, userAddress, amount),
            from: owner !== null && owner !== void 0 ? owner : userAddress,
            value: DEFAULT_NULL_VALUE_ON_TX,
        });
        return [
            {
                tx: txCallback,
                txType: eEthereumTxType.FAUCET_V2_MINT,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async isPermissioned() {
        const faucetV3Contract = this.getContractInstance(this.faucetAddress);
        return faucetV3Contract.isPermissioned();
    }
}
__decorate([
    FaucetValidator,
    __param(0, isEthAddress('userAddress')),
    __param(0, isEthAddress('reserve')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], V3FaucetService.prototype, "mint", null);
//# sourceMappingURL=index.js.map