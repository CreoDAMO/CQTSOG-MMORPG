import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { IERC20FaucetOwnable } from './IERC20FaucetOwnable';
export declare class IERC20FaucetOwnable__factory {
    static readonly abi: {
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
    }[];
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20FaucetOwnable;
}
//# sourceMappingURL=IERC20FaucetOwnable__factory.d.ts.map