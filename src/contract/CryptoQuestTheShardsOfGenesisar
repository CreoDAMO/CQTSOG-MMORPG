// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

/// @custom:security-contact jacquedegraff@creodamo.com
contract CryptoQuestTheShardsOfGenesisMarketplace is Initializable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using AddressUpgradeable for address;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    IERC721EnumerableUpgradeable public nftContract;
    IERC1155Upgradeable public nftContract1155;

    CountersUpgradeable.Counter private _listingIds;

    struct Listing {
        address seller;
        uint256 itemId;
        uint256 quantity;
        uint256 price;
        address currency;
        uint256 endTime;
        bool active;
        string category;
        uint256 rarity;
    }

    mapping(uint256 => Listing) private _listings;
    mapping(address => bool) private _moderators;
    mapping(address => uint256) public sellerReputation;
    mapping(address => uint256) private sellerSales; // Moved mapping to storage

    event ItemListed(
        uint256 indexed listingId,
        address indexed seller,
        uint256 indexed itemId,
        uint256 quantity,
        uint256 price,
        address currency,
        uint256 endTime,
        string category,
        uint256 rarity
    );
    event ItemSold(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 indexed itemId,
        uint256 quantity,
        uint256 price,
        address currency
    );
    event ListingCancelled(uint256 indexed listingId);
    event ListingExpired(uint256 indexed listingId);
    event ModeratorAdded(address indexed moderator);
    event ModeratorRemoved(address indexed moderator);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, address pauser, address upgrader, address nftAddress, address nftAddress1155)
        initializer public
    {
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(UPGRADER_ROLE, upgrader);

        nftContract = IERC721EnumerableUpgradeable(nftAddress);
        nftContract1155 = IERC1155Upgradeable(nftAddress1155);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function addModerator(address moderator) public onlyRole(UPGRADER_ROLE) {
        require(!_moderators[moderator], "Moderator already exists");
        _moderators[moderator] = true;
        emit ModeratorAdded(moderator);
    }

    function removeModerator(address moderator) public onlyRole(UPGRADER_ROLE) {
        require(_moderators[moderator], "Moderator does not exist");
        _moderators[moderator] = false;
        emit ModeratorRemoved(moderator);
    }

    function listNFT(
        uint256 itemId,
        uint256 quantity,
        uint256 price,
        address currency,
        uint256 endTime,
        string memory category,
        uint256 rarity
    ) external whenNotPaused {
        require(quantity > 0, "Quantity must be greater than zero");
        require(price > 0, "Price must be greater than zero");
        require(endTime > block.timestamp, "End time must be in the future");
        require(
            nftContract.ownerOf(itemId) == msg.sender ||
            nftContract1155.balanceOf(msg.sender, itemId) >= quantity,
            "You do not own the NFTs"
        );

        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        _listings[listingId] = Listing({
            seller: msg.sender,
            itemId: itemId,
            quantity: quantity,
            price: price,
            currency: currency,
            endTime: endTime,
            active: true,
            category: category,
            rarity: rarity
        });

        emit ItemListed(listingId, msg.sender, itemId, quantity, price, currency, endTime, category, rarity);
    }

    function buyNFT(uint256 listingId, uint256 quantity) external payable whenNotPaused {
        require(_listings[listingId].active, "Listing is not active");
        require(_listings[listingId].quantity >= quantity, "Not enough quantity available");
        require(_listings[listingId].endTime > block.timestamp, "Listing has expired");

        uint256 totalPrice = _listings[listingId].price * quantity;
        require(msg.value >= totalPrice, "Insufficient funds");

        _listings[listingId].quantity -= quantity;
        _transferNFT(_listings[listingId].itemId, quantity, msg.sender);

        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        emit ItemSold(listingId, msg.sender, _listings[listingId].itemId, quantity, _listings[listingId].price, _listings[listingId].currency);
        if (_listings[listingId].quantity == 0) {
            _listings[listingId].active = false;
            emit ListingExpired(listingId);
        }

        sellerSales[_listings[listingId].seller]++; // Track sales for the seller
    }

    function cancelListing(uint256 listingId) external {
        require(_listings[listingId].seller == msg.sender, "You are not the seller of this listing");
        require(_listings[listingId].active, "Listing is not active");

        _listings[listingId].active = false;
        emit ListingCancelled(listingId);
    }

    function _transferNFT(uint256 itemId, uint256 quantity, address to) internal {
        if (nftContract.supportsInterface(type(IERC1155Upgradeable).interfaceId)) {
            nftContract1155.safeTransferFrom(msg.sender, to, itemId, quantity, "");
        } else {
            for (uint256 i = 0; i < quantity; i++) {
                nftContract.safeTransferFrom(msg.sender, to, itemId);
            }
        }
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override(UUPSUpgradeable)
        onlyRole(UPGRADER_ROLE)
    {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Additional functionalities for enhanced marketplace integration

    function filterListingsByCategory(string memory category) public view returns (Listing[] memory) {
        uint256 totalListings = _listingIds.current();
        uint256 resultCount;
        for (uint256 i = 1; i <= totalListings; i++) {
            if (keccak256(abi.encodePacked(_listings[i].category)) == keccak256(abi.encodePacked(category)) && _listings[i].active) {
                resultCount++;
            }
        }

        Listing[] memory result = new Listing[](resultCount);
        uint256 index;
        for (uint256 i = 1; i <= totalListings; i++) {
            if (keccak256(abi.encodePacked(_listings[i].category)) == keccak256(abi.encodePacked(category)) && _listings[i].active) {
                result[index] = _listings[i];
                index++;
            }
        }

        return result;
    }

    function filterListingsByRarity(uint256 rarity) public view returns (Listing[] memory) {
        uint256 totalListings = _listingIds.current();
        uint256 resultCount;
        for (uint256 i = 1; i <= totalListings; i++) {
            if (_listings[i].rarity == rarity && _listings[i].active) {
                resultCount++;
            }
        }

        Listing[] memory result = new Listing[](resultCount);
        uint256 index;
        for (uint256 i = 1; i <= totalListings; i++) {
            if (_listings[i].rarity == rarity && _listings[i].active) {
                result[index] = _listings[i];
                index++;
            }
        }

        return result;
    }

    function endorseSeller(address seller) public onlyRole(MODERATOR_ROLE) {
        sellerReputation[seller]++;
    }

    function validateSeller(address seller) public view returns (bool) {
        return sellerReputation[seller] >= 10; // Example threshold for trusted seller
    }

    function addEscrowService(address escrowService) public onlyRole(UPGRADER_ROLE) {
        // Implement logic to add an escrow service
    }

    function listItemWithEscrow(
        uint256 itemId,
        uint256 quantity,
        uint256 price,
        address currency,
        uint256 endTime,
        address /* escrowService */,
        string memory category,
        uint256 rarity
    ) external whenNotPaused {
        require(quantity > 0, "Quantity must be greater than zero");
        require(price > 0, "Price must be greater than zero");
        require(endTime > block.timestamp, "End time must be in the future");
        require(
            nftContract.ownerOf(itemId) == msg.sender || 
            nftContract1155.balanceOf(msg.sender, itemId) >= quantity, 
            "You do not own the NFTs"
        );

        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        _listings[listingId] = Listing({
            seller: msg.sender,
            itemId: itemId,
            quantity: quantity,
            price: price,
            currency: currency,
            endTime: endTime,
            active: true,
            category: category,
            rarity: rarity
        });

        // Logic to handle escrow service can be added here

        emit ItemListed(listingId, msg.sender, itemId, quantity, price, currency, endTime, category, rarity);
    }

    function analyticsDashboard() public view returns (uint256 totalListings, uint256 activeListings, uint256 soldListings, address topSeller) {
        totalListings = _listingIds.current();
        uint256 activeCount;
        uint256 soldCount;
        address currentTopSeller;
        uint256 maxSales;

        for (uint256 i = 1; i <= totalListings; i++) {
            if (_listings[i].active) {
                activeCount++;
            } else {
                soldCount++;
                if (sellerSales[_listings[i].seller] > maxSales) {
                    maxSales = sellerSales[_listings[i].seller];
                    currentTopSeller = _listings[i].seller;
                }
            }
        }

        activeListings = activeCount;
        soldListings = soldCount;
        topSeller = currentTopSeller;
    }

    function customizeStorefront(uint256 itemId, string memory /* metadata */) public view {
        require(nftContract.ownerOf(itemId) == msg.sender || nftContract1155.balanceOf(msg.sender, itemId) > 0, "You do not own the item");
        // Add logic to associate metadata with the item for customization
    }

    function communityAuction(uint256 itemId, uint256 quantity, uint256 startingBid, address currency, uint256 endTime, address /* beneficiary */) external whenNotPaused {
        require(quantity > 0, "Quantity must be greater than zero");
        require(startingBid > 0, "Starting bid must be greater than zero");
        require(endTime > block.timestamp, "End time must be in the future");
        require(
            nftContract.ownerOf(itemId) == msg.sender || 
            nftContract1155.balanceOf(msg.sender, itemId) >= quantity, 
            "You do not own the NFTs"
        );

        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        _listings[listingId] = Listing({
            seller: msg.sender,
            itemId: itemId,
            quantity: quantity,
            price: startingBid,
            currency: currency,
            endTime: endTime,
            active: true,
            category: "auction",
            rarity: 0 // Auctions might not require a rarity category
        });

        // Logic to handle the auction and funds transfer to beneficiary

        emit ItemListed(listingId, msg.sender, itemId, quantity, startingBid, currency, endTime, "auction", 0);
    }
}
