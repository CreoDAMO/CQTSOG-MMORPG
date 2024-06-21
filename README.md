# CryptoQuest: The Shards of Genesis

**SEO Meta Description:** Discover CryptoQuest: The Shards of Genesis, a blockchain-based MMORPG developed with Unity and Unreal Engine 5. Learn how to leverage NFTs, smart contracts, and decentralized economies to create an immersive gaming experience.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Game Overview](#game-overview)
- [Contracts](#contracts)
- [Installation](#installation)
- [Creating a Front-end DApp](#creating-a-front-end-dapp)
- [Developing CryptoQuest in Unity](#developing-cryptoquest-in-unity)
- [Developing CryptoQuest in Unreal Engine 5](#developing-cryptoquest-in-unreal-engine-5)
- [Developing CryptoQuest for Xbox](#developing-cryptoquest-for-xbox)
- [Developing CryptoQuest for PS5](#developing-cryptoquest-for-ps5)
- [FAQs](#faqs)
- [Conclusion](#conclusion)
- [Contributing](#contributing)
- [License](#license)
- [Repository Structure](#repository-structure)

![CQTSOG-Logo](https://github.com/CreoDAMO/CQRSOG-MMORPG/assets/151800081/c3888b15-93e3-41ff-921f-3659b7e08785)

## Introduction

Welcome to **CryptoQuest: The Shards of Genesis**, an ambitious blockchain-based MMORPG where players embark on an epic journey through the realm of Cryptonia. This open-world universe leverages blockchain technology to provide true ownership of in-game assets through NFTs.

## Features

- **True Ownership**: In *CryptoQuest*, each in-game asset is a unique NFT.
- **Decentralized Economy**: A decentralized marketplace for trading assets.
- **Player Governance**: Zones governed by player-elected councils.
- **Crafting & Enchanting**: Unique item crafting and enchanting.
- **Quests & Adventures**: Dynamic quest system with smart contracts.
- **Cross-Chain Interactions**: Support for multiple blockchains.

## Game Overview

In *CryptoQuest: The Shards of Genesis*, players explore the mythical realm of Cryptonia, uncovering secrets and battling creatures in a quest to reunify the shards of Genesis.

## Contracts

### Verified Contracts Linked On Polygonscan & Tenderly

Explore the various contracts that power *CryptoQuest*:

- **Polygonscan**: [View Contracts](https://polygonscan.com/address/0xcc380fd8bfbdf0c020de64075b86c84c2bb0ae79)
- **Tenderly**: [View Contracts](https://dashboard.tenderly.co/CreoDAMO/cryptoquesttheshardsofgenesismmorpg)

| **Contract Name**                                | **Address**                                | **Network** | **Tags**  | **Visibility** | **Verification** |
|--------------------------------------------------|--------------------------------------------|-------------|-----------|----------------|------------------|
| CryptoQuestTheShardsOfGenesisToken               | 0xb30837f54924b88294f524d3e13667396d3f3c8a | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy (CQT)                               | 0xb30837f54924b88294f524d3e13667396d3f3c8a | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisNFT                 | 0xc641573148e62d88a2374ffe97391f849cea8ff5 | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0xc641573148e62d88a2374ffe97391f849cea8ff5 | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisCollectionNFT       | 0x5ce6de14eaa1906163c5de4e57302fee8f5d2812 | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0x5ce6de14eaa1906163c5de4e57302fee8f5d2812 | Polygon     | Visible   | Public         | Verified         |
| TimelockControllerUpgradeable                    | 0x2b5949f0540884c67c1f169b9f535571656e6695 | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisDAO                 | 0x7c3dddd47c29d213458abf9eb23fe50d95fa5205 | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0x7c3dddd47c29d213458abf9eb23fe50d95fa5205 | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisMarketplace         | 0xef805704fd13b0122477211895e418cb9c22e103 | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0xef805704fd13b0122477211895e418cb9c22e103 | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisStaking             | 0x7ffc728c30192bf6f2f1448e395a8c9f751bc039 | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0x7ffc728c30192bf6f2f1448e395a8c9f751bc039 | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisFarming             | 0x822475be2d1b53680ceb3da287a7c608fed591a4 | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0x822475be2d1b53680ceb3da287a7c608fed591a4 | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisMMORPG              | 0x251ace49f2b106e0746702986e879e404a76f290 | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0x251ace49f2b106e0746702986e879e404a76f290 | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisWallet              | 0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestSwap                                  | 0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4 | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4 | Polygon     | Visible   | Public         | Verified         |
| CryptoQuestTheShardsOfGenesisBookNFT             | 0x545Ace061A1b64B14641B50CfE317017b01A667b | Polygon     | Visible   | Public         | Verified         |
| ERC1967Proxy                                     | 0x6b07aD60b1d448D0e1cE9dCB24A85B3ab18b9b1E | Polygon     | Visible   | Public         | Verified         |

---

## Installation

To install and run *CryptoQuest* locally, follow these steps:

```bash
npx create-react-app cryptoquest-dapp
cd cryptoquest-dapp
```

### **Install Dependencies**

Install the necessary packages to interact with the Ethereum blockchain:

```bash
npm install ethers web3modal @web3-react/core @web3-react/injected-connector
```

## Creating a Front-end DApp

Creating a front-end DApp using Vite and React to interact with all 21 smart contracts in this project is a crucial step. See the detailed guide in the `dapp/` directory.

For more detailed instructions, visit the [Creating a Front-end DApp using React Guide](https://github.com/CreoDAMO/CQTSOG-MMORPG/wiki/Creating-a-front%E2%80%90end-DApp-using-React).

## Developing CryptoQuest for Xbox

If you are looking to develop and deploy CryptoQuest on Xbox, follow the instructions provided in our dedicated Xbox guide.

For detailed instructions, visit the [CQTSOG Xbox Guide](https://github.com/CreoDAMO/CQTSOG-MMORPG/wiki/CQTSOG-Xbox).

## Developing CryptoQuest for PS5

If you are looking to develop and deploy CryptoQuest on the PS5, follow the instructions provided in our dedicated PS5 guide.

For detailed instructions, visit the [CQTSOG PS5 Guide](https://github.com/CreoDAMO/CQRSOG-MMORPG/wiki/CQTSOG%E2%80%90PS5).

## FAQs

- **Can I play CryptoQuest on any blockchain?**  
  Yes, CryptoQuest supports cross-chain interactions to facilitate a broader ecosystem and cross-chain asset transfers.

- **How can I contribute to the project?**  
  See the [Contributing](#contributing) section for guidelines on how to contribute.

- **Is there a governance system in CryptoQuest?**  
  Yes, certain zones in the game are governed by player-elected councils that influence game rules, events, and development.

## Conclusion

*CryptoQuest: The Shards of Genesis* is an innovative MMORPG that integrates blockchain technology to offer players true ownership of in-game assets. With dynamic quests, player governance, and a decentralized economy, the game provides a rich and immersive experience.

## Contributing

We welcome contributions from the community! If you'd like to contribute to CryptoQuest, please follow these guidelines:

1. Fork the repository and create your branch: `git checkout -b feature/foo`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/foo`
4. Open a pull request

Please ensure that your contributions adhere to our [Code of Conduct](link_to_code_of_conduct).

## License

CryptoQuest: The Shards of Genesis is licensed under the [MIT License](link_to_license).

## Repository Structure

The repository for **CryptoQuest: The Shards of Genesis** is organized to provide clear separation of concerns, facilitating development and management of different aspects of the project. Below is the updated directory structure with a description of each directory and file:

```markdown
cryptoquest-dapp/
├── .deps/
│   └── npm/
│       └── @openzeppelin/
│           └── contracts-upgradeable/
│               ├── access/
│               │   ├── AccessControlUpgradeable.sol
│               │   └── OwnableUpgradeable.sol
│               ├── governance/
│               │   └── utils/
│               │       ├── IVotesUpgradeable.sol
│               │       └── VotesUpgradeable.sol
│               ├── artifacts/
│               │   ├── build-info/
│               │   │   ├── aab2307ecd5276504e169b3aca6086d1.json
│               │   │   ├── TimelockControllerUpgradeable.json
│               │   │   └── TimelockControllerUpgradeable_metadata.json
│               │   └── extensions/
│               │       ├── GovernorCountingSimpleUpgradeable.sol
│               │       ├── GovernorSettingsUpgradeable.sol
│               │       ├── GovernorStorageUpgradeable.sol
│               │       ├── GovernorTimelockControlUpgradeable.sol
│               │       ├── GovernorVotesQuorumFractionUpgradeable.sol
│               │       └── GovernorVotesUpgradeable.sol
│               ├── proxy/
│               │   ├── ERC1967/
│               │   │   └── ERC1967UpgradeUpgradeable.sol
│               │   ├── beacon/
│               │   │   └── IBeaconUpgradeable.sol
│               │   └── utils/
│               │       ├── Initializable.sol
│               │       └── UUPSUpgradeable.sol
│               ├── security/
│               │   └── PausableUpgradeable.sol
│               ├── token/
│               │   ├── ERC1155/
│               │   │   ├── extensions/
│               │   │   │   ├── ERC1155BurnableUpgradeable.sol
│               │   │   │   ├── ERC1155PausableUpgradeable.sol
│               │   │   │   └── ERC1155SupplyUpgradeable.sol
│               │   │   ├── utils/
│               │   │   │   ├── ERC1155HolderUpgradeable.sol
│               │   │   │   └── ERC1155Upgradeable.sol
│               │   │   ├── IERC1155Upgradeable.sol
│               │   │   └── IERC1155Upgradeable.sol
│               │   ├── ERC20/
│               │   │   ├── extensions/
│               │   │   │   ├── ERC20BurnableUpgradeable.sol
│               │   │   │   ├── ERC20FlashMintUpgradeable.sol
│               │   │   │   ├── ERC20PausableUpgradeable.sol
│               │   │   │   ├── ERC20PermitUpgradeable.sol
│               │   │   │   ├── ERC20VotesUpgradeable.sol
│               │   │   │   └── ERC20Upgradeable.sol
│               │   │   ├── IERC20Upgradeable.sol
│               │   │   ├── ERC20Upgradeable.sol
│               │   │   └── IERC20Upgradeable.sol
│               │   ├── ERC721/
│               │   │   ├── extensions/
│               │   │   │   ├── ERC721BurnableUpgradeable.sol
│               │   │   │   ├── ERC721EnumerableUpgradeable.sol
│               │   │   │   ├── ERC721PausableUpgradeable.sol
│               │   │   │   ├── ERC721URIStorageUpgradeable.sol
│               │   │   │   ├── IERC721EnumerableUpgradeable.sol
│               │   │   ├── utils/
│               │   │   │   ├── ERC721HolderUpgradeable.sol
│               │   │   │   ├── ERC721Upgradeable.sol
│               │   │   │   ├── IERC721Upgradeable.sol
│               │   │   │   └── IERC721Upgradeable.sol
│               │   │   ├── IERC721ReceiverUpgradeable.sol
│               │   │   ├── ERC721Upgradeable.sol
│               │   │   ├── IERC721Upgradeable.sol
│               │   │   ├── ERC721Upgradeable.sol
│               │   │   └── IERC721Upgradeable.sol
│               ├── cryptography/
│               │   └── EIP712Upgradeable.sol
│               ├── introspection/
│               │   ├── ERC165Upgradeable.sol
│               │   └── IERC165Upgradeable.sol
│               ├── AddressUpgradeable.sol
│               ├── ContextUpgradeable.sol
│               ├── CountersUpgradeable.sol
│               ├── NoncesUpgradeable.sol
│               ├── PausableUpgradeable.sol
│               ├── ERC721Upgradeable.sol
│               └── IERC721Upgradeable.sol
├── public/
│   ├── CQTSOG-Logo.png
│   └── CQTSOG-Logo.svg
├── src/
│   ├── assets/
│   │   ├── CQTSOG- Logo for 'CQT CryptoQuest The Shards Of Genesis Token' by combining elements from the provided images. The logo should feature a striking geo.png
│   │   └── CQTSOG-Logo-for-_CQT-CryptoQuest-The-Shards-Of-Genesis-Token_-by-combining-elements-from-the-provide.svg
│   ├── components/
│   │   └── Game.js
│   ├── context/
│   │   └── Web3Context.js
│   ├── contracts/
│   │   └── index.js
│   ├── smartcontracts/
│   │   ├── artifacts/
│   │   │   ├── build-info/
│   │   │   │   ├── 023fe5e39d2e80373429af963b312257.json
│   │   │   │   ├── 19f947929ee77678aaa883e948224616.json
│   │   │   │   ├── 349b6770f47943c06b3a5a6943368476.json
│   │   │   │   ├── 41b4a0e1f5ff43c5351fa3d2871a23e9.json
│   │   │   │   ├── 49e2b8d02672f67f13e34b6ae1933099.json
│   │   │   │   ├── 55c00c2af517a1023df52e66779b759b.json
│   │   │   │   ├── 658dab6b779d8b5d441eb69bf41c5cd0.json
│   │   │   │   ├── 71ab3ccb633467b67d033387ef7a2cc4.json
│   │   │   │   ├── 972bdc9997eef260b73b477698da35e4.json
│   │   │   │   ├── d0b24742fa78ca2d3f97920f0d48c859.json
│   │   │   │   ├── db4643b0199824c5db052bec35f85877.json
│   │   │   ├── CryptoQuestShardsOfGenesisFarming.json
│   │   │   ├── CryptoQuestShardsOfGenesisFarming_metadata.json
│   │   │   ├── CryptoQuestSwap.json
│   │   │   ├── CryptoQuestSwap_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesis1155.json
│   │   │   ├── CryptoQuestTheShardsOfGenesis1155_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisBookNFT.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisBookNFT_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisBookPublishing_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisCollectionNFTs.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisCollectionNFTs_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisERC721.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisERC721_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisERCNFT.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisERCNFT_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisMMPORPG.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisMMPORPG_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisMarketplace.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisMarketplace_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisStaking.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisStaking_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisToken.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisToken_metadata.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisWallet.json
│   │   │   ├── CryptoQuestTheShardsOfGenesisWallet_metadata.json
│   │   │   ├── CryptoQuest_TheShardsOfGenesisDAO.json
│   │   │   ├── CryptoQuest_TheShardsOfGenesisDAO_metadata.json
│   │   │   ├── IDAO.json
│   │   │   ├── IDAO_metadata.json
│   │   │   ├── IERC1155.json
│   │   │   ├── IERC1155_metadata.json
│   │   │   ├── IERC20.json
│   │   │   ├── IERC20_metadata.json
│   │   │   ├── IERC721.json
│   │   │   ├── IERC721_metadata.json
│   │   │   ├── IFarming.json
│   │   │   ├── IFarming_metadata.json
│   │   │   ├── IStaking.json
│   │   │   ├── IStaking_metadata.json
│   │   │   ├── CryptoQuestSwap.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisBookNFT.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisCollectionNFTs.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisDAO.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisMMORPG.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisMarketplace.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisNFT.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisStaking.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisToken.sol
│   │   │   ├── CryptoQuestTheShardsOfGenesisWallet.sol
│   │   │   ├── CryptoQueststTheShardsOfGenesisFarming.sol
├── utils/
│   ├── web3Modal.js
│   └── contract.js
├── App.css
├── App.jsx
├── index.css
├── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
├── .gitignore
├── .replit
├── LICENSE
├── Makefile
├── SECURITY.md
├── package-lock.json
├── package.json
├── replit.nix
├── tsconfig.json
└── vite.config.js
```
---
### Directory Descriptions

- **.deps/**: Contains dependencies from npm, particularly OpenZeppelin contracts.
- **src/**: Source code for the front-end application, including components, context, contracts, and utilities.
  - **assets/**: Contains asset files like images.
  - **components/**: Contains React components.
  - **context/**: Contains context providers like `Web3Context.js`.
  - **contracts/**: Contains contract ABIs and addresses.
  - **smartcontracts/**: Contains smart contract source files, artifacts, and build information.
  - **utils/**: Contains utility files like `web3Modal.js`.
- **public/**: Contains publicly accessible files like the logo.
- **LICENSE**: License file.
- **Makefile**: Makefile for building and deployment scripts.
- **README.md**: Project documentation.
- **package.json**: npm configuration file.
- **.gitignore**: Git ignore file to exclude unnecessary files from version control.
- **tsconfig.json**: TypeScript configuration file.
- **vite.config.js**: Vite configuration file.
---

## CryptoQuest Guide

For more detailed assistance and real-time support with *CryptoQuest: The Shards of Genesis*, you can refer to our comprehensive guide. Whether you need help with gameplay, technical issues, or understanding blockchain integration, our guide is here to assist you.

[Access the CryptoQuest Guide](https://chatgpt.com/g/g-okli7Xlbi-cryptoquest-guide)

If you need more help, just ask our guide.
