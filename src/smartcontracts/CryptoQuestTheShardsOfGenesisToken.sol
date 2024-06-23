// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.25;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @custom:security-contact jacquedegraff@creodamo.com
contract CryptoQuestTheShardsOfGenesisToken is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, ERC20PausableUpgradeable, AccessControlUpgradeable, ERC20PermitUpgradeable, ERC20VotesUpgradeable, ERC20FlashMintUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant AIRDROPPER_ROLE = keccak256("AIRDROPPER_ROLE");
    bytes32 public constant STAKER_ROLE = keccak256("STAKER_ROLE");
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, address pauser, address minter, address upgrader, address burner, address airdropper, address staker, address dao) 
        initializer public 
    {
        __ERC20_init("CryptoQuestTheShardsOfGenesisToken", "CQT");
        __ERC20Burnable_init();
        __ERC20Pausable_init();
        __AccessControl_init();
        __ERC20Permit_init("CryptoQuestTheShardsOfGenesisToken");
        __ERC20Votes_init();
        __ERC20FlashMint_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(MINTER_ROLE, minter);
        _grantRole(UPGRADER_ROLE, upgrader);
        _grantRole(BURNER_ROLE, burner);
        _grantRole(AIRDROPPER_ROLE, airdropper);
        _grantRole(STAKER_ROLE, staker);
        _grantRole(DAO_ROLE, dao);

        _mint(msg.sender, 1000000000 * 18 ** decimals());
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function adminBurn(uint256 amount) public onlyRole(BURNER_ROLE) {
        _burn(msg.sender, amount);
    }

    function airdrop(address[] calldata recipients, uint256 amount) public onlyRole(AIRDROPPER_ROLE) {
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amount);
        }
    }

    function stakeTokens(uint256 amount) public onlyRole(STAKER_ROLE) {
        _burn(msg.sender, amount);
        // Implement staking logic here
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    // The following functions are overrides required by Solidity.
    function _update(address from, address to, uint256 value) 
        internal 
        override(ERC20Upgradeable, ERC20PausableUpgradeable, ERC20VotesUpgradeable) 
    {
        super._update(from, to, value);
    }

    function nonces(address owner) 
        public 
        view 
        override(ERC20PermitUpgradeable, NoncesUpgradeable) 
        returns (uint256) 
    {
        return super.nonces(owner);
    }

    // Governance-related functions
    function proposeNewFeature(string memory featureDescription) public onlyRole(DAO_ROLE) {
        // Implement DAO proposal logic here
    }

    function voteOnProposal(uint256 proposalId, bool support) public onlyRole(DAO_ROLE) {
        // Implement DAO voting logic here
    }

    function executeProposal(uint256 proposalId) public onlyRole(DAO_ROLE) {
        // Implement DAO proposal execution logic here
    }
}
