import { PopulatedTransaction, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { EthereumTransactionTypeExtended, tEthereumAddress } from '../commons/types';
import { IERC20Detailed, IERC20DetailedInterface } from './typechain/IERC20Detailed';
export interface IERC20ServiceInterface {
    decimalsOf: (token: tEthereumAddress) => Promise<number>;
    getTokenData: (token: tEthereumAddress) => Promise<TokenMetadataType>;
    isApproved: (args: ApproveType & {
        nativeDecimals?: boolean;
    }) => Promise<boolean>;
    approvedAmount: (args: AllowanceRequest) => Promise<number>;
    approve: (args: ApproveType) => EthereumTransactionTypeExtended;
    approveTxData: (args: ApproveType) => PopulatedTransaction;
}
export declare type TokenOwner = {
    user: tEthereumAddress;
    token: tEthereumAddress;
};
export declare type AllowanceRequest = TokenOwner & {
    spender: tEthereumAddress;
};
export declare type ApproveType = AllowanceRequest & {
    amount: string;
};
export declare type SignedApproveType = ApproveType & {
    deadline?: string;
};
export declare type TokenMetadataType = {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
};
export declare class ERC20Service extends BaseService<IERC20Detailed> implements IERC20ServiceInterface {
    readonly tokenDecimals: Record<string, number>;
    readonly tokenMetadata: Record<string, TokenMetadataType>;
    readonly contractInterface: IERC20DetailedInterface;
    constructor(provider: providers.Provider);
    /**
     * Generate approval tx data with legacy method, call tx() and gas() callbacks for tx data and gas estimation respectively
     * @param {string} user - Address to check allowance for
     * @param {string} token - Token which the user is spending
     * @param {string} spender - Address which is spending the tokens
     * @param {string} amount - Amount to approve
     * @returns {EthereumTransactionTypeExtended} legacy transaction response
     */
    approve({ user, token, spender, amount }: ApproveType): EthereumTransactionTypeExtended;
    /**
     * Generate approval tx data, ready to sign and submit to blockchain
     * @param {string} user - Address to check allowance for
     * @param {string} token - Token which the user is spending
     * @param {string} spender - Address which is spending the tokens
     * @param {string} amount - Amount to approve
     * @returns {PopulatedTransaction} Transaction response
     */
    approveTxData({ user, token, spender, amount }: ApproveType): PopulatedTransaction;
    /**
     * Qeuries whether user has approved spender to transfer tokens up to the specific amount
     * @param {string} user - Address to check allowance for
     * @param {string} token - Token which the user is spending
     * @param {string} spender - Address which is spending the tokens
     * @param {string} amount - Amount of token to checkif spender has allowance for
     * @returns {boolean} true if user has approved spender contract for greater than passed amount, false otherwise
     */
    isApproved({ user, token, spender, amount, nativeDecimals, }: ApproveType & {
        nativeDecimals?: boolean;
    }): Promise<boolean>;
    /**
     * Fetches the approval allowance of a user for a specific token and spender
     * @param {string} user - Address to check allowance for
     * @param {string} token - Token which the user is spending
     * @param {string} spender - Address which is spending the tokens
     * @returns {number} The user's approved allowance, in standard decimal units, -1 for max allowance
     */
    approvedAmount({ user, token, spender }: AllowanceRequest): Promise<number>;
    /**
     * Fetches the decimals of an ERC20 token, used for formatting amounts
     * @param {string} token - ERC20 token address
     * @returns {number} Decimal units of token amounts
     */
    decimalsOf(token: tEthereumAddress): Promise<number>;
    /**
     * Return basic details of an ERC20
     * @param {string} token - ERC20 token address
     * @returns {TokenMetadataType} ERC20 token metadata
     */
    getTokenData(token: tEthereumAddress): Promise<TokenMetadataType>;
}
//# sourceMappingURL=index.d.ts.map