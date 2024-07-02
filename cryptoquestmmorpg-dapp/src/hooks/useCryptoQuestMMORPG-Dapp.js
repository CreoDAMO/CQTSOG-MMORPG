// src/hooks/useCryptoQuestMMORPG-Dapp.js
import { useContext } from 'react';
import { Web3Context } from '../context/Web3Context';

const useCryptoQuest = () => {
  const { contracts } = useContext(Web3Context);

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

  return { getCharacter, buyToken, stakeTokens, unstakeTokens, swapTokens, addLiquidity, removeLiquidity };
};

export default useCryptoQuestMMORPG-Dapp;
