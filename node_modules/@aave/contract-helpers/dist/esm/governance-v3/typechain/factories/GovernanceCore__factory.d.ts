import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { GovernanceCore, GovernanceCoreInterface } from '../GovernanceCore';
export declare class GovernanceCore__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "cancellationFee";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "bool";
            readonly name: "success";
            readonly type: "bool";
        }];
        readonly name: "CancellationFeeRedeemed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "cancellationFee";
            readonly type: "uint256";
        }];
        readonly name: "CancellationFeeUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "oldGuardian";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newGuardian";
            readonly type: "address";
        }];
        readonly name: "GuardianUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint40";
            readonly name: "payloadId";
            readonly type: "uint40";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "payloadsController";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "chainId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "payloadNumberOnProposal";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "numberOfPayloadsOnProposal";
            readonly type: "uint256";
        }];
        readonly name: "PayloadSent";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newPowerStrategy";
            readonly type: "address";
        }];
        readonly name: "PowerStrategyUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }];
        readonly name: "ProposalCanceled";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "creator";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "enum PayloadsControllerUtils.AccessControl";
            readonly name: "accessLevel";
            readonly type: "uint8";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "ipfsHash";
            readonly type: "bytes32";
        }];
        readonly name: "ProposalCreated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }];
        readonly name: "ProposalExecuted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "votesFor";
            readonly type: "uint128";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "votesAgainst";
            readonly type: "uint128";
        }];
        readonly name: "ProposalFailed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "votesFor";
            readonly type: "uint128";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "votesAgainst";
            readonly type: "uint128";
        }];
        readonly name: "ProposalQueued";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "voter";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "representative";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "chainId";
            readonly type: "uint256";
        }];
        readonly name: "RepresentativeUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "voter";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "bool";
            readonly name: "support";
            readonly type: "bool";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "underlyingAsset";
                readonly type: "address";
            }, {
                readonly internalType: "uint128";
                readonly name: "slot";
                readonly type: "uint128";
            }];
            readonly indexed: false;
            readonly internalType: "struct IVotingMachineWithProofs.VotingAssetWithSlot[]";
            readonly name: "votingAssetsWithSlot";
            readonly type: "tuple[]";
        }];
        readonly name: "VoteForwarded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "snapshotBlockHash";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint24";
            readonly name: "votingDuration";
            readonly type: "uint24";
        }];
        readonly name: "VotingActivated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "enum PayloadsControllerUtils.AccessControl";
            readonly name: "accessLevel";
            readonly type: "uint8";
        }, {
            readonly indexed: false;
            readonly internalType: "uint24";
            readonly name: "votingDuration";
            readonly type: "uint24";
        }, {
            readonly indexed: false;
            readonly internalType: "uint24";
            readonly name: "coolDownBeforeVotingStart";
            readonly type: "uint24";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "yesThreshold";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "yesNoDifferential";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "minPropositionPower";
            readonly type: "uint256";
        }];
        readonly name: "VotingConfigUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "votingPortal";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "bool";
            readonly name: "approved";
            readonly type: "bool";
        }];
        readonly name: "VotingPortalUpdated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "ACHIEVABLE_VOTING_PARTICIPATION";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "CANCELLATION_FEE_COLLECTOR";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "COOLDOWN_PERIOD";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "MIN_VOTING_DURATION";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "NAME";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "PRECISION_DIVIDER";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "PROPOSAL_EXPIRATION_TIME";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "VOTING_TOKENS_CAP";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }];
        readonly name: "activateVoting";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "votingPortals";
            readonly type: "address[]";
        }];
        readonly name: "addVotingPortals";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }];
        readonly name: "cancelProposal";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "chain";
                readonly type: "uint256";
            }, {
                readonly internalType: "enum PayloadsControllerUtils.AccessControl";
                readonly name: "accessLevel";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "payloadsController";
                readonly type: "address";
            }, {
                readonly internalType: "uint40";
                readonly name: "payloadId";
                readonly type: "uint40";
            }];
            readonly internalType: "struct PayloadsControllerUtils.Payload[]";
            readonly name: "payloads";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "votingPortal";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "ipfsHash";
            readonly type: "bytes32";
        }];
        readonly name: "createProposal";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }];
        readonly name: "executeProposal";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCancellationFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getPowerStrategy";
        readonly outputs: readonly [{
            readonly internalType: "contract IGovernancePowerStrategy";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }];
        readonly name: "getProposal";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum IGovernanceCore.State";
                readonly name: "state";
                readonly type: "uint8";
            }, {
                readonly internalType: "enum PayloadsControllerUtils.AccessControl";
                readonly name: "accessLevel";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint40";
                readonly name: "creationTime";
                readonly type: "uint40";
            }, {
                readonly internalType: "uint24";
                readonly name: "votingDuration";
                readonly type: "uint24";
            }, {
                readonly internalType: "uint40";
                readonly name: "votingActivationTime";
                readonly type: "uint40";
            }, {
                readonly internalType: "uint40";
                readonly name: "queuingTime";
                readonly type: "uint40";
            }, {
                readonly internalType: "uint40";
                readonly name: "cancelTimestamp";
                readonly type: "uint40";
            }, {
                readonly internalType: "address";
                readonly name: "creator";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "votingPortal";
                readonly type: "address";
            }, {
                readonly internalType: "bytes32";
                readonly name: "snapshotBlockHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bytes32";
                readonly name: "ipfsHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint128";
                readonly name: "forVotes";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "againstVotes";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint256";
                readonly name: "cancellationFee";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "chain";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "enum PayloadsControllerUtils.AccessControl";
                    readonly name: "accessLevel";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "payloadsController";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint40";
                    readonly name: "payloadId";
                    readonly type: "uint40";
                }];
                readonly internalType: "struct PayloadsControllerUtils.Payload[]";
                readonly name: "payloads";
                readonly type: "tuple[]";
            }];
            readonly internalType: "struct IGovernanceCore.Proposal";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }];
        readonly name: "getProposalState";
        readonly outputs: readonly [{
            readonly internalType: "enum IGovernanceCore.State";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getProposalsCount";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "voter";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "chainId";
            readonly type: "uint256";
        }];
        readonly name: "getRepresentativeByChain";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "representative";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "chainId";
            readonly type: "uint256";
        }];
        readonly name: "getRepresentedVotersByChain";
        readonly outputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "";
            readonly type: "address[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "enum PayloadsControllerUtils.AccessControl";
            readonly name: "accessLevel";
            readonly type: "uint8";
        }];
        readonly name: "getVotingConfig";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint24";
                readonly name: "coolDownBeforeVotingStart";
                readonly type: "uint24";
            }, {
                readonly internalType: "uint24";
                readonly name: "votingDuration";
                readonly type: "uint24";
            }, {
                readonly internalType: "uint56";
                readonly name: "yesThreshold";
                readonly type: "uint56";
            }, {
                readonly internalType: "uint56";
                readonly name: "yesNoDifferential";
                readonly type: "uint56";
            }, {
                readonly internalType: "uint56";
                readonly name: "minPropositionPower";
                readonly type: "uint56";
            }];
            readonly internalType: "struct IGovernanceCore.VotingConfig";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getVotingPortalsCount";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "guardian";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "votingPortal";
            readonly type: "address";
        }];
        readonly name: "isVotingPortalApproved";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint128";
            readonly name: "forVotes";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "againstVotes";
            readonly type: "uint128";
        }];
        readonly name: "queueProposal";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "proposalIds";
            readonly type: "uint256[]";
        }];
        readonly name: "redeemCancellationFee";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "votingPortals";
            readonly type: "address[]";
        }];
        readonly name: "removeVotingPortals";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "votingPortal";
            readonly type: "address";
        }];
        readonly name: "rescueVotingPortal";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IGovernancePowerStrategy";
            readonly name: "powerStrategy";
            readonly type: "address";
        }];
        readonly name: "setPowerStrategy";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum PayloadsControllerUtils.AccessControl";
                readonly name: "accessLevel";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint24";
                readonly name: "coolDownBeforeVotingStart";
                readonly type: "uint24";
            }, {
                readonly internalType: "uint24";
                readonly name: "votingDuration";
                readonly type: "uint24";
            }, {
                readonly internalType: "uint256";
                readonly name: "yesThreshold";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "yesNoDifferential";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "minPropositionPower";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IGovernanceCore.SetVotingConfigInput[]";
            readonly name: "votingConfigs";
            readonly type: "tuple[]";
        }];
        readonly name: "setVotingConfigs";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "cancellationFee";
            readonly type: "uint256";
        }];
        readonly name: "updateCancellationFee";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newGuardian";
            readonly type: "address";
        }];
        readonly name: "updateGuardian";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "representative";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "chainId";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IGovernanceCore.RepresentativeInput[]";
            readonly name: "representatives";
            readonly type: "tuple[]";
        }];
        readonly name: "updateRepresentativesForChain";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): GovernanceCoreInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): GovernanceCore;
}
//# sourceMappingURL=GovernanceCore__factory.d.ts.map