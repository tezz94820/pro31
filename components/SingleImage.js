import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, FlatList, Image, ImageBackground, StatusBar, TouchableWithoutFeedback, Button, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import changeNavigationBarColor, { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from './BackgroundImage';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

function SingleImage({route,navigation}) {
  const {key,name,images} = route.params

  return (
      <View>
        <StatusBar translucent backgroundColor="transparent"/>
        <FlatList
          horizontal={true}
          data={images}
          initialScrollIndex={images.findIndex( item => item.key === key)}
          renderItem={({item}) => <BackgroundImage item={item} /> }
          keyExtractor={(item) => item.key}
          resizeMode="contain"
          pagingEnabled
          // ItemSeparatorComponent={() => <View style={{height: 5}} />}
          // ListHeaderComponent={() => <View style={{height: 5}} />}
          // ListFooterComponent={() => <View style={{height: 5}} />}
        />
      </View>
      // <>
      // <Text style={{color:'black'}}>Hello</Text>
      //   <FlatList 
      //   horizontal={true}
      //   data={images}
      //   initialScrollIndex={images.findIndex( item => item.key === key)}
      //   renderItem={({item}) => 
      //     <Image 
      //     source={{uri:"https://firebasestorage.googleapis.com/v0/b/pro31-881ae.appspot.com/o/Kriti%20Kharbanda%2F1.jpg?alt=media&token=aaafbedf-af8e-4b32-872a-f19d78bf760f"}}
      //     style={{height:100,width:100}}
      //     />
      //   }
      //   pagingEnabled
      //   />
      //   <ImageViewer imageUrls={[{"url": "https://firebasestorage.googleapis.com/v0/b/pro31-881ae.appspot.com/o/Kriti%20Kharbanda%2F1.jpg?alt=media&token=aaafbedf-af8e-4b32-872a-f19d78bf760f"}]} />
      // </>
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
    height:90,
    width:"93%",
    position:"absolute",
    bottom:"4%",
    left:"3.5%",
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"rgba(0, 0, 0,1)",
    borderRadius:30,
    padding:5
    // opacity:0.5,

  },
  iconLabels:{
    color:"#ffffff",
    fontSize:15,
    left:10,
    bottom:8,
  }
});

export default SingleImage