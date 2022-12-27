import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, FlatList, Image, ImageBackground, StatusBar, TouchableWithoutFeedback} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function SingleImage({route,navigation}) {
  const {key,name,images} = route.params
  const [imageClicked,setImageClicked] = useState(false)
  // const [image,setImage] = useState()

  // const getData = () => {
    // const data = firestore().collection('app').doc('Actress').collection(name).doc(key).get();
    // console.log(data._data)
    // data.onSnapshot( querySnapshot => {
    //   const images =[]
    //   querySnapshot.forEach(documentSnapshot => {
    //     images.push({
    //       ...documentSnapshot.data(),
    //       key:documentSnapshot.id,
    //     })
    //   })
    //   setImages(images)
      // setLoading(false);
    // })
  // }

  // useEffect(() => {
  //   getData()
  //   return () => getData();
  // }, []);

    return (
      <View>
        <StatusBar translucent backgroundColor="transparent" hidden={!imageClicked}/>
        <FlatList
          horizontal={true}
          data={images}
          initialScrollIndex={images.findIndex( item => item.key === key)}
          renderItem={({item}) => 
            <TouchableWithoutFeedback onPress={() => setImageClicked(!imageClicked)}>
              <ImageBackground source={{uri:item.url}} style ={styles.image} >
                <Text>Hello</Text>
              </ImageBackground> 
            </TouchableWithoutFeedback>
          }
          keyExtractor={(item) => item.key}
          resizeMode="contain"
          pagingEnabled
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
    width:410,
    height:850,
    // resizeMode:"contain",
    // borderWidth:5,
    // borderColor:"#000000",
    // borderRadius:20,
    // overlayColor:'black',
  },
  container:{
    height:"100%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#000000",
  },
});

export default SingleImage