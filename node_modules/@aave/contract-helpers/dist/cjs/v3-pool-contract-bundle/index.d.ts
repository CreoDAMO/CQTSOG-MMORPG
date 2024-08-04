import { PopulatedTransaction, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { BorrowTxBuilder, RepayTxBuilder, RepayWithATokensTxBuilder, tEthereumAddress } from '../commons/types';
import { ERC20_2612Interface } from '../erc20-2612';
import { ApproveType, IERC20ServiceInterface, TokenOwner } from '../erc20-contract';
import { SynthetixInterface } from '../synthetix-contract';
import { LendingPoolMarketConfigV3, PoolInterface as V3PoolInterface } from '../v3-pool-contract';
import { LPSignedSupplyParamsType, LPSupplyParamsType } from '../v3-pool-contract/lendingPoolTypes';
import { IPool, IPoolInterface } from '../v3-pool-contract/typechain/IPool';
import { L2PoolInterface } from '../v3-pool-rollups';
import { WETHGatewayInterface } from '../wethgateway-contract';
export declare type SupplyTxBuilder = {
    generateTxData: ({ user, reserve, amount, onBehalfOf, referralCode, useOptimizedPath, encodedTxData, }: LPSupplyParamsType) => PopulatedTransaction;
    generateSignedTxData: ({ user, reserve, amount, onBehalfOf, referralCode, useOptimizedPath, signature, encodedTxData, }: LPSignedSupplyParamsType) => PopulatedTransaction;
    getApprovedAmount: ({ user, token }: TokenOwner) => Promise<ApproveType>;
    encodeSupplyParams: ({ reserve, amount, referralCode, }: Pick<LPSupplyParamsType, 'reserve' | 'amount' | 'referralCode'>) => Promise<string>;
    encodeSupplyWithPermitParams: ({ reserve, amount, referralCode, signature, }: Pick<LPSignedSupplyParamsType, 'reserve' | 'amount' | 'referralCode' | 'signature' | 'deadline'>) => Promise<[string, string, string]>;
};
export interface PoolBundleInterface {
    supplyTxBuilder: SupplyTxBuilder;
}
export declare class PoolBundle extends BaseService<IPool> implements PoolBundleInterface {
    readonly erc20Service: IERC20ServiceInterface;
    readonly poolAddress: tEthereumAddress;
    readonly synthetixService: SynthetixInterface;
    readonly wethGatewayService: WETHGatewayInterface;
    readonly erc20_2612Service: ERC20_2612Interface;
    readonly l2EncoderAddress: string;
    readonly l2PoolAddress: string;
    readonly l2PoolService: L2PoolInterface;
    readonly v3PoolService: V3PoolInterface;
    readonly wethGatewayAddress: tEthereumAddress;
    readonly contractInterface: IPoolInterface;
    supplyTxBuilder: SupplyTxBuilder;
    borrowTxBuilder: BorrowTxBuilder;
    repayTxBuilder: RepayTxBuilder;
    repayWithATokensTxBuilder: RepayWithATokensTxBuilder;
    constructor(provider: providers.Provider, lendingPoolConfig?: LendingPoolMarketConfigV3);
}
//# sourceMappingURL=index.d.ts.map