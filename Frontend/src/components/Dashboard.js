import React, { useState, useEffect } from 'react';
import { CryptoQuestContract } from '../contracts/CryptoQuestContract';

function Dashboard({ player }) {

  const [quests, setQuests] = useState([]);

  // Fetch quests
  useEffect(() => {
    async function fetchQuests() {
      try {
        const quests = await CryptoQuestContract.methods.getQuests().call();
        setQuests(quests);
      } catch (error) {
        console.error("Error fetching quests:", error);
      }
    }
    fetchQuests();
  }, []);

  // Handle quest acceptance
  const acceptQuest = async (questId) => {
    try {
      await CryptoQuestContract.methods.acceptQuest(questId).send({ from: player.address });
      alert("Quest accepted successfully!");
      // Refresh quests after accepting
      fetchQuests();
    } catch (error) {
      console.error("Error accepting quest:", error);
    }
  };

  return (
    <div>
      <h2>Welcome, {player.name}!</h2>
      <h3>Available Quests</h3>
      <ul>
        {quests.map((quest, index) => (
          <li key={index}>
            <span>{quest.questName}</span>
            <button onClick={() => acceptQuest(quest.questId)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
