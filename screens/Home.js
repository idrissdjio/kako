import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';

function Home({route, navigation}) {
    return (
   <View style={styles.container}>
       <Text>Email: {auth.currentUser?.email}</Text>
   </View>
 );
}

const styles = StyleSheet.create({
container: {},
})

export default Home;