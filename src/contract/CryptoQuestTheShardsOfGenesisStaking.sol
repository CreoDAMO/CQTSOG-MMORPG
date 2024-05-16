// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract CryptoQuestTheShardsOfGenesisStaking is Initializable, AccessControlUpgradeable, PausableUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Stake {
        uint256 tokenId;
        address owner;
        uint256 stakeTime;
        uint256 unstakeTime;
        uint256 reward;
        uint256 rarity; // New field for rarity
    }

    mapping(uint256 => Stake) public stakes;
    address public cqtToken;
    address public cqnftToken;
    address public cqnft1155Token;
    uint256 public rewardRate;
    uint256 public minimumStakingPeriod;

    event Staked(uint256 tokenId, address owner, uint256 stakeTime);
    event Unstaked(uint256 tokenId, address owner, uint256 unstakeTime, uint256 reward);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function initialize(
        address _cqtToken,
        address _cqnftToken,
        address _cqnft1155Token,
        uint256 _rewardRate,
        uint256 _minimumStakingPeriod
    ) initializer public {
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();

        cqtToken = _cqtToken;
        cqnftToken = _cqnftToken;
        cqnft1155Token = _cqnft1155Token;
        rewardRate = _rewardRate;
        minimumStakingPeriod = _minimumStakingPeriod;
    }

    function stake(uint256 _tokenId, uint256 _rarity) public whenNotPaused {
        require(
            IERC721Upgradeable(cqnftToken).ownerOf(_tokenId) == msg.sender ||
            IERC1155Upgradeable(cqnft1155Token).balanceOf(msg.sender, _tokenId) > 0,
            "Not the owner of the token"
        );
        require(stakes[_tokenId].tokenId == 0, "Token already staked");

        stakes[_tokenId] = Stake({
            tokenId: _tokenId,
            owner: msg.sender,
            stakeTime: block.timestamp,
            unstakeTime: 0,
            reward: 0,
            rarity: _rarity
        });

        if (IERC721Upgradeable(cqnftToken).ownerOf(_tokenId) == msg.sender) {
            IERC721Upgradeable(cqnftToken).transferFrom(msg.sender, address(this), _tokenId);
        } else {
            IERC1155Upgradeable(cqnft1155Token).safeTransferFrom(msg.sender, address(this), _tokenId, 1, "");
        }

        emit Staked(_tokenId, msg.sender, block.timestamp);
    }

    function stakeBatch(uint256[] calldata _tokenIds, uint256[] calldata _rarities) public whenNotPaused {
        require(_tokenIds.length == _rarities.length, "Token IDs and rarities length mismatch");
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            stake(_tokenIds[i], _rarities[i]);
        }
    }

    function unstake(uint256 _tokenId) public whenNotPaused {
        require(stakes[_tokenId].owner == msg.sender, "Not the owner of the stake");
        require(stakes[_tokenId].unstakeTime == 0, "Token already unstaked");

        uint256 stakingPeriod = block.timestamp - stakes[_tokenId].stakeTime;
        require(stakingPeriod >= minimumStakingPeriod, "Staking period not met");

        stakes[_tokenId].unstakeTime = block.timestamp;
        stakes[_tokenId].reward = stakingPeriod * rewardRate * stakes[_tokenId].rarity; // Reward based on rarity

        IERC20Upgradeable(cqtToken).transfer(msg.sender, stakes[_tokenId].reward);

        if (IERC721Upgradeable(cqnftToken).ownerOf(_tokenId) == address(this)) {
            IERC721Upgradeable(cqnftToken).transferFrom(address(this), msg.sender, _tokenId);
        } else {
            IERC1155Upgradeable(cqnft1155Token).safeTransferFrom(address(this), msg.sender, _tokenId, 1, "");
        }

        delete stakes[_tokenId];

        emit Unstaked(_tokenId, msg.sender, block.timestamp, stakes[_tokenId].reward);
    }

    function _authorizeUpgrade(address) internal override onlyRole(UPGRADER_ROLE) {}
}
