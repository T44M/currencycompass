import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { FavoritesProvider } from './FavoritesContext';

import CurrencyConverter from './components/CurrencyConverter';
import Calculator from './components/Calculator';
import Favorites from './components/Favorites';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <FavoritesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Convert') {
                  iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
                } else if (route.name === 'Calculator') {
                  iconName = focused ? 'calculator' : 'calculator-outline';
                } else if (route.name === 'Favorites') {
                  iconName = focused ? 'star' : 'star-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#007AFF',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: [
                {
                  display: 'flex'
                },
                null
              ]
            })}
          >
            <Tab.Screen name="Convert" component={CurrencyConverter} />
            <Tab.Screen name="Calculator" component={Calculator} />
            <Tab.Screen name="Favorites" component={Favorites} />
          </Tab.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </I18nextProvider>
  );
};

export default App;