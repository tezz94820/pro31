import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, FlatList, Image, ImageBackground, StatusBar, TouchableWithoutFeedback, Button, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import changeNavigationBarColor, { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'
import { Progress } from 'native-base';

function BackgroundImage({item}) {

    const [imageClicked,setImageClicked] = useState(false)
    const [likedImage,SetLikedImage] = useState(false)
    const [saveImageClicked,setSaveImageClicked] = useState(false)
    const [infoClicked,setInfoClicked] = useState(false)
    const [downloadProgress,setDownloadProgress] = useState(0)
    const [favouritesDB,setFavouritesDB] = useState([])
    
    const getFavourites = async () => {
        let data = JSON.parse(await AsyncStorage.getItem('@favourites'))
        if(data && data.find(image => image.key === item.key)){
            SetLikedImage(true)
        }
    }
    
    useEffect(() => {
        getFavourites()
        return () => getFavourites();
    },[])

    //like or unlike images
  const likeUnlikeImage = async (key,name,url) => {
    console.log(likedImage)
    //likedImage is false and wants to make a like
    if(!likedImage){
        try {
            let data = JSON.parse(await AsyncStorage.getItem('@favourites'))
            if(!data){
                data = []
            }
            data.push({key,name,url})
            await AsyncStorage.setItem('@favourites', JSON.stringify(data))
        // await AsyncStorage.removeItem('@favourites')
        // console.log(await AsyncStorage.getAllKeys()) 
            console.log(data)
        } catch (e) {
            // saving error
            console.log(e)
        }
    }else{//likedImage is true and want to undo the like
        let data = JSON.parse(await AsyncStorage.getItem('@favourites'))
        console.log(item.key)
        data = data.filter( image => image.key != item.key)
        console.log(data)
        await AsyncStorage.setItem('@favourites', JSON.stringify(data))
    }
    SetLikedImage(!likedImage)
  }

    const onImageClicked = () => {
        setImageClicked(!imageClicked)
    }
    imageClicked ? hideNavigationBar() : showNavigationBar();
    // console.log(favouritesDB)

    const dirs = RNFetchBlob.fs.dirs
    const saveImage = () => {
      RNFetchBlob
        .config({
          // add this option that makes response data to be stored as a file,
          // this is much more performant.
          fileCache : true,
          path : dirs.DCIMDir + `/Actress/${item.name}_${item.key}.png`,
        })
        .fetch('GET', item.url, {
          //some headers ..
        })
        .progress({interval:1},(received, total) => {
            // console.log('progress', received / total)
            setDownloadProgress(received / total *100)
          }
        )
        .then((res) => {
          // the temp file path
          console.log('The file saved to ', res.path())
          setDownloadProgress(0)
        })
        .catch((errorMessage,statusCode)=>{
          console.log("error with downloading file",errorMessage,statusCode)
        })

      setSaveImageClicked(true)
    }
  


  return (
        <TouchableWithoutFeedback onPress={() => onImageClicked()}>
            <ImageBackground source={{uri:item.url}} style ={styles.image} >
                {
                !imageClicked ? 
                // <View>
                  <View style={styles.container}>
                    {downloadProgress != 0 ? <Progress colorScheme="primary" value={downloadProgress} /> : null}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity>
                        <MaterialCommunityIcons name="information" size={50} color="#ffffff" />
                        <Text style={styles.iconLabels}>Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => saveImage(item.key,item.name,item.url)}>
                        <MaterialCommunityIcons name="download" size={50} color={saveImageClicked?"#075fed":"#ffffff"}/>
                        <Text style={styles.iconLabels}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => likeUnlikeImage(item.key,item.name,item.url)}>
                        <MaterialCommunityIcons name="heart" size={50} color={likedImage?"#fc0341":"#ffffff"}/>
                        <Text style={styles.iconLabels}>Like</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                // </View> 
                :null
                }
            </ImageBackground> 
        </TouchableWithoutFeedback>
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
      height:120,
      width:"93%",
      position:"absolute",
      bottom:"4%",
      left:"3.5%",
      flexDirection:"column",
      justifyContent:"space-between",
      // backgroundColor:"rgba(252, 3, 19,1)",
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

export default BackgroundImage