![CQTSOG-Logo](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/23d874f2-d5a2-4c34-ae37-44df67c66e9e)

# CryptoQuest: The Shards of Genesis

## Introduction
Welcome to CryptoQuest: The Shards of Genesis, an ambitious blockchain-based MMORPG where players embark on an epic journey through the realm of Cryptonia. This open-world universe leverages blockchain technology to provide true ownership of in-game assets through NFTs.

## Table of Contents
- [Features](#features)
- [Game Overview](#game-overview)
- [Repository Structure](#repository-structure)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contracts](#contracts)
- [CryptoQuest Token Logo](#cryptoquest-token)
- [CryptoQuest The Shards Of Genesis Book NFT Cover](#cryptoquest-book-nft)

## Features
- **True Ownership**: In CryptoQuest, each in-game asset is a unique NFT.
- **Decentralized Economy**: A decentralized marketplace for trading assets.
- **Player Governance**: Zones governed by player-elected councils.
- **Crafting & Enchanting**: Unique item crafting and enchanting.
- **Quests & Adventures**: Dynamic quest system with smart contracts.
- **Cross-Chain Interactions**: Support for multiple blockchains.

## Game Overview
In CryptoQuest: The Shards of Genesis, players explore the mythical realm of Cryptonia, uncovering secrets and battling creatures in a quest to reunify the shards of Genesis.

## Repository Structure

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

### Installation
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/CreoDAMO/CQTSOG-MMORPG.git
   cd cryptoquestmmorpg-dapp
   ```

2. **Install Dependencies:**
   ```sh
   npm install
```
3 **Go to Directory And Install Dependencies**
```sh
cd data-processing-and-analytics
   pip install -r requirements.txt
   ```

### Running the App

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

## Building the App

To build the app for production to the `build` folder, run:

```sh
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Testing

To launch the test runner in interactive watch mode, run:

```sh
npm test
```

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Contracts
### Verified Contracts Linked On Polygonscan & Tenderly
Explore the various contracts that power CryptoQuest:

| Contract Name | Address | Network | Tags | Visibility | Verification |
|---------------|---------|---------|------|------------|--------------|
```css
1.) CryptoQuestTheShardsOfGenesisToken

0xb30837f549...3c8a
Polygon
Visible
Public

ERC1967Proxy(CQT)

CryptoQuestTheShardsOfGenesisToken

0x94ef57abfb...1665
Polygon
Visible
Public

2.) CryptoQuestTheShardsOfGenesisNFT
0xc641573148e62d88a2374ffe97391f849cea8ff5
0xc641573148...8ff5
Polygon
Visible
Public

ERC1967Proxy
0xc641573148e62d88a2374ffe97391f849cea8ff5
CryptoQuestTheShardsOfGenesisNFT
0x74cf604c8c235eb1f520b47bf7106c46be815a30
0x74cf604c8c...5a30
Polygon
Visible
Public

3.) CryptoQuestTheShardsOfGenesisCollectionNFT
0x5ce6de14eaa1906163c5de4e57302fee8f5d2812
0x5ce6de14ea...2812
Polygon
Visible
Public

ERC1967Proxy
0x5ce6de14eaa1906163c5de4e57302fee8f5d2812
CryptoQuestTheShardsOfGenesisCollectionNFT
0x486f191e833a371f49f1500515997f583a2523f4
0x486f191e83...23f4
Polygon
Visible
Public

4.) TimelockControllerUpgradeable
0x2b5949f0540884c67c1f169b9f535571656e6695
0x2b5949f054...6695
Polygon
Visible
Public

5.) CryptoQuestTheShardsOfGenesisDAO
0x7c3dddd47c29d213458abf9eb23fe50d95fa5205
0x7c3dddd47c...5205
Polygon
Visible
Public

ERC1967Proxy
0x7c3dddd47c29d213458abf9eb23fe50d95fa5205
CryptoQuestTheShardsOfGenesisDAO
0xc44187f4eae5ddb4eda465ddedf8b9a6dfeb073c
0xc44187f4ea...073c
Polygon
Visible
Public

6.) CryptoQuestTheShardsOfGenesisMarketplace
0xef805704fd13b0122477211895e418cb9c22e103
0xef805704fd...e103
Polygon
Visible
Public

ERC1967Proxy
0xef805704fd13b0122477211895e418cb9c22e103
CryptoQuestTheShardsOfGenesisMarketplace
0x7e59e3fc320acfae0fbd20789348016729b00edc
0x7e59e3fc32...0edc
Polygon
Visible
Public

7.)CryptoQuestTheShardsOfGenesisStaking
0x7ffc728c30192bf6f2f1448e395a8c9f751bc039
0x7ffc728c30...c039
Polygon
Visible
Public

ERC1967Proxy
0x7ffc728c30192bf6f2f1448e395a8c9f751bc039
CryptoQuestTheShardsOfGenesisStaking
0x4915363b9524d103c8910e3c7d5516b9b4d0f333
0x4915363b95...f333
Polygon
Visible
Public

8.) CryptoQuestTheShardsOfGenesisFarming
0x822475be2d1b53680ceb3da287a7c608fed591a4
0x822475be2d...91a4
Polygon
Visible
Public

ERC1967Proxy
0x822475be2d1b53680ceb3da287a7c608fed591a4
CryptoQuestTheShardsOfGenesisFarming
0x95e2091ec85d20253a9cc7f37b1308bd56e8732f
0x95e2091ec8...732f
Polygon
Visible
Public

9.)CryptoQuestTheShardsOfGenesisMMORPG
0x251ace49f2b106e0746702986e879e404a76f290
0x251ace49f2...f290
Polygon
Visible
Public

ERC1967Proxy
0x251ace49f2b106e0746702986e879e404a76f290
CryptoQuestTheShardsOfGenesisMMORPG
0xc233e56015c1bbcd7fbd58415d11084e7f98f488
0xc233e56015...f488
Polygon
Visible
Public

10.)CryptoQuestTheShardsOfGenesisWallet
0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd
0xf60d96cfa7...43bd
Polygon
Visible
Public

ERC1967Proxy
0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd
CryptoQuestTheShardsOfGenesisWallet
0xcb393b9cb94ac7f35f05e001c4b0d512fc590eb2
0xcb393b9cb9...0eb2
Polygon
Visible
Public

11.) CryptoQuestTheShardsOfGenesisNFTBook
0x545ace061a1b64b14641b50cfe317017b01a667b
0x545ace061a...667b
Polygon
Visible
Public

ERC1967Proxy
0x545ace061a1b64b14641b50cfe317017b01a667b
0x545ace061a...667b
0x6b07ad60b1d448d0e1ce9dcb24a85b3ab18b9b1e
0x6b07ad60b1...9b1e
Polygon
Visible
Public

12.) CQTTokenSaleContract
0x126d0a70e6413ec44d977c41024a76d84cedb4a4
0x126d0a70e6...b4a4
Polygon
Visible
Public

ERC1967Proxy
0x126d0a70e6413ec44d977c41024a76d84cedb4a4
0x126d0a70e6...b4a4
0xc36fc9872bd271bd80365517958e6f48d3b4fa91
0xc36fc9872b...fa91
Polygon
Visible
Public

13.) CryptoQuestTheShardsOfGenesisBookNFTSalesContract
0xe1df30dbeaf0e895bc5b7efd8b7b9ed91097c8d7
0xe1df30...97c8d7
Polygon
Visible
Public

ERC1967Proxy
0xe1df30dbeaf0e895bc5b7efd8b7b9ed91097c8d7
0xe1df30...97c8d7
0x8206b3a98dbd4e3cd767e0e5caba6c6af68044c8
0x8206b3...8044c8
Polygon
Visible
Public
```
## CryptoQuest Token

![CQTSOG- Logo for 'CQT CryptoQuest The Shards Of Genesis Token' by combining elements from the provided images  The logo should feature a striking geo](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/a2448bea-9173-4545-bbe7-982a5b7b4554)

## CryptoQuest Book NFT

![CQTSOG - A book cover for 'CryptoQuest_ The Shards of Genesis' by Jacque DeGraff  The background features a mystical, ancient world with el](https://github.com/CreoDAMO/CQTSOG-MMORPG/assets/151800081/0940e554-1383-4bdd-985e-1278000d8c24)
```
