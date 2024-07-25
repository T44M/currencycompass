import React from 'react';
import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CurrencyConverter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
