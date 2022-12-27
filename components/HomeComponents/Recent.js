import {Box} from 'native-base';
import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';

function Recent() {
  //states
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);

  //useEffect dataFetching function from firebase
  const getData = () => {
    const data = firestore().collection('app').doc('Actress').collection('Kriti Kharbanda');
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
      {/* <Text>Hello</Text> */}
          <FlatList
            data={images}
            renderItem={({item}) => <Image source={{uri:item.url}} style ={styles.image} />}
            numColumns={2}
            keyExtractor={(item) => item.key}
            resizeMode="contain"
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
    width:'49%',
    height:330,
    borderWidth:5,
    borderColor:"#000000",
    borderRadius:20,
    overlayColor:'black'
  },
  container:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#000000",
  }
});

export default Recent