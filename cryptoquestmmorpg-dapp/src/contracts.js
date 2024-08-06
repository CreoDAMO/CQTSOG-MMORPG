import CryptoQuestTheShardsOfGenesisToken from 'contracts/CryptoQuestTheShardsOfGenesisToken.json';
import CryptoQuestTheShardsOfGenesisNFT from 'contracts/CryptoQuestTheShardsOfGenesisNFT.json';
import CryptoQuestTheShardsOfGenesisCollectionNFT from 'contracts/CryptoQuestTheShardsOfGenesisCollectionNFT.json';
import TimelockControllerUpgradeable from 'contracts/TimelockControllerUpgradeable.json';
import CryptoQuestTheShardsOfGenesisDAO from 'contracts/CryptoQuestTheShardsOfGenesisDAO.json';
import CryptoQuestTheShardsOfGenesisMarketplace from 'contracts/CryptoQuestTheShardsOfGenesisMarketplace.json';
import CryptoQuestTheShardsOfGenesisStaking from 'contracts/CryptoQuestTheShardsOfGenesisStaking.json';
import CryptoQuestTheShardsOfGenesisFarming from 'contracts/CryptoQuestTheShardsOfGenesisFarming.json';
import CryptoQuestTheShardsOfGenesisMMORPG from 'contracts/CryptoQuestTheShardsOfGenesisMMORPG.json';
import CryptoQuestTheShardsOfGenesisWallet from 'contracts/CryptoQuestTheShardsOfGenesisWallet.json';
import CryptoQuestSwap from 'contracts/CryptoQuestSwap.json';
import CryptoQuestTheShardsOfGenesisBookNFT from 'contracts/CryptoQuestTheShardsOfGenesisBookNFT.json';
import CQTTokenSaleContract from 'contracts/CQTTokenSaleContract.json';

export const contracts = {
  CryptoQuestTheShardsOfGenesisToken: {
    abi: CryptoQuestTheShardsOfGenesisToken.abi,
    address: '0xb30837f54924b88294f524d3e13667396d3f3c8a'
  },
  CryptoQuestTheShardsOfGenesisNFT: {
    abi: CryptoQuestTheShardsOfGenesisNFT.abi,
    address: '0xc641573148e62d88a2374ffe97391f849cea8ff5'
  },
  CryptoQuestTheShardsOfGenesisCollectionNFT: {
    abi: CryptoQuestTheShardsOfGenesisCollectionNFT.abi,
    address: '0x5ce6de14eaa1906163c5de4e57302fee8f5d2812'
  },
  TimelockControllerUpgradeable: {
    abi: TimelockControllerUpgradeable.abi,
    address: '0x2b5949f0540884c67c1f169b9f535571656e6695'
  },
  CryptoQuestTheShardsOfGenesisDAO: {
    abi: CryptoQuestTheShardsOfGenesisDAO.abi,
    address: '0x7c3dddd47c29d213458abf9eb23fe50d95fa5205'
  },
  CryptoQuestTheShardsOfGenesisMarketplace: {
    abi: CryptoQuestTheShardsOfGenesisMarketplace.abi,
    address: '0xef805704fd13b0122477211895e418cb9c22e103'
  },
  CryptoQuestTheShardsOfGenesisStaking: {
    abi: CryptoQuestTheShardsOfGenesisStaking.abi,
    address: '0x7ffc728c30192bf6f2f1448e395a8c9f751bc039'
  },
  CryptoQuestTheShardsOfGenesisFarming: {
    abi: CryptoQuestTheShardsOfGenesisFarming.abi,
    address: '0x822475be2d1b53680ceb3da287a7c608fed591a4'
  },
  CryptoQuestTheShardsOfGenesisMMORPG: {
    abi: CryptoQuestTheShardsOfGenesisMMORPG.abi,
    address: '0x251ace49f2b106e0746702986e879e404a76f290'
  },
  CryptoQuestTheShardsOfGenesisWallet: {
    abi: CryptoQuestTheShardsOfGenesisWallet.abi,
    address: '0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd'
  },
  CryptoQuestSwap: {
    abi: CryptoQuestSwap.abi,
    address: '0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4'
  },
  CryptoQuestTheShardsOfGenesisBookNFT: {
    abi: CryptoQuestTheShardsOfGenesisBookNFT.abi,
    address: '0x545Ace061A1b64B14641B50CfE317017b01A667b'
  },
  CQTTokenSaleContract: {
    abi: CQTTokenSaleContract.abi,
    address: '0x126D0A70E6413EC44D977C41024A76d84CEDB4A4'
  },
  ERC1967Proxy: {
    abi: null, // Assuming a general ABI is provided for ERC1967Proxy, update if necessary
    addresses: {
      'CryptoQuestTheShardsOfGenesisToken': '0xb30837f54924b88294f524d3e13667396d3f3c8a',
      'CryptoQuestTheShardsOfGenesisNFT': '0xc641573148e62d88a2374ffe97391f849cea8ff5',
      'CryptoQuestTheShardsOfGenesisCollectionNFT': '0x5ce6de14eaa1906163c5de4e57302fee8f5d2812',
      'CryptoQuestTheShardsOfGenesisDAO': '0x7c3dddd47c29d213458abf9eb23fe50d95fa5205',
      'CryptoQuestTheShardsOfGenesisMarketplace': '0xef805704fd13b0122477211895e418cb9c22e103',
      'CryptoQuestTheShardsOfGenesisStaking': '0x7ffc728c30192bf6f2f1448e395a8c9f751bc039',
      'CryptoQuestTheShardsOfGenesisFarming': '0x822475be2d1b53680ceb3da287a7c608fed591a4',
      'CryptoQuestTheShardsOfGenesisMMORPG': '0x251ace49f2b106e0746702986e879e404a76f290',
      'CryptoQuestTheShardsOfGenesisWallet': '0xf60d96cfa71c6fe7fe18ca028041ca7f42b543bd',
      'CryptoQuestSwap': '0x7132367941b5f058dc68cee2dbcd356fbaa7d5b4',
      'CryptoQuestTheShardsOfGenesisBookNFT': '0x6b07aD60b1d448D0e1cE9dCB24A85B3ab18b9b1E',
      'CQTTokenSaleContract': '0xc36fc9872Bd271BD80365517958e6F48D3b4FA91'
    }
  }
};
