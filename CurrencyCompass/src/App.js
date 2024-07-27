import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function App() {
  console.log('App component rendering');
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView style={styles.container}>
        <Text>Debug: App is rendering</Text>
        <Header />
        <LanguageSwitcher />
        <View style={styles.main}>
          <CurrencyConverter />
        </View>
        <Footer />
      </SafeAreaView>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});