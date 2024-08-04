export interface GhoReserveData {
    ghoBaseVariableBorrowRate: string;
    ghoReserveLastUpdateTimestamp: string;
    ghoDiscountedPerToken: string;
    ghoDiscountRate: string;
    ghoMinDebtTokenBalanceForDiscount: string;
    ghoMinDiscountTokenBalanceForDiscount: string;
    ghoCurrentBorrowIndex: string;
    aaveFacilitatorBucketLevel: string;
    aaveFacilitatorBucketMaxCapacity: string;
}
export interface GhoUserData {
    userGhoDiscountPercent: string;
    userDiscountTokenBalance: string;
    userPreviousGhoBorrowIndex: string;
    userGhoScaledBorrowBalance: string;
}
export interface FormattedGhoReserveData {
    aaveFacilitatorRemainingCapacity: number;
    aaveFacilitatorMintedPercent: number;
    aaveFacilitatorBucketLevel: number;
    aaveFacilitatorBucketMaxCapacity: number;
    ghoBorrowAPYWithMaxDiscount: number;
    ghoBaseVariableBorrowRate: number;
    ghoVariableBorrowAPY: number;
    ghoDiscountedPerToken: number;
    ghoDiscountRate: number;
    ghoMinDebtTokenBalanceForDiscount: number;
    ghoMinDiscountTokenBalanceForDiscount: number;
}
export interface FormattedGhoUserData {
    userGhoDiscountPercent: number;
    userDiscountTokenBalance: number;
    userGhoBorrowBalance: number;
    userDiscountedGhoInterest: number;
    userGhoAvailableToBorrowAtDiscount: number;
}
export declare function formatGhoReserveData({ ghoReserveData, }: {
    ghoReserveData: GhoReserveData;
}): FormattedGhoReserveData;
export declare function formatGhoUserData({ ghoReserveData, ghoUserData, currentTimestamp, }: {
    ghoReserveData: GhoReserveData;
    ghoUserData: GhoUserData;
    currentTimestamp: number;
}): FormattedGhoUserData;
interface FormattedUserSummarySubset {
    totalBorrowsUSD: string;
    totalBorrowsMarketReferenceCurrency: string;
    netWorthUSD: string;
    availableBorrowsMarketReferenceCurrency: string;
    availableBorrowsUSD: string;
    healthFactor: string;
    currentLiquidationThreshold: string;
    totalCollateralMarketReferenceCurrency: string;
}
export declare function formatUserSummaryWithDiscount({ userGhoDiscountedInterest, user, marketReferenceCurrencyPriceUSD, }: {
    user: FormattedUserSummarySubset;
    userGhoDiscountedInterest: number;
    marketReferenceCurrencyPriceUSD: number;
}): FormattedUserSummarySubset;
export {};
//# sourceMappingURL=index.d.ts.map