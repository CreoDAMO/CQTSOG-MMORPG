import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42] // Adjust based on your needs
});

export const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions: {} // required
});

export const getLibrary = (provider) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
};
