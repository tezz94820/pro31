import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Categories from './components/Categories';
import Favourites from './components/Favourites';
// import {NativeBaseProvider} from "native-base";
firestore()
  .collection('Users')
  .add({
    name: 'Ada Lovelace',
    age: 30,
  })
  .then(() => {
    console.log('User added!');
  });

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    // <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Categories" component={Categories} />
          <Tab.Screen name="Favourites" component={Favourites} />
        </Tab.Navigator>
      </NavigationContainer>
    // </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default App;
