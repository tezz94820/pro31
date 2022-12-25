// import {Box} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Home(){
  return (
    <View>
      <Text style={styles.text}>Hello world</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    text: {
      color: 'black',
    },
  });
export default Home;