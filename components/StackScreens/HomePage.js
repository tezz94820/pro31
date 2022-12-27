import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Categories from '../Categories';
import Favourites from '../Favourites';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, View, Button} from 'react-native';

const Tab = createBottomTabNavigator();
function HomePage() {
  return (
    // <View>
    //   <Button
    //     title="Go to Details"
    //     onPress={() => navigation.navigate('SingleImage')}
    //   />
    // </View>
    <Tab.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:"#000000",
        borderBottomWidth:3,
        borderBottomColor:"#302f29",
      },
      headerTitleStyle:{
        color:"#fff"
      },
    }}>
      <Tab.Screen name="Home" component={Home}
      options={{
        tabBarLabel: 'Home',
        title:'Actress Wallpaper',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
    }}/>
      <Tab.Screen name="Categories" component={Categories} 
      options={{
        tabBarLabel: 'Categories',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen name="Favourites" component={Favourites} 
      options={{
        tabBarLabel: 'Favourites',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="heart" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  )
}

export default HomePage