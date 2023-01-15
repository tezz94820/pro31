import {Box} from 'native-base';
import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';

function Popular({navigation}) {
  //states
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);

  //useEffect dataFetching function from firebase
  const getData = () => {
    const data = firestore().collection('app').doc('Actress').collection('Ananya Panday');
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

  //Image Pressed Function
  const onPress = (key,name) => {
    // console.log("Image Pressed")
    // console.log(key,name)
    navigation.navigate('SingleImage',{key,name,images})
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
      {/* <TouchableOpacity><Image source={{uri:item.url}} style ={styles.image} /></TouchableOpacity> */}
      {/* <Text>Hello</Text> */}
          <FlatList
            data={images}
            renderItem={({item}) => 
            <TouchableOpacity onPress={() => onPress(item.key,item.name)} style={styles.ImageTouchable} >
              <Image source={{uri:item.url}} style ={styles.image} />
            </TouchableOpacity>}
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
  image:{
    width:'100%',
    height:'100%',
    borderWidth:5,
    // borderColor:"#000000",
    borderRadius:20,
    overlayColor:'black',
    // margin:5,
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
    padding:5,
  }
});

export default Popular