// Import contracts 
import contracts from './contracts';

// Import web3 context
import { Web3Provider } from './context/Web3Context';

// Address constants
const TOKEN_ADDRESS = '0x...'
const NFT_ADDRESS = '0x...'

function App() {

  // Declare contract instances
  const tokenContract = new web3.eth.Contract(
    contracts.CryptoQuestToken,
    TOKEN_ADDRESS
  );

  const nftContract = new web3.eth.Contract(  
    contracts.CryptoQuestNFT,
    NFT_ADDRESS
  );

  return (
    <Web3Provider>
      <div className="App">

        <h1>CryptoQuest DApp</h1>

        // Pass contracts as props
        <Game
          tokenContract={tokenContract}
          nftContract={nftContract} 
        />

      </div>
    </Web3Provider>
  );
}

function Game({ tokenContract, nftContract }) {

  // Consume contracts

  return (
    <div>
      {/* Game UI */}
    </div>
  )

}

export default App;
