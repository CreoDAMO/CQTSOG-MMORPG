// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CryptoQuestContract } from "./contracts/CryptoQuestContract";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import World from "./components/World";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [player, setPlayer] = useState({});

  useEffect(() => {
    async function getAccount() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
        } catch (err) {
          console.error(err);
        }
      }
    }
    getAccount();
  }, []);

  const getPlayer = async () => {
    // Call contract's getPlayer() and set player state
  };

  return (
    <Router>
      <div className="App">
        <Navbar account={account} />
        <main>
          <Route path="/" exact component={Dashboard} />
          <Route path="/world" component={World} />
          {/* Add more routes for other components */}
        </main>
      </div>
    </Router>
  );
}

export default App;
