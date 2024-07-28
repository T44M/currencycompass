import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, 
  SafeAreaView, TextInput, Modal, FlatList, Platform
} from 'react-native';
import { useFavorites } from '../FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyCache from '../utils/CurrencyCache';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

const SUPPORTED_CURRENCIES = ['JPY', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD'];

const FixedCurrencyConverter = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('10');
  const [fromCurrency, setFromCurrency] = useState('JPY');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('0');
  const [exchangeRates, setExchangeRates] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectingCurrency, setSelectingCurrency] = useState('from');
  const { favorites, setFavorites, addFavorite, removeFavorite } = useFavorites(); // 修正部分
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchExchangeRates();
    loadFavorites();
  }, []);

  useEffect(() => {
    checkIfFavorite();
  }, [fromCurrency, toCurrency, favorites]);

  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteCurrencyPairs');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, [setFavorites]);

  const checkIfFavorite = () => {
    setIsFavorite(favorites.some(pair => 
      pair.fromCurrency === fromCurrency && pair.toCurrency === toCurrency
    ));
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(fromCurrency, toCurrency);
    } else {
      addFavorite(fromCurrency, toCurrency);
    }
    setIsFavorite(!isFavorite);
  };

  const fetchExchangeRates = async () => {
    try {
      let rates = await CurrencyCache.getExchangeRates();
      if (!rates) {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        rates = data.rates;
        await CurrencyCache.saveExchangeRates(rates);
      }
      setExchangeRates(rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const handleConvert = () => {
    if (!exchangeRates) return;
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const result = (parseFloat(amount) * rate).toFixed(2);
    setConvertedAmount(result.replace('.', ','));
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const openCurrencyModal = (type) => {
    setSelectingCurrency(type);
    setModalVisible(true);
  };

  const selectCurrency = (currency) => {
    if (selectingCurrency === 'from') {
      setFromCurrency(currency);
    } else {
      setToCurrency(currency);
    }
    setModalVisible(false);
  };

  const getFlag = (currency) => {
    const flags = {
      JPY: '🇯🇵', USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', 
      AUD: '🇦🇺', CAD: '🇨🇦', CHF: '🇨🇭', CNY: '🇨🇳',
      HKD: '🇭🇰', NZD: '🇳🇿'
    };
    return Platform.OS === 'web' ? flags[currency] || currency : flags[currency] || '🏳️';
  };

  const renderCurrencyItem = ({ item }) => (
    <TouchableOpacity style={styles.currencyItem} onPress={() => selectCurrency(item)}>
      <Text style={styles.flagEmoji}>{getFlag(item)}</Text>
      <Text style={styles.currencyItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conversionArea}>
        <TouchableOpacity style={styles.currencyBox} onPress={() => openCurrencyModal('from')}>
          <View style={styles.flagCurrencyContainer}>
            <Text style={styles.flagEmoji}>{getFlag(fromCurrency)}</Text>
            <Text style={styles.currency}>{fromCurrency}</Text>
          </View>
          <TextInput
            style={styles.amount}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder={t('enterAmount')}
            placeholderTextColor="#666"
          />
        </TouchableOpacity>

        <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.swapButton} onPress={handleSwapCurrencies}>
          <Ionicons name="swap-vertical" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? "star" : "star-outline"} size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

        <TouchableOpacity style={styles.currencyBox} onPress={() => openCurrencyModal('to')}>
          <View style={styles.flagCurrencyContainer}>
            <Text style={styles.flagEmoji}>{getFlag(toCurrency)}</Text>
            <Text style={styles.currency}>{toCurrency}</Text>
          </View>
          <Text style={styles.amount}>{convertedAmount}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <FlatList
            data={SUPPORTED_CURRENCIES}
            renderItem={renderCurrencyItem}
            keyExtractor={item => item}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  conversionArea: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  currencyBox: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  flagCurrencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  amount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  currency: {
    fontSize: 18,
    color: '#999',
  },
  rateInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rateText: {
    color: '#999',
    fontSize: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
    width: '100%',
  },
  currencyItemText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  swapButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  favoriteButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default FixedCurrencyConverter;
