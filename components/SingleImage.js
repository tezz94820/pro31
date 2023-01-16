import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, FlatList, Image, ImageBackground, StatusBar, TouchableWithoutFeedback, Button, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import changeNavigationBarColor, { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from './BackgroundImage';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFetchBlob from 'rn-fetch-blob'
import { Progress } from 'native-base';

function SingleImage({route,navigation}) {
  const {key,name,images} = route.params
  const [visible,setVisible] = useState(false)
  const [currentItem,setCurrentItem] = useState('') 
  const [imageClicked,setImageClicked] = useState(false)
  const [likedImage,SetLikedImage] = useState(false)
  const [saveImageClicked,setSaveImageClicked] = useState(false)
  const [downloadProgress,setDownloadProgress] = useState(0)
  const [favouritesDB,setFavouritesDB] = useState([])
  const [infoClicked,setInfoClicked] = useState(false)


  const getFavourites = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('@favourites'))
    if(data && data.find(image => image.key === currentItem.key)){
        SetLikedImage(true)
    // console.log(data)
      }
    else{
      SetLikedImage(false)
    }
  }

  // useEffect(() => {
  //   getFavourites()
  //   return () => getFavourites();
  // },[])

  const onImageRender = (currentIndex) => {
    changeCurrentItem(currentIndex)
    getFavourites()
  }
  const changeCurrentItem = (index) => {
    setCurrentItem(images[index])
  }

  const onImageChange = () => {
    setSaveImageClicked(false)
    getFavourites()
  }

  const likeUnlikeImage = async () => {
    // console.log(likedImage)
    const {key,name,url} = currentItem
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
            // console.log(data)
        } catch (e) {
            // saving error
            console.log(e)
        }
    }else{//likedImage is true and want to undo the like
        let data = JSON.parse(await AsyncStorage.getItem('@favourites'))
        // console.log(key)
        data = data.filter( image => image.key != key)
        // console.log(data)
        await AsyncStorage.setItem('@favourites', JSON.stringify(data))
    }
    SetLikedImage(!likedImage)
  }


  const dirs = RNFetchBlob.fs.dirs
  const saveImage = () => {
    const {key,name,url} = currentItem
    RNFetchBlob
      .config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache : true,
        path : dirs.DCIMDir + `/Actress/${name}_${key}.png`,
      })
      .fetch('GET', url, {
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

  // console.log(images)
  const Viewerimages = [
    {"url": "https://firebasestorage.googleapis.com/v0/b/pro31-881ae.appspot.com/o/Kriti%20Kharbanda%2F1.jpg?alt=media&token=aaafbedf-af8e-4b32-872a-f19d78bf760f",key:"11"},
    {"url": "https://firebasestorage.googleapis.com/v0/b/pro31-881ae.appspot.com/o/Kriti%20Kharbanda%2F1.jpg?alt=media&token=aaafbedf-af8e-4b32-872a-f19d78bf760f",key:"12"} 
  ]

  const getImageInfo = () => {
    setInfoClicked(!infoClicked)

  }

  
  return (
      <>
      {/* <Text style={{color:'black'}}>Hello</Text> */}
        {/* <Modal visible={true} > */}
        <ImageViewer 
        enableSwipeDown
        index={images.findIndex( item => item.key === key)}
        onSwipeDown={() => navigation.goBack()}
        renderHeader={(currentIndex) => <>{onImageRender(currentIndex)}</>}
        onClick={() => setImageClicked(!imageClicked)}
        onChange = {() => onImageChange()}
        imageUrls={images}
        />
        <Button title={currentItem.key+" "+infoClicked}></Button>
        {
                !imageClicked ? 
                // <View>
                  <View style={styles.container}>
                    {downloadProgress != 0 ? <Progress colorScheme="primary" value={downloadProgress} /> : null}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={() => getImageInfo()}>
                        <MaterialCommunityIcons name="information" size={50} color={infoClicked?"#075fed":"#ffffff"} />
                        <Text style={styles.iconLabels}>Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => saveImage()}>
                        <MaterialCommunityIcons name="download" size={50} color={saveImageClicked?"#075fed":"#ffffff"}/>
                        <Text style={styles.iconLabels}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => likeUnlikeImage()}>
                        <MaterialCommunityIcons name="heart" size={50} color={likedImage?"#fc0341":"#ffffff"}/>
                        <Text style={styles.iconLabels}>Like</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                // </View> 
                :null
                }
        {/* </Modal> */}
      </>
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
    backgroundColor:"rgba(34, 169, 181,1)",
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