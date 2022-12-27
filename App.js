import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Categories from './components/Categories';
import Favourites from './components/Favourites';
import {IconButton, NativeBaseProvider} from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from './components/StackScreens/HomePage';
import SingleImage from './components/SingleImage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false
        }} initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="SingleImage" component={SingleImage} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default App;
