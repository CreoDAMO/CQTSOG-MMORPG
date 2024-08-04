import { BigNumber, PopulatedTransaction, providers } from 'ethers';
import { AaveTokenV3 } from '../typechain/AaveTokenV3';
export declare enum GovernancePowerType {
    VOTING = 0,
    PROPOSITION = 1,
    ALL = 2
}
interface Eip712Domain {
    name: string;
    version: string;
    chainId: BigNumber;
    verifyingContract: string;
}
export declare class AaveTokenV3Service {
    readonly _contract: AaveTokenV3;
    readonly _contractInterface: import("../typechain/AaveTokenV3").AaveTokenV3Interface;
    constructor(tokenAddress: string, provider: providers.Provider);
    balanceOf(user: string): Promise<BigNumber>;
    getPowerAt(blockNumber: number, user: string, delegationType: GovernancePowerType): Promise<[BigNumber]>;
    getPowers(user: string): Promise<{
        votingPower: BigNumber;
        propositionPower: BigNumber;
    }>;
    getDelegateeData(user: string): Promise<{
        votingDelegatee: string;
        propositionDelegatee: string;
    }>;
    getDelegateTxData(user: string, delegateTo: string, type: GovernancePowerType): PopulatedTransaction;
    getEip712Domain(): Promise<Eip712Domain>;
}
export {};
//# sourceMappingURL=index.d.ts.map