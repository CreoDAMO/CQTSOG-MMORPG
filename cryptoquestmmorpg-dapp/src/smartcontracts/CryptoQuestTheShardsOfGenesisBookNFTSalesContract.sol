// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CryptoQuestTheShardsOfGenesisBookNFT.sol";

/// @custom:security-contact jacquedegraff@creodamo.com
contract CryptoQuestTheShardsOfGenesisBookNFTSalesContract is Initializable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant PAYMENT_MANAGER_ROLE = keccak256("PAYMENT_MANAGER_ROLE");

    CryptoQuestTheShardsOfGenesisBookNFT public nftContract;

    struct Tier {
        uint256 price;
        uint256 supply;
        uint256 sold;
    }

    mapping(uint256 => Tier) public tiers;
    uint256 public tierCount;

    address public constant WETH = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;
    address public constant MATIC = 0x0000000000000000000000000000000000001010;
    address public constant USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public constant CQT = 0x94ef57abfBff1AD70bD00a921e1d2437f31C1665;

    mapping(address => bool) private _approvedPaymentTokens;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address pauser,
        address upgrader,
        address paymentManager,
        address nftAddress
    ) initializer public {
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(UPGRADER_ROLE, upgrader);
        _grantRole(PAYMENT_MANAGER_ROLE, paymentManager);

        nftContract = CryptoQuestTheShardsOfGenesisBookNFT(nftAddress);

        // Approve payment tokens
        _approvedPaymentTokens[WETH] = true;
        _approvedPaymentTokens[MATIC] = true;
        _approvedPaymentTokens[USDC] = true;
        _approvedPaymentTokens[CQT] = true;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function setNFTContract(address nftAddress) public onlyRole(DEFAULT_ADMIN_ROLE) {
        nftContract = CryptoQuestTheShardsOfGenesisBookNFT(nftAddress);
    }

    function addTier(uint256 price, uint256 supply) public onlyRole(PAYMENT_MANAGER_ROLE) {
        tiers[tierCount] = Tier(price, supply, 0);
        tierCount++;
    }

    function updateTier(uint256 tierId, uint256 price, uint256 supply) public onlyRole(PAYMENT_MANAGER_ROLE) {
        require(tierId < tierCount, "Invalid tier ID");
        tiers[tierId].price = price;
        tiers[tierId].supply = supply;
    }

    function buyNFT(uint256 tierId, address paymentToken, string memory uri, CryptoQuestTheShardsOfGenesisBookNFT.Metadata memory metadata) public payable whenNotPaused {
        require(tierId < tierCount, "Invalid tier ID");
        Tier storage tier = tiers[tierId];
        require(tier.sold < tier.supply, "Tier sold out");
        require(_approvedPaymentTokens[paymentToken], "Unsupported payment token");

        uint256 price = tier.price;
        if (paymentToken != address(0)) {
            require(IERC20(paymentToken).transferFrom(msg.sender, address(this), price), "Payment failed");
        } else {
            require(msg.value == price, "Incorrect amount sent");
        }

        nftContract.safeMint(msg.sender, uri, metadata);
        tier.sold++;
    }

    function withdrawFunds(address payable to, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(address(this).balance >= amount, "Insufficient balance");
        to.transfer(amount);
    }

    function withdrawTokens(address token, address to, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(IERC20(token).transfer(to, amount), "Token transfer failed");
    }

    function _authorizeUpgrade(address newImplementation) internal onlyRole(UPGRADER_ROLE) override {}
}
