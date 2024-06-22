import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import Header from './components/Header';
import Features from './components/Features';
import Home from './components/Home';
import Game from './components/Game'; // assuming you have a Game component

function App() {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/game" element={<Game />} />
          {/* Add other routes as needed */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
