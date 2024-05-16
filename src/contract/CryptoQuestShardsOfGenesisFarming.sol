// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract CryptoQuestShardsOfGenesisFarming is Initializable, AccessControlUpgradeable, PausableUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Farm {
        uint256 farmId;
        address owner;
        uint256 startTime;
        uint256 endTime;
        uint256 reward;
        uint256 cropType; // New field for crop type
    }

    mapping(uint256 => Farm) public farms;
    address public cqtToken;
    uint256 public rewardRate;
    uint256 public minimumFarmingPeriod;

    event Farmed(uint256 farmId, address owner, uint256 startTime, uint256 endTime, uint256 reward);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function initialize(
        address _cqtToken,
        uint256 _rewardRate,
        uint256 _minimumFarmingPeriod
    ) initializer public {
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();

        cqtToken = _cqtToken;
        rewardRate = _rewardRate;
        minimumFarmingPeriod = _minimumFarmingPeriod;
    }

    function startFarming(uint256 _farmId, uint256 _cropType) public whenNotPaused {
        require(farms[_farmId].farmId == 0, "Farm already exists");

        farms[_farmId] = Farm({
            farmId: _farmId,
            owner: msg.sender,
            startTime: block.timestamp,
            endTime: 0,
            reward: 0,
            cropType: _cropType
        });

        emit Farmed(_farmId, msg.sender, block.timestamp, 0, 0);
    }

    function endFarming(uint256 _farmId) public whenNotPaused {
        require(farms[_farmId].owner == msg.sender, "Not the owner of the farm");
        require(farms[_farmId].endTime == 0, "Farm already ended");

        uint256 farmingPeriod = block.timestamp - farms[_farmId].startTime;
        require(farmingPeriod >= minimumFarmingPeriod, "Farming period not met");

        farms[_farmId].endTime = block.timestamp;
        farms[_farmId].reward = farmingPeriod * rewardRate * farms[_farmId].cropType; // Reward based on crop type

        IERC20Upgradeable(cqtToken).transfer(msg.sender, farms[_farmId].reward);

        emit Farmed(_farmId, msg.sender, farms[_farmId].startTime, farms[_farmId].endTime, farms[_farmId].reward);

        delete farms[_farmId];
    }

    function purchaseFarm(uint256 _farmId, uint256 price) public whenNotPaused {
        // Logic to purchase a farm and set its initial state
    }

    function upgradeFarm(uint256 _farmId) public whenNotPaused {
        // Logic to upgrade a farm
    }

    function _authorizeUpgrade(address) internal override onlyRole(UPGRADER_ROLE) {}
}
