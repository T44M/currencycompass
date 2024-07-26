import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import Footer from './components/Footer';
import './i18n';

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header changeLanguage={changeLanguage} />
      <main className="flex-grow">
        <CurrencyConverter />
      </main>
      <Footer />
    </div>
  );
}

export default App;