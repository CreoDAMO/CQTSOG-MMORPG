"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolBundle = void 0;
const tslib_1 = require("tslib");
const bytes_1 = require("@ethersproject/bytes");
const ethers_1 = require("ethers");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const erc20_2612_1 = require("../erc20-2612");
const erc20_contract_1 = require("../erc20-contract");
const synthetix_contract_1 = require("../synthetix-contract");
const v3_pool_contract_1 = require("../v3-pool-contract");
const IPool__factory_1 = require("../v3-pool-contract/typechain/IPool__factory");
const v3_pool_rollups_1 = require("../v3-pool-rollups");
const wethgateway_contract_1 = require("../wethgateway-contract");
class PoolBundle extends BaseService_1.default {
    constructor(provider, lendingPoolConfig) {
        super(provider, IPool__factory_1.IPool__factory);
        const { POOL, WETH_GATEWAY, L2_ENCODER } = lendingPoolConfig !== null && lendingPoolConfig !== void 0 ? lendingPoolConfig : {};
        this.poolAddress = POOL !== null && POOL !== void 0 ? POOL : '';
        this.l2EncoderAddress = L2_ENCODER !== null && L2_ENCODER !== void 0 ? L2_ENCODER : '';
        this.wethGatewayAddress = WETH_GATEWAY !== null && WETH_GATEWAY !== void 0 ? WETH_GATEWAY : '';
        this.v3PoolService = new v3_pool_contract_1.Pool(provider, lendingPoolConfig);
        // initialize services
        this.erc20_2612Service = new erc20_2612_1.ERC20_2612Service(provider);
        this.erc20Service = new erc20_contract_1.ERC20Service(provider);
        this.synthetixService = new synthetix_contract_1.SynthetixService(provider);
        this.wethGatewayService = new wethgateway_contract_1.WETHGatewayService(provider, this.erc20Service, WETH_GATEWAY);
        this.l2PoolService = new v3_pool_rollups_1.L2Pool(provider, {
            l2PoolAddress: this.poolAddress,
            encoderAddress: this.l2EncoderAddress,
        });
        this.contractInterface = IPool__factory_1.IPool__factory.createInterface();
        this.supplyTxBuilder = {
            getApprovedAmount: async (props) => {
                const spender = props.token.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()
                    ? this.wethGatewayAddress
                    : this.poolAddress;
                const amount = await this.erc20Service.approvedAmount(Object.assign(Object.assign({}, props), { spender }));
                return Object.assign(Object.assign({}, props), { spender, amount: amount.toString() });
            },
            generateTxData: ({ user, reserve, amount, onBehalfOf, referralCode, useOptimizedPath, encodedTxData, }) => {
                if (useOptimizedPath && encodedTxData) {
                    return this.l2PoolService.generateEncodedSupplyTxData({
                        encodedTxData,
                        user,
                    });
                }
                let actionTx = {};
                const onBehalfOfParam = onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user;
                const referralCodeParam = referralCode !== null && referralCode !== void 0 ? referralCode : '0';
                if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
                    actionTx = this.wethGatewayService.generateDepositEthTxData({
                        lendingPool: this.poolAddress,
                        user,
                        amount,
                        onBehalfOf: onBehalfOfParam,
                        referralCode: referralCodeParam,
                    });
                }
                else {
                    const txData = this.contractInterface.encodeFunctionData('supply', [
                        reserve,
                        amount,
                        onBehalfOfParam,
                        referralCodeParam,
                    ]);
                    actionTx.to = this.poolAddress;
                    actionTx.from = user;
                    actionTx.data = txData;
                    actionTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.supply].recommended);
                }
                return actionTx;
            },
            generateSignedTxData: ({ user, reserve, amount, onBehalfOf, referralCode, useOptimizedPath, signature, deadline, encodedTxData, }) => {
                if (useOptimizedPath && encodedTxData) {
                    return this.l2PoolService.generateEncodedSupplyWithPermitTxData({
                        encodedTxData,
                        user,
                        signature,
                    });
                }
                const decomposedSignature = (0, bytes_1.splitSignature)(signature);
                const populatedTx = {};
                const onBehalfOfParam = onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user;
                const referralCodeParam = referralCode !== null && referralCode !== void 0 ? referralCode : '0';
                const txData = this.contractInterface.encodeFunctionData('supplyWithPermit', [
                    reserve,
                    amount,
                    onBehalfOfParam,
                    referralCodeParam,
                    deadline,
                    decomposedSignature.v,
                    decomposedSignature.r,
                    decomposedSignature.s,
                ]);
                populatedTx.to = this.poolAddress;
                populatedTx.from = user;
                populatedTx.data = txData;
                populatedTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.supplyWithPermit].recommended);
                return populatedTx;
            },
            encodeSupplyParams: async ({ reserve, amount, referralCode, }) => {
                return this.l2PoolService
                    .getEncoder()
                    .encodeSupplyParams(reserve, amount, referralCode !== null && referralCode !== void 0 ? referralCode : '0');
            },
            encodeSupplyWithPermitParams: async ({ reserve, amount, signature, deadline, referralCode, }) => {
                const decomposedSignature = (0, bytes_1.splitSignature)(signature);
                return this.l2PoolService
                    .getEncoder()
                    .encodeSupplyWithPermitParams(reserve, amount, referralCode !== null && referralCode !== void 0 ? referralCode : '0', deadline, decomposedSignature.v, decomposedSignature.r, decomposedSignature.s);
            },
        };
        this.borrowTxBuilder = {
            generateTxData: ({ user, reserve, amount, interestRateMode, debtTokenAddress, onBehalfOf, referralCode, useOptimizedPath, encodedTxData, }) => {
                if (useOptimizedPath && encodedTxData) {
                    return this.l2PoolService.generateEncodedBorrowTxData({
                        encodedTxData,
                        user,
                    });
                }
                let actionTx = {};
                const referralCodeParam = referralCode !== null && referralCode !== void 0 ? referralCode : '0';
                const onBehalfOfParam = onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user;
                const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
                if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
                    if (!debtTokenAddress) {
                        throw new Error(`To borrow ETH you need to pass the stable or variable WETH debt Token Address corresponding the interestRateMode`);
                    }
                    actionTx = this.wethGatewayService.generateBorrowEthTxData({
                        lendingPool: this.poolAddress,
                        user,
                        amount,
                        debtTokenAddress,
                        interestRateMode,
                        referralCode: referralCodeParam,
                    });
                }
                else {
                    const txData = this.contractInterface.encodeFunctionData('borrow', [
                        reserve,
                        amount,
                        numericRateMode,
                        referralCodeParam,
                        onBehalfOfParam,
                    ]);
                    actionTx.to = this.poolAddress;
                    actionTx.from = user;
                    actionTx.data = txData;
                    actionTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.borrow].recommended);
                }
                return actionTx;
            },
            encodeBorrowParams: async ({ reserve, amount, interestRateMode, referralCode, }) => {
                const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
                return this.l2PoolService
                    .getEncoder()
                    .encodeBorrowParams(reserve, amount, numericRateMode, referralCode !== null && referralCode !== void 0 ? referralCode : '0');
            },
        };
        this.repayTxBuilder = {
            generateTxData: ({ user, reserve, amount, interestRateMode, onBehalfOf, useOptimizedPath, encodedTxData, }) => {
                const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
                const onBehalfOfParam = onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user;
                if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
                    return this.wethGatewayService.generateRepayEthTxData({
                        lendingPool: this.poolAddress,
                        user,
                        amount,
                        interestRateMode,
                        onBehalfOf: onBehalfOfParam,
                    });
                }
                if (useOptimizedPath && encodedTxData) {
                    return this.l2PoolService.generateEncodedRepayTxData({
                        encodedTxData,
                        user,
                    });
                }
                const actionTx = {};
                const txData = this.contractInterface.encodeFunctionData('repay', [
                    reserve,
                    amount === '-1' ? ethers_1.constants.MaxUint256.toString() : amount,
                    numericRateMode,
                    onBehalfOfParam,
                ]);
                actionTx.to = this.poolAddress;
                actionTx.from = user;
                actionTx.data = txData;
                actionTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.repay].recommended);
                return actionTx;
            },
            generateSignedTxData: ({ onBehalfOf, signature, deadline, user, reserve, amount, interestRateMode, useOptimizedPath, encodedTxData, }) => {
                const decomposedSignature = (0, bytes_1.splitSignature)(signature);
                const populatedTx = {};
                const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
                const onBehalfOfParam = onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user;
                if (useOptimizedPath && encodedTxData) {
                    return this.l2PoolService.generateEncodedRepayWithPermitTxData({
                        encodedTxData,
                        user,
                        signature,
                    });
                }
                const txData = this.contractInterface.encodeFunctionData('repayWithPermit', [
                    reserve,
                    amount === '-1' ? ethers_1.constants.MaxUint256.toString() : amount,
                    numericRateMode,
                    onBehalfOfParam,
                    deadline,
                    decomposedSignature.v,
                    decomposedSignature.r,
                    decomposedSignature.s,
                ]);
                populatedTx.to = this.poolAddress;
                populatedTx.from = user;
                populatedTx.data = txData;
                populatedTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.repayWithPermit].recommended);
                return populatedTx;
            },
            encodeRepayParams: async ({ reserve, amount, interestRateMode }) => {
                const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
                const repayAmount = amount === '-1' ? ethers_1.constants.MaxUint256.toString() : amount;
                return this.l2PoolService
                    .getEncoder()
                    .encodeRepayParams(reserve, repayAmount, numericRateMode);
            },
            encodeRepayWithPermitParams: async ({ reserve, amount, interestRateMode, signature, deadline, }) => {
                const decomposedSignature = (0, bytes_1.splitSignature)(signature);
                const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
                const repayAmount = amount === '-1' ? ethers_1.constants.MaxUint256.toString() : amount;
                return this.l2PoolService
                    .getEncoder()
                    .encodeRepayWithPermitParams(reserve, repayAmount, numericRateMode, deadline, decomposedSignature.v, decomposedSignature.r, decomposedSignature.s);
            },
        };
        this.repayWithATokensTxBuilder = {
            generateTxData: ({ rateMode, user, amount, reserve, useOptimizedPath, encodedTxData, }) => {
                const actionTx = {};
                const numericRateMode = rateMode === types_1.InterestRate.Variable ? 2 : 1;
                if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
                    throw new Error('Can not repay with aTokens with eth. Should be WETH instead');
                }
                if (useOptimizedPath && encodedTxData) {
                    return this.l2PoolService.generateEncodedRepayWithATokensTxData({
                        encodedTxData,
                        user,
                    });
                }
                const txData = this.contractInterface.encodeFunctionData('repayWithATokens', [
                    reserve,
                    amount === '-1' ? ethers_1.constants.MaxUint256.toString() : amount,
                    numericRateMode,
                ]);
                actionTx.to = this.poolAddress;
                actionTx.from = user;
                actionTx.data = txData;
                actionTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.repayWithATokens].recommended);
                return actionTx;
            },
            encodeRepayWithATokensParams: async ({ reserve, amount, rateMode }) => {
                const numericRateMode = rateMode === types_1.InterestRate.Variable ? 2 : 1;
                const repayAmount = amount === '-1' ? ethers_1.constants.MaxUint256.toString() : amount;
                return this.l2PoolService
                    .getEncoder()
                    .encodeRepayWithATokensParams(reserve, repayAmount, numericRateMode);
            },
        };
    }
}
exports.PoolBundle = PoolBundle;
//# sourceMappingURL=index.js.map