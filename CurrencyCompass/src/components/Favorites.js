import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

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

  const removeFavorite = async (index) => {
    try {
      const updatedFavorites = favorites.filter((_, i) => i !== index);
      await AsyncStorage.setItem('favoriteCurrencyPairs', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderFavoriteItem = ({ item, index }) => (
    <View style={styles.favoriteItem}>
      <TouchableOpacity
        style={styles.favoriteTextContainer}
        onPress={() => navigation.navigate('Convert', { fromCurrency: item.fromCurrency, toCurrency: item.toCurrency })}
      >
        <Text style={styles.favoriteText}>{item.fromCurrency} → {item.toCurrency}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeFavorite(index)}>
        <Ionicons name="close-circle" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorite Currency Pairs</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>No favorite currency pairs yet.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  favoriteTextContainer: {
    flex: 1,
  },
  favoriteText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  emptyText: {
    color: '#999999',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Favorites;