// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.25;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @custom:security-contact jacquedegraff@creodamo.com
contract CryptoQuestTheShardsOfGenesisBookNFT is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable, ERC721PausableUpgradeable, AccessControlUpgradeable, ERC721BurnableUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant ROYALTY_MANAGER_ROLE = keccak256("ROYALTY_MANAGER_ROLE");
    bytes32 public constant PAYMENT_MANAGER_ROLE = keccak256("PAYMENT_MANAGER_ROLE");
    bytes32 public constant BOOK_MANAGER_ROLE = keccak256("BOOK_MANAGER_ROLE");
    bytes32 public constant PUBLISHER_ROLE = keccak256("PUBLISHER_ROLE");

    uint256 private _nextTokenId;
    address private _royaltyReceiver;
    uint96 private _royaltyFeeNumerator; // E.g., 1000 for 10%
    uint256 public nftPrice;
    mapping(address => bool) private _approvedPaymentTokens;

    struct Metadata {
        string chapter;
        string character;
        string location;
        string element;
        string rarity;
    }

    struct Book {
        string title;
        string description;
        string image;
        string pdfUrl;
        string epubUrl;
        bool isPublished;
    }

    mapping(uint256 => Metadata) public tokenMetadata;
    mapping(uint256 => Book) public books;
    uint256 public bookCount;

    event NFTMinted(address indexed to, uint256 indexed tokenId, string uri, Metadata metadata);
    event BookAdded(uint256 indexed bookId, string title, string description, string image, string pdfUrl, string epubUrl);
    event BookPublished(uint256 indexed bookId);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address pauser,
        address minter,
        address upgrader,
        address royaltyManager,
        address paymentManager,
        address bookManager,
        address publisher
    ) initializer public {
        __ERC721_init("CryptoQuestTheShardsOfGenesisBookNFT", "CQTSOGB");
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __ERC721Pausable_init();
        __AccessControl_init();
        __ERC721Burnable_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(MINTER_ROLE, minter);
        _grantRole(UPGRADER_ROLE, upgrader);
        _grantRole(ROYALTY_MANAGER_ROLE, royaltyManager);
        _grantRole(PAYMENT_MANAGER_ROLE, paymentManager);
        _grantRole(BOOK_MANAGER_ROLE, bookManager);
        _grantRole(PUBLISHER_ROLE, publisher);
    }

    function setNftPrice(uint256 newPrice) public onlyRole(PAYMENT_MANAGER_ROLE) {
        nftPrice = newPrice;
    }

    function addPaymentToken(address token) public onlyRole(PAYMENT_MANAGER_ROLE) {
        _approvedPaymentTokens[token] = true;
    }

    function removePaymentToken(address token) public onlyRole(PAYMENT_MANAGER_ROLE) {
        _approvedPaymentTokens[token] = false;
    }

    function setRoyaltyInfo(address receiver, uint96 feeNumerator) public onlyRole(ROYALTY_MANAGER_ROLE) {
        _royaltyReceiver = receiver;
        _royaltyFeeNumerator = feeNumerator;
    }

    function addBook(string memory title, string memory description, string memory image, string memory pdfUrl, string memory epubUrl) public onlyRole(BOOK_MANAGER_ROLE) {
        books[bookCount] = Book(title, description, image, pdfUrl, epubUrl, false);
        emit BookAdded(bookCount, title, description, image, pdfUrl, epubUrl);
        bookCount++;
    }

    function publishBook(uint256 bookId) public onlyRole(PUBLISHER_ROLE) {
        require(bookId < bookCount, "Invalid book ID");
        books[bookId].isPublished = true;
        emit BookPublished(bookId);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address to, string memory uri, Metadata memory metadata) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        tokenMetadata[tokenId] = metadata;
        emit NFTMinted(to, tokenId, uri, metadata);
    }

    function mintNFT(address to, string memory uri, address paymentToken, Metadata memory metadata) public payable onlyRole(MINTER_ROLE) {
        require(_approvedPaymentTokens[paymentToken], "Unsupported payment token");

        if (paymentToken != address(0)) {
            require(IERC20(paymentToken).transferFrom(msg.sender, address(this), nftPrice), "Payment failed");
        } else {
            require(msg.value == nftPrice, "Incorrect amount sent");
        }

        safeMint(to, uri, metadata);
    }

    function _authorizeUpgrade(address newImplementation) internal onlyRole(UPGRADER_ROLE) override {}

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721PausableUpgradeable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

// View function to get book details
    function getBook(uint256 bookId) public view returns (Book memory) {
        require(bookId < bookCount, "Invalid book ID");
        return books[bookId];
    }

    }
