import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native'
import ItemsHome from '../components/ItemsHome';
import {auth, firebase} from '../firebase';


function MyProducts({navigation, route}) {

    return (
   <ScrollView style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Mes produits!</Text>
      </View>
   </ScrollView>
 );
}

const styles = StyleSheet.create({
container: {
    marginVertical: "5%",
    marginHorizontal: "1%"
}
})

export default MyProducts;