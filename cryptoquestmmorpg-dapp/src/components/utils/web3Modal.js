// src/utils/web3Modal.js
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';

// 1. Get projectId
const projectId = '17b38eaff9636c905bd2fc98f089e6b9';

// 2. Set chains
const mainnet = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-mainnet.infura.io/v3/a7fb924b8487461bb85c7554d2d914e7'
};

// 3. Create a metadata object
const metadata = {
  name: 'CryptoQuest',
  description: 'CryptoQuest: The Shards of Genesis',
  url: 'https://cryptoquestmmorpg.quest', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/'] // You can replace this with the actual icon URL if available
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 137 // Polygon mainnet chain ID
});

// 5. Create a Web3Modal instance
const web3Modal = createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
});

export default web3Modal;
