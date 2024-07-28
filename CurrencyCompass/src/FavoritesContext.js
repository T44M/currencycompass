import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteCurrencyPairs');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const addFavorite = async (fromCurrency, toCurrency) => {
    try {
      const newFavorite = { fromCurrency, toCurrency };
      const updatedFavorites = [...favorites, newFavorite];
      await AsyncStorage.setItem('favoriteCurrencyPairs', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (fromCurrency, toCurrency) => {
    try {
      const updatedFavorites = favorites.filter(
        fav => !(fav.fromCurrency === fromCurrency && fav.toCurrency === toCurrency)
      );
      await AsyncStorage.setItem('favoriteCurrencyPairs', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);