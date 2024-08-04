import { PopulatedTransaction, providers, BigNumber as BigNumberEthers } from 'ethers';
import { ApproveDelegationType, BaseDebtTokenInterface } from '../baseDebtToken-contract';
import BaseService from '../commons/BaseService';
import { EthereumTransactionTypeExtended, tEthereumAddress } from '../commons/types';
import { ApproveType, ERC20Service } from '../erc20-contract';
import { Pool } from '../v3-pool-contract';
import { IMigrationHelper, IMigrationHelperInterface } from './typechain/IMigrationHelper';
import { V3MigrationType, V3GetMigrationSupplyType } from './v3MigrationTypes';
export interface V3MigrationHelperInterface {
    migrate: (params: V3MigrationType) => Promise<EthereumTransactionTypeExtended[]>;
}
interface ApproveWithTx extends ApproveType {
    tx: PopulatedTransaction;
}
interface ApproveDelegationWithTx extends ApproveDelegationType {
    tx: PopulatedTransaction;
}
interface MigrationNeededApprovals {
    supplyApprovalTxs: ApproveWithTx[];
    borrowCreditDelegationApprovalTxs: ApproveDelegationWithTx[];
}
export declare type MigrationTxBuilder = {
    generateApprovalsTxs: (params: Pick<V3MigrationType, 'supplyAssets' | 'user' | 'creditDelegationApprovals'>) => Promise<MigrationNeededApprovals>;
    generateTxData: (params: Omit<V3MigrationType, 'creditDelegationApprovals'>) => PopulatedTransaction;
};
export declare class V3MigrationHelperService extends BaseService<IMigrationHelper> implements V3MigrationHelperInterface {
    readonly baseDebtTokenService: BaseDebtTokenInterface;
    readonly provider: providers.Provider;
    readonly MIGRATOR_ADDRESS: tEthereumAddress;
    readonly erc20Service: ERC20Service;
    readonly pool: Pool;
    readonly contractInterface: IMigrationHelperInterface;
    readonly migrationTxBuilder: MigrationTxBuilder;
    constructor(provider: providers.Provider, MIGRATOR_ADDRESS: tEthereumAddress, pool: Pool);
    getMigrationSupply({ asset, amount }: V3GetMigrationSupplyType): Promise<[string, BigNumberEthers]>;
    migrate({ supplyAssets, user, repayAssets, signedSupplyPermits, signedCreditDelegationPermits, creditDelegationApprovals, }: V3MigrationType): Promise<EthereumTransactionTypeExtended[]>;
    private approveDelegationTokens;
    private approveSupplyAssets;
    private splitSignedPermits;
    private splitSignedCreditDelegationPermits;
}
export {};
//# sourceMappingURL=index.d.ts.map