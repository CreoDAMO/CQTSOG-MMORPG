"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhoService = void 0;
const utils_1 = require("ethers/lib/utils");
const IUiGhoDataProvider__factory_1 = require("./typechain/IUiGhoDataProvider__factory");
// Wrapper service for fetching gho reserve, discount, facilitator, and user data for UI purposes
class GhoService {
    constructor({ provider, uiGhoDataProviderAddress, }) {
        if (!(0, utils_1.isAddress)(uiGhoDataProviderAddress)) {
            throw new Error('UiGhoDataProvider contract address is not valid');
        }
        this.ghoDataProviderService = IUiGhoDataProvider__factory_1.IUiGhoDataProvider__factory.connect(uiGhoDataProviderAddress, provider);
    }
    /**
     * Fetches Gho reserve, discount, facilitator data
     * @returns - instance of GhoReserveData with reserve, discount, facilitator data
     */
    async getGhoReserveData() {
        const ghoReserveData = await this.ghoDataProviderService.getGhoReserveData();
        return {
            ghoBaseVariableBorrowRate: ghoReserveData.ghoBaseVariableBorrowRate.toString(),
            ghoDiscountedPerToken: ghoReserveData.ghoDiscountedPerToken.toString(),
            ghoDiscountRate: ghoReserveData.ghoDiscountRate.toString(),
            aaveFacilitatorBucketMaxCapacity: ghoReserveData.aaveFacilitatorBucketMaxCapacity.toString(),
            aaveFacilitatorBucketLevel: ghoReserveData.aaveFacilitatorBucketLevel.toString(),
            ghoMinDebtTokenBalanceForDiscount: ghoReserveData.ghoMinDebtTokenBalanceForDiscount.toString(),
            ghoMinDiscountTokenBalanceForDiscount: ghoReserveData.ghoMinDiscountTokenBalanceForDiscount.toString(),
            ghoCurrentBorrowIndex: ghoReserveData.ghoCurrentBorrowIndex.toString(),
            ghoReserveLastUpdateTimestamp: ghoReserveData.ghoReserveLastUpdateTimestamp.toString(),
        };
    }
    /**
     * Fetches Gho user data for UI display
     * @param userAddress - Address of user to fetch ghoDiscountRate, ghoDiscountTokenBalance, and gho balance indeces
     * @returns - instance of GhoUserData
     */
    async getGhoUserData(userAddress) {
        if (!(0, utils_1.isAddress)(userAddress)) {
            throw new Error('user address is not valid');
        }
        const ghoUserData = await this.ghoDataProviderService.getGhoUserData(userAddress);
        return {
            userGhoDiscountPercent: ghoUserData.userGhoDiscountPercent.toString(),
            userDiscountTokenBalance: ghoUserData.userDiscountTokenBalance.toString(),
            userGhoScaledBorrowBalance: ghoUserData.userGhoScaledBorrowBalance.toString(),
            userPreviousGhoBorrowIndex: ghoUserData.userPreviousGhoBorrowIndex.toString(),
        };
    }
}
exports.GhoService = GhoService;
//# sourceMappingURL=GhoService.js.map