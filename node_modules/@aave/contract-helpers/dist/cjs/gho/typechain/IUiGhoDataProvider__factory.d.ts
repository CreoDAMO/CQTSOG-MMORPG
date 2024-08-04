import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IUiGhoDataProvider, IUiGhoDataProviderInterface } from "./IUiGhoDataProvider";
export declare class IUiGhoDataProvider__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "getGhoReserveData";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "ghoBaseVariableBorrowRate";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "ghoDiscountedPerToken";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "ghoDiscountRate";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "ghoMinDebtTokenBalanceForDiscount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "ghoMinDiscountTokenBalanceForDiscount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint40";
                readonly name: "ghoReserveLastUpdateTimestamp";
                readonly type: "uint40";
            }, {
                readonly internalType: "uint128";
                readonly name: "ghoCurrentBorrowIndex";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint256";
                readonly name: "aaveFacilitatorBucketLevel";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "aaveFacilitatorBucketMaxCapacity";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IUiGhoDataProvider.GhoReserveData";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }];
        readonly name: "getGhoUserData";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "userGhoDiscountPercent";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "userDiscountTokenBalance";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "userPreviousGhoBorrowIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "userGhoScaledBorrowBalance";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IUiGhoDataProvider.GhoUserData";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IUiGhoDataProviderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IUiGhoDataProvider;
}
//# sourceMappingURL=IUiGhoDataProvider__factory.d.ts.map