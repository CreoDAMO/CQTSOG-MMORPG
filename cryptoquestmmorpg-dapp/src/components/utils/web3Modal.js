// src/components/utils/web3Modal.js
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "YOUR_INFURA_ID",
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "CryptoQuestMMORPG-Dapp",
      infuraId: "YOUR_INFURA_ID",
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export default web3Modal;
