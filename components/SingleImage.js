import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, FlatList, Image, ImageBackground, StatusBar, TouchableWithoutFeedback, Button, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import changeNavigationBarColor, { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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


  const onImageClicked = () => {
    setImageClicked(!imageClicked)
  }
  imageClicked ? hideNavigationBar() : showNavigationBar();
    return (
      <View>
        <StatusBar translucent backgroundColor="transparent"/>
        <FlatList
          horizontal={true}
          data={images}
          initialScrollIndex={images.findIndex( item => item.key === key)}
          renderItem={({item}) => 
            <TouchableWithoutFeedback onPress={() => onImageClicked()}>
              <ImageBackground source={{uri:item.url}} style ={styles.image} >
                {
                !imageClicked ? 
                <View style={styles.buttonContainer}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="information" size={50} color="#ffffff" />
                    <Text style={styles.iconLabels}>Info</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="heart" size={50} color="#ffffff"/>
                    <Text style={styles.iconLabels}>Like</Text>
                  </TouchableOpacity>
                </View>
                :null}
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
  image:{
    width:410,
    height:900,
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
  buttonContainer:{
    height:100,
    width:"93%",
    position:"absolute",
    bottom:"3.5%",
    left:"3.5%",
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"rgba(154, 151, 156,0.8)",
    // opacity:0.5,

  },
  iconLabels:{
    color:"#000000",
    fontSize:15,
    left:10,
    bottom:5,
  }
});

export default SingleImage