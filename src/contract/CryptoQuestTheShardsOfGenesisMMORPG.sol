// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract CryptoQuestTheShardsOfGenesisMMPORPG is Initializable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant GAME_ADMIN_ROLE = keccak256("GAME_ADMIN_ROLE");

    struct Player {
        uint level;
        uint experience;
        uint health;
        uint mana;
        uint attackDamage;
        uint defense;
        uint agility;
        uint luck;
        uint[] inventory;
        uint[] skills;
    }

    struct Item {
        uint id;
        string name;
        uint attackBonus;
        uint defenseBonus;
        uint manaBonus;
        uint healthBonus;
    }

    struct Quest {
        string title;
        string description;
        uint rewardXP;
        bool completed;
    }

    struct Guild {
        string name;
        address leader;
        address[] members;
    }

    struct Recipe {
        uint[] itemIds;
        uint resultItemId;
    }

    uint private nextItemId = 1;
    uint private nextRecipeId = 1;

    mapping(uint => Item) public items;
    mapping(address => Player) public players;
    mapping(address => Quest[]) public playerQuests;
    mapping(address => Guild) public guilds;
    mapping(string => address) guildNameToLeader;
    mapping(uint => Recipe) public recipes;

    event QuestCompleted(address indexed player, string questTitle);
    event PlayerCreated(address indexed player);
    event ItemAdded(uint itemId, string itemName);
    event GuildCreated(string name, address leader);
    event RecipeAdded(uint recipeId, uint resultItemId);

    function initialize(address defaultAdmin, address pauser, address upgrader) initializer public {
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(UPGRADER_ROLE, upgrader);
        _grantRole(GAME_ADMIN_ROLE, defaultAdmin);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    function createPlayer() public {
        require(players[msg.sender].level == 0, "Player already exists");
        players[msg.sender] = Player(1, 0, 100, 50, 10, 5, 3, 2, new uint[](0), new uint[](0));
        emit PlayerCreated(msg.sender);
    }

    function addItem(string memory name, uint attackBonus, uint defenseBonus, uint manaBonus, uint healthBonus) public onlyRole(GAME_ADMIN_ROLE) {
        items[nextItemId] = Item(nextItemId, name, attackBonus, defenseBonus, manaBonus, healthBonus);
        emit ItemAdded(nextItemId, name);
        nextItemId++;
    }

    function startQuest(string memory title, string memory description, uint rewardXP) public onlyRole(GAME_ADMIN_ROLE) {
        playerQuests[msg.sender].push(Quest(title, description, rewardXP, false));
    }

    function completeQuest(string memory questTitle) public {
        for (uint i = 0; i < playerQuests[msg.sender].length; i++) {
            Quest storage quest = playerQuests[msg.sender][i];
            if (keccak256(abi.encodePacked(quest.title)) == keccak256(abi.encodePacked(questTitle)) && !quest.completed) {
                quest.completed = true;
                players[msg.sender].experience += quest.rewardXP;
                emit QuestCompleted(msg.sender, questTitle);
                break;
            }
        }
    }

    function createGuild(string memory name, address leader) public onlyRole(GAME_ADMIN_ROLE) {
        require(guildNameToLeader[name] == address(0), "Guild already exists");
        guilds[leader] = Guild(name, leader, new address[](1));
        guilds[leader].members[0] = leader;
        guildNameToLeader[name] = leader;
        emit GuildCreated(name, leader);
    }

    function joinGuild(string memory guildName) public {
        address leader = guildNameToLeader[guildName];
        require(leader != address(0), "Guild does not exist");

        // Adding a check to ensure the sender is not already a member of the guild
        Guild storage guild = guilds[leader];
        for (uint i = 0; i < guild.members.length; i++) {
            require(guild.members[i] != msg.sender, "Sender is already a member of the guild");
        }

        guild.members.push(msg.sender);
    }

    function addRecipe(uint[] memory itemIds, uint resultItemId) public onlyRole(GAME_ADMIN_ROLE) {
        recipes[nextRecipeId] = Recipe(itemIds, resultItemId);
        emit RecipeAdded(nextRecipeId, resultItemId);
        nextRecipeId++;
    }

    function craftItem(uint recipeId) public {
        Recipe memory recipe = recipes[recipeId];
        require(recipe.itemIds.length > 0, "Invalid recipe");

        // Check if the player has all the required items
        for (uint i = 0; i < recipe.itemIds.length; i++) {
            bool hasItem = false;
            for (uint j = 0; j < players[msg.sender].inventory.length; j++) {
                if (players[msg.sender].inventory[j] == recipe.itemIds[i]) {
                    hasItem = true;
                    break;
                }
            }
            require(hasItem, "Player does not have all required items");
        }

        // Remove required items from the player's inventory
        for (uint i = 0; i < recipe.itemIds.length; i++) {
            for (uint j = 0; j < players[msg.sender].inventory.length; j++) {
                if (players[msg.sender].inventory[j] == recipe.itemIds[i]) {
                    players[msg.sender].inventory[j] = players[msg.sender].inventory[players[msg.sender].inventory.length - 1];
                    players[msg.sender].inventory.pop();
                    break;
                }
            }
        }

        // Add the crafted item to the player's inventory
        players[msg.sender].inventory.push(recipe.resultItemId);
    }
}
