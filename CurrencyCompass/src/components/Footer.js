import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>{t('footerText', '© 2024 CurrencyCompass. All rights reserved.')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#333',
  },
});

export default Footer;