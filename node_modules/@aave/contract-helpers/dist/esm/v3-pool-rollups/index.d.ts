import { PopulatedTransaction, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { EthereumTransactionTypeExtended } from '../commons/types';
import { LPSupplyParamsType } from '../v3-pool-contract/lendingPoolTypes';
import { IPoolInterface } from '../v3-pool-contract/typechain/IPool';
import { LPBorrowParamsType, LPLiquidationCall, LPRepayParamsType, LPRepayWithATokensType, LPSetUsageAsCollateral, LPSupplyWithPermitType, LPSwapBorrowRateMode, LPWithdrawParamsType, LPRepayWithPermitParamsType } from './poolTypes';
import { IL2Pool, IL2PoolInterface } from './typechain/IL2Pool';
import { L2Encoder, L2EncoderInterface } from './typechain/L2Encoder';
export interface L2PoolInterface {
    encoderContract: L2Encoder;
    supply: (args: LPSupplyParamsType, txs: EthereumTransactionTypeExtended[]) => Promise<EthereumTransactionTypeExtended[]>;
    generateSupplyTxData: (args: LPSupplyParamsType) => PopulatedTransaction;
    generateBorrowTxData: (args: LPBorrowParamsType) => PopulatedTransaction;
    generateEncodedSupplyTxData: (args: {
        encodedTxData: string;
        user: string;
    }) => PopulatedTransaction;
    generateEncodedBorrowTxData: (args: {
        encodedTxData: string;
        user: string;
    }) => PopulatedTransaction;
    generateSupplyWithPermitTxData: (args: LPSupplyWithPermitType) => PopulatedTransaction;
    generateEncodedSupplyWithPermitTxData: (args: {
        encodedTxData: string;
        user: string;
        signature: string;
    }) => PopulatedTransaction;
    generateEncodedRepayTxData: (args: {
        encodedTxData: string;
        user: string;
    }) => PopulatedTransaction;
    generateEncodedRepayWithPermitTxData: (args: {
        encodedTxData: string;
        user: string;
        signature: string;
    }) => PopulatedTransaction;
    generateEncodedRepayWithATokensTxData: (args: {
        encodedTxData: string;
        user: string;
    }) => PopulatedTransaction;
    supplyWithPermit: (args: LPSupplyWithPermitType, txs: EthereumTransactionTypeExtended[]) => Promise<EthereumTransactionTypeExtended[]>;
    withdraw: (args: LPWithdrawParamsType) => Promise<EthereumTransactionTypeExtended[]>;
    borrow: (args: LPBorrowParamsType) => Promise<EthereumTransactionTypeExtended[]>;
    repay: (args: LPRepayParamsType, txs: EthereumTransactionTypeExtended[]) => Promise<EthereumTransactionTypeExtended[]>;
    repayWithPermit: (args: LPRepayWithPermitParamsType, txs: EthereumTransactionTypeExtended[]) => Promise<EthereumTransactionTypeExtended[]>;
    repayWithATokens: (args: LPRepayWithATokensType, txs: EthereumTransactionTypeExtended[]) => Promise<EthereumTransactionTypeExtended[]>;
    swapBorrowRateMode: (args: LPSwapBorrowRateMode) => Promise<EthereumTransactionTypeExtended[]>;
    setUserUseReserveAsCollateral: (args: LPSetUsageAsCollateral) => Promise<EthereumTransactionTypeExtended[]>;
    liquidationCall: (args: LPLiquidationCall, txs: EthereumTransactionTypeExtended[]) => Promise<EthereumTransactionTypeExtended[]>;
    getEncoder: () => L2Encoder;
}
export declare type L2PoolConfigType = {
    l2PoolAddress?: string;
    encoderAddress?: string;
};
export declare class L2Pool extends BaseService<IL2Pool> implements L2PoolInterface {
    readonly l2PoolAddress: string;
    readonly encoderAddress: string;
    readonly l2PoolContractInstance: IL2PoolInterface;
    readonly poolContractInstance: IPoolInterface;
    encoderContract: L2Encoder;
    encoderInterface: L2EncoderInterface;
    generateSupplyTxData: (args: LPSupplyParamsType) => PopulatedTransaction;
    generateBorrowTxData: (args: LPBorrowParamsType) => PopulatedTransaction;
    generateSupplyWithPermitTxData: (args: LPSupplyWithPermitType) => PopulatedTransaction;
    generateEncodedSupplyTxData: (args: {
        encodedTxData: string;
        user: string;
    }) => PopulatedTransaction;
    generateEncodedBorrowTxData: (args: {
        encodedTxData: string;
        user: string;
    }) => PopulatedTransaction;
    generateEncodedSupplyWithPermitTxData: (args: {
        encodedTxData: string;
        user: string;
        signature: string;
    }) => PopulatedTransaction;
    generateEncodedRepayTxData: (args: {
        encodedTxData: string;
        user: string;
    }) => PopulatedTransaction;
    generateEncodedRepayWithPermitTxData: (args: {
        encodedTxData: string;
        user: string;
        signature: string;
    }) => PopulatedTransaction;
    generateEncodedRepayWithATokensTxData: (args: {
        encodedTxData: string;
        user: string;
    }) => PopulatedTransaction;
    constructor(provider: providers.Provider, l2PoolConfig?: L2PoolConfigType);
    supply({ user, reserve, amount, referralCode }: LPSupplyParamsType, txs: EthereumTransactionTypeExtended[]): Promise<EthereumTransactionTypeExtended[]>;
    supplyWithPermit({ user, reserve, amount, deadline, referralCode, permitR, permitS, permitV, }: LPSupplyWithPermitType, txs: EthereumTransactionTypeExtended[]): Promise<EthereumTransactionTypeExtended[]>;
    withdraw({ user, reserve, amount, }: LPWithdrawParamsType): Promise<EthereumTransactionTypeExtended[]>;
    borrow({ user, reserve, amount, numericRateMode, referralCode, }: LPBorrowParamsType): Promise<EthereumTransactionTypeExtended[]>;
    repay({ reserve, user, amount, numericRateMode }: LPRepayParamsType, txs: EthereumTransactionTypeExtended[]): Promise<EthereumTransactionTypeExtended[]>;
    repayWithPermit({ user, reserve, amount, numericRateMode, permitR, permitS, permitV, deadline, }: LPRepayWithPermitParamsType, txs: EthereumTransactionTypeExtended[]): Promise<EthereumTransactionTypeExtended[]>;
    repayWithATokens({ reserve, user, amount, numericRateMode }: LPRepayParamsType, txs: EthereumTransactionTypeExtended[]): Promise<EthereumTransactionTypeExtended[]>;
    swapBorrowRateMode({ reserve, numericRateMode, user, }: LPSwapBorrowRateMode): Promise<EthereumTransactionTypeExtended[]>;
    setUserUseReserveAsCollateral({ reserve, usageAsCollateral, user, }: LPSetUsageAsCollateral): Promise<EthereumTransactionTypeExtended[]>;
    liquidationCall({ liquidator, liquidatedUser, debtReserve, collateralReserve, debtToCover, getAToken, }: LPLiquidationCall, txs: EthereumTransactionTypeExtended[]): Promise<EthereumTransactionTypeExtended[]>;
    getEncoder(): L2Encoder;
}
//# sourceMappingURL=index.d.ts.map