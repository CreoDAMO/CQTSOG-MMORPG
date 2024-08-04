import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { StakedTokenDataProvider } from "./StakedTokenDataProvider";
export declare class StakedTokenDataProvider__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(aave: string, stkAave: string, bpt: string, stkBpt: string, ethUsdPriceFeed: string, aavePriceFeed: string, bptPriceFeed: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<StakedTokenDataProvider>;
    getDeployTransaction(aave: string, stkAave: string, bpt: string, stkBpt: string, ethUsdPriceFeed: string, aavePriceFeed: string, bptPriceFeed: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): StakedTokenDataProvider;
    connect(signer: Signer): StakedTokenDataProvider__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): StakedTokenDataProvider;
}
//# sourceMappingURL=StakedTokenDataProviderFactory.d.ts.map