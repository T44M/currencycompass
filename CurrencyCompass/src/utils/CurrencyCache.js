import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = '@CurrencyCompass:exchangeRates';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const CurrencyCache = {
  async saveExchangeRates(rates) {
    try {
      const cacheData = {
        timestamp: Date.now(),
        rates: rates
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving exchange rates to cache:', error);
    }
  },

  async getExchangeRates() {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { timestamp, rates } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRATION) {
          return rates;
        }
      }
      return null; // Cache expired or not found
    } catch (error) {
      console.error('Error retrieving exchange rates from cache:', error);
      return null;
    }
  },

  async clearCache() {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error('Error clearing exchange rates cache:', error);
    }
  }
};

export default CurrencyCache;