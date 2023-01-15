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
import SingleActress from './components/StackScreens/SingleActress';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage" >
          <Stack.Screen name="HomePage" component={HomePage} options={{headerShown:false}}/>
          <Stack.Screen name="SingleImage" component={SingleImage} options={{headerShown:false}}/>
          <Stack.Screen name="SingleActress" component={SingleActress} 
            options={({route}) => ({
              title: route.params.name,
              headerShown:true,
              headerStyle:{
                backgroundColor:"#000000",
                borderBottomWidth:3,
                borderBottomColor:"#302f29",
              },
              headerTitleStyle:{
                color:"#fff"
              },
              headerTintColor: '#ffffff'
            })}
          />
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
