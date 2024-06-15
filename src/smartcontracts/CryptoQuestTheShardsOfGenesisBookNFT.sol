// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @custom:security-contact jacquedegraff@creodamo.com
interface IERC2981 {
    function royaltyInfo(uint256 tokenId, uint256 value) external view returns (address receiver, uint256 royaltyAmount);
}

contract CryptoQuestTheShardsOfGenesisBookNFT is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable, ERC721PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable, IERC2981 {
    uint256 private _nextTokenId;
    mapping(uint256 => address[]) private _royaltyRecipients;
    mapping(uint256 => uint256[]) private _royaltyShares;
    mapping(uint256 => uint256) private _totalShares;
    string private _metadataURI;  // Metadata URI
    mapping(address => bool) public supportedPaymentTokens;  // List of supported payment tokens
    address public paymentReceiver;  // Address that receives the payments

    /// @custom:oz-upgrades-unsafe-allow
    constructor() {
        _disableInitializers();
    }

    function initialize(address initialOwner, string memory metadataURI, address[] memory paymentTokens, address receiver) initializer public {
        __ERC721_init("CryptoQuestTheShardsOfGenesisBookNFT", "CQTSOGB");
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __ERC721Pausable_init();
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        _metadataURI = metadataURI;  // Set the initial metadata URI

        for (uint256 i = 0; i < paymentTokens.length; i++) {
            supportedPaymentTokens[paymentTokens[i]] = true;
        }
        paymentReceiver = receiver;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function batchMint(address to, string[] memory uris) public onlyOwner {
        for (uint256 i = 0; i < uris.length; i++) {
            uint256 tokenId = _nextTokenId++;
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uris[i]);
        }
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }

    function transferToken(address from, address to, uint256 tokenId) public onlyOwner {
        _transfer(from, to, tokenId);
    }

    function updateTokenURI(uint256 tokenId, string memory uri) public onlyOwner {
        _setTokenURI(tokenId, uri);
    }

    function setMetadataURI(string memory metadataURI) public onlyOwner {
        _metadataURI = metadataURI;
    }

    function getMetadataURI() public view returns (string memory) {
        return _metadataURI;
    }

    function setRoyaltyRecipients(uint256 tokenId, address[] memory recipients, uint256[] memory shares) public onlyOwner {
        require(recipients.length == shares.length, "Recipients and shares length mismatch");
        uint256 totalShares;
        for (uint256 i = 0; i < shares.length; i++) {
            totalShares += shares[i];
        }
        require(totalShares == 10000, "Total shares must equal 10000 (100%)");

        _royaltyRecipients[tokenId] = recipients;
        _royaltyShares[tokenId] = shares;
        _totalShares[tokenId] = totalShares;
    }

    function getRoyaltyRecipients(uint256 tokenId) public view returns (address[] memory, uint256[] memory) {
        return (_royaltyRecipients[tokenId], _royaltyShares[tokenId]);
    }

    function _authorizeUpgrade(address newImplementation) internal onlyOwner override {}

    function _update(address to, uint256 tokenId, address auth) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721PausableUpgradeable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721Upgradeable, ERC721URIStorageUpgradeable) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function royaltyInfo(uint256 tokenId, uint256 value) external view override returns (address, uint256) {
        address[] memory recipients = _royaltyRecipients[tokenId];
        uint256[] memory shares = _royaltyShares[tokenId];
        uint256 totalShares = _totalShares[tokenId];

        if (recipients.length == 0 || totalShares == 0) {
            return (address(0), 0);
        }

        uint256 royaltyAmount;
        for (uint256 i = 0; i < recipients.length; i++) {
            royaltyAmount += (value * shares[i]) / totalShares;
        }

        return (recipients[0], royaltyAmount);  // Only returning the first recipient's royalty amount for simplicity
    }

    function _baseURI() internal view override returns (string memory) {
        return _metadataURI;
    }

    function purchaseNFT(address paymentToken, uint256 amount, string memory uri) public payable {
        require(supportedPaymentTokens[paymentToken] || paymentToken == address(0), "Unsupported payment token");

        if (paymentToken == address(0)) {
            // Payment in MATIC
            require(msg.value == amount, "Incorrect MATIC amount sent");
            payable(paymentReceiver).transfer(amount);
        } else {
            // Payment in ERC20 token
            IERC20(paymentToken).transferFrom(msg.sender, paymentReceiver, amount);
        }

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function addPaymentToken(address token) public onlyOwner {
        supportedPaymentTokens[token] = true;
    }

    function removePaymentToken(address token) public onlyOwner {
        supportedPaymentTokens[token] = false;
    }

    // Other contract functions...
}
