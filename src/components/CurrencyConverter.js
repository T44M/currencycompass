import React, { useState } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const handleConvert = () => {
    // TODO: Implement conversion logic
    console.log(`Converting ${amount} from ${fromCurrency} to ${toCurrency}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Currency Converter</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="p-2 border rounded"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
        <button
          onClick={handleConvert}
          className="bg-green-500 text-white p-2 rounded"
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
