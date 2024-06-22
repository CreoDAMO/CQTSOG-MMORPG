import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Header from './components/Header';
import Features from './components/Features';
import Home from './components/Home';
import Game from './components/Game';

function App() {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <Home />
      <main>
        <h1>{t('Welcome')}</h1>
        <Features />
        <Game />
        {/* Add other components as needed */}
      </main>
    </div>
  );
}

export default App;
