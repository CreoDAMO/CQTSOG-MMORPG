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
/CQTSOG-MMORPG-1/
  ├── .deps/
  ├── cryptoquestmmorpg-dapp/
  │   ├── public/
  │   │   ├── favicon.ico
  │   │   ├── index.html
  │   │   ├── logo192.png
  │   │   ├── logo512.png
  │   │   ├── manifest.json
  │   │   └── robots.txt
  │   ├── src/
  │   │   ├── smartcontracts/
  │   │   │   ├── CryptoQuestTheShardsOfGenesisMMORPG.json
  │   │   │   ├── CryptoQuestTheShardsOfGenesisToken.json
  │   │   │   ├── ... (other contract JSON files)
  │   │   ├── artifacts/
  │   │   │   ├── build-info/
  │   │   │   │   └── ... (build info files)
  │   │   │   ├── CryptoQuestTheShardsOfGenesisMMORPG.json
  │   │   │   ├── CryptoQuestTheShardsOfGenesisToken.json
  │   │   │   ├── ... (other artifacts JSON files)
  │   │   ├── components/
  │   │   │   ├── App.js
  │   │   │   ├── Game.js
  │   │   │   ├── Web3Context.js
  │   │   │   ├── contracts.js
  │   │   │   ├── web3Modal.js
  │   │   ├── styles/
  │   │   │   ├── App.css
  │   │   │   ├── index.css
  │   │   ├── index.js
  │   │   ├── reportWebVitals.js
  │   │   ├── setupTests.js
  │   ├── .gitignore
  │   ├── README.md
  │   ├── package-lock.json
  │   ├── package.json
  │   └── LICENSE
  ├── .replit
  ├── Makefile
  ├── README.md
  ├── package-lock.json
  ├── package.json
  └── node_modules/
```

### Explanation

1. **Contracts Directory**:
   - The `contracts/` directory under `src/` should store the ABI JSON files of your deployed contracts for easy integration.

2. **Artifacts Directory**:
   - The `artifacts/` directory is for build artifacts that include the contract ABIs and metadata. This helps in keeping track of the build process.

3. **Components Directory**:
   - A new `components/` directory is added under `src/` for organizing React components. Files like `App.js`, `Game.js`, `Web3Context.js`, `contracts.js`, and `web3Modal.js` should reside here.

4. **Styles Directory**:
   - A new `styles/` directory under `src/` is created for organizing CSS files (`App.css`, `index.css`).

5. **Public Directory**:
   - Static assets like `favicon.ico`, `index.html`, and logos remain in the `public/` directory.

### Example `contracts.js`

Ensure `contracts.js` properly exports the necessary contract ABIs.

```javascript
import CryptoQuestTheShardsOfGenesisMMORPG from './contracts/CryptoQuestTheShardsOfGenesisMMORPG.json';
import CryptoQuestTheShardsOfGenesisToken from './contracts/CryptoQuestTheShardsOfGenesisToken.json';
// Add other contract imports as needed

const CONTRACTS = {
  CryptoQuestTheShardsOfGenesisMMORPG,
  CryptoQuestTheShardsOfGenesisToken,
  // Add other contracts here
};

export default CONTRACTS;
```

### Example `index.js`

Ensure `index.js` initializes `web3` correctly and renders the React application.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';

// Import Web3
import Web3 from 'web3';

// Import contract ABIs
import CryptoQuestTheShardsOfGenesisMMORPG from './contracts/CryptoQuestTheShardsOfGenesisMMORPG.json';
import CryptoQuestTheShardsOfGenesisToken from './contracts/CryptoQuestTheShardsOfGenesisToken.json';
// Add other contract imports as needed

// Initialize Web3
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export { web3, CryptoQuestTheShardsOfGenesisMMORPG, CryptoQuestTheShardsOfGenesisToken };
```


## Installation

To install the dependencies, run:

```sh
npm install
```

## Running the App

To start the app in development mode, run:

```sh
npm start
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
