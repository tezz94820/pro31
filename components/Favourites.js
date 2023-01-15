import {Box} from 'native-base';
import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View, RefreshControl} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Favourites({navigation}) {
  //states
  const [images, setImages] = useState([])
  const [refreshing, setRefreshing] = useState(true);

  //Image Pressed Function
  const onPress = (key,name) => {
    navigation.navigate('SingleImage',{key,name,images})
  }

  const getFavourites = async () => {
    let data;
    try {
      data = JSON.parse(await AsyncStorage.getItem('@favourites'))
      setRefreshing(false);
    } catch (error) {
      console.log(error)
    }
    console.log(data)
    setImages(data)
  }

  useEffect(() => {
    getFavourites()
    return () => getFavourites();
  },[])

  return (
    <View style={styles.container} >
      {/* <TouchableOpacity><Image source={{uri:item.url}} style ={styles.image} /></TouchableOpacity> */}
      {/* <Text>Hello</Text> */}
          <FlatList
            data={images}
            renderItem={({item}) => 
            <TouchableOpacity onPress={() => onPress(item.key,item.name)} style={styles.ImageTouchable} activeOpacity={0.8}>
              <Image source={{uri:item.url}} style ={styles.image} />
            </TouchableOpacity>}
            numColumns={2}
            keyExtractor={(item) => item.key}
            resizeMode="contain"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getFavourites}/>
            }
            refres
            // ItemSeparatorComponent={() => <View style={{height: 5}} />}
            // ListHeaderComponent={() => <View style={{height: 5}} />}
            // ListFooterComponent={() => <View style={{height: 5}} />}
          />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  image:{
    width:'100%',
    height:'100%',
    borderWidth:5,
    // borderColor:"#000000",
    borderRadius:20,
    overlayColor:'black',
    margin:5,
  },
  container:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#000000",
  },
  ImageTouchable:{
    height:330,
    width:"49%",
    backgroundColor: '#000000',
    
  }
});

export default Favourites