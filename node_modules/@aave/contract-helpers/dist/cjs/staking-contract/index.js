"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingService = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const methodValidators_1 = require("../commons/validators/methodValidators");
const paramValidators_1 = require("../commons/validators/paramValidators");
const erc20_2612_1 = require("../erc20-2612");
const erc20_contract_1 = require("../erc20-contract");
const aave_token_v3_1 = require("../governance-v3/aave-token-v3");
const IStakedAaveV3__factory_1 = require("./typechain/IStakedAaveV3__factory");
class StakingService extends BaseService_1.default {
    constructor(provider, stakingServiceConfig) {
        super(provider, IStakedAaveV3__factory_1.StakedAaveV3__factory);
        this.erc20Service = new erc20_contract_1.ERC20Service(provider);
        this.erc20_2612Service = new erc20_2612_1.ERC20_2612Service(provider);
        this.stakingContractAddress = stakingServiceConfig.TOKEN_STAKING_ADDRESS;
    }
    async signStaking(user, amount, deadline) {
        const { getTokenData } = this.erc20Service;
        const stakingContract = this.getContractInstance(this.stakingContractAddress);
        // eslint-disable-next-line new-cap
        const stakedToken = await stakingContract.STAKED_TOKEN();
        const { decimals } = await getTokenData(stakedToken);
        const convertedAmount = (0, utils_1.valueToWei)(amount, decimals);
        const { chainId } = await this.provider.getNetwork();
        const aaveTokenV3Service = new aave_token_v3_1.AaveTokenV3Service(stakedToken, this.provider);
        const { name, version } = await aaveTokenV3Service.getEip712Domain();
        const nonce = await this.erc20_2612Service.getNonce({
            token: stakedToken,
            owner: user,
        });
        if (nonce === null) {
            return '';
        }
        const typeData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                Permit: [
                    { name: 'owner', type: 'address' },
                    { name: 'spender', type: 'address' },
                    { name: 'value', type: 'uint256' },
                    { name: 'nonce', type: 'uint256' },
                    { name: 'deadline', type: 'uint256' },
                ],
            },
            primaryType: 'Permit',
            domain: {
                name,
                version,
                chainId,
                verifyingContract: stakedToken,
            },
            message: {
                owner: user,
                spender: this.stakingContractAddress,
                value: convertedAmount,
                nonce,
                deadline,
            },
        };
        return JSON.stringify(typeData);
    }
    async stakeWithPermit(user, amount, signature, deadline) {
        const txs = [];
        const { decimalsOf } = this.erc20Service;
        const stakingContract = this.getContractInstance(this.stakingContractAddress);
        // eslint-disable-next-line new-cap
        const stakedToken = await stakingContract.STAKED_TOKEN();
        const stakedTokenDecimals = await decimalsOf(stakedToken);
        const convertedAmount = (0, utils_1.valueToWei)(amount, stakedTokenDecimals);
        const sig = ethers_1.utils.splitSignature(signature);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => stakingContract.populateTransaction.stakeWithPermit(convertedAmount, deadline, sig.v, sig.r, sig.s),
            from: user,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.STAKE_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.stakeWithPermit),
        });
        return txs;
    }
    async stake(user, amount, onBehalfOf) {
        const txs = [];
        const { decimalsOf, isApproved, approve } = this.erc20Service;
        const stakingContract = this.getContractInstance(this.stakingContractAddress);
        // eslint-disable-next-line new-cap
        const stakedToken = await stakingContract.STAKED_TOKEN();
        const stakedTokenDecimals = await decimalsOf(stakedToken);
        const convertedAmount = (0, utils_1.valueToWei)(amount, stakedTokenDecimals);
        const approved = await isApproved({
            token: stakedToken,
            user,
            spender: this.stakingContractAddress,
            amount,
        });
        if (!approved) {
            const approveTx = approve({
                user,
                token: stakedToken,
                spender: this.stakingContractAddress,
                amount: utils_1.DEFAULT_APPROVE_AMOUNT,
            });
            txs.push(approveTx);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => stakingContract.populateTransaction.stake(onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user, convertedAmount),
            from: user,
            action: types_1.ProtocolAction.stake,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.STAKE_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.stake),
        });
        return txs;
    }
    async redeem(user, amount) {
        let convertedAmount;
        const stakingContract = this.getContractInstance(this.stakingContractAddress);
        if (amount === '-1') {
            convertedAmount = ethers_1.constants.MaxUint256.toString();
        }
        else {
            const { decimalsOf } = this.erc20Service;
            // eslint-disable-next-line new-cap
            const stakedToken = await stakingContract.STAKED_TOKEN();
            const stakedTokenDecimals = await decimalsOf(stakedToken);
            convertedAmount = (0, utils_1.valueToWei)(amount, stakedTokenDecimals);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => stakingContract.populateTransaction.redeem(user, convertedAmount),
            from: user,
            gasSurplus: 20,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.STAKE_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    cooldown(user) {
        const stakingContract = this.getContractInstance(this.stakingContractAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => stakingContract.populateTransaction.cooldown(),
            from: user,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.STAKE_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async claimRewards(user, amount) {
        let convertedAmount;
        const stakingContract = this.getContractInstance(this.stakingContractAddress);
        if (amount === '-1') {
            convertedAmount = ethers_1.constants.MaxUint256.toString();
        }
        else {
            const { decimalsOf } = this.erc20Service;
            // eslint-disable-next-line new-cap
            const stakedToken = await stakingContract.REWARD_TOKEN();
            const stakedTokenDecimals = await decimalsOf(stakedToken);
            convertedAmount = (0, utils_1.valueToWei)(amount, stakedTokenDecimals);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => stakingContract.populateTransaction.claimRewards(user, convertedAmount),
            from: user,
            gasSurplus: 20,
            action: types_1.ProtocolAction.claimRewards,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.STAKE_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback, types_1.ProtocolAction.claimRewards),
            },
        ];
    }
    async claimRewardsAndStake(user, amount) {
        let convertedAmount;
        const stakingContract = this.getContractInstance(this.stakingContractAddress);
        if (amount === '-1') {
            convertedAmount = ethers_1.constants.MaxUint256.toString();
        }
        else {
            const { decimalsOf } = this.erc20Service;
            // eslint-disable-next-line new-cap
            const stakedToken = await stakingContract.STAKED_TOKEN();
            const stakedTokenDecimals = await decimalsOf(stakedToken);
            convertedAmount = (0, utils_1.valueToWei)(amount, stakedTokenDecimals);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => stakingContract.populateTransaction.claimRewardsAndStake(user, convertedAmount),
            from: user,
            gasSurplus: 20,
            action: types_1.ProtocolAction.claimRewardsAndStake,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.STAKE_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback, types_1.ProtocolAction.claimRewardsAndStake),
            },
        ];
    }
}
tslib_1.__decorate([
    methodValidators_1.SignStakingValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)()),
    tslib_1.__param(1, (0, paramValidators_1.isPositiveAmount)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StakingService.prototype, "signStaking", null);
