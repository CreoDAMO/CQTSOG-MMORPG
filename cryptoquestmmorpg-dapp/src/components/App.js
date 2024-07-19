import React, { useContext } from 'react';
import Web3Provider, { Web3Context } from './components/context/Web3Context';
import './index.css';

function App() {
  const { connectWallet, contracts, account } = useContext(Web3Context);

  return (
    <Web3Provider>
      <div className="App">
        <h1>CryptoQuest DApp</h1>
        <button onClick={connectWallet}>Connect Wallet</button>
        <Game contracts={contracts} account={account} />
      </div>
    </Web3Provider>
  );
}

function Game({ contracts, account }) {
  // Use contracts and account in your Game component

  return (
    <div>
      {/* Game UI */}
    </div>
  );
}

export default App;
