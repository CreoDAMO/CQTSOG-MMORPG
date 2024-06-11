# CryptoQuest: The Shards of Genesis

![CryptoQuest Logo](https://github.com/CreoDAMO/Crypto-Quest/assets/151800081/8be79371-7f2e-4fe5-a8f5-158031748d2b)

![CQTSOG - An elven adventurer named Kylen stands in a tranquil glade at the edge of the Misty Peaks, overlooking the Viridian Vale below  The dawn light bathes ](https://github.com/CreoDAMO/CryptoQuestTheShardsOfGenesisMMORPG/assets/151800081/f2bf99e2-6631-4c3b-901a-2db071e1e6d2)

![CQTSOG- An elven adventurer named Kylen arrives at the imposing Stormspire Keep, surrounded by jagged peaks and stormy skies  Lightning illuminates the scene ](https://github.com/CreoDAMO/CryptoQuestTheShardsOfGenesisMMORPG/assets/151800081/b5b843aa-c431-49b9-96a0-9e27158d9f80)

![CQTSOG - A group of heroes enters the Inner Sanctum of the Shrouded Isle of Zephyr, navigating through surreal landscapes with crystalline trees and floating i](https://github.com/CreoDAMO/CryptoQuestTheShardsOfGenesisMMORPG/assets/151800081/7feb9964-d11b-4ad7-a1b1-9eb2ac0c1c04)

**CryptoQuest: The Shards of Genesis** is an ambitious blockchain-based MMORPG (Massively Multiplayer Online Role-Playing Game) where players embark on an epic journey through the realm of Cryptonia, a world where reality and digital existence converge. In this open-world universe, every item, character, and piece of land is a unique non-fungible token (NFT) on the blockchain, giving players true ownership of their in-game assets.

## Table of Contents

- [Introduction](#cryptoquest-the-shards-of-genesis)
- [Features](#features)
- [Game Overview](#game-overview)
- [Contracts](#contracts)
- [Installation](#installation)
- [Creating a Front-end DApp](#creating-a-front-end-dapp)
- [How to Use the Makefile](#how-to-use-the-makefile)
- [Contributing](#contributing)
- [License](#license)

## Features

- **True Ownership:** Players own their in-game assets as NFTs, which they can trade, sell, or use to influence the game world.
- **Decentralized Economy:** An in-game marketplace allows for decentralized trading, with a cryptocurrency token serving as the primary currency.
- **Player Governance:** Certain zones are governed by player-elected councils, influencing game rules, events, and development within those areas.
- **Crafting & Enchanting:** Utilize blockchain to ensure the uniqueness of crafted items and enchantments, adding real value to player creations.
- **Quests & Adventures:** Dynamic quest system where players can create and share their own quests, with smart contracts ensuring rewards distribution.
- **Cross-Chain Interactions:** Support for multiple blockchains to facilitate a broader ecosystem and cross-chain asset transfers.

## Game Overview

In *CryptoQuest: The Shards of Genesis*, players enter the world of Cryptonia as adventurers seeking to uncover the mysteries of the Genesians and the Shards of Genesis. They must navigate political intrigue, battle fierce creatures, and explore uncharted territories in their quest to reunify the shattered shards and restore balance to the realm.

## Contracts

### 21 Verified Contracts Linked On Polygonscan & Tenderly

- Polygonscan: [https://polygonscan.com/address/0xcc380fd8bfbdf0c020de64075b86c84c2bb0ae79](https://polygonscan.com/address/0xcc380fd8bfbdf0c020de64075b86c84c2bb0ae79)
- Tenderly: [https://dashboard.tenderly.co/CreoDAMO/cryptoquesttheshardsofgenesismmorpg](https://dashboard.tenderly.co/CreoDAMO/cryptoquesttheshardsofgenesismmorpg)

| Contract Name                                  | Address                                    | Network | Tags      | Visibility | Verification |
|------------------------------------------------|--------------------------------------------|---------|-----------|------------|--------------|
| CryptoQuestTheShardsOfGenesisToken             | 0xb30837f54924b88294f524d3e13667396d3f3c8a | Polygon | Visible   | Public     |              |
| ERC1967Proxy(CQT)                              | 0xb30837f54924b88294f524d3e13667396d3f3c8a | Polygon | Visible   | Public     |              |
| CryptoQuestTheShardsOfGenesisNFT               | 0xc641573148e62d88a2374ffe97391f849cea8ff5 | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0xc641573148e62d88a2374ffe97391f849cea8ff5 | Polygon | Visible   | Public     |              |
| CryptoQuestTheShardsOfGenesisCollectionNFT     | 0x5ce6de14eaa1906163c5de4e57302fee8f5d2812 | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0x5ce6de14eaa1906163c5de4e57302fee8f5d2812 | Polygon | Visible   | Public     |              |
| TimelockControllerUpgradeable                  | 0x2b5949f0540884c67c1f169b9f535571656e6695 | Polygon | Visible   | Public     |              |
| CryptoQuestTheShardsOfGenesisDAO               | 0x7c3dddd47c29d213458abf9eb23fe50d95fa5205 | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0x7c3dddd47c29d213458abf9eb23fe50d95fa5205 | Polygon | Visible   | Public     |              |
| CryptoQuestTheShardsOfGenesisMarketplace       | 0xef805704fd13b0122477211895e418cb9c22e103 | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0xef805704fd13b0122477211895e418cb9c22e103 | Polygon | Visible   | Public     |              |
| CryptoQuestTheShardsOfGenesisStaking           | 0x7ffc728c30192bf6f2f1448e395a8c9f751bc039 | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0x7ffc728c30192bf6f2f1448e395a8c9f751bc039 | Polygon | Visible   | Public     |              |
| CryptoQuestTheShardsOfGenesisFarming           | 0x822475be2d1b53680ceb3da287a7c608fed591a4 | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0x822475be2d1b53680ceb3da287a7c608fed591a4 | Polygon | Visible   | Public     |              |
| CryptoQuestTheShardsOfGenesisMMORPG            | 0x251ace49f2b106e0746702986e879e404a76f290 | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0x251ace49f2b106e0746702986e879e404a76f290 | Polygon | Visible   | Public     |              |
| CryptoQuestTheShardsOfGenesisWallet            | 0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd | Polygon | Visible   | Public     |              |
| CryptoQuestSwap                                | 0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4 | Polygon | Visible   | Public     |              |
| ERC1967Proxy                                   | 0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4 | Polygon | Visible   | Public     |              |

## Installation

To install and run CryptoQuest locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your_username/cryptoquest.git`
2. Navigate to the project directory: `cd cryptoquest`
3. Install dependencies: `npm install`
4. Run the development server: `npm start`

## Creating a Front-end DApp

Creating a front-end DApp using React to interact with all 21 smart contracts in this project. Here’s a step-by-step guide on how to set up your DApp using React:

### 1. Setting Up Your Development Environment

First, you’ll need to set up your development environment. Ensure you have Node.js and npm installed. Then, create a new React app:

```bash
npx create-react-app cryptoquest-dapp
cd cryptoquest-dapp
```

### 2. Install Dependencies

You’ll need several packages to interact with the Ethereum blockchain and manage the smart contract interactions. Install the following dependencies:

```bash
npm install ethers web3modal @web3-react/core @web3-react/injected-connector
```

### 3. Create a Config File for Your Contracts

Create a `contracts` folder in the `src` directory and add your contract ABIs and addresses. Here’s an example of how to structure this:

```bash
mkdir src/contracts
touch src/contracts/index.js
```

In `src/contracts/index.js`, you can export the ABIs and addresses:

```javascript
import CryptoQuestTheShardsOfGenesisMMPORPG from './CryptoQuestTheShardsOfGenesisMMPORPG.json';
import CryptoQuestTheShardsOfGenesisToken from './CryptoQuestTheShardsOfGenesisToken.json';
import CryptoQuestSwap from './CryptoQuestSwap.json';
// Import other ABIs similarly

export const CryptoQuestTheShardsOfGenesisMMPORPG_ABI = CryptoQuestTheShardsOfGenesisMMPORPG.abi;
export const CryptoQuestTheShardsOfGenesisToken_ABI = CryptoQuestTheShardsOfGenesisToken.abi;
export const CryptoQuestSwap_ABI = CryptoQuestSwap.abi;
// Export other ABIs similarly

export const CryptoQuestTheShardsOfGenesisMMPORPG_ADDRESS =

 "your_contract_address_here";
export const CryptoQuestTheShardsOfGenesisToken_ADDRESS = "your_contract_address_here";
export const CryptoQuestSwap_ADDRESS = "your_contract_address_here";
// Export other contract addresses similarly
```

### 4. Set Up Web3Modal for Wallet Connection

Web3Modal helps with wallet connections like MetaMask. Create a new file `src/utils/web3Modal.js`:

```javascript
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42] // Adjust based on your needs
});

export const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions: {} // required
});

export const getLibrary = (provider) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
};
```

### 5. Create Context for Web3

Create a `Web3Context` to manage and provide web3 state across your app:

```bash
mkdir src/context
touch src/context/Web3Context.js
```

In `src/context/Web3Context.js`:

```javascript
import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { web3Modal, getLibrary } from '../utils/web3Modal';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [library, setLibrary] = useState(null);
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);

    const connect = async () => {
        const instance = await web3Modal.connect();
        const library = getLibrary(instance);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();

        setProvider(instance);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setChainId(network.chainId);
    };

    const disconnect = async () => {
        web3Modal.clearCachedProvider();
        setProvider(null);
        setLibrary(null);
        setAccount(null);
        setChainId(null);
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connect();
        }
    }, []);

    return (
        <Web3Context.Provider value={{ connect, disconnect, provider, library, account, chainId }}>
            {children}
        </Web3Context.Provider>
    );
};
```

### 6. Interacting with Smart Contracts

Create a file `src/utils/contracts.js` to set up the contracts:

```javascript
import { ethers } from 'ethers';
import {
    CryptoQuestTheShardsOfGenesisMMPORPG_ABI,
    CryptoQuestTheShardsOfGenesisToken_ABI,
    CryptoQuestSwap_ABI,
    // Import other ABIs
    CryptoQuestTheShardsOfGenesisMMPORPG_ADDRESS,
    CryptoQuestTheShardsOfGenesisToken_ADDRESS,
    CryptoQuestSwap_ADDRESS,
    // Import other addresses
} from '../contracts';

export const getContract = (abi, address, library) => {
    const signer = library.getSigner();
    return new ethers.Contract(address, abi, signer);
};

export const getCryptoQuestTheShardsOfGenesisMMPORPGContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisMMPORPG_ABI, CryptoQuestTheShardsOfGenesisMMPORPG_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesisTokenContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisToken_ABI, CryptoQuestTheShardsOfGenesisToken_ADDRESS, library);
};

export const getCryptoQuestSwapContract = (library) => {
    return getContract(CryptoQuestSwap_ABI, CryptoQuestSwap_ADDRESS, library);
};

// Create similar functions for other contracts
```

### 7. Create UI Components

Create React components to interact with the contracts. For example, to create a component for the main game contract:

```bash
mkdir src/components
touch src/components/Game.js
```

In `src/components/Game.js`:

```javascript
import React, { useContext, useState } from 'react';
import { Web3Context } from '../context/Web3Context';
import { getCryptoQuestTheShardsOfGenesisMMPORPGContract } from '../utils/contracts';

const Game = () => {
    const { library, account } = useContext(Web3Context);
    const [player, setPlayer] = useState(null);

    const createPlayer = async () => {
        const contract = getCryptoQuestTheShardsOfGenesisMMPORPGContract(library);
        const tx = await contract.createPlayer();
        await tx.wait();
    };

    const fetchPlayer = async () => {
        const contract = getCryptoQuestTheShardsOfGenesisMMPORPGContract(library);
        const player = await contract.players(account);
        setPlayer(player);
    };

    return (
        <div>
            <button onClick={createPlayer}>Create Player</button>
            <button onClick={fetchPlayer}>Fetch Player</button>
            {player && (
                <div>
                    <p>Level: {player.level}</p>
                    <p>Experience: {player.experience}</p>
                    {/* Display other player details */}
                </div>
            )}
        </div>
    );
};

export default Game;
```

### 8. Integrate Components into the App

Use the `Web3Provider` and add your components to `App.js`:

```javascript
import React from 'react';
import { Web3Provider } from './context/Web3Context';
import Game from './components/Game';

function App() {
    return (
        <Web3Provider>
            <div className="App">
                <h1>CryptoQuest: The Shards of Genesis</h1>
                <Game />
                {/* Add other components */}
            </div>
        </Web3Provider>
    );
}

export default App;
```

### 9. Run Your DApp

Start your React app:

```bash
npm start
```

This setup gives you a React front-end that can interact with your smart contracts using Ethers.js. You can expand the `Game` component and create additional components to cover all functionalities of your contracts, such as token staking, marketplace interactions, governance, and more.

## How to Use the Makefile

1. **Install Dependencies**

    To install the dependencies, run:
    ```bash
    make install
    ```

2. **Start the Development Server**

    To start the development server, run:
    ```bash
    make start
    ```

3. **Build the Project**

    To build the project for production, run:
    ```bash
    make build
    ```

4. **Run Tests**

    To run the tests, run:
    ```bash
    make test
    ```

5. **Lint the Code**

    To lint the code, run:
    ```bash
    make lint
    ```

6. **Format the Code**

    To format the code, run:
    ```bash
    make format
    ```

7. **Clean the Project**

    To clean the project by removing `node_modules` and `build` directories, run:
    ```bash
    make clean
    ```

8. **Set Up the Development Environment**

    To set up the development environment, run:
    ```bash
    make setup
    ```

This `Makefile` provides a convenient way to manage common tasks in your DApp project. You can add more targets as needed to support additional functionality or automation tasks.

## Contributing
We welcome contributions from the community! If you'd like to contribute to CryptoQuest, please follow these guidelines:

1. Fork the repository and create your branch: `git checkout -b feature/foo`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/foo`
4. Open a pull request

Please ensure that your contributions adhere to our [Code of Conduct](link_to_code_of_conduct).

## License
CryptoQuest: The Shards of Genesis is licensed under the [MIT License](link_to_license).