tslib_1.__decorate([
    methodValidators_1.SignStakingValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)()),
    tslib_1.__param(1, (0, paramValidators_1.isPositiveAmount)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StakingService.prototype, "stakeWithPermit", null);
tslib_1.__decorate([
    methodValidators_1.StakingValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)()),
    tslib_1.__param(1, (0, paramValidators_1.isPositiveAmount)()),
    tslib_1.__param(2, (0, paramValidators_1.isEthAddress)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StakingService.prototype, "stake", null);
tslib_1.__decorate([
    methodValidators_1.StakingValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)()),
    tslib_1.__param(1, (0, paramValidators_1.isPositiveOrMinusOneAmount)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StakingService.prototype, "redeem", null);
tslib_1.__decorate([
    methodValidators_1.StakingValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Array)
], StakingService.prototype, "cooldown", null);
tslib_1.__decorate([
    methodValidators_1.StakingValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)()),
    tslib_1.__param(1, (0, paramValidators_1.isPositiveOrMinusOneAmount)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StakingService.prototype, "claimRewards", null);
tslib_1.__decorate([
    methodValidators_1.StakingValidator,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)()),
    tslib_1.__param(1, (0, paramValidators_1.isPositiveOrMinusOneAmount)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StakingService.prototype, "claimRewardsAndStake", null);
exports.StakingService = StakingService;
//# sourceMappingURL=index.js.map