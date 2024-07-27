import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchExchangeRates } from '../services/currencyApi';

const CACHE_KEY = 'EXCHANGE_RATES_CACHE';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const getExchangeRates = async (baseCurrency) => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { rates, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        return rates;
      }
    }
    
    const newRates = await fetchExchangeRates(baseCurrency);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
      rates: newRates,
      timestamp: Date.now()
    }));
    return newRates;
  } catch (error) {
    console.error('Error fetching or caching exchange rates:', error);
    throw error;
  }
};