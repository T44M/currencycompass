import React, { Suspense, lazy } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { FavoritesProvider } from './FavoritesContext';
import { getApp } from 'firebase/app';
import './firebaseConfig';
import './polyfills';
import Loading from './components/Loading';

const CurrencyConverter = lazy(() => import('./components/CurrencyConverter'));
const Calculator = lazy(() => import('./components/Calculator'));
const Favorites = lazy(() => import('./components/Favorites'));

const Tab = createBottomTabNavigator();

const App = () => {
  const app = getApp();
  console.log('Firebase App initialized:', app.name);

  return (
    <I18nextProvider i18n={i18n}>
      <FavoritesProvider>
        <NavigationContainer>
        <Suspense fallback={<Loading />}>
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
          </Suspense>
        </NavigationContainer>
      </FavoritesProvider>
    </I18nextProvider>
  );
};

export default App;