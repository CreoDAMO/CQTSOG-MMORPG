import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { EthereumTransactionTypeExtended, LendingPoolMarketConfig, tEthereumAddress } from '../commons/types';
import { IERC20FaucetOwnable } from './typechain/IERC20FaucetOwnable';
export declare type V3FaucetParamsType = {
    userAddress: tEthereumAddress;
    reserve: tEthereumAddress;
    tokenSymbol: string;
    owner?: tEthereumAddress;
};
export interface FaucetV2Interface {
    mint: (args: V3FaucetParamsType) => EthereumTransactionTypeExtended[];
}
export declare class V3FaucetService extends BaseService<IERC20FaucetOwnable> implements FaucetV2Interface {
    readonly faucetAddress: string;
    readonly faucetConfig: LendingPoolMarketConfig | undefined;
    constructor(provider: providers.Provider, faucetAddress?: string);
    /**
     * @dev This mint function will only work if the IERC20FaucetOwnable "isPermissioned()" boolean getter returns "false".
     * If the "isPermissioned" returns true, them only the owner can sign the function.
     */
    mint({ userAddress, reserve, tokenSymbol, owner }: V3FaucetParamsType): EthereumTransactionTypeExtended[];
    isPermissioned(): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map