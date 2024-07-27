import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => changeLanguage('en')}
        accessibilityLabel="Switch to English"
        accessibilityRole="button"
      >
        <Text style={styles.languageButton}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => changeLanguage('ja')}
        accessibilityLabel="日本語に切り替え"
        accessibilityRole="button"
      >
        <Text style={styles.languageButton}>JA</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => changeLanguage('fr')}
        accessibilityLabel="Passer au français"
        accessibilityRole="button"
      >
        <Text style={styles.languageButton}>FR</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => changeLanguage('es')}
        accessibilityLabel="Cambiar a español"
        accessibilityRole="button"
      >
        <Text style={styles.languageButton}>ES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  languageButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default LanguageSwitcher;