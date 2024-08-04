import { BigNumber } from 'ethers';
export declare type GeneralStakeUIData = {
    stkAaveData: {
        stakedTokenTotalSupply: BigNumber;
        stakedTokenTotalRedeemableAmount: BigNumber;
        stakeCooldownSeconds: BigNumber;
        stakeUnstakeWindow: BigNumber;
        rewardTokenPriceEth: BigNumber;
        distributionEnd: BigNumber;
        distributionPerSecond: BigNumber;
        stakedTokenPriceEth: BigNumber;
        stakeApy: BigNumber;
    };
    stkBptData: {
        stakedTokenTotalSupply: BigNumber;
        stakedTokenTotalRedeemableAmount: BigNumber;
        stakeCooldownSeconds: BigNumber;
        stakeUnstakeWindow: BigNumber;
        rewardTokenPriceEth: BigNumber;
        distributionEnd: BigNumber;
        distributionPerSecond: BigNumber;
        stakedTokenPriceEth: BigNumber;
        stakeApy: BigNumber;
    };
    ethPrice: BigNumber;
};
export declare type GetUserStakeUIData = {
    stkAaveData: {
        stakedTokenUserBalance: BigNumber;
        underlyingTokenUserBalance: BigNumber;
        stakedTokenRedeemableAmount: BigNumber;
        userCooldownAmount: BigNumber;
        userCooldownTimestamp: number;
        rewardsToClaim: BigNumber;
    };
    stkBptData: {
        stakedTokenUserBalance: BigNumber;
        underlyingTokenUserBalance: BigNumber;
        stakedTokenRedeemableAmount: BigNumber;
        userCooldownAmount: BigNumber;
        userCooldownTimestamp: number;
        rewardsToClaim: BigNumber;
    };
    ethPrice: BigNumber;
};
export declare type GeneralStakeUIDataHumanized = {
    aave: {
        stakeTokenTotalSupply: string;
        stakeTokenTotalRedeemableAmount: string;
        stakeCooldownSeconds: number;
        stakeUnstakeWindow: number;
        stakeTokenPriceEth: string;
        rewardTokenPriceEth: string;
        stakeApy: string;
        distributionPerSecond: string;
        distributionEnd: string;
    };
    bpt: {
        stakeTokenTotalSupply: string;
        stakeTokenTotalRedeemableAmount: string;
        stakeCooldownSeconds: number;
        stakeUnstakeWindow: number;
        stakeTokenPriceEth: string;
        rewardTokenPriceEth: string;
        stakeApy: string;
        distributionPerSecond: string;
        distributionEnd: string;
    };
    ethPriceUsd: string;
};
export declare type GetUserStakeUIDataHumanized = {
    aave: {
        stakeTokenUserBalance: string;
        underlyingTokenUserBalance: string;
        stakeTokenRedeemableAmount: string;
        userCooldownAmount: string;
        userCooldownTimestamp: number;
        userIncentivesToClaim: string;
    };
    bpt: {
        stakeTokenUserBalance: string;
        underlyingTokenUserBalance: string;
        stakeTokenRedeemableAmount: string;
        userCooldownAmount: string;
        userCooldownTimestamp: number;
        userIncentivesToClaim: string;
    };
    ethPriceUsd: string;
};
//# sourceMappingURL=types.d.ts.map