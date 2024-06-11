// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.25;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @custom:security-contact jacquedegraff@creodamo.com
contract CryptoQuestSwap is Initializable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant LIQUIDITY_MANAGER_ROLE = keccak256("LIQUIDITY_MANAGER_ROLE");

    uint256 public constant FEE_RATE = 3; // 0.3% fee

    IERC20Upgradeable public cqtToken;
    IERC721Upgradeable public cqtNFT;

    struct LiquidityPool {
        uint256 tokenAmount;
        uint256 ethAmount;
        uint256 totalLiquidity;
        mapping(address => uint256) liquidity;
    }

    mapping(address => LiquidityPool) public liquidityPools;

    event LiquidityAdded(address indexed provider, address indexed token, uint256 tokenAmount, uint256 ethAmount, uint256 liquidity);
    event LiquidityRemoved(address indexed provider, address indexed token, uint256 tokenAmount, uint256 ethAmount, uint256 liquidity);
    event TokenSwapped(address indexed swapper, address indexed token, uint256 tokenAmount, uint256 ethAmount);
    event NFTSwapped(address indexed swapper, address indexed nftContract, uint256 indexed tokenId, uint256 ethAmount);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address pauser,
        address upgrader,
        address liquidityManager,
        address cqtTokenAddress,
        address cqtNFTAddress
    ) initializer public {
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(UPGRADER_ROLE, upgrader);
        _grantRole(LIQUIDITY_MANAGER_ROLE, liquidityManager);

        cqtToken = IERC20Upgradeable(cqtTokenAddress);
        cqtNFT = IERC721Upgradeable(cqtNFTAddress);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function addLiquidity(address token, uint256 tokenAmount) external payable whenNotPaused returns (uint256) {
        require(tokenAmount > 0, "Token amount must be greater than zero");
        require(msg.value > 0, "ETH amount must be greater than zero");

        IERC20Upgradeable(token).transferFrom(msg.sender, address(this), tokenAmount);

        LiquidityPool storage pool = liquidityPools[token];
        uint256 liquidity;

        if (pool.totalLiquidity == 0) {
            pool.tokenAmount = tokenAmount;
            pool.ethAmount = msg.value;
            liquidity = tokenAmount;
        } else {
            require(pool.ethAmount > 0 && pool.tokenAmount > 0, "Invalid pool state");

            uint256 ethAmountRatio = (pool.ethAmount * tokenAmount) / pool.tokenAmount;
            require(msg.value >= ethAmountRatio, "Insufficient ETH amount");

            pool.tokenAmount += tokenAmount;
            pool.ethAmount += msg.value;
            liquidity = (pool.totalLiquidity * tokenAmount) / pool.tokenAmount;
        }

        pool.totalLiquidity += liquidity;
        pool.liquidity[msg.sender] += liquidity;

        emit LiquidityAdded(msg.sender, token, tokenAmount, msg.value, liquidity);
        return liquidity;
    }

    function removeLiquidity(address token, uint256 liquidity) external whenNotPaused returns (uint256 tokenAmount, uint256 ethAmount) {
        LiquidityPool storage pool = liquidityPools[token];
        require(pool.liquidity[msg.sender] >= liquidity, "Insufficient liquidity");

        tokenAmount = (pool.tokenAmount * liquidity) / pool.totalLiquidity;
        ethAmount = (pool.ethAmount * liquidity) / pool.totalLiquidity;

        pool.tokenAmount -= tokenAmount;
        pool.ethAmount -= ethAmount;
        pool.totalLiquidity -= liquidity;
        pool.liquidity[msg.sender] -= liquidity;

        IERC20Upgradeable(token).transfer(msg.sender, tokenAmount);
        payable(msg.sender).transfer(ethAmount);

        emit LiquidityRemoved(msg.sender, token, tokenAmount, ethAmount, liquidity);
    }

    function swapETHForTokens(address token, uint256 minTokens) external payable whenNotPaused {
        require(msg.value > 0, "ETH amount must be greater than zero");
        LiquidityPool storage pool = liquidityPools[token];
        require(pool.ethAmount > 0 && pool.tokenAmount > 0, "Insufficient liquidity");

        uint256 tokenAmount = getOutputAmount(msg.value, pool.ethAmount, pool.tokenAmount);
        require(tokenAmount >= minTokens, "Slippage tolerance exceeded");

        pool.ethAmount += msg.value;
        pool.tokenAmount -= tokenAmount;

        IERC20Upgradeable(token).transfer(msg.sender, tokenAmount);

        emit TokenSwapped(msg.sender, token, tokenAmount, msg.value);
    }

    function swapTokensForETH(address token, uint256 tokenAmount, uint256 minETH) external whenNotPaused {
        require(tokenAmount > 0, "Token amount must be greater than zero");
        LiquidityPool storage pool = liquidityPools[token];
        require(pool.ethAmount > 0 && pool.tokenAmount > 0, "Insufficient liquidity");

        uint256 ethAmount = getOutputAmount(tokenAmount, pool.tokenAmount, pool.ethAmount);
        require(ethAmount >= minETH, "Slippage tolerance exceeded");

        pool.tokenAmount += tokenAmount;
        pool.ethAmount -= ethAmount;

        IERC20Upgradeable(token).transferFrom(msg.sender, address(this), tokenAmount);
        payable(msg.sender).transfer(ethAmount);

        emit TokenSwapped(msg.sender, token, tokenAmount, ethAmount);
    }

    function swapETHForNFT(uint256 tokenId, uint256 minETH) external payable whenNotPaused {
        require(msg.value > 0, "ETH amount must be greater than zero");
        require(cqtNFT.ownerOf(tokenId) == address(this), "NFT not owned by contract");

        uint256 ethAmount = getOutputAmount(msg.value, address(this).balance - msg.value, 1); // Assuming 1 NFT as reserve
        require(ethAmount >= minETH, "Slippage tolerance exceeded");

        payable(msg.sender).transfer(ethAmount);
        cqtNFT.safeTransferFrom(address(this), msg.sender, tokenId);

        emit NFTSwapped(msg.sender, address(cqtNFT), tokenId, ethAmount);
    }

    function swapNFTForETH(uint256 tokenId, uint256 minETH) external whenNotPaused {
        require(cqtNFT.ownerOf(tokenId) == msg.sender, "Not owner of NFT");

        uint256 ethAmount = getOutputAmount(1, 1, address(this).balance); // Assuming 1 NFT as input
        require(ethAmount >= minETH, "Slippage tolerance exceeded");

        cqtNFT.safeTransferFrom(msg.sender, address(this), tokenId);
        payable(msg.sender).transfer(ethAmount);

        emit NFTSwapped(msg.sender, address(cqtNFT), tokenId, ethAmount);
    }

    function getOutputAmount(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) internal pure returns (uint256) {
        uint256 inputAmountWithFee = inputAmount * (1000 - FEE_RATE);
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 1000) + inputAmountWithFee;
        return numerator / denominator;
    }

    function _authorizeUpgrade(address newImplementation) internal onlyRole(UPGRADER_ROLE) override {}

    function updateLiquidityPool(address token, uint256 newTokenAmount, uint256 newEthAmount) external onlyRole(LIQUIDITY_MANAGER_ROLE) {
        liquidityPools[token].tokenAmount = newTokenAmount;
        liquidityPools[token].ethAmount = newEthAmount;
    }

    function withdrawETH(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(msg.sender).transfer(amount);
    }

    function withdrawTokens(address token, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        IERC20Upgradeable(token).transfer(msg.sender, amount);
    }

    function withdrawNFT(uint256 tokenId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        cqtNFT.safeTransferFrom(address(this), msg.sender, tokenId);
    }
}
