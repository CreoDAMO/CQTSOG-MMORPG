import React, { createContext, useState, useEffect } from 'react';
import { web3Modal, getLibrary } from '../utils/web3Modal';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [library, setLibrary] = useState(null);
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);

    const connect = async () => {
        const instance = await web3Modal.connect();
        const library = getLibrary(instance);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();

        setProvider(instance);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setChainId(network.chainId);
    };

    const disconnect = async () => {
        web3Modal.clearCachedProvider();
        setProvider(null);
        setLibrary(null);
        setAccount(null);
        setChainId(null);
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connect();
        }
    }, []);

    return (
        <Web3Context.Provider value={{ connect, disconnect, provider, library, account, chainId }}>
            {children}
        </Web3Context.Provider>
    );
};
