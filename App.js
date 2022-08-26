/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Header from './Components/Header';
import Colors from './Components/Colors';
import Accueil from './Screens/Accueil';
import Passager from './Screens/Passager';
import Cam from './Screens/Cam';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackView, createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();


  return (
    <SafeAreaProvider style={backgroundStyle}> 
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Passager" component={Passager} />
        <Stack.Screen name="Cam" component={Cam} />
      </Stack.Navigator> 

    </NavigationContainer> 
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "pink",
    padding: 10,
  },
  btnText: {
    color:"black",
  }
});


export default App;
