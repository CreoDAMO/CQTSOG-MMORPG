import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TokenActions = ({ buyToken, stakeTokens, unstakeTokens, swapTokens, addLiquidity, removeLiquidity }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="TokenActions">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={() => buyToken(amount)}>Buy Token</button>
      <button onClick={() => stakeTokens(amount)}>Stake Tokens</button>
      <button onClick={() => unstakeTokens(amount)}>Unstake Tokens</button>
      <button onClick={() => swapTokens(amount)}>Swap Tokens</button>
      <button onClick={() => addLiquidity(amount)}>Add Liquidity</button>
      <button onClick={() => removeLiquidity(amount)}>Remove Liquidity</button>
    </div>
  );
};

TokenActions.propTypes = {
  buyToken: PropTypes.func.isRequired,
  stakeTokens: PropTypes.func.isRequired,
  unstakeTokens: PropTypes.func.isRequired,
  swapTokens: PropTypes.func.isRequired,
  addLiquidity: PropTypes.func.isRequired,
  removeLiquidity: PropTypes.func.isRequired,
};

export default TokenActions;
