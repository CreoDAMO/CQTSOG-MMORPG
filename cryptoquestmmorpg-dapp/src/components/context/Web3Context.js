// src/components/context/Web3Context.js
import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import web3Modal from '../utils/web3Modal';
import { CryptoQuestABI, WalletABI, SwapABI, CONTRACT_ADDRESS } from '../contracts';

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState({});

  useEffect(() => {
    if (web3 && account) {
      const cryptoQuestContract = new web3.eth.Contract(CryptoQuestABI, CONTRACT_ADDRESS.CryptoQuest);
      const walletContract = new web3.eth.Contract(WalletABI, CONTRACT_ADDRESS.Wallet);
      const swapContract = new web3.eth.Contract(SwapABI, CONTRACT_ADDRESS.Swap);

      setContracts({
        cryptoQuest: cryptoQuestContract,
        wallet: walletContract,
        swap: swapContract,
      });
    }
  }, [web3, account]);

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    const web3Instance = new Web3(provider);
    const accounts = await web3Instance.eth.getAccounts();
    setWeb3(web3Instance);
    setAccount(accounts[0]);
  };

  return (
    <Web3Context.Provider value={{ web3, account, contracts, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
