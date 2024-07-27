import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import web3Modal from '../utils/web3Modal';
import { contracts } from '../contracts/contracts';

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contractInstances, setContractInstances] = useState({});

  useEffect(() => {
    if (web3 && account) {
      const instances = {};
      Object.keys(contracts).forEach((key) => {
        instances[key] = new web3.eth.Contract(contracts[key].abi, contracts[key].address);
      });
      setContractInstances(instances);
    }
  }, [web3, account]);

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    const web3Instance = new Web3(provider);
    const accounts = await web3Instance.eth.getAccounts();
    setWeb3(web3Instance);
    setAccount(accounts[0]);
  };

  return (
    <Web3Context.Provider value={{ web3, account, contractInstances, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3Provider;
