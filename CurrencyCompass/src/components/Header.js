import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{t('appName')}</Text>
      <View style={styles.languageButtons}>
        <TouchableOpacity onPress={() => changeLanguage('en')}>
          <Text style={styles.languageButton}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('ja')}>
          <Text style={styles.languageButton}>JA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  languageButtons: {
    flexDirection: 'row',
  },
  languageButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});

export default Header;