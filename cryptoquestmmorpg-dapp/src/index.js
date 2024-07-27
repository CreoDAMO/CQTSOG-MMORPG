import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Web3Provider from './context/Web3Context';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>
);
