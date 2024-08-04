import { BigNumber, BytesLike, PopulatedTransaction } from 'ethers';
import { LPBorrowParamsType, LPRepayParamsType, LPRepayWithATokensType, LPSignedRepayParamsType } from '../v3-pool-contract/lendingPoolTypes';
export declare type tEthereumAddress = string;
export declare type ENS = string;
/** InterestRate options */
export declare enum InterestRate {
    None = "None",
    Stable = "Stable",
    Variable = "Variable"
}
export declare const ChainIdToNetwork: Record<number, string>;
export declare enum ChainId {
    mainnet = 1,
    ropsten = 3,
    rinkeby = 4,
    goerli = 5,
    kovan = 42,
    xdai = 100,
    polygon = 137,
    mumbai = 80001,
    avalanche = 43114,
    fuji = 43113,
    arbitrum_one = 42161,
    arbitrum_goerli = 421613,
    arbitrum_sepolia = 421614,
    fantom = 250,
    fantom_testnet = 4002,
    optimism = 10,
    optimism_sepolia = 11155420,
    harmony = 1666600000,
    harmony_testnet = 1666700000,
    zkevm_testnet = 1402,
    sepolia = 11155111,
    scroll_alpha = 534353,
    scroll_sepolia = 534351,
    scroll = 534352,
    metis_andromeda = 1088,
    base = 8453,
    base_sepolia = 84532,
    bnb = 56
}
export declare type ConstantAddressesByNetwork = Record<string, {
    SYNTHETIX_PROXY_ADDRESS?: tEthereumAddress;
}>;
export declare type MigratorConfig = {
    LEND_TO_AAVE_MIGRATOR: tEthereumAddress;
};
export declare type LendingPoolMarketConfig = {
    LENDING_POOL: tEthereumAddress;
    WETH_GATEWAY?: tEthereumAddress;
    FLASH_LIQUIDATION_ADAPTER?: tEthereumAddress;
    REPAY_WITH_COLLATERAL_ADAPTER?: tEthereumAddress;
    SWAP_COLLATERAL_ADAPTER?: tEthereumAddress;
};
export declare type LendingPoolConfig = Record<string, Record<string, LendingPoolMarketConfig>>;
export declare enum eEthereumTxType {
    ERC20_APPROVAL = "ERC20_APPROVAL",
    DLP_ACTION = "DLP_ACTION",
    GOVERNANCE_ACTION = "GOVERNANCE_ACTION",
    GOV_DELEGATION_ACTION = "GOV_DELEGATION_ACTION",
    STAKE_ACTION = "STAKE_ACTION",
    MIGRATION_LEND_AAVE = "MIGRATION_LEND_AAVE",
    FAUCET_MINT = "FAUCET_MINT",
    REWARD_ACTION = "REWARD_ACTION",
    V3_MIGRATION_ACTION = "V3_MIGRATION_ACTION",
    FAUCET_V2_MINT = "FAUCET_V2_MINT"
}
export declare enum ProtocolAction {
    default = "default",
    supply = "supply",
    borrow = "borrow",
    withdraw = "withdraw",
    deposit = "deposit",
    liquidationCall = "liquidationCall",
    liquidationFlash = "liquidationFlash",
    repay = "repay",
    repayETH = "repayETH",
    repayWithATokens = "repayWithATokens",
    swapCollateral = "swapCollateral",
    repayCollateral = "repayCollateral",
    withdrawETH = "withdrawETH",
    borrowETH = "borrwoETH",
    migrateV3 = "migrateV3",
    supplyWithPermit = "supplyWithPermit",
    repayWithPermit = "repayWithPermit",
    stakeWithPermit = "stakeWithPermit",
    vote = "vote",
    approval = "approval",
    creditDelegationApproval = "creditDelegationApproval",
    stake = "stake",
    stakeCooldown = "stakeCooldown",
    unstake = "unstake",
    switchBorrowRateMode = "switchBorrowRateMode",
    setEModeUsage = "setEModeUsage",
    governanceDelegation = "governanceDelegation",
    claimRewards = "claimRewards",
    claimRewardsAndStake = "claimRewardsAndStake",
    setUsageAsCollateral = "setUsageAsCollateral",
    withdrawAndSwitch = "withdrawAndSwitch",
    batchMetaDelegate = "batchMetaDelegate",
    updateRepresentatives = "updateRepresentatives",
    migrateABPT = "migrateABPT"
}
export declare enum GovernanceVote {
    Abstain = 0,
    Yes = 1,
    No = 2
}
export declare enum Stake {
    aave = "aave",
    bpt = "bpt",
    gho = "gho",
    bptv2 = "bptv2"
}
export declare type GasRecommendationType = Record<string, {
    limit: string;
    recommended: string;
}>;
export declare type GeneratedTx = {
    tx: transactionType;
    gas: {
        price: string;
        limit: string;
    };
};
export declare type transactionType = {
    value?: string;
    from?: string;
    to?: string;
    nonce?: number;
    gasLimit?: BigNumber;
    gasPrice?: BigNumber;
    data?: string;
    chainId?: number;
};
export declare type AddressModel = {
    ADDRESS_PROVIDER_ADDRESS: tEthereumAddress;
    LENDINGPOOL_ADDRESS: tEthereumAddress;
    LENDINGPOOL_CORE_ADDRESS: tEthereumAddress;
    SYNTHETIX_PROXY_ADDRESS: tEthereumAddress;
    GOVERNANCE_PROTO_CONTRACT: tEthereumAddress;
    LEND_TO_AAVE_MIGRATOR: tEthereumAddress;
    WETH_GATEWAY: tEthereumAddress;
    FAUCET: tEthereumAddress;
    SWAP_COLLATERAL_ADAPTER: tEthereumAddress;
    REPAY_WITH_COLLATERAL_ADAPTER: tEthereumAddress;
    AAVE_GOVERNANCE_V2: tEthereumAddress;
    AAVE_GOVERNANCE_V2_EXECUTOR_SHORT: tEthereumAddress;
    AAVE_GOVERNANCE_V2_EXECUTOR_LONG: tEthereumAddress;
    AAVE_GOVERNANCE_V2_HELPER: tEthereumAddress;
    FLASHLIQUIDATION: tEthereumAddress;
    INCENTIVES_CONTROLLER: tEthereumAddress;
    INCENTIVES_CONTROLLER_REWARD_TOKEN: tEthereumAddress;
};
export declare type tCommonContractAddressBetweenMarkets = Pick<AddressModel, 'SYNTHETIX_PROXY_ADDRESS' | 'GOVERNANCE_PROTO_CONTRACT' | 'LEND_TO_AAVE_MIGRATOR' | 'WETH_GATEWAY' | 'FAUCET' | 'SWAP_COLLATERAL_ADAPTER' | 'REPAY_WITH_COLLATERAL_ADAPTER' | 'FLASHLIQUIDATION' | 'INCENTIVES_CONTROLLER' | 'INCENTIVES_CONTROLLER_REWARD_TOKEN'>;
export declare type tDistinctContractAddressBetweenMarkets = Pick<AddressModel, 'ADDRESS_PROVIDER_ADDRESS' | 'LENDINGPOOL_ADDRESS' | 'LENDINGPOOL_CORE_ADDRESS'>;
export declare type tDistinctContractAddressBetweenMarketsV2 = Pick<AddressModel, 'LENDINGPOOL_ADDRESS'>;
export declare type tDistinctGovernanceV2Addresses = Pick<AddressModel, 'AAVE_GOVERNANCE_V2' | 'AAVE_GOVERNANCE_V2_EXECUTOR_SHORT' | 'AAVE_GOVERNANCE_V2_EXECUTOR_LONG' | 'AAVE_GOVERNANCE_V2_HELPER'>;
export declare type tdistinctStakingAddressesBetweenTokens = {
    TOKEN_STAKING_ADDRESS: tEthereumAddress;
    STAKING_REWARD_TOKEN_ADDRESS: tEthereumAddress;
    STAKING_HELPER_ADDRESS: tEthereumAddress;
    canUsePermit: boolean;
};
export declare type ContractAddresses = Record<string, tEthereumAddress>;
export declare type EthereumTransactionTypeExtended = {
    txType: eEthereumTxType;
    tx: () => Promise<transactionType>;
    gas: GasResponse;
};
export declare type TransactionGenerationMethod = {
    rawTxMethod: () => Promise<PopulatedTransaction>;
    from: tEthereumAddress;
    value?: string;
    gasSurplus?: number;
    action?: ProtocolAction;
};
export declare type TransactionGenerationMethodNew = {
    tx: PopulatedTransaction;
    gasSurplus?: number;
    action?: ProtocolAction;
    skipGasEstimation?: boolean;
};
export declare type TransactionGasGenerationMethod = {
    txCallback: () => Promise<transactionType>;
    action?: ProtocolAction;
};
export declare type GasType = {
    gasLimit: string | undefined;
    gasPrice: string;
};
export declare type GasResponse = (force?: boolean) => Promise<GasType | null>;
export declare type DefaultProviderKeys = {
    etherscan?: string;
    infura?: string;
    alchemy?: string;
};
export declare type GovernanceConfigType = Record<string, tDistinctGovernanceV2Addresses>;
export declare type StakingConfigType = Record<string, Record<string, tdistinctStakingAddressesBetweenTokens>>;
export declare type CommonConfigType = Record<string, tCommonContractAddressBetweenMarkets>;
export declare type LendingPoolConfigType = Record<string, Record<string, tDistinctContractAddressBetweenMarketsV2>>;
export declare type PermitSignature = {
    amount: string;
    deadline: string;
    v: number;
    r: BytesLike;
    s: BytesLike;
};
export declare type FlashLoanParams = {
    assetToSwapToList: tEthereumAddress[];
    minAmountsToReceive: string[];
    swapAllBalance: boolean[];
    permitAmount: string[];
    deadline: string[];
    v: number[];
    r: BytesLike[];
    s: BytesLike[];
};
export interface SignedActionRequest {
    signatures: string[];
}
export declare type ActionBundle = {
    action: PopulatedTransaction;
    approvalRequired: boolean;
    approvals: PopulatedTransaction[];
    signatureRequests: string[];
    generateSignedAction: ({ signatures, }: SignedActionRequest) => Promise<PopulatedTransaction>;
    signedActionGasEstimate: string;
};
export declare const DEFAULT_DEADLINE: string;
export declare type BorrowTxBuilder = {
    generateTxData: ({ user, reserve, amount, interestRateMode, debtTokenAddress, onBehalfOf, referralCode, useOptimizedPath, encodedTxData, }: LPBorrowParamsType) => PopulatedTransaction;
    encodeBorrowParams: ({ reserve, amount, interestRateMode, referralCode, }: Omit<LPBorrowParamsType, 'user'>) => Promise<string>;
};
export declare type RepayTxBuilder = {
    generateTxData: (params: LPRepayParamsType) => PopulatedTransaction;
    generateSignedTxData: (params: LPSignedRepayParamsType) => PopulatedTransaction;
    encodeRepayParams: ({ reserve, amount, interestRateMode, }: Omit<LPRepayParamsType, 'user'>) => Promise<string>;
    encodeRepayWithPermitParams: ({ reserve, amount, interestRateMode, deadline, signature, }: Pick<LPSignedRepayParamsType, 'reserve' | 'amount' | 'interestRateMode' | 'signature' | 'deadline'>) => Promise<[string, string, string]>;
};
export declare type RepayWithATokensTxBuilder = {
    generateTxData: (params: LPRepayWithATokensType) => PopulatedTransaction;
    encodeRepayWithATokensParams: ({ reserve, amount, rateMode, }: Omit<LPRepayWithATokensType, 'user'>) => Promise<string>;
};
//# sourceMappingURL=types.d.ts.map