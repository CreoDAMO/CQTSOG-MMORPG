import { __decorate, __metadata, __param } from "tslib";
import { StakeUiDataProviderValidator } from '../commons/validators/methodValidators';
import { isEthAddress } from '../commons/validators/paramValidators';
import { StakedTokenDataProvider__factory } from './typechain/StakedTokenDataProviderFactory';
export class UiStakeDataProvider {
    constructor(context) {
        this._contract = StakedTokenDataProvider__factory.connect(context.uiStakeDataProvider, context.provider);
    }
    async getUserStakeUIData({ user }) {
        const { stkAaveData, stkAaveUserData, stkBptData, stkBptUserData, ethPrice, } = await this._contract.getAllStakedTokenUserData(user);
        return {
            stkAaveData: Object.assign(Object.assign({}, stkAaveData), { stakedTokenUserBalance: stkAaveUserData.stakedTokenUserBalance, underlyingTokenUserBalance: stkAaveUserData.underlyingTokenUserBalance, stakedTokenRedeemableAmount: stkAaveUserData.stakedTokenRedeemableAmount, userCooldownAmount: stkAaveUserData.userCooldownAmount, userCooldownTimestamp: stkAaveUserData.userCooldownTimestamp, rewardsToClaim: stkAaveUserData.rewardsToClaim }),
            stkBptData: Object.assign(Object.assign({}, stkBptData), { stakedTokenUserBalance: stkBptUserData.stakedTokenUserBalance, underlyingTokenUserBalance: stkBptUserData.underlyingTokenUserBalance, stakedTokenRedeemableAmount: stkBptUserData.stakedTokenRedeemableAmount, userCooldownAmount: stkBptUserData.userCooldownAmount, userCooldownTimestamp: stkBptUserData.userCooldownTimestamp, rewardsToClaim: stkBptUserData.rewardsToClaim }),
            ethPrice,
        };
    }
    async getUserStakeUIDataHumanized({ user }) {
        const contractResult = await this.getUserStakeUIData({ user });
        return {
            aave: {
                stakeTokenUserBalance: contractResult.stkAaveData.stakedTokenUserBalance.toString(),
                underlyingTokenUserBalance: contractResult.stkAaveData.underlyingTokenUserBalance.toString(),
                stakeTokenRedeemableAmount: contractResult.stkAaveData.stakedTokenRedeemableAmount.toString(),
                userCooldownAmount: contractResult.stkAaveData.userCooldownAmount.toString(),
                userCooldownTimestamp: contractResult.stkAaveData.userCooldownTimestamp,
                userIncentivesToClaim: contractResult.stkAaveData.rewardsToClaim.toString(),
            },
            bpt: {
                stakeTokenUserBalance: contractResult.stkBptData.stakedTokenUserBalance.toString(),
                underlyingTokenUserBalance: contractResult.stkBptData.underlyingTokenUserBalance.toString(),
                stakeTokenRedeemableAmount: contractResult.stkBptData.stakedTokenRedeemableAmount.toString(),
                userCooldownAmount: contractResult.stkBptData.userCooldownAmount.toString(),
                userCooldownTimestamp: contractResult.stkBptData.userCooldownTimestamp,
                userIncentivesToClaim: contractResult.stkBptData.rewardsToClaim.toString(),
            },
            ethPriceUsd: contractResult.ethPrice.toString(),
        };
    }
    async getGeneralStakeUIData() {
        const { stkAaveData, stkBptData, ethPrice } = await this._contract.getAllStakedTokenData();
        return {
            stkAaveData,
            stkBptData,
            ethPrice,
        };
    }
    async getGeneralStakeUIDataHumanized() {
        const contractResult = await this.getGeneralStakeUIData();
        return {
            aave: {
                stakeTokenTotalSupply: contractResult.stkAaveData.stakedTokenTotalSupply.toString(),
                stakeTokenTotalRedeemableAmount: contractResult.stkAaveData.stakedTokenTotalRedeemableAmount.toString(),
                stakeCooldownSeconds: contractResult.stkAaveData.stakeCooldownSeconds.toNumber(),
                stakeUnstakeWindow: contractResult.stkAaveData.stakeUnstakeWindow.toNumber(),
                stakeTokenPriceEth: contractResult.stkAaveData.stakedTokenPriceEth.toString(),
                rewardTokenPriceEth: contractResult.stkAaveData.rewardTokenPriceEth.toString(),
                stakeApy: contractResult.stkAaveData.stakeApy.toString(),
                distributionPerSecond: contractResult.stkAaveData.distributionPerSecond.toString(),
                distributionEnd: contractResult.stkAaveData.distributionEnd.toString(),
            },
            bpt: {
                stakeTokenTotalSupply: contractResult.stkBptData.stakedTokenTotalSupply.toString(),
                stakeTokenTotalRedeemableAmount: contractResult.stkAaveData.stakedTokenTotalRedeemableAmount.toString(),
                stakeCooldownSeconds: contractResult.stkBptData.stakeCooldownSeconds.toNumber(),
                stakeUnstakeWindow: contractResult.stkBptData.stakeUnstakeWindow.toNumber(),
                stakeTokenPriceEth: contractResult.stkBptData.stakedTokenPriceEth.toString(),
                rewardTokenPriceEth: contractResult.stkBptData.rewardTokenPriceEth.toString(),
                stakeApy: contractResult.stkBptData.stakeApy.toString(),
                distributionPerSecond: contractResult.stkBptData.distributionPerSecond.toString(),
                distributionEnd: contractResult.stkBptData.distributionEnd.toString(),
            },
            ethPriceUsd: contractResult.ethPrice.toString(),
        };
    }
}
__decorate([
    StakeUiDataProviderValidator,
    __param(0, isEthAddress('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UiStakeDataProvider.prototype, "getUserStakeUIData", null);
__decorate([
    StakeUiDataProviderValidator,
    __param(0, isEthAddress('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UiStakeDataProvider.prototype, "getUserStakeUIDataHumanized", null);
//# sourceMappingURL=index.js.map