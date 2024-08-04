import { __decorate, __metadata, __param } from "tslib";
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import BaseService from '../commons/BaseService';
import { eEthereumTxType, ProtocolAction, } from '../commons/types';
import { API_ETH_MOCK_ADDRESS, valueToWei, SUPER_BIG_ALLOWANCE_NUMBER, MAX_UINT_AMOUNT, gasLimitRecommendations, } from '../commons/utils';
import { ERC20Validator } from '../commons/validators/methodValidators';
import { isEthAddress, isPositiveAmount, isPositiveOrMinusOneAmount, } from '../commons/validators/paramValidators';
import { IERC20Detailed__factory } from './typechain/IERC20Detailed__factory';
export class ERC20Service extends BaseService {
    constructor(provider) {
        super(provider, IERC20Detailed__factory);
        this.tokenDecimals = {};
        this.tokenMetadata = {};
        this.approve = this.approve.bind(this);
        this.approveTxData = this.approveTxData.bind(this);
        this.isApproved = this.isApproved.bind(this);
        this.getTokenData = this.getTokenData.bind(this);
        this.decimalsOf = this.decimalsOf.bind(this);
        this.contractInterface = IERC20Detailed__factory.createInterface();
    }
    /**
     * Generate approval tx data with legacy method, call tx() and gas() callbacks for tx data and gas estimation respectively
     * @param {string} user - Address to check allowance for
     * @param {string} token - Token which the user is spending
     * @param {string} spender - Address which is spending the tokens
     * @param {string} amount - Amount to approve
     * @returns {EthereumTransactionTypeExtended} legacy transaction response
     */
    approve({ user, token, spender, amount }) {
        const erc20Contract = this.getContractInstance(token);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => erc20Contract.populateTransaction.approve(spender, amount),
            from: user,
        });
        return {
            tx: txCallback,
            txType: eEthereumTxType.ERC20_APPROVAL,
            gas: this.generateTxPriceEstimation([], txCallback),
        };
    }
    /**
     * Generate approval tx data, ready to sign and submit to blockchain
     * @param {string} user - Address to check allowance for
     * @param {string} token - Token which the user is spending
     * @param {string} spender - Address which is spending the tokens
     * @param {string} amount - Amount to approve
     * @returns {PopulatedTransaction} Transaction response
     */
    approveTxData({ user, token, spender, amount }) {
        const tx = {};
        const txData = this.contractInterface.encodeFunctionData('approve', [
            spender,
            amount,
        ]);
        tx.data = txData;
        tx.to = token;
        tx.from = user;
        tx.gasLimit = BigNumber.from(gasLimitRecommendations[ProtocolAction.approval].recommended);
        return tx;
    }
    /**
     * Qeuries whether user has approved spender to transfer tokens up to the specific amount
     * @param {string} user - Address to check allowance for
     * @param {string} token - Token which the user is spending
     * @param {string} spender - Address which is spending the tokens
     * @param {string} amount - Amount of token to checkif spender has allowance for
     * @returns {boolean} true if user has approved spender contract for greater than passed amount, false otherwise
     */
    async isApproved({ user, token, spender, amount, nativeDecimals, }) {
        if (token.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase())
            return true;
        const decimals = await this.decimalsOf(token);
        const erc20Contract = this.getContractInstance(token);
        const allowance = await erc20Contract.allowance(user, spender);
        const amountBNWithDecimals = amount === '-1'
            ? BigNumber.from(SUPER_BIG_ALLOWANCE_NUMBER)
            : BigNumber.from(valueToWei(nativeDecimals ? formatUnits(amount, decimals) : amount, decimals));
        return allowance.gte(amountBNWithDecimals);
    }
    /**
     * Fetches the approval allowance of a user for a specific token and spender
     * @param {string} user - Address to check allowance for
     * @param {string} token - Token which the user is spending
     * @param {string} spender - Address which is spending the tokens
     * @returns {number} The user's approved allowance, in standard decimal units, -1 for max allowance
     */
    async approvedAmount({ user, token, spender }) {
        if (token.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase())
            return -1;
        const erc20Contract = this.getContractInstance(token);
        const allowance = await erc20Contract.allowance(user, spender);
        if (allowance.toString() === MAX_UINT_AMOUNT) {
            return -1;
        }
        const decimals = await this.decimalsOf(token);
        return Number(ethers.utils.formatUnits(allowance, decimals));
    }
    /**
     * Fetches the decimals of an ERC20 token, used for formatting amounts
     * @param {string} token - ERC20 token address
     * @returns {number} Decimal units of token amounts
     */
    async decimalsOf(token) {
        if (token.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase())
            return 18;
        if (!this.tokenDecimals[token]) {
            const erc20Contract = this.getContractInstance(token);
            this.tokenDecimals[token] = await erc20Contract.decimals();
        }
        return this.tokenDecimals[token];
    }
    /**
     * Return basic details of an ERC20
     * @param {string} token - ERC20 token address
     * @returns {TokenMetadataType} ERC20 token metadata
     */
    async getTokenData(token) {
        if (token.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
            return {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
                address: token,
            };
        }
        // Needed because MKR does not return string for symbol and Name
        if (token.toLowerCase() ===
            '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'.toLowerCase()) {
            return {
                name: 'Maker',
                symbol: 'MKR',
                decimals: 18,
                address: token,
            };
        }
        if (!this.tokenMetadata[token]) {
            const { name: nameGetter, symbol: symbolGetter } = this.getContractInstance(token);
            const [name, symbol, decimals] = await Promise.all([
                nameGetter(),
                symbolGetter(),
                this.decimalsOf(token),
            ]);
            this.tokenMetadata[token] = {
                name,
                symbol,
                decimals,
                address: token,
            };
        }
        return this.tokenMetadata[token];
    }
}
__decorate([
    ERC20Validator,
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('token')),
    __param(0, isEthAddress('spender')),
    __param(0, isPositiveAmount('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ERC20Service.prototype, "approve", null);
__decorate([
    ERC20Validator,
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('token')),
    __param(0, isEthAddress('spender')),
    __param(0, isPositiveAmount('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ERC20Service.prototype, "approveTxData", null);
__decorate([
    ERC20Validator,
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('token')),
    __param(0, isEthAddress('spender')),
    __param(0, isPositiveOrMinusOneAmount('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ERC20Service.prototype, "isApproved", null);
__decorate([
    ERC20Validator,
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('token')),
    __param(0, isEthAddress('spender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ERC20Service.prototype, "approvedAmount", null);
__decorate([
    ERC20Validator,
    __param(0, isEthAddress()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ERC20Service.prototype, "decimalsOf", null);
__decorate([
    ERC20Validator,
    __param(0, isEthAddress()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ERC20Service.prototype, "getTokenData", null);
//# sourceMappingURL=index.js.map