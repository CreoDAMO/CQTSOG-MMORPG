import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import CryptoQuestTheShardsOfGenesisMMPORPG from './contracts/CryptoQuestTheShardsOfGenesisMMPORPG.json';
import CryptoQuestTheShardsOfGenesisToken from './contracts/CryptoQuestTheShardsOfGenesisToken.json';

// Your Web3 setup and other initializations here

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
