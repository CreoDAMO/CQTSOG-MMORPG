// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.25;

/// @custom:security-contact jacquedegraff@creodamo.com
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract CQTTokenSaleContract is Initializable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant INVESTOR_ROLE = keccak256("INVESTOR_ROLE");
    bytes32 public constant COMMUNITY_MEMBER_ROLE = keccak256("COMMUNITY_MEMBER_ROLE");

    address public founder;
    uint256 public tokenPriceInvestor;
    uint256 public tokenPriceCommunity;
    uint256 public tokenPricePublic;
    uint256 public totalCap;
    uint256 public releaseTime;
    mapping(address => uint256) public purchasedAmount;
    mapping(address => uint256) public vestedAmount;
    mapping(address => bool) public whitelistedAddresses;
    IERC20 public token;
    address public proxyAddress;

    event TokensPurchased(address indexed purchaser, uint256 amount);
    event TokenPriceUpdated(uint256 newPrice, string role);
    event TotalCapUpdated(uint256 newCap);
    event InvestorAdded(address account);
    event InvestorRemoved(address account);
    event CommunityMemberAdded(address account);
    event CommunityMemberRemoved(address account);
    event AddressWhitelisted(address indexed addr);
    event AddressRemovedFromWhitelist(address indexed addr);
    event TokensReleased(address beneficiary, uint256 amount);
    event FundsWithdrawn(address recipient, uint256 amount);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address pauser,
        address upgrader,
        address _tokenAddress,
        address _proxyAddress,
        uint256 _tokenPriceInvestor,
        uint256 _tokenPriceCommunity,
        uint256 _tokenPricePublic,
        uint256 _totalCap,
        uint256 _releaseTime
    ) initializer public {
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _initializeRoles(defaultAdmin, pauser, upgrader);

        founder = msg.sender;
        token = IERC20(_tokenAddress);
        proxyAddress = _proxyAddress;
        tokenPriceInvestor = _tokenPriceInvestor;
        tokenPriceCommunity = _tokenPriceCommunity;
        tokenPricePublic = _tokenPricePublic;
        totalCap = _totalCap;
        releaseTime = _releaseTime;
    }

    function _initializeRoles(address defaultAdmin, address pauser, address upgrader) internal {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function buyTokens(uint256 _amount) external payable whenNotPaused {
        require(whitelistedAddresses[msg.sender], "Address not whitelisted");

        uint256 cost;
        if (hasRole(INVESTOR_ROLE, msg.sender)) {
            cost = _amount * tokenPriceInvestor;
        } else if (hasRole(COMMUNITY_MEMBER_ROLE, msg.sender)) {
            cost = _amount * tokenPriceCommunity;
        } else {
            cost = _amount * tokenPricePublic;
        }

        require(msg.value == cost, "Incorrect value sent");
        require(purchasedAmount[msg.sender] + _amount <= totalCap, "Purchase exceeds cap");

        purchasedAmount[msg.sender] += _amount;
        vestedAmount[msg.sender] += _amount;
        emit TokensPurchased(msg.sender, _amount);
    }

    function releaseTokens() external {
        require(block.timestamp >= releaseTime, "Current time is before release time");
        uint256 amount = vestedAmount[msg.sender];
        require(amount > 0, "No tokens are due");

        vestedAmount[msg.sender] = 0;
        token.transferFrom(proxyAddress, msg.sender, amount);

        emit TokensReleased(msg.sender, amount);
    }

    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        payable(founder).transfer(balance);

        emit FundsWithdrawn(founder, balance);
    }

    function setTokenPrice(uint256 _newPrice, string calldata role) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("INVESTOR"))) {
            tokenPriceInvestor = _newPrice;
        } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("COMMUNITY"))) {
            tokenPriceCommunity = _newPrice;
        } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("PUBLIC"))) {
            tokenPricePublic = _newPrice;
        } else {
            revert("Invalid role");
        }

        emit TokenPriceUpdated(_newPrice, role);
    }

    function setTotalCap(uint256 _newCap) external onlyRole(DEFAULT_ADMIN_ROLE) {
        totalCap = _newCap;
        emit TotalCapUpdated(_newCap);
    }

    function addInvestor(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(INVESTOR_ROLE, account);
        emit InvestorAdded(account);
    }

    function removeInvestor(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(INVESTOR_ROLE, account);
        emit InvestorRemoved(account);
    }

    function addCommunityMember(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(COMMUNITY_MEMBER_ROLE, account);
        emit CommunityMemberAdded(account);
    }

    function removeCommunityMember(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(COMMUNITY_MEMBER_ROLE, account);
        emit CommunityMemberRemoved(account);
    }

    function addAddressToWhitelist(address addr) external onlyRole(DEFAULT_ADMIN_ROLE) {
        whitelistedAddresses[addr] = true;
        emit AddressWhitelisted(addr);
    }

    function removeAddressFromWhitelist(address addr) external onlyRole(DEFAULT_ADMIN_ROLE) {
        whitelistedAddresses[addr] = false;
        emit AddressRemovedFromWhitelist(addr);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyRole(UPGRADER_ROLE)
        override
    {}
}
