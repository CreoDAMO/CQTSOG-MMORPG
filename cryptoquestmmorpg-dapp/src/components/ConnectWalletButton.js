// src/components/ConnectWalletButton.js
import React, { useContext } from 'react';
import { Web3Context } from '../components/Web3Context';

const ConnectWalletButton = () => {
  const { connectWallet } = useContext(Web3Context);

  return <button onClick={connectWallet}>Connect Wallet</button>;
};

export default ConnectWalletButton;
