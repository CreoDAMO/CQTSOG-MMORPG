import { BigNumber, constants } from 'ethers';
import BaseService from '../commons/BaseService';
import { InterestRate, ProtocolAction, } from '../commons/types';
import { API_ETH_MOCK_ADDRESS, gasLimitRecommendations, } from '../commons/utils';
import { ERC20Service, } from '../erc20-contract';
import { ILendingPool__factory } from '../lendingPool-contract/typechain/ILendingPool__factory';
import { SynthetixService } from '../synthetix-contract';
import { WETHGatewayService, } from '../wethgateway-contract';
export class LendingPoolBundle extends BaseService {
    constructor(provider, lendingPoolConfig) {
        super(provider, ILendingPool__factory);
        const { LENDING_POOL, WETH_GATEWAY } = lendingPoolConfig !== null && lendingPoolConfig !== void 0 ? lendingPoolConfig : {};
        this.lendingPoolAddress = LENDING_POOL !== null && LENDING_POOL !== void 0 ? LENDING_POOL : '';
        this.wethGatewayAddress = WETH_GATEWAY !== null && WETH_GATEWAY !== void 0 ? WETH_GATEWAY : '';
        // initialize services
        this.erc20Service = new ERC20Service(provider);
        this.synthetixService = new SynthetixService(provider);
        this.wethGatewayService = new WETHGatewayService(provider, this.erc20Service, WETH_GATEWAY);
        this.contractInterface = ILendingPool__factory.createInterface();
        // Initialize depositTxBuilder
        this.depositTxBuilder = {
            getApprovedAmount: async (props) => {
                const spender = props.token.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
                    ? this.wethGatewayAddress
                    : this.lendingPoolAddress;
                const amount = await this.erc20Service.approvedAmount(Object.assign(Object.assign({}, props), { spender }));
                return Object.assign(Object.assign({}, props), { spender, amount: amount.toString() });
            },
            generateTxData: ({ user, reserve, amount, onBehalfOf, referralCode, }) => {
                let actionTx = {};
                if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
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
                    actionTx.gasLimit = BigNumber.from(gasLimitRecommendations[ProtocolAction.deposit].recommended);
                }
                return actionTx;
            },
        };
        this.borrowTxBuilder = {
            generateTxData: ({ user, reserve, amount, interestRateMode, debtTokenAddress, onBehalfOf, referralCode, }) => {
                let actionTx = {};
                const referralCodeParam = referralCode !== null && referralCode !== void 0 ? referralCode : '0';
                const onBehalfOfParam = onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user;
                const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1;
                if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
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
                    actionTx.gasLimit = BigNumber.from(gasLimitRecommendations[ProtocolAction.borrow].recommended);
                }
                return actionTx;
            },
        };
        this.repayTxBuilder = {
            generateTxData: ({ user, reserve, onBehalfOf, interestRateMode, amount, }) => {
                const actionTx = {};
                if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
                    return this.wethGatewayService.generateRepayEthTxData({
                        lendingPool: this.lendingPoolAddress,
                        user,
                        amount,
                        interestRateMode,
                        onBehalfOf,
                    });
                }
                const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1;
                const txData = this.contractInterface.encodeFunctionData('repay', [
                    reserve,
                    amount === '-1' ? constants.MaxUint256.toString() : amount,
                    numericRateMode,
                    onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
                ]);
                actionTx.to = this.lendingPoolAddress;
                actionTx.from = user;
                actionTx.data = txData;
                actionTx.gasLimit = BigNumber.from(gasLimitRecommendations[ProtocolAction.repay].recommended);
                return actionTx;
            },
        };
    }
}
//# sourceMappingURL=index.js.map