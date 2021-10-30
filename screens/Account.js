import React from 'react';
import { View, StyleSheet, Text, Platform, StatusBar, SafeAreaView } from 'react-native';
import { FontAwesome5} from '@expo/vector-icons'; 

function Account({navigation}) {
    return (
   <SafeAreaView style={styles.container}>
       <View style={styles.header}>
           <View style={styles.greetingView}>
               <Text style={styles.greetingtext}>Hey,</Text>
               <Text style={styles.greetingName}>Idriss!</Text>
           </View>
           <View style={styles.pictureView}>
               <FontAwesome5 name="user-alt" size={45} color="grey"/>
           </View>
       </View>
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
container: {
    // marginTop: 20,
    flex: 1,
    marginHorizontal: "3%",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
},
header: {
    flexDirection: "row",
    backgroundColor: "#C37B89",
    height: "18%",
    borderRadius: 15,
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center"
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
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center"
}
})

export default Account;