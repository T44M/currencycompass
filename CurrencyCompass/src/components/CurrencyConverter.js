import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { MAIN_CURRENCIES } from '../constants/currencies';
import { getExchangeRates } from '../utils/exchangeRateCache';

const CurrencyConverter = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [rates, setRates] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRates();
  }, [baseCurrency]);

  const fetchRates = async () => {
    try {
      const fetchedRates = await getExchangeRates(baseCurrency);
      setRates(fetchedRates);
      setError('');
    } catch (error) {
      setError(t('fetchRatesError'));
    }
  };

  const handleAmountChange = (text) => {
    if (text === '' || /^\d*\.?\d*$/.test(text)) {
      setAmount(text);
    }
  };

  const convertAmount = (toCurrency) => {
    if (!amount || isNaN(amount)) return '0.00';
    const rate = rates[toCurrency] || 1;
    return (parseFloat(amount) * rate).toFixed(2);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      accessibilityLabel={t('currencyConverterScrollView')}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder={t('enterAmount')}
          keyboardType="numeric"
          accessibilityLabel={t('amountInputLabel')}
          accessibilityHint={t('amountInputHint')}
          importantForAccessibility="yes"
        />
        <Picker
          selectedValue={baseCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setBaseCurrency(itemValue)}
          accessibilityLabel={t('baseCurrencyPickerLabel')}
          accessibilityHint={t('baseCurrencyPickerHint')}
        >
          {MAIN_CURRENCIES.map((currency) => (
            <Picker.Item key={currency} label={t(currency)} value={currency} />
          ))}
        </Picker>
      </View>
      <Button 
        title={t('convert')} 
        onPress={fetchRates}
        accessibilityLabel={t('convertButtonLabel')}
        accessibilityHint={t('convertButtonHint')}
      />
      {error ? (
        <Text 
          style={styles.error}
          accessibilityLabel={t('errorMessageLabel')}
        >
          {error}
        </Text>
      ) : (
        <View 
          style={styles.resultContainer}
          accessibilityLabel={t('resultContainerLabel')}
        >
          {MAIN_CURRENCIES.filter(c => c !== baseCurrency).map((currency) => (
            <Text 
              key={currency} 
              style={styles.resultText}
              accessibilityLabel={`${t('convertedAmountLabel')} ${t(currency)}`}
            >
              {`${convertAmount(currency)} ${t(currency)}`}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
  },
  picker: {
    flex: 1,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default CurrencyConverter;