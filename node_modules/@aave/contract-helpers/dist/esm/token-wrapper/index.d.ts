import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, PopulatedTransaction, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { BaseTokenWrapper, BaseTokenWrapperInterface } from './typechain/TokenWrapper';
interface SupplyTokenWithPermitParams {
    amount: string;
    onBehalfOf: string;
    referralCode: string;
    deadline: string;
    signature: SignatureLike;
}
export interface TokenWrapperServiceInterface {
    getTokenInForTokenOut: (amount: string) => Promise<BigNumber>;
    getTokenOutForTokenIn: (amount: string) => Promise<BigNumber>;
    supplyToken: (amount: string, onBehalfOf: string, referralCode: string) => PopulatedTransaction;
    supplyTokenWithPermit: ({ amount, onBehalfOf, referralCode, deadline, signature, }: SupplyTokenWithPermitParams) => PopulatedTransaction;
    withdrawToken: (amount: string, user: string) => PopulatedTransaction;
    withdrawTokenWithPermit: (amount: string, user: string, deadline: string, signature: SignatureLike) => PopulatedTransaction;
}
export declare class TokenWrapperService extends BaseService<BaseTokenWrapper> implements TokenWrapperServiceInterface {
    readonly tokenWrapperAddress: string;
    readonly contractInterface: BaseTokenWrapperInterface;
    private readonly _contract;
    constructor(provider: providers.Provider, tokenWrapperAddress: string);
    getTokenInForTokenOut(amount: string): Promise<BigNumber>;
    getTokenOutForTokenIn(amount: string): Promise<BigNumber>;
    supplyToken(amount: string, onBehalfOf: string, referralCode: string): PopulatedTransaction;
    supplyTokenWithPermit({ amount, onBehalfOf, referralCode, deadline, signature, }: SupplyTokenWithPermitParams): PopulatedTransaction;
    withdrawToken(amount: string, user: string): PopulatedTransaction;
    withdrawTokenWithPermit(amount: string, user: string, deadline: string, signature: SignatureLike): PopulatedTransaction;
}
export {};
//# sourceMappingURL=index.d.ts.map