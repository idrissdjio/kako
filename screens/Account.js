import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Platform, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome5} from '@expo/vector-icons'; 
import {auth, firebase} from '../firebase';


function Account({navigation, route}) {

    const user = auth.currentUser;

    return (
   <SafeAreaView style={styles.container}>
       <View style={styles.header}>
           <View style={styles.greetingView}>
               <Text style={styles.greetingtext}>Hey,</Text>
               <Text style={styles.greetingName}>{user.displayName}</Text>
           </View>
           <TouchableOpacity style={styles.pictureView}>
               {
               <FontAwesome5 name="user-alt" size={45} color="grey"/>
               &&
               <Image source={{ uri: user.photoURL }} style={styles.pictureView} />
               }
           </TouchableOpacity>
       </View>
       <ScrollView style={styles.body}>
           <AccountElement text="Ma Boutique" navigation={() => navigation.navigate("MyShop")}/>
           <AccountElement text="Settings" navigation={() => navigation.navigate("Settings")}/>
       </ScrollView>

   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
body: {
    borderRadius: 10,
    height: "100%",
    marginTop: 50,
    marginHorizontal: "3%",
},
container: {
    // marginTop: 20,
    flex: 1,
    // marginHorizontal: "3%",
    backgroundColor: "#e9ecef",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
},
header: {
    flexDirection: "row",
    backgroundColor: "#C37B89",
    height: "25%",
    borderRadius: 15,
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    marginHorizontal: "3%",
},
greetingView: {
    marginLeft: 5,
},
greetingtext: {
    fontSize: 45,
    fontWeight: "100",
    color: 'white'
},
greetingName: {
    fontSize: 35,
    fontWeight: "400",
    marginTop: "10%",
    color: 'white',
    fontStyle: "italic"
},
pictureView: {
    backgroundColor: 'white',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center"
},
acountElet: {
    width: "100%",
    height: 90,
    backgroundColor: "#89c2d9",
    marginBottom: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
},
accountEltText: {
    fontSize: 23,
    fontWeight: "700",
    color: "white"
},
})

export default Account;

export const AccountElement = ({text, navigation}) => (
    <TouchableOpacity style={styles.acountElet} activeOpacity="0.8" onPress={navigation}>
        <Text style={styles.accountEltText}>{text}</Text>
        <FontAwesome5 name="arrow-right" size={40} color="white"/>
    </TouchableOpacity>
)