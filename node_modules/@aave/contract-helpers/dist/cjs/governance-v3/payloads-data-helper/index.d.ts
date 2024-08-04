import { providers } from 'ethers';
import { AccessLevel } from '../governance-data-helper';
export declare enum PayloadState {
    None = 0,
    Created = 1,
    Queued = 2,
    Executed = 3,
    Cancelled = 4,
    Expired = 5
}
export declare type ExecutionAction = {
    target: string;
    withDelegateCall: boolean;
    accessLevel: AccessLevel;
    value: string;
    signature: string;
    callData: string;
};
export declare type Payload = {
    id: string;
    creator: string;
    maximumAccessLevelRequired: AccessLevel;
    state: PayloadState;
    createdAt: number;
    queuedAt: number;
    executedAt: number;
    cancelledAt: number;
    expirationTime: number;
    delay: number;
    gracePeriod: number;
    actions: ExecutionAction[];
};
export declare class PayloadsDataHelperService {
    private readonly _contract;
    constructor(payloadsHelperContracAddress: string, provider: providers.Provider);
    getPayloadsData(payloadsControllerAddress: string, payloadsIds: number[]): Promise<Payload[]>;
}
//# sourceMappingURL=index.d.ts.map