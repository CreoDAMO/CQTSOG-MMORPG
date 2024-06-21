import React, { useContext, useState } from 'react';
import { Web3Context } from '../context/Web3Context';
import { getCryptoQuestTheShardsOfGenesisMMPORPGContract } from '../utils/contracts';

const Game = () => {
    const { library, account } = useContext(Web3Context);
    const [player, setPlayer] = useState(null);

    const createPlayer = async () => {
        const contract = getCryptoQuestTheShardsOfGenesisMMPORPGContract(library);
        const tx = await contract.createPlayer();
        await tx.wait();
    };

    const fetchPlayer = async () => {
        const contract = getCryptoQuestTheShardsOfGenesisMMPORPGContract(library);
        const player = await contract.players(account);
        setPlayer(player);
    };

    return (
        <div>
            <button onClick={createPlayer}>Create Player</button>
            <button onClick={fetchPlayer}>Fetch Player</button>
            {player && (
                <div>
                    <p>Level: {player.level}</p>
                    <p>Experience: {player.experience}</p>
                </div>
            )}
        </div>
    );
};

export default Game;
