// src/components/TokenActions.js
import React from 'react';
import useCryptoQuest from '../hooks/useCryptoQuest';

const TokenActions = () => {
  const { buyToken, stakeTokens, unstakeTokens, swapTokens, addLiquidity, removeLiquidity } = useCryptoQuest();
  const [amount, setAmount] = useState('');

  const handleChange = (e) => setAmount(e.target.value);

  return (
    <div>
      <input type="number" value={amount} onChange={handleChange} placeholder="Amount" />
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
