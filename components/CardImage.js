import React from 'react'
import { Image, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';

function CardImage({item,navigation}) {

  const singleActressHandler = (key,name) => {
    navigation.navigate('SingleActress',{key,name})
  }

  return (
    <TouchableOpacity onPress={() => singleActressHandler(item.key,item.name)} style={styles.ImageTouchable} activeOpacity={0.8}>
        <ImageBackground source={{uri:item.url}} style ={{width:'100%',height:'100%'}} imageStyle={styles.image} >
          <Text style={styles.actressName}>{item.name}</Text>
        </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    image:{
      borderRadius:20,
    },
    ImageTouchable:{
      paddingHorizontal:7,
      paddingTop:7,
      height:174,
      width:385,
      backgroundColor: '#000000',
    },
    actressName:{
      fontWeight:'bold',
      position:'absolute',
      bottom:0,
      left:15,
      fontSize:18,
      color:"#ffffff",
      backgroundColor:"rgba(0,0,0,0.5)"
    },
  });

export default CardImage