// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @custom:security-contact jacquedegraff@creodamo.com
contract CryptoQuestTheShardsOfGenesis1155 is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, ERC1155PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    enum TokenType { CONSUMABLE, RESOURCE, LOOT, COSMETIC, LAND, MOUNT, GUILD, QUEST }

    struct TokenDetails {
        TokenType tokenType;
        string metadata;
    }

    mapping(uint256 => TokenDetails) public tokenDetails;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, address pauser, address minter, address upgrader)
        initializer public
    {
        __ERC1155_init("");
        __AccessControl_init();
        __ERC1155Pausable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(MINTER_ROLE, minter);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data, TokenType tokenType, string memory metadata)
        public
        onlyRole(MINTER_ROLE)
    {
        _mint(account, id, amount, data);
        tokenDetails[id] = TokenDetails(tokenType, metadata);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data, TokenType[] memory tokenTypes, string[] memory metadata)
        public
        onlyRole(MINTER_ROLE)
    {
        require(ids.length == tokenTypes.length && ids.length == metadata.length, "CryptoQuest: IDs, types, and metadata length mismatch");
        _mintBatch(to, ids, amounts, data);
        for (uint256 i = 0; i < ids.length; i++) {
            tokenDetails[ids[i]] = TokenDetails(tokenTypes[i], metadata[i]);
        }
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyRole(UPGRADER_ROLE)
        override
    {}

    // The following functions are overrides required by Solidity.
    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155Upgradeable, ERC1155PausableUpgradeable, ERC1155SupplyUpgradeable)
    {
        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Additional functions for game mechanics
    function useConsumable(uint256 id, uint256 amount) public {
        require(balanceOf(msg.sender, id) >= amount, "CryptoQuest: Insufficient balance");
        require(tokenDetails[id].tokenType == TokenType.CONSUMABLE, "CryptoQuest: Token is not a consumable");

        _burn(msg.sender, id, amount);
        // Implement consumable effect logic here
    }

    function gatherResource(uint256 id, uint256 amount) public {
        require(tokenDetails[id].tokenType == TokenType.RESOURCE, "CryptoQuest: Token is not a resource");

        _mint(msg.sender, id, amount, "");
    }

    function tradeLoot(uint256 id, uint256 amount, address to) public {
        require(tokenDetails[id].tokenType == TokenType.LOOT, "CryptoQuest: Token is not loot");
        require(balanceOf(msg.sender, id) >= amount, "CryptoQuest: Insufficient balance");

        safeTransferFrom(msg.sender, to, id, amount, "");
    }

    function displayCosmetic(uint256 id) public view returns (string memory) {
        require(tokenDetails[id].tokenType == TokenType.COSMETIC, "CryptoQuest: Token is not a cosmetic");

        return tokenDetails[id].metadata;
    }

    function claimLand(uint256 id) public view {
        require(tokenDetails[id].tokenType == TokenType.LAND, "CryptoQuest: Token is not land");
        require(balanceOf(msg.sender, id) > 0, "CryptoQuest: You do not own this land");

        // Implement land claiming logic here
    }

    function summonMount(uint256 id) public view returns (string memory) {
        require(tokenDetails[id].tokenType == TokenType.MOUNT, "CryptoQuest: Token is not a mount");
        require(balanceOf(msg.sender, id) > 0, "CryptoQuest: You do not own this mount");

        return tokenDetails[id].metadata;
    }

    function displayGuildBanner(uint256 id) public view returns (string memory) {
        require(tokenDetails[id].tokenType == TokenType.GUILD, "CryptoQuest: Token is not a guild banner");
        require(balanceOf(msg.sender, id) > 0, "CryptoQuest: You do not own this guild banner");

        return tokenDetails[id].metadata;
    }

    function useQuestToken(uint256 id) public {
        require(tokenDetails[id].tokenType == TokenType.QUEST, "CryptoQuest: Token is not a quest token");
        require(balanceOf(msg.sender, id) > 0, "CryptoQuest: You do not own this quest token");

        _burn(msg.sender, id, 1);
        // Implement quest token usage logic here
    }

    function listItemForSale(uint256 id, uint256 amount /*, uint256 price */) public view {
        require(balanceOf(msg.sender, id) >= amount, "CryptoQuest: Insufficient balance");
        // Implement marketplace listing logic here
    }
}
