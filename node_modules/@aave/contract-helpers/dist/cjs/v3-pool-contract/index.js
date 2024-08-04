"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
const tslib_1 = require("tslib");
const bytes_1 = require("@ethersproject/bytes");
const ethers_1 = require("ethers");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const methodValidators_1 = require("../commons/validators/methodValidators");
const paramValidators_1 = require("../commons/validators/paramValidators");
const erc20_2612_1 = require("../erc20-2612");
const erc20_contract_1 = require("../erc20-contract");
const paraswap_liquiditySwapAdapter_contract_1 = require("../paraswap-liquiditySwapAdapter-contract");
const paraswap_repayWithCollateralAdapter_contract_1 = require("../paraswap-repayWithCollateralAdapter-contract");
const synthetix_contract_1 = require("../synthetix-contract");
const v3_pool_rollups_1 = require("../v3-pool-rollups");
const wethgateway_contract_1 = require("../wethgateway-contract");
const IPool__factory_1 = require("./typechain/IPool__factory");
const buildParaSwapLiquiditySwapParams = (assetToSwapTo, minAmountToReceive, swapAllBalanceOffset, swapCalldata, augustus, permitAmount, deadline, v, r, s) => {
    return ethers_1.utils.defaultAbiCoder.encode([
        'address',
        'uint256',
        'uint256',
        'bytes',
        'address',
        'tuple(uint256,uint256,uint8,bytes32,bytes32)',
    ], [
        assetToSwapTo,
        minAmountToReceive,
        swapAllBalanceOffset,
        swapCalldata,
        augustus,
        [permitAmount, deadline, v, r, s],
    ]);
};
class Pool extends BaseService_1.default {
    constructor(provider, lendingPoolConfig) {
        super(provider, IPool__factory_1.IPool__factory);
        const { POOL, FLASH_LIQUIDATION_ADAPTER, REPAY_WITH_COLLATERAL_ADAPTER, SWAP_COLLATERAL_ADAPTER, WETH_GATEWAY, L2_ENCODER, } = lendingPoolConfig !== null && lendingPoolConfig !== void 0 ? lendingPoolConfig : {};
        this.poolAddress = POOL !== null && POOL !== void 0 ? POOL : '';
        this.flashLiquidationAddress = FLASH_LIQUIDATION_ADAPTER !== null && FLASH_LIQUIDATION_ADAPTER !== void 0 ? FLASH_LIQUIDATION_ADAPTER : '';
        this.swapCollateralAddress = SWAP_COLLATERAL_ADAPTER !== null && SWAP_COLLATERAL_ADAPTER !== void 0 ? SWAP_COLLATERAL_ADAPTER : '';
        this.repayWithCollateralAddress = REPAY_WITH_COLLATERAL_ADAPTER !== null && REPAY_WITH_COLLATERAL_ADAPTER !== void 0 ? REPAY_WITH_COLLATERAL_ADAPTER : '';
        this.l2EncoderAddress = L2_ENCODER !== null && L2_ENCODER !== void 0 ? L2_ENCODER : '';
        // initialize services
        this.erc20_2612Service = new erc20_2612_1.ERC20_2612Service(provider);
        this.erc20Service = new erc20_contract_1.ERC20Service(provider);
        this.synthetixService = new synthetix_contract_1.SynthetixService(provider);
        this.wethGatewayService = new wethgateway_contract_1.WETHGatewayService(provider, this.erc20Service, WETH_GATEWAY);
        this.liquiditySwapAdapterService = new paraswap_liquiditySwapAdapter_contract_1.LiquiditySwapAdapterService(provider, SWAP_COLLATERAL_ADAPTER);
        this.paraswapRepayWithCollateralAdapterService =
            new paraswap_repayWithCollateralAdapter_contract_1.ParaswapRepayWithCollateral(provider, REPAY_WITH_COLLATERAL_ADAPTER);
        this.l2PoolService = new v3_pool_rollups_1.L2Pool(provider, {
            l2PoolAddress: this.poolAddress,
            encoderAddress: this.l2EncoderAddress,
        });
    }
    async getReserveData(reserve) {
        const lendingPoolContract = this.getContractInstance(this.poolAddress);
        return lendingPoolContract.getReserveData(reserve);
    }
    async deposit({ user, reserve, amount, onBehalfOf, referralCode }) {
        if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
            return this.wethGatewayService.depositETH({
                lendingPool: this.poolAddress,
                user,
                amount,
                onBehalfOf,
                referralCode,
            });
        }
        const { isApproved, approve, decimalsOf } = this.erc20Service;
        const txs = [];
        const reserveDecimals = await decimalsOf(reserve);
        const convertedAmount = (0, utils_1.valueToWei)(amount, reserveDecimals);
        const fundsAvailable = await this.synthetixService.synthetixValidation({
            user,
            reserve,
            amount: convertedAmount,
        });
        if (!fundsAvailable) {
            throw new Error('Not enough funds to execute operation');
        }
        const approved = await isApproved({
            token: reserve,
            user,
            spender: this.poolAddress,
            amount,
        });
        if (!approved) {
            const approveTx = approve({
                user,
                token: reserve,
                spender: this.poolAddress,
                amount: utils_1.DEFAULT_APPROVE_AMOUNT,
            });
            txs.push(approveTx);
        }
        const lendingPoolContract = this.getContractInstance(this.poolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => lendingPoolContract.populateTransaction.deposit(reserve, convertedAmount, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user, referralCode !== null && referralCode !== void 0 ? referralCode : '0'),
            from: user,
            value: (0, utils_1.getTxValue)(reserve, convertedAmount),
            action: types_1.ProtocolAction.supply,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.supply),
        });
        return txs;
    }
    async supply({ user, reserve, amount, onBehalfOf, referralCode, useOptimizedPath, }) {
        if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
            return this.wethGatewayService.depositETH({
                lendingPool: this.poolAddress,
                user,
                amount,
                onBehalfOf,
                referralCode,
            });
        }
        const { isApproved, approve, decimalsOf } = this.erc20Service;
        const txs = [];
        const reserveDecimals = await decimalsOf(reserve);
        const convertedAmount = (0, utils_1.valueToWei)(amount, reserveDecimals);
        const fundsAvailable = await this.synthetixService.synthetixValidation({
            user,
            reserve,
            amount: convertedAmount,
        });
        if (!fundsAvailable) {
            throw new Error('Not enough funds to execute operation');
        }
        const approved = await isApproved({
            token: reserve,
            user,
            spender: this.poolAddress,
            amount,
        });
        if (!approved) {
            const approveTx = approve({
                user,
                token: reserve,
                spender: this.poolAddress,
                amount: utils_1.DEFAULT_APPROVE_AMOUNT,
            });
            txs.push(approveTx);
        }
        const lendingPoolContract = this.getContractInstance(this.poolAddress);
        // use optimized path
        if (useOptimizedPath) {
            return this.l2PoolService.supply({ user, reserve, amount: convertedAmount, referralCode }, txs);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => lendingPoolContract.populateTransaction.supply(reserve, convertedAmount, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user, referralCode !== null && referralCode !== void 0 ? referralCode : '0'),
            from: user,
            value: (0, utils_1.getTxValue)(reserve, convertedAmount),
            action: types_1.ProtocolAction.supply,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.supply),
        });
        return txs;
    }
    // Sign permit supply
    async signERC20Approval({ user, reserve, amount, deadline }) {
        const { getTokenData, isApproved } = this.erc20Service;
        const { name, decimals } = await getTokenData(reserve);
        const convertedAmount = amount === '-1'
            ? ethers_1.constants.MaxUint256.toString()
            : (0, utils_1.valueToWei)(amount, decimals);
        const approved = await isApproved({
            token: reserve,
            user,
            spender: this.poolAddress,
            amount,
        });
        if (approved) {
            return '';
        }
        const { chainId } = await this.provider.getNetwork();
        const nonce = await this.erc20_2612Service.getNonce({
            token: reserve,
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
                version: '1',
                chainId,
                verifyingContract: reserve,
            },
            message: {
                owner: user,
                spender: this.poolAddress,
                value: convertedAmount,
                nonce,
                deadline,
            },
        };
        return JSON.stringify(typeData);
    }
    async supplyWithPermit({ user, reserve, onBehalfOf, amount, referralCode, signature, useOptimizedPath, deadline, }) {
        const txs = [];
        const { decimalsOf } = this.erc20Service;
        const poolContract = this.getContractInstance(this.poolAddress);
        const stakedTokenDecimals = await decimalsOf(reserve);
        const convertedAmount = (0, utils_1.valueToWei)(amount, stakedTokenDecimals);
        // const sig: Signature = utils.splitSignature(signature);
        const sig = (0, bytes_1.splitSignature)(signature);
        const fundsAvailable = await this.synthetixService.synthetixValidation({
            user,
            reserve,
            amount: convertedAmount,
        });
        if (!fundsAvailable) {
            throw new Error('Not enough funds to execute operation');
        }
        if (useOptimizedPath) {
            return this.l2PoolService.supplyWithPermit({
                user,
                reserve,
                amount: convertedAmount,
                referralCode,
                deadline,
                permitV: sig.v,
                permitR: sig.r,
                permitS: sig.s,
            }, txs);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => poolContract.populateTransaction.supplyWithPermit(reserve, convertedAmount, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user, referralCode !== null && referralCode !== void 0 ? referralCode : 0, deadline, sig.v, sig.r, sig.s),
            from: user,
            action: types_1.ProtocolAction.supplyWithPermit,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.supplyWithPermit),
        });
        return txs;
    }
    async withdraw({ user, reserve, amount, onBehalfOf, aTokenAddress, useOptimizedPath, }) {
        if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
            if (!aTokenAddress) {
                throw new Error('To withdraw ETH you need to pass the aWETH token address');
            }
            return this.wethGatewayService.withdrawETH({
                lendingPool: this.poolAddress,
                user,
                amount,
                onBehalfOf,
                aTokenAddress,
            });
        }
        const { decimalsOf } = this.erc20Service;
        const decimals = await decimalsOf(reserve);
        const convertedAmount = amount === '-1'
            ? ethers_1.constants.MaxUint256.toString()
            : (0, utils_1.valueToWei)(amount, decimals);
        if (useOptimizedPath) {
            return this.l2PoolService.withdraw({
                user,
                reserve,
                amount: convertedAmount,
            });
        }
        const poolContract = this.getContractInstance(this.poolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => poolContract.populateTransaction.withdraw(reserve, convertedAmount, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user),
            from: user,
            action: types_1.ProtocolAction.withdraw,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback, types_1.ProtocolAction.withdraw),
            },
        ];
    }
    async borrow({ user, reserve, amount, interestRateMode, debtTokenAddress, onBehalfOf, referralCode, useOptimizedPath, }) {
        if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
            if (!debtTokenAddress) {
                throw new Error(`To borrow ETH you need to pass the stable or variable WETH debt Token Address corresponding the interestRateMode`);
            }
            return this.wethGatewayService.borrowETH({
                lendingPool: this.poolAddress,
                user,
                amount,
                debtTokenAddress,
                interestRateMode,
                referralCode,
            });
        }
        const { decimalsOf } = this.erc20Service;
        const reserveDecimals = await decimalsOf(reserve);
        const formatAmount = (0, utils_1.valueToWei)(amount, reserveDecimals);
        const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
        if (useOptimizedPath) {
            return this.l2PoolService.borrow({
                user,
                reserve,
                amount: formatAmount,
                numericRateMode,
                referralCode,
            });
        }
        const poolContract = this.getContractInstance(this.poolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => poolContract.populateTransaction.borrow(reserve, formatAmount, numericRateMode, referralCode !== null && referralCode !== void 0 ? referralCode : 0, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user),
            from: user,
            action: types_1.ProtocolAction.borrow,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback, types_1.ProtocolAction.borrow),
            },
        ];
    }
    async repay({ user, reserve, amount, interestRateMode, onBehalfOf, useOptimizedPath, }) {
        if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
            return this.wethGatewayService.repayETH({
                lendingPool: this.poolAddress,
                user,
                amount,
                interestRateMode,
                onBehalfOf,
            });
        }
        const txs = [];
        const { isApproved, approve, decimalsOf } = this.erc20Service;
        const poolContract = this.getContractInstance(this.poolAddress);
        const { populateTransaction } = poolContract;
        const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
        const decimals = await decimalsOf(reserve);
        const convertedAmount = amount === '-1'
            ? ethers_1.constants.MaxUint256.toString()
            : (0, utils_1.valueToWei)(amount, decimals);
        if (amount !== '-1') {
            const fundsAvailable = await this.synthetixService.synthetixValidation({
                user,
                reserve,
                amount: convertedAmount,
            });
            if (!fundsAvailable) {
                throw new Error('Not enough funds to execute operation');
            }
        }
        const approved = await isApproved({
            token: reserve,
            user,
            spender: this.poolAddress,
            amount,
        });
        if (!approved) {
            const approveTx = approve({
                user,
                token: reserve,
                spender: this.poolAddress,
                amount: utils_1.DEFAULT_APPROVE_AMOUNT,
            });
            txs.push(approveTx);
        }
        if (useOptimizedPath) {
            return this.l2PoolService.repay({
                user,
                reserve,
                amount: convertedAmount,
                numericRateMode,
            }, txs);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => populateTransaction.repay(reserve, convertedAmount, numericRateMode, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user),
            from: user,
            value: (0, utils_1.getTxValue)(reserve, convertedAmount),
            action: types_1.ProtocolAction.repay,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.repay),
        });
        return txs;
    }
    async repayWithPermit({ user, reserve, amount, interestRateMode, onBehalfOf, signature, useOptimizedPath, deadline, }) {
        const txs = [];
        const { decimalsOf } = this.erc20Service;
        const poolContract = this.getContractInstance(this.poolAddress);
        const { populateTransaction } = poolContract;
        const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
        const decimals = await decimalsOf(reserve);
        const sig = (0, bytes_1.splitSignature)(signature);
        const convertedAmount = amount === '-1'
            ? ethers_1.constants.MaxUint256.toString()
            : (0, utils_1.valueToWei)(amount, decimals);
        if (amount !== '-1') {
            const fundsAvailable = await this.synthetixService.synthetixValidation({
                user,
                reserve,
                amount: convertedAmount,
            });
            if (!fundsAvailable) {
                throw new Error('Not enough funds to execute operation');
            }
        }
        if (useOptimizedPath) {
            return this.l2PoolService.repayWithPermit({
                user,
                reserve,
                amount: convertedAmount,
                numericRateMode,
                deadline,
                permitR: sig.r,
                permitS: sig.s,
                permitV: sig.v,
            }, txs);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => populateTransaction.repayWithPermit(reserve, convertedAmount, numericRateMode, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user, deadline, sig.v, sig.r, sig.s),
            from: user,
            value: (0, utils_1.getTxValue)(reserve, convertedAmount),
            action: types_1.ProtocolAction.repayWithPermit,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.repayWithPermit),
        });
        return txs;
    }
    async swapBorrowRateMode({ user, reserve, interestRateMode, useOptimizedPath }) {
        const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
        if (useOptimizedPath) {
            return this.l2PoolService.swapBorrowRateMode({
                user,
                reserve,
                numericRateMode,
            });
        }
        const poolContract = this.getContractInstance(this.poolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => poolContract.populateTransaction.swapBorrowRateMode(reserve, numericRateMode),
            from: user,
        });
        return [
            {
                txType: types_1.eEthereumTxType.DLP_ACTION,
                tx: txCallback,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async setUsageAsCollateral({ user, reserve, usageAsCollateral, useOptimizedPath, }) {
        const poolContract = this.getContractInstance(this.poolAddress);
        if (useOptimizedPath) {
            return this.l2PoolService.setUserUseReserveAsCollateral({
                user,
                reserve,
                usageAsCollateral,
            });
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => poolContract.populateTransaction.setUserUseReserveAsCollateral(reserve, usageAsCollateral),
            from: user,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback),
            },
        ];
    }
    async liquidationCall({ liquidator, liquidatedUser, debtReserve, collateralReserve, purchaseAmount, getAToken, liquidateAll, useOptimizedPath, }) {
        const txs = [];
        const { isApproved, approve, decimalsOf } = this.erc20Service;
        const approved = await isApproved({
            token: debtReserve,
            user: liquidator,
            spender: this.poolAddress,
            amount: purchaseAmount,
        });
        if (!approved) {
            const approveTx = approve({
                user: liquidator,
                token: debtReserve,
                spender: this.poolAddress,
                amount: utils_1.DEFAULT_APPROVE_AMOUNT,
            });
            txs.push(approveTx);
        }
        let convertedAmount = ethers_1.constants.MaxUint256.toString();
        if (!liquidateAll) {
            const reserveDecimals = await decimalsOf(debtReserve);
            convertedAmount = (0, utils_1.valueToWei)(purchaseAmount, reserveDecimals);
        }
        if (useOptimizedPath) {
            return this.l2PoolService.liquidationCall({
                liquidator,
                liquidatedUser,
                debtReserve,
                collateralReserve,
                debtToCover: convertedAmount,
                getAToken,
            }, txs);
        }
        const poolContract = this.getContractInstance(this.poolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => poolContract.populateTransaction.liquidationCall(collateralReserve, debtReserve, liquidatedUser, convertedAmount, getAToken !== null && getAToken !== void 0 ? getAToken : false),
            from: liquidator,
            value: (0, utils_1.getTxValue)(debtReserve, convertedAmount),
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.liquidationCall),
        });
        return txs;
    }
    async swapCollateral({ user, flash, fromAsset, fromAToken, toAsset, fromAmount, minToAmount, permitSignature, swapAll, referralCode, augustus, swapCallData, }) {
        const txs = [];
        const permitParams = permitSignature !== null && permitSignature !== void 0 ? permitSignature : {
            amount: '0',
            deadline: '0',
            v: 0,
            r: '0x0000000000000000000000000000000000000000000000000000000000000000',
            s: '0x0000000000000000000000000000000000000000000000000000000000000000',
        };
        const approved = await this.erc20Service.isApproved({
            token: fromAToken,
            user,
            spender: this.swapCollateralAddress,
            amount: fromAmount,
        });
        if (!approved) {
            const approveTx = this.erc20Service.approve({
                user,
                token: fromAToken,
                spender: this.swapCollateralAddress,
                amount: ethers_1.constants.MaxUint256.toString(),
            });
            txs.push(approveTx);
        }
        const tokenDecimals = await this.erc20Service.decimalsOf(fromAsset);
        const convertedAmount = (0, utils_1.valueToWei)(fromAmount, tokenDecimals);
        const tokenToDecimals = await this.erc20Service.decimalsOf(toAsset);
        const amountSlippageConverted = (0, utils_1.valueToWei)(minToAmount, tokenToDecimals);
        const poolContract = this.getContractInstance(this.poolAddress);
        if (flash) {
            const params = buildParaSwapLiquiditySwapParams(toAsset, amountSlippageConverted, swapAll
                ? (0, paraswap_liquiditySwapAdapter_contract_1.augustusFromAmountOffsetFromCalldata)(swapCallData)
                : 0, swapCallData, augustus, permitParams.amount, permitParams.deadline, permitParams.v, permitParams.r, permitParams.s);
            const amountWithSurplus = (Number(fromAmount) +
                (Number(fromAmount) * Number(utils_1.SURPLUS)) / 100).toString();
            const convertedAmountWithSurplus = (0, utils_1.valueToWei)(amountWithSurplus, tokenDecimals);
            const txCallback = this.generateTxCallback({
                rawTxMethod: async () => poolContract.populateTransaction.flashLoanSimple(this.swapCollateralAddress, fromAsset, swapAll ? convertedAmountWithSurplus : convertedAmount, params, referralCode !== null && referralCode !== void 0 ? referralCode : '0'),
                from: user,
                action: types_1.ProtocolAction.swapCollateral,
            });
            txs.push({
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.swapCollateral),
            });
            return txs;
        }
        // Direct call to swap and deposit
        const swapAndDepositTx = this.liquiditySwapAdapterService.swapAndDeposit({
            user,
            assetToSwapFrom: fromAsset,
            assetToSwapTo: toAsset,
            amountToSwap: convertedAmount,
            minAmountToReceive: amountSlippageConverted,
            swapAll,
            swapCallData,
            augustus,
            permitParams,
        }, txs);
        txs.push(swapAndDepositTx);
        return txs;
    }
    async paraswapRepayWithCollateral({ user, fromAsset, fromAToken, assetToRepay, repayWithAmount, repayAmount, permitSignature, repayAllDebt, rateMode, referralCode, flash, swapAndRepayCallData, augustus, }) {
        const txs = [];
        const permitParams = permitSignature !== null && permitSignature !== void 0 ? permitSignature : {
            amount: '0',
            deadline: '0',
            v: 0,
            r: '0x0000000000000000000000000000000000000000000000000000000000000000',
            s: '0x0000000000000000000000000000000000000000000000000000000000000000',
        };
        const approved = await this.erc20Service.isApproved({
            token: fromAToken,
            user,
            spender: this.repayWithCollateralAddress,
            amount: repayWithAmount,
        });
        if (!approved) {
            const approveTx = this.erc20Service.approve({
                user,
                token: fromAToken,
                spender: this.repayWithCollateralAddress,
                amount: ethers_1.constants.MaxUint256.toString(),
            });
            txs.push(approveTx);
        }
        const fromDecimals = await this.erc20Service.decimalsOf(fromAsset);
        const convertedRepayWithAmount = (0, utils_1.valueToWei)(repayWithAmount, fromDecimals);
        const repayWithAmountWithSurplus = (Number(repayWithAmount) +
            (Number(repayWithAmount) * Number(utils_1.SURPLUS)) / 100).toString();
        const convertedRepayWithAmountWithSurplus = (0, utils_1.valueToWei)(repayWithAmountWithSurplus, fromDecimals);
        const decimals = await this.erc20Service.decimalsOf(assetToRepay);
        const convertedRepayAmount = (0, utils_1.valueToWei)(repayAmount, decimals);
        const numericInterestRate = rateMode === types_1.InterestRate.Stable ? 1 : 2;
        if (flash) {
            const callDataEncoded = ethers_1.utils.defaultAbiCoder.encode(['bytes', 'address'], [swapAndRepayCallData, augustus]);
            const params = ethers_1.utils.defaultAbiCoder.encode([
                'address',
                'uint256',
                'uint256',
                'uint256',
                'bytes',
                'uint256',
                'uint256',
                'uint8',
                'bytes32',
                'bytes32',
            ], [
                assetToRepay,
                convertedRepayAmount,
                repayAllDebt
                    ? (0, utils_1.augustusToAmountOffsetFromCalldata)(swapAndRepayCallData)
                    : 0,
                numericInterestRate,
                callDataEncoded,
                permitParams.amount,
                permitParams.deadline,
                permitParams.v,
                permitParams.r,
                permitParams.s,
            ]);
            const poolContract = this.getContractInstance(this.poolAddress);
            const txCallback = this.generateTxCallback({
                rawTxMethod: async () => poolContract.populateTransaction.flashLoanSimple(this.repayWithCollateralAddress, fromAsset, repayAllDebt
                    ? convertedRepayWithAmountWithSurplus
                    : convertedRepayWithAmount, params, referralCode !== null && referralCode !== void 0 ? referralCode : '0'),
                from: user,
                action: types_1.ProtocolAction.repayCollateral,
            });
            txs.push({
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.repayCollateral),
            });
            return txs;
        }
        const swapAndRepayTx = this.paraswapRepayWithCollateralAdapterService.swapAndRepay({
            user,
            collateralAsset: fromAsset,
            debtAsset: assetToRepay,
            collateralAmount: convertedRepayWithAmount,
            debtRepayAmount: convertedRepayAmount,
            debtRateMode: rateMode,
            permitParams,
            repayAll: repayAllDebt !== null && repayAllDebt !== void 0 ? repayAllDebt : false,
            swapAndRepayCallData,
            augustus,
        }, txs);
        txs.push(swapAndRepayTx);
        return txs;
    }
    async flashLiquidation({ user, collateralAsset, borrowedAsset, debtTokenCover, liquidateAll, initiator, useEthPath, }) {
        const addSurplus = (amount) => {
            return (Number(amount) +
                (Number(amount) * Number(amount)) / 100).toString();
        };
        const txs = [];
        const poolContract = this.getContractInstance(this.poolAddress);
        const tokenDecimals = await this.erc20Service.decimalsOf(borrowedAsset);
        const convertedDebt = (0, utils_1.valueToWei)(debtTokenCover, tokenDecimals);
        const convertedDebtTokenCover = liquidateAll
            ? ethers_1.constants.MaxUint256.toString()
            : convertedDebt;
        const flashBorrowAmount = liquidateAll
            ? (0, utils_1.valueToWei)(addSurplus(debtTokenCover), tokenDecimals)
            : convertedDebt;
        const params = ethers_1.utils.defaultAbiCoder.encode(['address', 'address', 'address', 'uint256', 'bool'], [
            collateralAsset,
            borrowedAsset,
            user,
            convertedDebtTokenCover,
            useEthPath !== null && useEthPath !== void 0 ? useEthPath : false,
        ]);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => poolContract.populateTransaction.flashLoanSimple(this.flashLiquidationAddress, borrowedAsset, flashBorrowAmount, params, '0'),
            from: initiator,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.liquidationFlash),
        });
        return txs;
    }
    async repayWithATokens({ user, amount, reserve, rateMode, useOptimizedPath, }) {
        if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
            throw new Error('Can not repay with aTokens with eth. Should be WETH instead');
        }
        const txs = [];
        const { decimalsOf } = this.erc20Service;
        const poolContract = this.getContractInstance(this.poolAddress);
        const { populateTransaction } = poolContract;
        const numericRateMode = rateMode === types_1.InterestRate.Variable ? 2 : 1;
        const decimals = await decimalsOf(reserve);
        const convertedAmount = amount === '-1'
            ? ethers_1.constants.MaxUint256.toString()
            : (0, utils_1.valueToWei)(amount, decimals);
        if (useOptimizedPath) {
            return this.l2PoolService.repayWithATokens({
                user,
                reserve,
                amount: convertedAmount,
                numericRateMode,
            }, txs);
        }
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => populateTransaction.repayWithATokens(reserve, convertedAmount, numericRateMode),
            from: user,
            value: (0, utils_1.getTxValue)(reserve, convertedAmount),
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.repay),
        });
        return txs;
    }
    setUserEMode({ user, categoryId }) {
        const poolContract = this.getContractInstance(this.poolAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => poolContract.populateTransaction.setUserEMode(categoryId),
            from: user,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback, types_1.ProtocolAction.repay),
            },
        ];
    }
    async migrateV3({ migrator, borrowedAssets, borrowedAmounts, interestRatesModes, user, suppliedPositions, borrowedPositions, permits, }) {
        const poolContract = this.getContractInstance(this.poolAddress);
        const mappedBorrowedPositions = borrowedPositions.map(borrowPosition => [
            borrowPosition.address,
            borrowPosition.amount,
            borrowPosition.rateMode.toString(),
        ]);
        const mappedPermits = permits.map((permit) => [
            permit.aToken,
            permit.value,
            permit.deadline,
            permit.v,
            permit.r,
            permit.s,
        ]);
        const params = ethers_1.utils.defaultAbiCoder.encode([
            'address[]',
            '(address, uint256, uint256)[]',
            '(address, uint256, uint256, uint8, bytes32, bytes32)[]',
        ], [suppliedPositions, mappedBorrowedPositions, mappedPermits]);
        return poolContract.populateTransaction.flashLoan(migrator, borrowedAssets, borrowedAmounts, interestRatesModes, user, params, '0');
    }
}
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "getReserveData", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "deposit", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "supply", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveOrMinusOneAmount)('amount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "signERC20Approval", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('referralCode')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "supplyWithPermit", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveOrMinusOneAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('aTokenAddress')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "withdraw", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('debtTokenAddress')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "borrow", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveOrMinusOneAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "repay", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveOrMinusOneAmount)('amount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "repayWithPermit", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "swapBorrowRateMode", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "setUsageAsCollateral", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('liquidator')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('liquidatedUser')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('debtReserve')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('collateralReserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('purchaseAmount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "liquidationCall", null);
tslib_1.__decorate([
    methodValidators_1.LPSwapCollateralValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('fromAsset')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('fromAToken')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('toAsset')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('augustus')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('fromAmount')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('minToAmount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "swapCollateral", null);
tslib_1.__decorate([
    methodValidators_1.LPRepayWithCollateralValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('fromAsset')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('fromAToken')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('assetToRepay')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('repayWithAmount')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('repayAmount')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('augustus')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "paraswapRepayWithCollateral", null);
tslib_1.__decorate([
    methodValidators_1.LPFlashLiquidationValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('collateralAsset')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('borrowedAsset')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveAmount)('debtTokenCover')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('initiator')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "flashLiquidation", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('reserve')),
    tslib_1.__param(0, (0, paramValidators_1.isPositiveOrMinusOneAmount)('amount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "repayWithATokens", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.is0OrPositiveAmount)('categoryId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Array)
], Pool.prototype, "setUserEMode", null);
tslib_1.__decorate([
    methodValidators_1.LPValidatorV3,
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('migrator')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddress)('user')),
    tslib_1.__param(0, (0, paramValidators_1.isEthAddressArray)('borrowedAssets')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Pool.prototype, "migrateV3", null);
exports.Pool = Pool;
//# sourceMappingURL=index.js.map