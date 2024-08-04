import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { PayloadsControllerDataHelper, PayloadsControllerDataHelperInterface } from '../PayloadsControllerDataHelper';
export declare class PayloadsControllerDataHelper__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract IPayloadsController";
            readonly name: "payloadsController";
            readonly type: "address";
        }, {
            readonly internalType: "enum PayloadsControllerUtils.AccessControl[]";
            readonly name: "accessLevels";
            readonly type: "uint8[]";
        }];
        readonly name: "getExecutorConfigs";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum PayloadsControllerUtils.AccessControl";
                readonly name: "accessLevel";
                readonly type: "uint8";
            }, {
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "executor";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "delay";
                    readonly type: "uint40";
                }];
                readonly internalType: "struct IPayloadsControllerCore.ExecutorConfig";
                readonly name: "config";
                readonly type: "tuple";
            }];
            readonly internalType: "struct IPayloadsControllerDataHelper.ExecutorConfig[]";
            readonly name: "";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IPayloadsController";
            readonly name: "payloadsController";
            readonly type: "address";
        }, {
            readonly internalType: "uint40[]";
            readonly name: "payloadsIds";
            readonly type: "uint40[]";
        }];
        readonly name: "getPayloadsData";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "id";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "creator";
                    readonly type: "address";
                }, {
                    readonly internalType: "enum PayloadsControllerUtils.AccessControl";
                    readonly name: "maximumAccessLevelRequired";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "enum IPayloadsControllerCore.PayloadState";
                    readonly name: "state";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "createdAt";
                    readonly type: "uint40";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "queuedAt";
                    readonly type: "uint40";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "executedAt";
                    readonly type: "uint40";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "cancelledAt";
                    readonly type: "uint40";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "expirationTime";
                    readonly type: "uint40";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "delay";
                    readonly type: "uint40";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "gracePeriod";
                    readonly type: "uint40";
                }, {
                    readonly components: readonly [{
                        readonly internalType: "address";
                        readonly name: "target";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bool";
                        readonly name: "withDelegateCall";
                        readonly type: "bool";
                    }, {
                        readonly internalType: "enum PayloadsControllerUtils.AccessControl";
                        readonly name: "accessLevel";
                        readonly type: "uint8";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "value";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "string";
                        readonly name: "signature";
                        readonly type: "string";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "callData";
                        readonly type: "bytes";
                    }];
                    readonly internalType: "struct IPayloadsControllerCore.ExecutionAction[]";
                    readonly name: "actions";
                    readonly type: "tuple[]";
                }];
                readonly internalType: "struct IPayloadsControllerCore.Payload";
                readonly name: "data";
                readonly type: "tuple";
            }];
            readonly internalType: "struct IPayloadsControllerDataHelper.Payload[]";
            readonly name: "";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): PayloadsControllerDataHelperInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): PayloadsControllerDataHelper;
}
//# sourceMappingURL=PayloadsControllerDataHelper__factory.d.ts.map