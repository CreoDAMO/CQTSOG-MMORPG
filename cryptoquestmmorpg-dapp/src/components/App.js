import React, { useContext } from 'react';
import { Web3Context } from './Web3Context';
import TokenActions from './TokenActions';
import Character from './Character';
import ConnectWalletButton from './ConnectWalletButton';

const App = () => {
  const { connectWallet } = useContext(Web3Context);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CryptoQuest: The Shards of Genesis</h1>
        <ConnectWalletButton />
      </header>
      <main>
        <TokenActions />
        <Character id={1} />
      </main>
    </div>
  );
};

export default App;
