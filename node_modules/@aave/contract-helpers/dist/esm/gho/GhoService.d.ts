import { providers } from 'ethers';
import { tEthereumAddress } from '../commons/types';
import { IUiGhoDataProvider } from './typechain/IUiGhoDataProvider';
import { GhoReserveData, GhoUserData } from './types';
export interface IGhoService {
    getGhoReserveData: () => Promise<GhoReserveData>;
    getGhoUserData: (userAddress: tEthereumAddress, ghoDiscountTokenAddress?: tEthereumAddress) => Promise<GhoUserData>;
}
export declare class GhoService implements IGhoService {
    readonly ghoDataProviderService: IUiGhoDataProvider;
    constructor({ provider, uiGhoDataProviderAddress, }: {
        provider: providers.Provider;
        uiGhoDataProviderAddress: tEthereumAddress;
    });
    /**
     * Fetches Gho reserve, discount, facilitator data
     * @returns - instance of GhoReserveData with reserve, discount, facilitator data
     */
    getGhoReserveData(): Promise<GhoReserveData>;
    /**
     * Fetches Gho user data for UI display
     * @param userAddress - Address of user to fetch ghoDiscountRate, ghoDiscountTokenBalance, and gho balance indeces
     * @returns - instance of GhoUserData
     */
    getGhoUserData(userAddress: tEthereumAddress): Promise<GhoUserData>;
}
//# sourceMappingURL=GhoService.d.ts.map