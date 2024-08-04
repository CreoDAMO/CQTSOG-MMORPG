import { normalize } from '../../bignumber';
import { SECONDS_PER_YEAR } from '../../constants';
import { getCompoundedBalance } from '../../pool-math';
import { rayMul } from '../../ray.math';
import { calculateCompoundedRate } from '../compounded-interest';
export function formatGhoReserveData({ ghoReserveData, }) {
    const formattedGhoDiscountedPerToken = Number(normalize(ghoReserveData.ghoDiscountedPerToken, 18));
    const formattedFacilitatorBucketLevel = Number(normalize(ghoReserveData.aaveFacilitatorBucketLevel, 18));
    const formattedFacilitatorBucketMaxCapacity = Number(normalize(ghoReserveData.aaveFacilitatorBucketMaxCapacity, 18));
    const formattedVariableBorrowAPY = calculateCompoundedRate({
        rate: ghoReserveData.ghoBaseVariableBorrowRate,
        duration: SECONDS_PER_YEAR,
    })
        .shiftedBy(-27)
        .toNumber();
    const formattedGhoDiscountRate = Number(normalize(ghoReserveData.ghoDiscountRate, 4));
    return {
        ghoBaseVariableBorrowRate: Number(normalize(ghoReserveData.ghoBaseVariableBorrowRate, 27)),
        ghoDiscountedPerToken: formattedGhoDiscountedPerToken,
        ghoDiscountRate: formattedGhoDiscountRate,
        aaveFacilitatorBucketLevel: formattedFacilitatorBucketLevel,
        aaveFacilitatorBucketMaxCapacity: formattedFacilitatorBucketMaxCapacity,
        ghoMinDebtTokenBalanceForDiscount: Number(normalize(ghoReserveData.ghoMinDebtTokenBalanceForDiscount, 18)),
        ghoMinDiscountTokenBalanceForDiscount: Number(normalize(ghoReserveData.ghoMinDiscountTokenBalanceForDiscount, 18)),
        ghoVariableBorrowAPY: formattedVariableBorrowAPY,
        aaveFacilitatorRemainingCapacity: formattedFacilitatorBucketMaxCapacity - formattedFacilitatorBucketLevel,
        aaveFacilitatorMintedPercent: formattedFacilitatorBucketMaxCapacity === 0
            ? 0
            : formattedFacilitatorBucketLevel /
                formattedFacilitatorBucketMaxCapacity,
        ghoBorrowAPYWithMaxDiscount: formattedVariableBorrowAPY * (1 - formattedGhoDiscountRate),
    };
}
export function formatGhoUserData({ ghoReserveData, ghoUserData, currentTimestamp, }) {
    const formattedUserDiscountTokenBalance = Number(normalize(ghoUserData.userDiscountTokenBalance, 18));
    const formattedRequiredTokenBalanceForDiscount = Number(normalize(ghoReserveData.ghoMinDiscountTokenBalanceForDiscount, 18));
    let userGhoAvailableToBorrowAtDiscount = Number(normalize(ghoReserveData.ghoDiscountedPerToken, 18)) *
        formattedUserDiscountTokenBalance;
    if (formattedUserDiscountTokenBalance < formattedRequiredTokenBalanceForDiscount) {
        userGhoAvailableToBorrowAtDiscount = 0;
    }
    const userBalancePreDiscount = getCompoundedBalance({
        principalBalance: ghoUserData.userGhoScaledBorrowBalance,
        reserveIndex: ghoReserveData.ghoCurrentBorrowIndex,
        reserveRate: ghoReserveData.ghoBaseVariableBorrowRate,
        lastUpdateTimestamp: Number(ghoReserveData.ghoReserveLastUpdateTimestamp),
        currentTimestamp,
    });
    const accruedInterest = userBalancePreDiscount.minus(rayMul(ghoUserData.userGhoScaledBorrowBalance, ghoUserData.userPreviousGhoBorrowIndex));
    const discount = accruedInterest.multipliedBy(1 - Number(normalize(ghoUserData.userGhoDiscountPercent, 4)));
    const userBorrowBalance = userBalancePreDiscount.minus(discount);
    return {
        userGhoDiscountPercent: Number(normalize(ghoUserData.userGhoDiscountPercent, 4)),
        userDiscountTokenBalance: formattedUserDiscountTokenBalance,
        userGhoBorrowBalance: Number(normalize(userBorrowBalance, 18)),
        userDiscountedGhoInterest: Number(normalize(discount, 18)),
        userGhoAvailableToBorrowAtDiscount,
    };
}
export function formatUserSummaryWithDiscount({ userGhoDiscountedInterest, user, marketReferenceCurrencyPriceUSD, }) {
    const totalBorrowsAfterDiscountUSD = Number(user.totalBorrowsUSD) - userGhoDiscountedInterest;
    const availableBorrowsAfterDiscountUSD = Number(user.availableBorrowsUSD) + userGhoDiscountedInterest;
    const totalBorrowsMarketReferenceCurrency = Number(user.totalBorrowsMarketReferenceCurrency) -
        userGhoDiscountedInterest / marketReferenceCurrencyPriceUSD;
    const healthFactor = totalBorrowsMarketReferenceCurrency === 0
        ? '-1'
        : (Number(user.totalCollateralMarketReferenceCurrency) *
            Number(user.currentLiquidationThreshold)) /
            totalBorrowsMarketReferenceCurrency;
    return Object.assign(Object.assign({}, user), { totalBorrowsMarketReferenceCurrency: totalBorrowsMarketReferenceCurrency.toString(), totalBorrowsUSD: totalBorrowsAfterDiscountUSD.toString(), netWorthUSD: (Number(user.netWorthUSD) + userGhoDiscountedInterest).toString(), availableBorrowsUSD: availableBorrowsAfterDiscountUSD.toString(), availableBorrowsMarketReferenceCurrency: (availableBorrowsAfterDiscountUSD / marketReferenceCurrencyPriceUSD).toString(), healthFactor: healthFactor.toString() });
}
//# sourceMappingURL=index.js.map