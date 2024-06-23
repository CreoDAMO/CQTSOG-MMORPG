import React from 'react';
import { Web3Provider } from './context/Web3Context';
import Game from './components/Game';

function App() {
    return (
        <Web3Provider>
            <div className="App">
                <h1>CryptoQuest: The Shards of Genesis</h1>
                <Game />
                {/* Add other components */}
            </div>
        </Web3Provider>
    );
}

export default App;
