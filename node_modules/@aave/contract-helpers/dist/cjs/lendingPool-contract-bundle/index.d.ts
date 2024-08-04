import { providers, PopulatedTransaction } from 'ethers';
import BaseService from '../commons/BaseService';
import { BorrowTxBuilder, LendingPoolMarketConfig, RepayTxBuilder, tEthereumAddress } from '../commons/types';
import { ApproveType, IERC20ServiceInterface, TokenOwner } from '../erc20-contract';
import { LPDepositParamsType } from '../lendingPool-contract/lendingPoolTypes';
import { ILendingPool, ILendingPoolInterface } from '../lendingPool-contract/typechain/ILendingPool';
import { SynthetixInterface } from '../synthetix-contract';
import { WETHGatewayInterface } from '../wethgateway-contract';
export declare type DepositTxBuilder = {
    generateTxData: ({ user, reserve, amount, onBehalfOf, referralCode, }: LPDepositParamsType) => PopulatedTransaction;
    getApprovedAmount: ({ user, token }: TokenOwner) => Promise<ApproveType>;
};
export interface LendingPoolBundleInterface {
    depositTxBuilder: DepositTxBuilder;
    borrowTxBuilder: Pick<BorrowTxBuilder, 'generateTxData'>;
    repayTxBuilder: Pick<RepayTxBuilder, 'generateTxData'>;
}
export declare class LendingPoolBundle extends BaseService<ILendingPool> implements LendingPoolBundleInterface {
    readonly erc20Service: IERC20ServiceInterface;
    readonly lendingPoolAddress: tEthereumAddress;
    readonly synthetixService: SynthetixInterface;
    readonly wethGatewayService: WETHGatewayInterface;
    readonly contractInterface: ILendingPoolInterface;
    readonly wethGatewayAddress: tEthereumAddress;
    depositTxBuilder: DepositTxBuilder;
    borrowTxBuilder: Pick<BorrowTxBuilder, 'generateTxData'>;
    repayTxBuilder: Pick<RepayTxBuilder, 'generateTxData'>;
    constructor(provider: providers.Provider, lendingPoolConfig?: LendingPoolMarketConfig);
}
//# sourceMappingURL=index.d.ts.map