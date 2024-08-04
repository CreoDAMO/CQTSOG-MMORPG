import { PayloadsControllerDataHelper__factory } from '../typechain/factories/PayloadsControllerDataHelper__factory';
export var PayloadState;
(function (PayloadState) {
    PayloadState[PayloadState["None"] = 0] = "None";
    PayloadState[PayloadState["Created"] = 1] = "Created";
    PayloadState[PayloadState["Queued"] = 2] = "Queued";
    PayloadState[PayloadState["Executed"] = 3] = "Executed";
    PayloadState[PayloadState["Cancelled"] = 4] = "Cancelled";
    PayloadState[PayloadState["Expired"] = 5] = "Expired";
})(PayloadState || (PayloadState = {}));
export class PayloadsDataHelperService {
    constructor(payloadsHelperContracAddress, provider) {
        this._contract = PayloadsControllerDataHelper__factory.connect(payloadsHelperContracAddress, provider);
    }
    async getPayloadsData(payloadsControllerAddress, payloadsIds) {
        const data = await this._contract.getPayloadsData(payloadsControllerAddress, payloadsIds);
        const payloads = data.map(payload => {
            return {
                id: payload.id.toString(),
                creator: payload.data.creator,
                maximumAccessLevelRequired: payload.data.maximumAccessLevelRequired,
                state: payload.data.state,
                createdAt: payload.data.createdAt,
                queuedAt: payload.data.queuedAt,
                executedAt: payload.data.executedAt,
                cancelledAt: payload.data.cancelledAt,
                expirationTime: payload.data.expirationTime,
                delay: payload.data.delay,
                gracePeriod: payload.data.gracePeriod,
                actions: payload.data.actions.map(action => {
                    return {
                        target: action.target,
                        withDelegateCall: action.withDelegateCall,
                        accessLevel: action.accessLevel,
                        value: action.value.toString(),
                        signature: action.signature,
                        callData: action.callData,
                    };
                }),
            };
        });
        return payloads;
    }
}
//# sourceMappingURL=index.js.map