import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    return response.data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const rates = await fetchExchangeRates(fromCurrency);
    const rate = rates[toCurrency];
    return amount * rate;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};