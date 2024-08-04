import { SignatureLike } from '@ethersproject/bytes';
import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { EthereumTransactionTypeExtended, tEthereumAddress } from '../commons/types';
import { ERC20_2612Interface } from '../erc20-2612';
import { IERC20ServiceInterface } from '../erc20-contract';
import { StakedAaveV3 } from './typechain/IStakedAaveV3';
export interface StakingInterface {
    stakingContractAddress: tEthereumAddress;
    stake: (user: tEthereumAddress, amount: string, onBehalfOf?: tEthereumAddress) => Promise<EthereumTransactionTypeExtended[]>;
    redeem: (user: tEthereumAddress, amount: string) => Promise<EthereumTransactionTypeExtended[]>;
    cooldown: (user: tEthereumAddress) => EthereumTransactionTypeExtended[];
    claimRewards: (user: tEthereumAddress, amount: string) => Promise<EthereumTransactionTypeExtended[]>;
    signStaking: (user: tEthereumAddress, amount: string, deadline: string) => Promise<string>;
    stakeWithPermit: (user: tEthereumAddress, amount: string, signature: string, deadline: string) => Promise<EthereumTransactionTypeExtended[]>;
    claimRewardsAndStake: (user: tEthereumAddress, amount: string) => Promise<EthereumTransactionTypeExtended[]>;
}
declare type StakingServiceConfig = {
    TOKEN_STAKING_ADDRESS: string;
};
export declare class StakingService extends BaseService<StakedAaveV3> implements StakingInterface {
    readonly stakingContractAddress: tEthereumAddress;
    readonly erc20Service: IERC20ServiceInterface;
    readonly erc20_2612Service: ERC20_2612Interface;
    constructor(provider: providers.Provider, stakingServiceConfig: StakingServiceConfig);
    signStaking(user: tEthereumAddress, amount: string, deadline: string): Promise<string>;
    stakeWithPermit(user: tEthereumAddress, amount: string, signature: SignatureLike, deadline: string): Promise<EthereumTransactionTypeExtended[]>;
    stake(user: tEthereumAddress, amount: string, onBehalfOf?: tEthereumAddress): Promise<EthereumTransactionTypeExtended[]>;
    redeem(user: tEthereumAddress, amount: string): Promise<EthereumTransactionTypeExtended[]>;
    cooldown(user: tEthereumAddress): EthereumTransactionTypeExtended[];
    claimRewards(user: tEthereumAddress, amount: string): Promise<EthereumTransactionTypeExtended[]>;
    claimRewardsAndStake(user: tEthereumAddress, amount: string): Promise<EthereumTransactionTypeExtended[]>;
}
export {};
//# sourceMappingURL=index.d.ts.map