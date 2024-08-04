"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUserSummaryWithDiscount = exports.formatGhoUserData = exports.formatGhoReserveData = void 0;
const bignumber_1 = require("../../bignumber");
const constants_1 = require("../../constants");
const pool_math_1 = require("../../pool-math");
const ray_math_1 = require("../../ray.math");
const compounded_interest_1 = require("../compounded-interest");
function formatGhoReserveData({ ghoReserveData, }) {
    const formattedGhoDiscountedPerToken = Number((0, bignumber_1.normalize)(ghoReserveData.ghoDiscountedPerToken, 18));
    const formattedFacilitatorBucketLevel = Number((0, bignumber_1.normalize)(ghoReserveData.aaveFacilitatorBucketLevel, 18));
    const formattedFacilitatorBucketMaxCapacity = Number((0, bignumber_1.normalize)(ghoReserveData.aaveFacilitatorBucketMaxCapacity, 18));
    const formattedVariableBorrowAPY = (0, compounded_interest_1.calculateCompoundedRate)({
        rate: ghoReserveData.ghoBaseVariableBorrowRate,
        duration: constants_1.SECONDS_PER_YEAR,
    })
        .shiftedBy(-27)
        .toNumber();
    const formattedGhoDiscountRate = Number((0, bignumber_1.normalize)(ghoReserveData.ghoDiscountRate, 4));
    return {
        ghoBaseVariableBorrowRate: Number((0, bignumber_1.normalize)(ghoReserveData.ghoBaseVariableBorrowRate, 27)),
        ghoDiscountedPerToken: formattedGhoDiscountedPerToken,
        ghoDiscountRate: formattedGhoDiscountRate,
        aaveFacilitatorBucketLevel: formattedFacilitatorBucketLevel,
        aaveFacilitatorBucketMaxCapacity: formattedFacilitatorBucketMaxCapacity,
        ghoMinDebtTokenBalanceForDiscount: Number((0, bignumber_1.normalize)(ghoReserveData.ghoMinDebtTokenBalanceForDiscount, 18)),
        ghoMinDiscountTokenBalanceForDiscount: Number((0, bignumber_1.normalize)(ghoReserveData.ghoMinDiscountTokenBalanceForDiscount, 18)),
        ghoVariableBorrowAPY: formattedVariableBorrowAPY,
        aaveFacilitatorRemainingCapacity: formattedFacilitatorBucketMaxCapacity - formattedFacilitatorBucketLevel,
        aaveFacilitatorMintedPercent: formattedFacilitatorBucketMaxCapacity === 0
            ? 0
            : formattedFacilitatorBucketLevel /
                formattedFacilitatorBucketMaxCapacity,
        ghoBorrowAPYWithMaxDiscount: formattedVariableBorrowAPY * (1 - formattedGhoDiscountRate),
    };
}
exports.formatGhoReserveData = formatGhoReserveData;
function formatGhoUserData({ ghoReserveData, ghoUserData, currentTimestamp, }) {
    const formattedUserDiscountTokenBalance = Number((0, bignumber_1.normalize)(ghoUserData.userDiscountTokenBalance, 18));
    const formattedRequiredTokenBalanceForDiscount = Number((0, bignumber_1.normalize)(ghoReserveData.ghoMinDiscountTokenBalanceForDiscount, 18));
    let userGhoAvailableToBorrowAtDiscount = Number((0, bignumber_1.normalize)(ghoReserveData.ghoDiscountedPerToken, 18)) *
        formattedUserDiscountTokenBalance;
    if (formattedUserDiscountTokenBalance < formattedRequiredTokenBalanceForDiscount) {
        userGhoAvailableToBorrowAtDiscount = 0;
    }
    const userBalancePreDiscount = (0, pool_math_1.getCompoundedBalance)({
        principalBalance: ghoUserData.userGhoScaledBorrowBalance,
        reserveIndex: ghoReserveData.ghoCurrentBorrowIndex,
        reserveRate: ghoReserveData.ghoBaseVariableBorrowRate,
        lastUpdateTimestamp: Number(ghoReserveData.ghoReserveLastUpdateTimestamp),
        currentTimestamp,
    });
    const accruedInterest = userBalancePreDiscount.minus((0, ray_math_1.rayMul)(ghoUserData.userGhoScaledBorrowBalance, ghoUserData.userPreviousGhoBorrowIndex));
    const discount = accruedInterest.multipliedBy(1 - Number((0, bignumber_1.normalize)(ghoUserData.userGhoDiscountPercent, 4)));
    const userBorrowBalance = userBalancePreDiscount.minus(discount);
    return {
        userGhoDiscountPercent: Number((0, bignumber_1.normalize)(ghoUserData.userGhoDiscountPercent, 4)),
        userDiscountTokenBalance: formattedUserDiscountTokenBalance,
        userGhoBorrowBalance: Number((0, bignumber_1.normalize)(userBorrowBalance, 18)),
        userDiscountedGhoInterest: Number((0, bignumber_1.normalize)(discount, 18)),
        userGhoAvailableToBorrowAtDiscount,
    };
}
exports.formatGhoUserData = formatGhoUserData;
function formatUserSummaryWithDiscount({ userGhoDiscountedInterest, user, marketReferenceCurrencyPriceUSD, }) {
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
exports.formatUserSummaryWithDiscount = formatUserSummaryWithDiscount;
//# sourceMappingURL=index.js.map