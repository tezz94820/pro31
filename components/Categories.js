import {Box} from 'native-base';
import React, { useEffect, useState } from 'react';
import {FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import CardImage from './CardImage';

function Categories({navigation}) {
  //states
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);
  const [refreshing,setRefreshing] = useState(true);

  //useEffect dataFetching function from firebase
  const getData = () => {
    const data = firestore().collection('app').doc('List').collection('Category');
    data.onSnapshot( querySnapshot => {
      const images =[]
      querySnapshot.forEach(documentSnapshot => {
        images.push({
          ...documentSnapshot.data(),
          key:documentSnapshot.id,
        })
      })
      setImages(images)
      setLoading(false);
      setRefreshing(false)
    })
  }

  useEffect(() => {
    getData()
    return () => getData();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container} >
          <FlatList
            data={images}
            renderItem={({item}) => <CardImage item={item} navigation={navigation}/>  }
            keyExtractor={(item) => item.key}
            resizeMode="contain"
            RefreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }
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
    height:"100%",
    width:"100%",
  },
  ImageTouchable:{
    height:330,
    width:"49%",
    backgroundColor: '#000000',
    
  }
});

export default Categories