// src/components/Web3Context.js
import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import web3Modal from '../utils/web3Modal';
import { contracts as contractInfo } from '../contracts';

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState({});

  useEffect(() => {
    if (web3 && account) {
      const cryptoQuestContract = new web3.eth.Contract(contractInfo.CryptoQuestTheShardsOfGenesisMMORPG.abi, contractInfo.CryptoQuestTheShardsOfGenesisMMORPG.address);
      const walletContract = new web3.eth.Contract(contractInfo.CryptoQuestTheShardsOfGenesisWallet.abi, contractInfo.CryptoQuestTheShardsOfGenesisWallet.address);
      const swapContract = new web3.eth.Contract(contractInfo.CryptoQuestSwap.abi, contractInfo.CryptoQuestSwap.address);

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

  const getCharacter = async (id) => {
    return await contracts.cryptoQuest.methods.getCharacter(id).call();
  };

  const buyToken = async (amount) => {
    return await contracts.cryptoQuest.methods.buyToken().send({ from: account, value: amount });
  };

  const stakeTokens = async (amount) => {
    return await contracts.wallet.methods.stakeTokens(amount).send({ from: account });
  };

  const unstakeTokens = async (amount) => {
    return await contracts.wallet.methods.unstakeTokens(amount).send({ from: account });
  };

  const swapTokens = async (amount) => {
    return await contracts.swap.methods.swapTokens(amount).send({ from: account });
  };

  const addLiquidity = async (amount) => {
    return await contracts.swap.methods.addLiquidity(amount).send({ from: account });
  };

  const removeLiquidity = async (amount) => {
    return await contracts.swap.methods.removeLiquidity(amount).send({ from: account });
  };

  return (
    <Web3Context.Provider value={{ connectWallet, getCharacter, buyToken, stakeTokens, unstakeTokens, swapTokens, addLiquidity, removeLiquidity }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
