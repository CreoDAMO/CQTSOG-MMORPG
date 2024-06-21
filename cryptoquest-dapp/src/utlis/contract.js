import { ethers } from 'ethers';
import {
    CryptoQuestTheShardsOfGenesisMMPORPG_ABI,
    CryptoQuestTheShardsOfGenesisToken_ABI,
    CryptoQuestSwap_ABI,
    CryptoQuestTheShardsOfGenesisMMPORPG_ADDRESS,
    CryptoQuestTheShardsOfGenesisToken_ADDRESS,
    CryptoQuestSwap_ADDRESS,
    CryptoQuestShardsOfGenesisFarming_ABI,
    CryptoQuestShardsOfGenesisFarming_ADDRESS,
    CryptoQuestTheShardsOfGenesis1155_ABI,
    CryptoQuestTheShardsOfGenesis1155_ADDRESS,
    CryptoQuestTheShardsOfGenesisBookNFT_ABI,
    CryptoQuestTheShardsOfGenesisBookNFT_ADDRESS,
    CryptoQuestTheShardsOfGenesisCollectionNFTs_ABI,
    CryptoQuestTheShardsOfGenesisCollectionNFTs_ADDRESS,
    CryptoQuestTheShardsOfGenesisDAO_ABI,
    CryptoQuestTheShardsOfGenesisDAO_ADDRESS,
    CryptoQuestTheShardsOfGenesisMarketplace_ABI,
    CryptoQuestTheShardsOfGenesisMarketplace_ADDRESS,
    CryptoQuestTheShardsOfGenesisStaking_ABI,
    CryptoQuestTheShardsOfGenesisStaking_ADDRESS,
    CryptoQuestTheShardsOfGenesisWallet_ABI,
    CryptoQuestTheShardsOfGenesisWallet_ADDRESS,
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

export const getCryptoQuestSwapContract = (library) => {
    return getContract(CryptoQuestSwap_ABI, CryptoQuestSwap_ADDRESS, library);
};

export const getCryptoQuestShardsOfGenesisFarmingContract = (library) => {
    return getContract(CryptoQuestShardsOfGenesisFarming_ABI, CryptoQuestShardsOfGenesisFarming_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesis1155Contract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesis1155_ABI, CryptoQuestTheShardsOfGenesis1155_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesisBookNFTContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisBookNFT_ABI, CryptoQuestTheShardsOfGenesisBookNFT_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesisCollectionNFTsContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisCollectionNFTs_ABI, CryptoQuestTheShardsOfGenesisCollectionNFTs_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesisDAOContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisDAO_ABI, CryptoQuestTheShardsOfGenesisDAO_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesisMarketplaceContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisMarketplace_ABI, CryptoQuestTheShardsOfGenesisMarketplace_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesisStakingContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisStaking_ABI, CryptoQuestTheShardsOfGenesisStaking_ADDRESS, library);
};

export const getCryptoQuestTheShardsOfGenesisWalletContract = (library) => {
    return getContract(CryptoQuestTheShardsOfGenesisWallet_ABI, CryptoQuestTheShardsOfGenesisWallet_ADDRESS, library);
};
