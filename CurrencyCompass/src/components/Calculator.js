import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { evaluate } from 'mathjs';

const windowWidth = Dimensions.get('window').width;

const ResponsiveCalculator = () => {
  const [display, setDisplay] = useState('0');

  const handlePress = (value) => {
    setDisplay(prev => {
      if (prev === '0') {
        return value;
      } else {
        return prev + value;
      }
    });
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              item === '=' ? styles.equalButton : null,
              item === 'C' ? styles.clearButton : null
            ]}
            onPress={() => {
              if (item === '=') handleCalculate();
              else if (item === 'C') handleClear();
              else handlePress(item);
            }}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
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
    borderRadius: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    margin: '1%',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  equalButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
});

export default ResponsiveCalculator;