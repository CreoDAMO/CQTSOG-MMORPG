import { ethers } from 'ethers';
import {
    CryptoQuestTheShardsOfGenesisMMPORPG_ABI,
    CryptoQuestTheShardsOfGenesisToken_ABI,
    // Import other ABIs
    CryptoQuestTheShardsOfGenesisMMPORPG_ADDRESS,
    CryptoQuestTheShardsOfGenesisToken_ADDRESS,
    // Import other addresses
} from '../contracts';

export const getContract = (abi, address, library) => {
    const signer = library.getSigner();
    return new ethers.Contract(address, abi, signer);
};

export const getCryptoQuestTheShardsOfGenesisMMPORPGContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisMMPORPG_ABI, CryptoQuestTheShardsOfGenesisMMPORPG_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesisTokenContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisToken_ABI, CryptoQuestTheShardsOfGenesisToken_ADDRESS, library);
};

// Create similar functions for other contracts
