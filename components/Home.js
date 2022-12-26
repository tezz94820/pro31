import {Box} from 'native-base';
import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function Home(){

  const [links,setLinks] = useState([])
  const [name,setName] = useState('')
  
  const getData = async () => {
    const data = await firestore().collection('Actress').doc('rVDZ6MNnVGah9aDijS6v').get();
    // console.log(data._data)
    setName(data._data.name)
    setLinks(data._data.links)
  }
  
  useEffect(() => {
    getData()
  }, []);

  console.log(name)
  console.log(links[0])

  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center" >
      <Text>Home Screen</Text>
        <FlatList data={links}
          renderItem={({item}) => <Image source={{uri:item.url}} style = {{ width: 200, height: 200 }}/>}
        />
        
        {/* <Text></Text> */}
      {/* <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      /> */}
    </Box>
  );
}
const styles = StyleSheet.create({
    text: {
      color: 'black',
    },
  });
export default Home;