import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Favourites(){
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.text}>Favourites</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    text: {
      color: 'black',
    },
  });
export default Favourites;