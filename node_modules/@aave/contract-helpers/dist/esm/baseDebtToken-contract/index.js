import { __decorate, __metadata, __param } from "tslib";
import { BigNumber, ethers } from 'ethers';
import BaseService from '../commons/BaseService';
import { eEthereumTxType, ProtocolAction, } from '../commons/types';
import { gasLimitRecommendations, valueToWei } from '../commons/utils';
import { DebtTokenValidator } from '../commons/validators/methodValidators';
import { isEthAddress, isPositiveAmount, } from '../commons/validators/paramValidators';
import { IDebtTokenBase__factory } from './typechain/IDebtTokenBase__factory';
export class BaseDebtToken extends BaseService {
    constructor(provider, erc20Service) {
        super(provider, IDebtTokenBase__factory);
        this.erc20Service = erc20Service;
        this.debtTokenInterface = IDebtTokenBase__factory.createInterface();
    }
    approveDelegation({ user, delegatee, debtTokenAddress, amount }) {
        const debtTokenContract = this.getContractInstance(debtTokenAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => debtTokenContract.populateTransaction.approveDelegation(delegatee, amount),
            from: user,
        });
        return {
            tx: txCallback,
            txType: eEthereumTxType.ERC20_APPROVAL,
            gas: this.generateTxPriceEstimation([], txCallback),
        };
    }
    async approvedDelegationAmount({ user, delegatee, debtTokenAddress, }) {
        const debtTokenContract = this.getContractInstance(debtTokenAddress);
        const allowance = await debtTokenContract.borrowAllowance(user, delegatee);
        const decimals = await this.erc20Service.decimalsOf(debtTokenAddress);
        return Number(ethers.utils.formatUnits(allowance, decimals));
    }
    generateApproveDelegationTxData({ user, delegatee, debtTokenAddress, amount }) {
        const txData = this.debtTokenInterface.encodeFunctionData('approveDelegation', [delegatee, amount]);
        const approveDelegationTx = {
            data: txData,
            to: debtTokenAddress,
            from: user,
            gasLimit: BigNumber.from(gasLimitRecommendations[ProtocolAction.creditDelegationApproval]
                .recommended),
        };
        return approveDelegationTx;
    }
    async isDelegationApproved({ debtTokenAddress, allowanceGiver, allowanceReceiver, amount, nativeDecimals, }) {
        const decimals = await this.erc20Service.decimalsOf(debtTokenAddress);
        const debtTokenContract = this.getContractInstance(debtTokenAddress);
        const delegatedAllowance = await debtTokenContract.borrowAllowance(allowanceGiver, allowanceReceiver);
        const amountBNWithDecimals = nativeDecimals
            ? BigNumber.from(amount)
            : BigNumber.from(valueToWei(amount, decimals));
        return delegatedAllowance.gte(amountBNWithDecimals);
    }
}
__decorate([
    DebtTokenValidator,
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('delegatee')),
    __param(0, isEthAddress('debtTokenAddress')),
    __param(0, isPositiveAmount('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], BaseDebtToken.prototype, "approveDelegation", null);
__decorate([
    DebtTokenValidator,
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('delegatee')),
    __param(0, isEthAddress('debtTokenAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDebtToken.prototype, "approvedDelegationAmount", null);
__decorate([
    DebtTokenValidator,
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('delegatee')),
    __param(0, isEthAddress('debtTokenAddress')),
    __param(0, isPositiveAmount('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], BaseDebtToken.prototype, "generateApproveDelegationTxData", null);
__decorate([
    DebtTokenValidator,
    __param(0, isEthAddress('debtTokenAddress')),
    __param(0, isEthAddress('allowanceGiver')),
    __param(0, isEthAddress('allowanceReceiver')),
    __param(0, isPositiveAmount('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDebtToken.prototype, "isDelegationApproved", null);
//# sourceMappingURL=index.js.map