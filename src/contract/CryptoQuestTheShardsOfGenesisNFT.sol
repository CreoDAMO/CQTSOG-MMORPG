// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable@4.9.3/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/token/ERC721/extensions/ERC721PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/utils/cryptography/EIP712Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/token/ERC721/extensions/ERC721VotesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable@4.9.3/proxy/utils/UUPSUpgradeable.sol";

/// @custom:security-contact jacquedegraff@creodamo.com
contract CryptoQuestTheShardsOfGenesisERC721 is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable, ERC721PausableUpgradeable, AccessControlUpgradeable, ERC721BurnableUpgradeable, EIP712Upgradeable, ERC721VotesUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    uint256 private _nextTokenId;

    struct LandDetails {
        string location;
        string landType;
    }

    struct CharacterTraits {
        string race;
        string armor;
        string appearance;
    }

    struct ItemTraits {
        uint256 attackBonus;
        uint256 defenseBonus;
        uint256 manaBonus;
        uint256 healthBonus;
    }

    struct GuildDetails {
        string name;
        string heraldry;
    }

    mapping(uint256 => LandDetails) public landDetails;
    mapping(uint256 => CharacterTraits) public characterTraits;
    mapping(uint256 => ItemTraits) public itemTraits;
    mapping(uint256 => GuildDetails) public guildDetails;

    event LandMinted(uint256 indexed landId, address indexed owner, string location, string landType);
    event CharacterMinted(uint256 indexed tokenId, address indexed owner, string race, string armor, string appearance);
    event ItemMinted(uint256 indexed itemId, address indexed owner, string tokenURI, uint256 attackBonus, uint256 defenseBonus, uint256 manaBonus, uint256 healthBonus);
    event GuildCreated(uint256 indexed guildId, address indexed owner, string name, string heraldry);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, address pauser, address minter, address upgrader)
        initializer public
    {
        __ERC721_init("CryptoQuestTheShardsOfGenesisERC721", "CQTNFT");
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __ERC721Pausable_init();
        __AccessControl_init();
        __ERC721Burnable_init();
        __EIP712_init("CryptoQuestTheShardsOfGenesisERC721", "1");
        __ERC721Votes_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(MINTER_ROLE, minter);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address to, string memory uri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function mintCharacter(address to, uint256 tokenId, string memory race, string memory armor, string memory appearance, string memory tokenURI_) public onlyRole(MINTER_ROLE) {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        characterTraits[tokenId] = CharacterTraits(race, armor, appearance);

        emit CharacterMinted(tokenId, to, race, armor, appearance);
    }

    function mintItem(address to, uint256 itemId, string memory tokenURI_, uint256 attackBonus, uint256 defenseBonus, uint256 manaBonus, uint256 healthBonus) public onlyRole(MINTER_ROLE) {
        _mint(to, itemId);
        _setTokenURI(itemId, tokenURI_);
        itemTraits[itemId] = ItemTraits(attackBonus, defenseBonus, manaBonus, healthBonus);

        emit ItemMinted(itemId, to, tokenURI_, attackBonus, defenseBonus, manaBonus, healthBonus);
    }

    function mintGuild(address to, uint256 guildId, string memory name, string memory heraldry, string memory tokenURI_) public onlyRole(MINTER_ROLE) {
        _mint(to, guildId);
        _setTokenURI(guildId, tokenURI_);
        guildDetails[guildId] = GuildDetails(name, heraldry);

        emit GuildCreated(guildId, to, name, heraldry);
    }

    function mintLand(address to, uint256 newLandId, string memory location, string memory landType, string memory tokenURI_) public onlyRole(MINTER_ROLE) {
        _mint(to, newLandId);
        _setTokenURI(newLandId, tokenURI_);
        landDetails[newLandId] = LandDetails(location, landType);

        emit LandMinted(newLandId, to, location, landType);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    function _burn(uint256 tokenId) internal virtual override(ERC721Upgradeable, ERC721URIStorageUpgradeable) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721Upgradeable, ERC721URIStorageUpgradeable) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721PausableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        virtual
        override(ERC721Upgradeable, ERC721VotesUpgradeable)
    {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }
}
