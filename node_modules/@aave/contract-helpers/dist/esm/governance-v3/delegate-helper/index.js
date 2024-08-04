import { BigNumber } from 'ethers';
import { ProtocolAction } from '../../commons/types';
import { gasLimitRecommendations } from '../../commons/utils';
import { MetaDelegateHelper__factory } from '../typechain/factories/MetaDelegateHelper__factory';
export var DelegationType;
(function (DelegationType) {
    DelegationType[DelegationType["VOTING"] = 0] = "VOTING";
    DelegationType[DelegationType["PROPOSITION"] = 1] = "PROPOSITION";
    DelegationType[DelegationType["ALL"] = 2] = "ALL";
})(DelegationType || (DelegationType = {}));
export class MetaDelegateHelperService {
    constructor(metaDelegateHelperContractAddress, provider) {
        this._contractInterface = MetaDelegateHelper__factory.createInterface();
        this.metaDelegateHelperContractAddress = metaDelegateHelperContractAddress; // Assign the contract address
        this._contract = MetaDelegateHelper__factory.connect(metaDelegateHelperContractAddress, provider);
    }
    batchMetaDelegate(user, delegateParams) {
        const tx = {
            data: this._contractInterface.encodeFunctionData('batchMetaDelegate', [
                delegateParams,
            ]),
            to: this.metaDelegateHelperContractAddress,
            from: user,
            gasLimit: BigNumber.from(gasLimitRecommendations[ProtocolAction.batchMetaDelegate].limit),
        };
        return tx;
    }
    async prepareV3DelegateByTypeSignature({ underlyingAsset, delegatee, delegationType, delegator, increaseNonce, governanceTokenName, nonce, connectedChainId, deadline, }) {
        const isAllDelegate = delegationType === DelegationType.ALL;
        const sigBaseType = [
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
        ];
        const sigParametersType = [
            { name: 'delegator', type: 'address' },
            { name: 'delegatee', type: 'address' },
        ];
        const sigDelegationTypeType = [{ name: 'delegationType', type: 'uint8' }];
        const typesData = {
            delegator,
            delegatee,
            nonce: BigInt(increaseNonce ? Number(nonce) + 1 : nonce).toString(),
            deadline,
        };
        const eIP712DomainType = {
            EIP712Domain: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'version',
                    type: 'string',
                },
                {
                    name: 'chainId',
                    type: 'uint256',
                },
                {
                    name: 'verifyingContract',
                    type: 'address',
                },
            ],
        };
        const typeData = {
            domain: {
                name: governanceTokenName,
                version: '2',
                chainId: connectedChainId,
                verifyingContract: underlyingAsset,
            },
            types: isAllDelegate
                ? Object.assign(Object.assign({}, eIP712DomainType), { Delegate: [...sigParametersType, ...sigBaseType] }) : Object.assign(Object.assign({}, eIP712DomainType), { DelegateByType: [
                    ...sigParametersType,
                    ...sigDelegationTypeType,
                    ...sigBaseType,
                ] }),
            primaryType: isAllDelegate ? 'Delegate' : 'DelegateByType',
            message: isAllDelegate
                ? Object.assign({}, typesData) : Object.assign(Object.assign({}, typesData), { delegationType }),
        };
        return JSON.stringify(typeData);
    }
}
//# sourceMappingURL=index.js.map