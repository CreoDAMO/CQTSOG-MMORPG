import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { IMigrationHelper, IMigrationHelperInterface } from './IMigrationHelper';
export declare class IMigrationHelper__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
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
    })[];
    static createInterface(): IMigrationHelperInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMigrationHelper;
}
//# sourceMappingURL=IMigrationHelper__factory.d.ts.map