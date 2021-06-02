/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import HomeMap from './screens/maps/index';
import RequestForm from './screens/request/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="HomeMap" component={HomeMap} />
        <Stack.Screen name="RequestForm" component={RequestForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
