import { providers } from 'ethers';
import { GeneralStakeUIDataHumanized, GetUserStakeUIDataHumanized } from './types';
declare type EthAddress = string;
export interface UiStakeDataProviderInterfaceV3 {
    getStakedAssetDataBatch: (stakedAssets: EthAddress[], oracles: EthAddress[]) => Promise<GeneralStakeUIDataHumanized>;
    getUserStakeUIDataHumanized: (params: {
        user: string;
        stakedAssets: EthAddress[];
        oracles: EthAddress[];
    }) => Promise<GetUserStakeUIDataHumanized>;
}
export declare type UiStakeDataProviderContext = {
    uiStakeDataProvider: string;
    provider: providers.Provider;
};
export declare class UiStakeDataProviderV3 implements UiStakeDataProviderInterfaceV3 {
    private readonly _contract;
    constructor(context: UiStakeDataProviderContext);
    getUserStakeUIDataHumanized({ user, stakedAssets, oracles, }: {
        user: string;
        stakedAssets: EthAddress[];
        oracles: EthAddress[];
    }): Promise<GetUserStakeUIDataHumanized>;
    getStakedAssetDataBatch(stakedAssets: EthAddress[], oracles: EthAddress[]): Promise<GeneralStakeUIDataHumanized>;
}
export {};
//# sourceMappingURL=index.d.ts.map