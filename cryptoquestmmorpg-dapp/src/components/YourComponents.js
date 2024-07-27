import React from 'react';
import useCryptoQuestMMORPGDapp from '../hooks/useCryptoQuestMMORPGDapp';

const YourComponents = () => {
  const {
    buyToken,
    stakeTokens,
    unstakeTokens,
    swapTokens,
    addLiquidity,
    removeLiquidity,
  } = useCryptoQuestMMORPGDapp();

  return (
    <div className="YourComponents">
      <button onClick={() => buyToken(1)}>Buy Token</button>
      <button onClick={() => stakeTokens(1)}>Stake Tokens</button>
      <button onClick={() => unstakeTokens(1)}>Unstake Tokens</button>
      <button onClick={() => swapTokens(1)}>Swap Tokens</button>
      <button onClick={() => addLiquidity(1)}>Add Liquidity</button>
      <button onClick={() => removeLiquidity(1)}>Remove Liquidity</button>
    </div>
  );
};

export default YourComponents;
