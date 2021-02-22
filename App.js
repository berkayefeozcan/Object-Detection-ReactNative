/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ImageProcessing from './Screens/ImageProcessing';
import ResultScreen from './Screens/FullScreenImage';
import FullScreenImage from './Screens/FullScreenImage';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            title: 'Object Dedection',
            headerStyle: {
              backgroundColor: '#87cefa',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

          }}
          component={ ImageProcessing }
        />
        <Stack.Screen
          name="FullScreen"
          options={{
            title: 'Object Dedection',
            headerStyle: {
              backgroundColor: '#87cefa',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

          }}
          component={FullScreenImage}
        />

      </Stack.Navigator>
    </NavigationContainer>

  );
};


export default App;
