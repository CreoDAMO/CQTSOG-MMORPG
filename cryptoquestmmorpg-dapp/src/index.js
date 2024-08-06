import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // Adjusted the import path
import './styles/index.css'; // Ensure this matches the actual file name and location
import Web3Provider from './components/Web3Context'; // Ensure this matches the actual file name and location

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>
);
