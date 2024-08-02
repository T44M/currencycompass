import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteCurrencyPairs');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const removeFavorite = useCallback(async (index) => {
    try {
      const updatedFavorites = favorites.filter((_, i) => i !== index);
      await AsyncStorage.setItem('favoriteCurrencyPairs', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }, [favorites]);

  const renderFavoriteItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() => navigation.navigate('Convert', { fromCurrency: item.fromCurrency, toCurrency: item.toCurrency })}
    >
      <View style={styles.favoriteContent}>
        <Text style={styles.favoriteText}>{item.fromCurrency} → {item.toCurrency}</Text>
        <TouchableOpacity onPress={() => removeFavorite(index)} style={styles.removeButton}>
          <Ionicons name="close-circle" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ), [navigation, removeFavorite]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Pairs</Text>
        <View style={styles.titleUnderline} />
      </View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="star-outline" size={60} color="#666" />
          <Text style={styles.emptyText}>No favorite currency pairs yet.</Text>
          <Text style={styles.emptySubText}>Add some from the converter!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  titleUnderline: {
    width: 50,
    height: 3,
    backgroundColor: '#3498db',
    borderRadius: 2,
  },
  listContainer: {
    padding: 20,
  },
  gradientBackground: {
    borderRadius: 10,
  },
  favoriteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  favoriteText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  removeButton: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999999',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  emptySubText: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  favoriteItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#3498db',
  },
});

export default React.memo(Favorites);