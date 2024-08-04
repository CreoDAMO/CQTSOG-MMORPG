import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish, BytesLike } from 'ethers';
import { tEthereumAddress, InterestRate, PermitSignature } from '../commons/types';
import { IMigrationHelper } from '../v3-migration-contract/typechain/IMigrationHelper';
export declare type LPSupplyParamsType = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    amount: string;
    onBehalfOf?: tEthereumAddress;
    referralCode?: string;
    useOptimizedPath?: boolean;
    encodedTxData?: string;
};
export declare type LPSignedSupplyParamsType = LPSupplyParamsType & {
    signature: string;
    deadline: string;
};
export declare type LPWithdrawParamsType = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    amount: string;
    onBehalfOf?: tEthereumAddress;
    aTokenAddress?: tEthereumAddress;
    useOptimizedPath?: boolean;
};
export declare type LPBorrowParamsType = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    amount: string;
    interestRateMode: InterestRate;
    debtTokenAddress?: tEthereumAddress;
    onBehalfOf?: tEthereumAddress;
    referralCode?: string;
    useOptimizedPath?: boolean;
    encodedTxData?: string;
};
export declare type LPRepayParamsType = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    amount: string;
    interestRateMode: InterestRate;
    onBehalfOf?: tEthereumAddress;
    useOptimizedPath?: boolean;
    encodedTxData?: string;
};
export declare type LPSignedRepayParamsType = LPRepayParamsType & {
    signature: string;
    deadline: string;
};
export declare type LPSwapBorrowRateMode = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    interestRateMode: InterestRate;
    useOptimizedPath?: boolean;
};
export declare type LPSetUsageAsCollateral = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    usageAsCollateral: boolean;
    useOptimizedPath?: boolean;
};
export declare type LPLiquidationCall = {
    liquidator: tEthereumAddress;
    liquidatedUser: tEthereumAddress;
    debtReserve: tEthereumAddress;
    collateralReserve: tEthereumAddress;
    purchaseAmount: string;
    getAToken?: boolean;
    liquidateAll?: boolean;
    useOptimizedPath?: boolean;
};
export declare type LPSwapCollateral = {
    user: tEthereumAddress;
    flash?: boolean;
    fromAsset: tEthereumAddress;
    fromAToken: tEthereumAddress;
    toAsset: tEthereumAddress;
    fromAmount: string;
    minToAmount: string;
    permitSignature?: PermitSignature;
    swapAll: boolean;
    referralCode?: string;
    augustus: tEthereumAddress;
    swapCallData: BytesLike;
};
export declare type LPParaswapRepayWithCollateral = {
    user: tEthereumAddress;
    fromAsset: tEthereumAddress;
    fromAToken: tEthereumAddress;
    assetToRepay: tEthereumAddress;
    repayWithAmount: string;
    repayAmount: string;
    permitSignature?: PermitSignature;
    repayAllDebt?: boolean;
    rateMode: InterestRate;
    referralCode?: string;
    flash?: boolean;
    swapAndRepayCallData: BytesLike;
    augustus: tEthereumAddress;
};
export declare type LPFlashLoan = {
    user: tEthereumAddress;
    receiver: tEthereumAddress;
    assets: tEthereumAddress[];
    amounts: string[];
    modes: InterestRate[];
    onBehalfOf?: tEthereumAddress;
    referralCode?: string;
};
export declare type LPFlashLiquidation = {
    user: tEthereumAddress;
    collateralAsset: tEthereumAddress;
    borrowedAsset: tEthereumAddress;
    debtTokenCover: string;
    liquidateAll: boolean;
    initiator: tEthereumAddress;
    useEthPath?: boolean;
};
export declare type LPSupplyWithPermitType = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    onBehalfOf?: tEthereumAddress;
    amount: string;
    signature: SignatureLike;
    referralCode?: string;
    useOptimizedPath?: boolean;
    deadline: string;
};
export declare type LPRepayWithPermitParamsType = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    amount: string;
    interestRateMode: InterestRate;
    onBehalfOf?: tEthereumAddress;
    signature: SignatureLike;
    useOptimizedPath?: boolean;
    deadline: string;
    encodedTxData?: string;
};
export declare type LPSignERC20ApprovalType = {
    user: tEthereumAddress;
    reserve: tEthereumAddress;
    amount: string;
    deadline: string;
};
export declare type LPSetUserEModeType = {
    user: string;
    categoryId: number;
};
export declare type LPRepayWithATokensType = {
    user: string;
    reserve: string;
    amount: string;
    rateMode: InterestRate;
    useOptimizedPath?: boolean;
    encodedTxData?: string;
};
export declare type LPReserveData = {
    configuration: [BigNumber] & {
        data: BigNumber;
    };
    liquidityIndex: BigNumber;
    currentLiquidityRate: BigNumber;
    variableBorrowIndex: BigNumber;
    currentVariableBorrowRate: BigNumber;
    currentStableBorrowRate: BigNumber;
    lastUpdateTimestamp: number;
    id: number;
    aTokenAddress: string;
    stableDebtTokenAddress: string;
    variableDebtTokenAddress: string;
    interestRateStrategyAddress: string;
    accruedToTreasury: BigNumber;
    unbacked: BigNumber;
    isolationModeTotalDebt: BigNumber;
};
export declare type BorrowedPositionType = {
    address: string;
    amount: string;
    rateMode: number;
};
export declare type LPV3MigrationParamsType = {
    migrator: string;
    borrowedAssets: string[];
    borrowedAmounts: BigNumberish[];
    interestRatesModes: number[];
    user: string;
    suppliedPositions: string[];
    borrowedPositions: BorrowedPositionType[];
    permits: IMigrationHelper.PermitInputStruct[];
};
//# sourceMappingURL=lendingPoolTypes.d.ts.map