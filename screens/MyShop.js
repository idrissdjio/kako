import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AccountElement } from './Account';

function MyShop({navigation}) {
    return (
   <View style={styles.container}>
       <AccountElement text="Ajouter un kako" navigation={() => navigation.navigate("AddProduct")}/>
       <AccountElement text="Mes kakos" navigation={() => navigation.navigate("MyProducts")}/>
   </View>
 );
}

const styles = StyleSheet.create({
container: {
    marginHorizontal: 15,
    marginVertical: 10,
}
})

export default MyShop;