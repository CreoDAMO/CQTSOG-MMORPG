import { __decorate, __metadata, __param } from "tslib";
import BigNumber from 'bignumber.js';
import { constants, utils, BigNumber as BigNumberEthers, } from 'ethers';
import { BaseDebtToken, } from '../baseDebtToken-contract';
import BaseService from '../commons/BaseService';
import { eEthereumTxType, InterestRate, ProtocolAction, } from '../commons/types';
import { gasLimitRecommendations } from '../commons/utils';
import { V3MigratorValidator } from '../commons/validators/methodValidators';
import { isEthAddress } from '../commons/validators/paramValidators';
import { ERC20Service } from '../erc20-contract';
import { IMigrationHelper__factory } from './typechain/IMigrationHelper__factory';
export class V3MigrationHelperService extends BaseService {
    constructor(provider, MIGRATOR_ADDRESS, pool) {
        super(provider, IMigrationHelper__factory);
        this.MIGRATOR_ADDRESS = MIGRATOR_ADDRESS;
        this.erc20Service = new ERC20Service(provider);
        this.baseDebtTokenService = new BaseDebtToken(provider, this.erc20Service);
        this.pool = pool;
        this.contractInterface = IMigrationHelper__factory.createInterface();
        this.migrationTxBuilder = {
            generateApprovalsTxs: async ({ supplyAssets, user, creditDelegationApprovals, }) => {
                const supplyApprovalTxs = await Promise.all(supplyAssets.map(async ({ amount, aToken }) => {
                    const isApproved = await this.erc20Service.isApproved({
                        amount,
                        spender: this.MIGRATOR_ADDRESS,
                        token: aToken,
                        user,
                        nativeDecimals: true,
                    });
                    if (isApproved) {
                        return undefined;
                    }
                    const tx = this.erc20Service.approveTxData({
                        user,
                        token: aToken,
                        spender: this.MIGRATOR_ADDRESS,
                        amount,
                    });
                    return {
                        amount,
                        spender: this.MIGRATOR_ADDRESS,
                        token: aToken,
                        user,
                        tx,
                    };
                }));
                const borrowCreditDelegationApprovalTxs = await Promise.all(creditDelegationApprovals.map(async ({ amount, debtTokenAddress }) => {
                    const isApproved = await this.baseDebtTokenService.isDelegationApproved({
                        debtTokenAddress,
                        allowanceGiver: user,
                        allowanceReceiver: this.MIGRATOR_ADDRESS,
                        amount,
                        nativeDecimals: true,
                    });
                    if (isApproved) {
                        return undefined;
                    }
                    const tx = this.baseDebtTokenService.generateApproveDelegationTxData({
                        user,
                        delegatee: this.MIGRATOR_ADDRESS,
                        debtTokenAddress,
                        amount,
                    });
                    return {
                        tx,
                        amount,
                        delegatee: this.MIGRATOR_ADDRESS,
                        debtTokenAddress,
                        user,
                    };
                }));
                return {
                    supplyApprovalTxs: supplyApprovalTxs.filter((elem) => Boolean(elem)),
                    borrowCreditDelegationApprovalTxs: borrowCreditDelegationApprovalTxs.filter((elem) => Boolean(elem)),
                };
            },
            generateTxData: ({ supplyAssets, user, repayAssets, signedSupplyPermits, signedCreditDelegationPermits, }) => {
                const actionTx = {};
                let permits = [];
                let creditDelegationPermits = [];
                if (signedSupplyPermits && signedSupplyPermits.length > 0) {
                    permits = this.splitSignedPermits(signedSupplyPermits);
                }
                if (signedCreditDelegationPermits &&
                    signedCreditDelegationPermits.length > 0) {
                    creditDelegationPermits = this.splitSignedCreditDelegationPermits(signedCreditDelegationPermits);
                }
                const assetsToMigrate = supplyAssets.map(supplyAsset => supplyAsset.underlyingAsset);
                const assetsToRepay = repayAssets.map(repayAsset => {
                    return {
                        asset: repayAsset.underlyingAsset,
                        rateMode: repayAsset.rateMode === InterestRate.Stable ? 1 : 2,
                    };
                });
                const txData = this.contractInterface.encodeFunctionData('migrate', [
                    assetsToMigrate,
                    assetsToRepay,
                    permits,
                    creditDelegationPermits,
                ]);
                actionTx.to = this.MIGRATOR_ADDRESS;
                actionTx.from = user;
                actionTx.data = txData;
                actionTx.gasLimit = BigNumberEthers.from(gasLimitRecommendations[ProtocolAction.migrateV3].recommended);
                return actionTx;
            },
        };
    }
    async getMigrationSupply({ asset, amount }) {
        const migrator = this.getContractInstance(this.MIGRATOR_ADDRESS);
        return migrator.getMigrationSupply(asset, amount);
    }
    async migrate({ supplyAssets, user, repayAssets, signedSupplyPermits, signedCreditDelegationPermits, creditDelegationApprovals, }) {
        let txs = [];
        let permits = [];
        if (signedSupplyPermits && signedSupplyPermits.length > 0) {
            permits = this.splitSignedPermits(signedSupplyPermits);
        }
        else {
            txs = await this.approveSupplyAssets(user, supplyAssets);
        }
        let creditDelegationPermits = [];
        if (signedCreditDelegationPermits &&
            signedCreditDelegationPermits.length > 0) {
            creditDelegationPermits = this.splitSignedCreditDelegationPermits(signedCreditDelegationPermits);
        }
        else {
            const delegationApprovals = await this.approveDelegationTokens(user, creditDelegationApprovals);
            txs.push(...delegationApprovals);
        }
        const assetsToMigrate = supplyAssets.map(supplyAsset => supplyAsset.underlyingAsset);
        const assetsToRepay = repayAssets.map(repayAsset => {
            return {
                asset: repayAsset.underlyingAsset,
                rateMode: repayAsset.rateMode === InterestRate.Stable ? 1 : 2,
            };
        });
        const migrator = this.getContractInstance(this.MIGRATOR_ADDRESS);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => migrator.populateTransaction.migrate(assetsToMigrate, assetsToRepay, permits, creditDelegationPermits),
            from: user,
        });
        txs.push({
            tx: txCallback,
            txType: eEthereumTxType.V3_MIGRATION_ACTION,
            gas: this.generateTxPriceEstimation(permits.length > 0 ? [] : txs, txCallback, ProtocolAction.migrateV3),
        });
        return txs;
    }
    async approveDelegationTokens(user, assets) {
        const assetsApproved = await Promise.all(assets.map(async ({ amount, debtTokenAddress }) => {
            return this.baseDebtTokenService.isDelegationApproved({
                debtTokenAddress,
                allowanceGiver: user,
                allowanceReceiver: this.MIGRATOR_ADDRESS,
                amount,
                nativeDecimals: true,
            });
        }));
        return assetsApproved
            .map((approved, index) => {
            if (approved) {
                return;
            }
            const asset = assets[index];
            const originalAmount = new BigNumber(asset.amount);
            const tenPercent = originalAmount.dividedBy(10);
            const amountPlusBuffer = originalAmount.plus(tenPercent).toFixed(0);
            return this.baseDebtTokenService.approveDelegation({
                user,
                delegatee: this.MIGRATOR_ADDRESS,
                debtTokenAddress: asset.debtTokenAddress,
                amount: amountPlusBuffer,
            });
        })
            .filter((tx) => Boolean(tx));
    }
    async approveSupplyAssets(user, assets) {
        const assetsApproved = await Promise.all(assets.map(async ({ amount, aToken }) => {
            return this.erc20Service.isApproved({
                amount,
                spender: this.MIGRATOR_ADDRESS,
                token: aToken,
                user,
                nativeDecimals: true,
            });
        }));
        return assetsApproved
            .map((approved, index) => {
            if (approved) {
                return;
            }
            const asset = assets[index];
            return this.erc20Service.approve({
                user,
                token: asset.aToken,
                spender: this.MIGRATOR_ADDRESS,
                amount: constants.MaxUint256.toString(),
            });
        })
            .filter((tx) => Boolean(tx));
    }
    splitSignedPermits(signedPermits) {
        return signedPermits.map((permit) => {
            const { aToken, deadline, value, signedPermit } = permit;
            const signature = utils.splitSignature(signedPermit);
            return {
                aToken,
                deadline,
                value,
                v: signature.v,
                r: signature.r,
                s: signature.s,
            };
        });
    }
    splitSignedCreditDelegationPermits(signedPermits) {
        return signedPermits.map((permit) => {
            const { debtToken, deadline, value, signedPermit } = permit;
            const signature = utils.splitSignature(signedPermit);
            return {
                debtToken,
                deadline,
                value,
                v: signature.v,
                r: signature.r,
                s: signature.s,
            };
        });
    }
}
__decorate([
    V3MigratorValidator,
    __param(0, isEthAddress('asset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], V3MigrationHelperService.prototype, "getMigrationSupply", null);
__decorate([
    V3MigratorValidator,
    __param(0, isEthAddress('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], V3MigrationHelperService.prototype, "migrate", null);
//# sourceMappingURL=index.js.map