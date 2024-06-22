// src/App.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Header from './components/Header';
import Features from './components/Features';

function App() {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <main>
        <h1>{t('Welcome')}</h1>
        <Features />
        {/* Add other components as needed */}
      </main>
    </div>
  );
}

export default App;
