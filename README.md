![CQTSOG-Logo](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/23d874f2-d5a2-4c34-ae37-44df67c66e9e)


# CryptoQuest: The Shards of Genesis

## Introduction
Welcome to CryptoQuest: The Shards of Genesis, an ambitious blockchain-based MMORPG where players embark on an epic journey through the realm of Cryptonia. This open-world universe leverages blockchain technology to provide true ownership of in-game assets through NFTs.

## Table of Contents
- [Features](#game-features)
- [Game Overview](explanation)
- [Repository Structure](#repo-files-directory)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [Testing](#testing)
- [Deployment](#deployment)
- [CryptoQuest Token Logo](#cqt-logo)
- [CryptoQuest The Shards Of Genesis Book NFT Cover](#cqtsog-book-nft-cover)

## Features
- **True Ownership**: In CryptoQuest, each in-game asset is a unique NFT.
- **Decentralized Economy**: A decentralized marketplace for trading assets.
- **Player Governance**: Zones governed by player-elected councils.
- **Crafting & Enchanting**: Unique item crafting and enchanting.
- **Quests & Adventures**: Dynamic quest system with smart contracts.
- **Cross-Chain Interactions**: Support for multiple blockchains.

## Game Overview
In CryptoQuest: The Shards of Genesis, players explore the mythical realm of Cryptonia, uncovering secrets and battling creatures in a quest to reunify the shards of Genesis.

### Repository Structure

```
cryptoquestmmorpg-dapp/
├── ai_models/
│   ├── model_fine_tuning.py
│   ├── model_quantization.py
├── contracts/
│   ├── artifacts/
│   │   ├── build-info/
│   │   ├── CQTTokenSaleContract.json
│   │   ├── CryptoQuestShardsOfGenesisFarming.json
│   │   ├── CryptoQuestSwap.json
│   │   ├── CryptoQuestTheShardsOfGenesis1155.json
│   │   ├── CryptoQuestTheShardsOfGenesisBookNFT.json
│   │   ├── CryptoQuestTheShardsOfGenesisCollectionNFTs.json
│   │   ├── CryptoQuestTheShardsOfGenesisERC721.json
│   │   ├── CryptoQuestTheShardsOfGenesisERCNFT.json
│   │   ├── CryptoQuestTheShardsOfGenesisMMPORPG.json
│   │   ├── CryptoQuestTheShardsOfGenesisMarketplace.json
│   │   ├── CryptoQuestTheShardsOfGenesisStaking.json
│   │   ├── CryptoQuestTheShardsOfGenesisToken.json
│   │   ├── CryptoQuestTheShardsOfGenesisWallet.json
│   │   ├── CryptoQuest_TheShardsOfGenesisDAO.json
│   │   ├── IDAO.json
│   │   ├── IERC1155.json
│   │   ├── IERC20.json
│   │   ├── IERC721.json
│   │   ├── IFarming.json
│   │   ├── IStaking.json
│   ├── CQTTokenSaleContractsol.sol
│   ├── CryptoQuestSwap.sol
│   ├── CryptoQuestTheShardsOfGenesisBookNFT.sol
│   ├── CryptoQuestTheShardsOfGenesisCollectionNFTs.sol
│   ├── CryptoQuestTheShardsOfGenesisDAO.sol
│   ├── CryptoQuestTheShardsOfGenesisMMORPG.sol
│   ├── CryptoQuestTheShardsOfGenesisMarketplace.sol
│   ├── CryptoQuestTheShardsOfGenesisNFT.sol
│   ├── CryptoQuestTheShardsOfGenesisStaking.sol
│   ├── CryptoQuestTheShardsOfGenesisToken.sol
│   ├── CryptoQuestTheShardsOfGenesisWallet.sol
│   ├── CryptoQueststTheShardsOfGenesisFarming.sol
├── data_processing/
│   ├── data_lakehouse.py
│   ├── encryption.py
│   ├── kafka_consumer.py
│   ├── rbac.py
│   ├── snowflake_aggregation.py
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
├── src/
│   ├── components/
│   │   ├── Character.js
│   │   ├── ConnectWalletButton.js
│   │   ├── Game.js
│   │   ├── TokenActions.js
│   ├── context/
│   │   ├── Web3Context.js
│   ├── hooks/
│   │   ├── useCryptoQuestMMORPG-Dapp.js
│   ├── smartcontracts/
│   │   ├── artifacts/
│   ├── styles/
│   │   ├── App.css
│   │   ├── index.css
│   ├── utils/
│   │   ├── web3Modal.js
│   ├── App.js
│   ├── contracts.js
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
├── .gitignore
├── .replit
├── LICENSE
├── Makefile
├── README.md
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
```

### Step-by-Step Integration

1. **Create the Directories and Files:**

   Manually create the directories and files as per the new structure or use terminal commands.

2. **Move Existing Files:**

   Move your existing files into their respective new locations within the new structure.

3. **Add New Scripts:**

   Place the provided Python scripts into the `data_processing` and `ai_models` directories.

4. **Ensure Dependencies:**

   Update your `requirements.txt` with the necessary Python packages:

   ```sh
   kafka-python
   pyspark
   cryptography
   flask
   torch
   transformers
   ```

   Install the dependencies:

   ```sh
   pip install -r requirements.txt
   ```

5. **Update `package.json`:**

   Ensure all your npm dependencies are up-to-date as discussed before.

6. **Run Data Processing and AI/ML Scripts:**

   Execute the scripts as needed for data processing and AI model operations.

### Running the Application

1. **Start the React Application:**

   ```sh
   npm start
   ```

2. **Execute Data Processing Scripts:**

   ```sh
   python data_processing/kafka_consumer.py
   python data_processing/data_lakehouse.py
   python data_processing/snowflake_aggregation.py
   python data_processing/encryption.py
   python data_processing/rbac.py
   ```

3. **Run AI/ML Scripts:**

   ```sh
   python ai_models/model_fine_tuning.py
   python ai_models/model_quantization.py
   ```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

## Testing

To launch the test runner in interactive watch mode, run:

```sh
npm test
```

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Building the App

To build the app for production to the `build` folder, run:

```sh
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Ejecting

**Note: this is a one-way operation. Once you eject, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

```sh
npm run eject
```

## Contracts
### Verified Contracts Linked On Polygonscan & Tenderly
Explore the various contracts that power CryptoQuest:

| Contract Name | Address | Network | Tags | Visibility | Verification |
|---------------|---------|---------|------|------------|--------------|
| CryptoQuestTheShardsOfGenesisToken | 0xb30837f54924b88294f524d3e13667396d3f3c8a | Polygon | Visible | Public | Verified |
| ERC1967Proxy (CQT) | 0xb30837f54924b88294f524d3e13667396d3f3c8a | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisNFT | 0xc641573148e62d88a2374ffe97391f849cea8ff5 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0xc641573148e62d88a2374ffe97391f849cea8ff5 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisCollectionNFT | 0x5ce6de14eaa1906163c5de4e57302fee8f5d2812 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x5ce6de14eaa1906163c5de4e57302fee8f5d2812 | Polygon | Visible | Public | Verified |
| TimelockControllerUpgradeable | 0x2b5949f0540884c67c1f169b9f535571656e6695 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisDAO | 0x7c3dddd47c29d213458abf9eb23fe50d95fa5205 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x7c3dddd47c29d213458abf9eb23fe50d95fa5205 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisMarketplace | 0xef805704fd13b0122477211895e418cb9c22e103 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0xef805704fd13b0122477211895e418cb9c22e103 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisStaking | 0x7ffc728c30192bf6f2f1448e395a8c9f751bc039 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x7ffc728c30192bf6f2f1448e395a8c9f751bc039 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisFarming | 0x822475be2d1b53680ceb3da287a7c608fed591a4 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x822475be2d1b53680ceb3da287a7c608fed591a4 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisMMORPG | 0x251ace49f2b106e0746702986e879e404a76f290 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x251ace49f2b106e0746702986e879e404a76f290 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisWallet | 0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd | Polygon | Visible | Public | Verified |
| CryptoQuestSwap | 0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4 | Polygon | Visible | Public | Verified |
| CryptoQuestTheShardsOfGenesisBookNFT | 0x545Ace061A1b64B14641B50CfE317017b01A667b | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0x6b07aD60b1d448D0e1cE9dCB24A85B3ab18b9b1E | Polygon | Visible | Public | Verified |
| CQTTokenSaleContract | 0x126D0A70E6413EC44D977C41024A76d84CEDB4A4 | Polygon | Visible | Public | Verified |
| ERC1967Proxy | 0xc36fc9872Bd271BD80365517958e6F48D3b4FA91 | Polygon | Visible | Public | Verified |

# CryptoQuest Token:

![CQTSOG- Logo for 'CQT CryptoQuest The Shards Of Genesis Token' by combining elements from the provided images  The logo should feature a striking geo](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/a2448bea-9173-4545-bbe7-982a5b7b4554)


# CryptoQuest Book NFT:

![CQTSOG - A book cover for 'CryptoQuest_ The Shards of Genesis' by Jacque DeGraff  The background features a mystical, ancient world with el](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/0940e554-1383-4bdd-985e-1278000d8c24)
