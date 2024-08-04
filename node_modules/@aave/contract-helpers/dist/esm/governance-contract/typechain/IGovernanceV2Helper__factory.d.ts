import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { IGovernanceV2Helper, IGovernanceV2HelperInterface } from './IGovernanceV2Helper';
export declare class IGovernanceV2Helper__factory {
    static readonly abi: ({
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): IGovernanceV2HelperInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IGovernanceV2Helper;
}
//# sourceMappingURL=IGovernanceV2Helper__factory.d.ts.map