import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { create, all } from 'mathjs/number';

const math = create(all);
const limitedEvaluate = math.evaluate;

const windowWidth = Dimensions.get('window').width;

const BUTTONS = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];

const ResponsiveCalculator = () => {
  const [display, setDisplay] = useState('0');

  const handlePress = useCallback((value) => {
    setDisplay(prev => prev === '0' ? value : prev + value);
  }, []);

  const handleClear = useCallback(() => {
    setDisplay('0');
  }, []);

  const handleCalculate = useCallback(() => {
    try {
      const result = limitedEvaluate(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  }, [display]);

  const renderButton = useCallback((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.button,
        item === '=' && styles.equalButton,
        item === 'C' && styles.clearButton
      ]}
      onPress={() => {
        if (item === '=') handleCalculate();
        else if (item === 'C') handleClear();
        else handlePress(item);
      }}
    >
      <View style={[
        styles.buttonInner,
        item === '=' ? styles.equalButtonInner : null
      ]}>
        <Text style={styles.buttonText}>{item}</Text>
      </View>
    </TouchableOpacity>
  ), [handleCalculate, handleClear, handlePress]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {BUTTONS.map(renderButton)}
      </View>
    </SafeAreaView>
  );
};

const buttonBaseStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  displayContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#2C2C2E',
    borderRadius: 15,
    marginBottom: 20,
  },
  display: {
    fontSize: 48,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  button: {
    width: windowWidth > 500 ? 80 : '22%',
    aspectRatio: 1,
    margin: '1%',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  equalButton: {
    width: windowWidth > 500 ? 80 : '47%',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonInner: {
    ...buttonBaseStyle,
    flex: 1,
    backgroundColor: '#3a3a3c',
  },
  equalButtonInner: {
    ...buttonBaseStyle,
    backgroundColor: '#4a90e2',
  },
});

export default React.memo(ResponsiveCalculator);