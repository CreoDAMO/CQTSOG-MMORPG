"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LendingPoolBundle = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const BaseService_1 = tslib_1.__importDefault(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const erc20_contract_1 = require("../erc20-contract");
const ILendingPool__factory_1 = require("../lendingPool-contract/typechain/ILendingPool__factory");
const synthetix_contract_1 = require("../synthetix-contract");
const wethgateway_contract_1 = require("../wethgateway-contract");
class LendingPoolBundle extends BaseService_1.default {
    constructor(provider, lendingPoolConfig) {
        super(provider, ILendingPool__factory_1.ILendingPool__factory);
        const { LENDING_POOL, WETH_GATEWAY } = lendingPoolConfig !== null && lendingPoolConfig !== void 0 ? lendingPoolConfig : {};
        this.lendingPoolAddress = LENDING_POOL !== null && LENDING_POOL !== void 0 ? LENDING_POOL : '';
        this.wethGatewayAddress = WETH_GATEWAY !== null && WETH_GATEWAY !== void 0 ? WETH_GATEWAY : '';
        // initialize services
        this.erc20Service = new erc20_contract_1.ERC20Service(provider);
        this.synthetixService = new synthetix_contract_1.SynthetixService(provider);
        this.wethGatewayService = new wethgateway_contract_1.WETHGatewayService(provider, this.erc20Service, WETH_GATEWAY);
        this.contractInterface = ILendingPool__factory_1.ILendingPool__factory.createInterface();
        // Initialize depositTxBuilder
        this.depositTxBuilder = {
            getApprovedAmount: async (props) => {
                const spender = props.token.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()
                    ? this.wethGatewayAddress
                    : this.lendingPoolAddress;
                const amount = await this.erc20Service.approvedAmount(Object.assign(Object.assign({}, props), { spender }));
                return Object.assign(Object.assign({}, props), { spender, amount: amount.toString() });
            },
            generateTxData: ({ user, reserve, amount, onBehalfOf, referralCode, }) => {
                let actionTx = {};
                if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
                    actionTx = this.wethGatewayService.generateDepositEthTxData({
                        lendingPool: this.lendingPoolAddress,
                        user,
                        amount,
                        onBehalfOf,
                        referralCode,
                    });
                }
                else {
                    const txData = this.contractInterface.encodeFunctionData('deposit', [
                        reserve,
                        amount,
                        onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
                        referralCode !== null && referralCode !== void 0 ? referralCode : '0',
                    ]);
                    actionTx.to = this.lendingPoolAddress;
                    actionTx.from = user;
                    actionTx.data = txData;
                    actionTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.deposit].recommended);
                }
                return actionTx;
            },
        };
        this.borrowTxBuilder = {
            generateTxData: ({ user, reserve, amount, interestRateMode, debtTokenAddress, onBehalfOf, referralCode, }) => {
                let actionTx = {};
                const referralCodeParam = referralCode !== null && referralCode !== void 0 ? referralCode : '0';
                const onBehalfOfParam = onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user;
                const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
                if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
                    if (!debtTokenAddress) {
                        throw new Error(`To borrow ETH you need to pass the stable or variable WETH debt Token Address corresponding the interestRateMode`);
                    }
                    actionTx = this.wethGatewayService.generateBorrowEthTxData({
                        lendingPool: this.lendingPoolAddress,
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
                    actionTx.to = this.lendingPoolAddress;
                    actionTx.from = user;
                    actionTx.data = txData;
                    actionTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.borrow].recommended);
                }
                return actionTx;
            },
        };
        this.repayTxBuilder = {
            generateTxData: ({ user, reserve, onBehalfOf, interestRateMode, amount, }) => {
                const actionTx = {};
                if (reserve.toLowerCase() === utils_1.API_ETH_MOCK_ADDRESS.toLowerCase()) {
                    return this.wethGatewayService.generateRepayEthTxData({
                        lendingPool: this.lendingPoolAddress,
                        user,
                        amount,
                        interestRateMode,
                        onBehalfOf,
                    });
                }
                const numericRateMode = interestRateMode === types_1.InterestRate.Variable ? 2 : 1;
                const txData = this.contractInterface.encodeFunctionData('repay', [
                    reserve,
                    amount === '-1' ? ethers_1.constants.MaxUint256.toString() : amount,
                    numericRateMode,
                    onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
                ]);
                actionTx.to = this.lendingPoolAddress;
                actionTx.from = user;
                actionTx.data = txData;
                actionTx.gasLimit = ethers_1.BigNumber.from(utils_1.gasLimitRecommendations[types_1.ProtocolAction.repay].recommended);
                return actionTx;
            },
        };
    }
}
exports.LendingPoolBundle = LendingPoolBundle;
//# sourceMappingURL=index.js.map