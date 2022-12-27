import {Box} from 'native-base';
import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Recent from './HomeComponents/Recent';
import Random from './HomeComponents/Random';
import Popular from './HomeComponents/Popular';
import { Title } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createMaterialTopTabNavigator()

function Home(){
  return (
      <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { color:'#fff' },
        // tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#000000' },
      }}>
        <Tab.Screen name="Recent" component={Recent} />
        <Tab.Screen name="Random" component={Random} />
        <Tab.Screen name="Popular" component={Popular}/>
      </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
    text: {
      color: 'black',
    },
  });
export default Home;