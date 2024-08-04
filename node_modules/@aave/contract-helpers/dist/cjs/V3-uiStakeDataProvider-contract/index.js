"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiStakeDataProviderV3 = void 0;
const Abi__factory_1 = require("./typechain/factories/Abi__factory");
class UiStakeDataProviderV3 {
    constructor(context) {
        this._contract = Abi__factory_1.Abi__factory.connect(context.uiStakeDataProvider, context.provider);
    }
    async getUserStakeUIDataHumanized({ user, stakedAssets, oracles, }) {
        const [, stakedUserData] = await this._contract.getStakedUserDataBatch(stakedAssets, oracles, user);
        // // NOTE only fetching eth price here, should we call oracle directly?
        const [, ethPrice] = await this._contract.getStakedAssetDataBatch(stakedAssets, oracles);
        const parsedUserStakedData = handleUserStakedData(stakedUserData);
        return {
            stakeUserData: parsedUserStakedData,
            ethPriceUsd: ethPrice.toString(),
        };
    }
    async getStakedAssetDataBatch(stakedAssets, oracles) {
        const [stakedData, ethPrice] = await this._contract.getStakedAssetDataBatch(stakedAssets, oracles);
        const parsedStakedData = handleParsedStakedData(stakedData);
        return { stakeData: parsedStakedData, ethPriceUsd: ethPrice.toString() };
    }
}
exports.UiStakeDataProviderV3 = UiStakeDataProviderV3;
function handleUserStakedData(stakeUserData) {
    return stakeUserData.map((data) => {
        return {
            stakeTokenUserBalance: data.stakedTokenUserBalance.toString(),
            underlyingTokenUserBalance: data.underlyingTokenUserBalance.toString(),
            stakeTokenRedeemableAmount: data.stakedTokenRedeemableAmount.toString(),
            userCooldownAmount: data.userCooldownAmount.toString(),
            userCooldownTimestamp: data.userCooldownTimestamp,
            userIncentivesToClaim: data.rewardsToClaim.toString(),
        };
    });
}
function handleParsedStakedData(stakedData) {
    return stakedData.map((data) => {
        return {
            inPostSlashingPeriod: data.inPostSlashingPeriod || false,
            stakeTokenTotalSupply: data.stakedTokenTotalSupply.toString(),
            stakeTokenTotalRedeemableAmount: data.stakedTokenTotalRedeemableAmount.toString(),
            stakeCooldownSeconds: data.stakeCooldownSeconds.toNumber(),
            stakeUnstakeWindow: data.stakeUnstakeWindow.toNumber(),
            stakeTokenPriceUSD: data.stakedTokenPriceUsd.toString(),
            rewardTokenPriceUSD: data.rewardTokenPriceUsd.toString(),
            stakeApy: data.stakeApy.toString(),
            distributionPerSecond: data.distributionPerSecond.toString(),
            distributionEnd: data.distributionEnd.toString(),
            maxSlashablePercentage: data.maxSlashablePercentage.toString(),
        };
    });
}
//# sourceMappingURL=index.js.map