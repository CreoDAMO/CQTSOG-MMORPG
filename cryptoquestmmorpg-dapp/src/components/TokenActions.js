// src/components/TokenActions.js
import React, { useState, useContext } from 'react';
import { Web3Context } from '../components/Web3Context';

const TokenActions = () => {
  const { buyToken, stakeTokens, unstakeTokens, swapTokens, addLiquidity, removeLiquidity } = useContext(Web3Context);
  const [amount, setAmount] = useState('');

  return (
    <div>
      <h2>Token Actions</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <button onClick={() => buyToken(amount)}>Buy Token</button>
      <button onClick={() => stakeTokens(amount)}>Stake Tokens</button>
      <button onClick={() => unstakeTokens(amount)}>Unstake Tokens</button>
      <button onClick={() => swapTokens(amount)}>Swap Tokens</button>
      <button onClick={() => addLiquidity(amount)}>Add Liquidity</button>
      <button onClick={() => removeLiquidity(amount)}>Remove Liquidity</button>
    </div>
  );
};

export default TokenActions;
