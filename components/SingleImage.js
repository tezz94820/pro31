import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, FlatList, Image, ImageBackground, StatusBar, TouchableWithoutFeedback, Button, TouchableOpacity,Pressable,Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFetchBlob from 'rn-fetch-blob'
import { Box, CheckIcon, HStack, Progress, Radio, Slide, Spinner } from 'native-base';
import { Divider } from 'native-base';
import Modal from "react-native-modal";
import WallpaperManager, {TYPE} from "react-native-wallpaper-manage";

function SingleImage({route,navigation}) {
  const {key,name,images} = route.params
  const [currentItem,setCurrentItem] = useState('')
  const [imageClicked,setImageClicked] = useState(false)
  const [likedImage,SetLikedImage] = useState(false)
  const [saveImageClicked,setSaveImageClicked] = useState(false)
  const [downloadProgress,setDownloadProgress] = useState(0)
  const [infoClicked,setInfoClicked] = useState(false)
  const [applyClicked,setApplyClicked] = useState(false)
  const [wallpaperModalVisible,setWallpaperModalVisible] = useState(false)
  const [wallpaperType,setWallpaperType] = useState('FLAG_SYSTEM')
  const [slideVisible,setSlideVisible] = useState(false)

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
        setTimeout(() => {
          setDownloadProgress(0)
        }, 3000);
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

  const toggleModal = () => {
    setInfoClicked(!infoClicked)
  }

  const navigateByTag = () => {
    navigation.push('SingleActress',{key:currentItem.key,name:currentItem.name}) 
    setInfoClicked(false)
  }

  const linkOpener = async (type,typeUrl) => {
    try {
      await Linking.openURL(typeUrl)
    } catch (error) {
     console.log(error) 
    }
  }

  const toggleWallpaperModal = () => {
    setWallpaperModalVisible(true)
  }

  const applyWallpaper = (URL,type) => {
    setApplyClicked(true)
    setWallpaperModalVisible(false)
    try {
      const result = WallpaperManager.setWallpaper(URL, type==="FLAG_LOCK"?TYPE.FLAG_LOCK:TYPE.FLAG_SYSTEM)
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setApplyClicked(false)
      setSlideVisible(true)
      setTimeout(() => {
        setSlideVisible(false)
      }, 3000);
    }, 2000);
  }

  return (
      <>
        <ImageViewer
          enableSwipeDown
          index={images.findIndex( item => item.key === key)}
          onSwipeDown={() => navigation.goBack()}
          renderHeader={(currentIndex) => <>{onImageRender(currentIndex)}</>}
          onClick={() => setImageClicked(!imageClicked)}
          onChange = {() => onImageChange()}
          imageUrls={images}
        />
        {
                !imageClicked ?
                  <View style={styles.container}>
                    {downloadProgress != 0 ? <Progress colorScheme="primary" value={downloadProgress} /> : null}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={() => toggleModal()}>
                        <MaterialCommunityIcons name="information" size={50} color="#ffffff" />
                        <Text style={styles.iconLabels}>Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => toggleWallpaperModal()}>
                        <MaterialCommunityIcons name="format-paint" size={50} color={"#ffffff"} />
                        <Text style={styles.iconLabels}>Apply</Text>
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
                :null
        }

        {/* Modal Functionalities */}
        
          <Modal
            isVisible={infoClicked}
            onBackdropPress={() => setInfoClicked(false)}
            onBackButtonPress={() => setInfoClicked(false)}
            swipeDirection="down"
            onSwipeComplete={() => toggleModal()}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationInTiming={250}
            backdropTransitionInTiming={300}
            // animationOutTiming={150}
            // backdropTransitionOutTiming={500}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <View style={styles.center}>
                <TouchableOpacity><View style={styles.barIcon}/></TouchableOpacity>
                <Text style={{fontSize:24}}>Info</Text>
              </View>
              <View style={styles.infoContainer}>
                  <Text style={styles.text}>
                    Name :
                    <Text style={{color:"#115dad"}} onPress={() => navigateByTag()}>
                      {` ${currentItem.name}`}
                      </Text>
                  </Text>
                <Text style={styles.text}>Likes : {currentItem.likes?currentItem.likes:0}</Text>
                {
                  currentItem.dimensions ?
                    <Text style={styles.text}>Dimensions : {currentItem.dimensions}</Text>
                    : null
                }
                <Divider orientation='horizontal' thickness="2" bg="#3246a8" style={{marginBottom:10}}/>
                <Text style={styles.socialMediaHeading}>Social Media Handles</Text>
                  {
                    <FlatList 
                    style={styles.socialMediaContainer}
                    data={currentItem.social_media}
                    keyExtractor={(item) => item.type}
                    horizontal
                    renderItem={({item}) =>
                      <View style={{marginHorizontal:20}}>
                        <TouchableOpacity onPress={async () => linkOpener(item.type,item.url)}>
                          <MaterialCommunityIcons name={item.type} size={50} color={"#ffffff"}/>
                        </TouchableOpacity>
                      </View>
                    }/>
                  }
              </View>
            </View>
          </Modal>

          <Slide in={slideVisible} placement="top">
            <Box w="100%" position="absolute" p="2" borderRadius="xs" bg="emerald.100" alignItems="center" justifyContent="center" 
              _dark={{ bg: "emerald.200" }} safeArea>
            <HStack space={2}>
              <CheckIcon size="4" color="emerald.600" mt="1" _dark={{
              color: "emerald.700"
            }} />
              <Text style={{color:"green",textAlign:"center"}}>
                Wallpaper Applied Successfully
              </Text>
            </HStack>
            </Box>
          </Slide>

          <Slide in={downloadProgress == 100} placement="top">
            <Box w="100%" position="absolute" p="2" borderRadius="xs" bg="emerald.100" alignItems="center" justifyContent="center" 
              _dark={{ bg: "emerald.200" }} safeArea>
            <HStack space={2}>
              <CheckIcon size="4" color="emerald.600" mt="1" _dark={{
              color: "emerald.700"
            }} />
              <Text style={{color:"green",textAlign:"center"}}>
                Wallpaper Downloaded Successfully
              </Text>
            </HStack>
            </Box>
          </Slide>

          {/* Wallpaper Modal */}
          <Modal
            isVisible={wallpaperModalVisible}
            onBackdropPress={() => setWallpaperModalVisible(false)}
            onBackButtonPress={() => setWallpaperModalVisible(false)}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            // animationInTiming={250}
            // backdropTransitionInTiming={300}
          >
              <View style={{backgroundColor:"white",borderRadius:20,width:"70%",marginHorizontal:"12.5%"}}>
                <Text style={{color:"black",textAlign:"center",fontSize:20}}>Wallpaper Type</Text>
                  <Divider thickness={2} bg="emerald.500" />
                  <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={wallpaperType} 
                    onChange={ nextValue => setWallpaperType(nextValue) }
                    style={{paddingLeft:"10%"}}
                  >
                    <Radio value="FLAG_LOCK" my={1} colorScheme="emerald" style={{paddingVertical:5}}>Lock Screen</Radio>
                    <Radio value="FLAG_SYSTEM" my={1} colorScheme="emerald" style={{paddingVertical:5}}>Home Screen</Radio>
                  </Radio.Group>
                  <TouchableOpacity onPress={() => applyWallpaper(currentItem.url,wallpaperType)}>
                    <View style={{backgroundColor:"green",borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                      <Text style={{color:"black",textAlign:"center",marginVertical:10}}>Apply</Text>
                    </View>
                  </TouchableOpacity>
                  
              </View>
          </Modal>

          {/* Loading Modal */}
          <Modal
            isVisible={applyClicked}
            // onBackdropPress={() => setWallpaperModalVisible(false)}
            // onBackButtonPress={() => setWallpaperModalVisible(false)}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
          >
            <View style={{backgroundColor:"white",borderRadius:20,width:"70%",marginHorizontal:"12.5%"}}>
              <Spinner color="emerald.500" size="lg" />
              <Text style={{color:"black",textAlign:"center"}}>Loading...</Text>
            </View>

          </Modal>
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
  },
  modal:{
    justifyContent:'flex-end',
    margin:0,
  },
  modalContent:{
    backgroundColor:"#161616",
    paddingTop:12,
    paddingHorizontal:12,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    paddingBottom:20,
  },
  center:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  barIcon:{
    width:60,
    height:5,
    backgroundColor:"#bbb",
    borderRadius:3,
  },
  infoContainer:{
    marginTop:10
  },
  text:{
    color:"#bbb",
    fontSize:18,
    marginBottom:10,
  },
  socialMediaHeading:{
    color:"#bbb",
    fontSize:18,
    marginBottom:10,
    textAlign: 'center',
  },
  socialMediaContainer:{
    // display:"flex",
    // flexDirection:"row",
    // justifyContent: 'space-evenly',
    // backgroundColor:"red",
    width:"100%",
    // flex:0,
  },

});

export default SingleImage