import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Main = () => {
  const [account, setAccount] = useState(null);
  const [networkId, setNetworkId] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          const networkId = await web3Instance.eth.net.getId();
          setAccount(accounts[0]);
          setNetworkId(networkId);
        } catch (error) {
          console.error("User denied account access", error);
        }
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        setAccount(accounts[0]);
        setNetworkId(networkId);
      } else {
        console.error("No web3 provider detected");
      }
    };

    initWeb3();
  }, []);

  return (
    <div className="Main">
      <h1>CryptoQuest: The Shards of Genesis</h1>
      {account ? (
        <p>Connected account: {account} on network {networkId}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
};

export default Main;
