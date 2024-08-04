import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { Abi, AbiInterface } from '../Abi';
export declare class Abi__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "stkAave";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "ethUsdPriceFeed";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "aaveUsdPriceFeed";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "AAVE_USD_PRICE_FEED";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "ETH_USD_PRICE_FEED";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "STAKED_AAVE";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "stakedAsset";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "oracle";
            readonly type: "address";
        }];
        readonly name: "getStakedAssetData";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "stakedTokenTotalSupply";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenTotalRedeemableAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeCooldownSeconds";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeUnstakeWindow";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenPriceUsd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "rewardTokenPriceUsd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeApy";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint128";
                readonly name: "distributionPerSecond";
                readonly type: "uint128";
            }, {
                readonly internalType: "bool";
                readonly name: "inPostSlashingPeriod";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "distributionEnd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxSlashablePercentage";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IStakedTokenDataProvider.StakedTokenData";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "stakedAssets";
            readonly type: "address[]";
        }, {
            readonly internalType: "address[]";
            readonly name: "oracles";
            readonly type: "address[]";
        }];
        readonly name: "getStakedAssetDataBatch";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "stakedTokenTotalSupply";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenTotalRedeemableAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeCooldownSeconds";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeUnstakeWindow";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenPriceUsd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "rewardTokenPriceUsd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeApy";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint128";
                readonly name: "distributionPerSecond";
                readonly type: "uint128";
            }, {
                readonly internalType: "bool";
                readonly name: "inPostSlashingPeriod";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "distributionEnd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxSlashablePercentage";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IStakedTokenDataProvider.StakedTokenData[]";
            readonly name: "";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "stakedAsset";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "oracle";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }];
        readonly name: "getStakedUserData";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "stakedTokenTotalSupply";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenTotalRedeemableAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeCooldownSeconds";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeUnstakeWindow";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenPriceUsd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "rewardTokenPriceUsd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeApy";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint128";
                readonly name: "distributionPerSecond";
                readonly type: "uint128";
            }, {
                readonly internalType: "bool";
                readonly name: "inPostSlashingPeriod";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "distributionEnd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxSlashablePercentage";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IStakedTokenDataProvider.StakedTokenData";
            readonly name: "";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "stakedTokenUserBalance";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenRedeemableAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "underlyingTokenUserBalance";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "rewardsToClaim";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint40";
                readonly name: "userCooldownTimestamp";
                readonly type: "uint40";
            }, {
                readonly internalType: "uint216";
                readonly name: "userCooldownAmount";
                readonly type: "uint216";
            }];
            readonly internalType: "struct IStakedTokenDataProvider.StakedTokenUserData";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "stakedAssets";
            readonly type: "address[]";
        }, {
            readonly internalType: "address[]";
            readonly name: "oracles";
            readonly type: "address[]";
        }, {
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }];
        readonly name: "getStakedUserDataBatch";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "stakedTokenTotalSupply";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenTotalRedeemableAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeCooldownSeconds";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeUnstakeWindow";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenPriceUsd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "rewardTokenPriceUsd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakeApy";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint128";
                readonly name: "distributionPerSecond";
                readonly type: "uint128";
            }, {
                readonly internalType: "bool";
                readonly name: "inPostSlashingPeriod";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "distributionEnd";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxSlashablePercentage";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IStakedTokenDataProvider.StakedTokenData[]";
            readonly name: "";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "stakedTokenUserBalance";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "stakedTokenRedeemableAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "underlyingTokenUserBalance";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "rewardsToClaim";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint40";
                readonly name: "userCooldownTimestamp";
                readonly type: "uint40";
            }, {
                readonly internalType: "uint216";
                readonly name: "userCooldownAmount";
                readonly type: "uint216";
            }];
            readonly internalType: "struct IStakedTokenDataProvider.StakedTokenUserData[]";
            readonly name: "";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): AbiInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Abi;
}
//# sourceMappingURL=Abi__factory.d.ts.map