import React from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, TouchableOpacity} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

function Home(props) {
    return (
   <View style={styles.container}>
       <ImageBackground source={require('../assets/home_pic.jpg')} style={styles.image_bg}>
           <View style={styles.textsView}>
               <Text style={styles.title}>Welcome Here!</Text>
               <Text style={styles.subTitle}>
                   Application revolutionnaire qui te permet de faire tes achats en ligne a moindre cout et en un seul clic!
                </Text>
           </View>
           <View style={styles.bottomView}>
               <TouchableOpacity activeOpacity={0.6}>
                   <View style={styles.button}>
                        <Text style={styles.btnText}>Get Started</Text>
                        <AntDesign name="arrowright" size={30} style={styles.icon}/>
                   </View>
               </TouchableOpacity>
               
           </View>
           
       </ImageBackground>
   </View>
 );
}

const styles = StyleSheet.create({
bottomView: {
    justifyContent: 'flex-end',
    flex: 1,
    marginHorizontal: 15,
},
button: {
    marginBottom: 50,
    height: 60,
    width: '100%',
    backgroundColor: '#C37B89',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
btnText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    marginLeft: 15,
},
container: {},
icon: {
    color: "#fff",
    marginRight: 10,
},
image_bg: {
    width: '100%',
    height: '100%',
},
subTitle: {
    color: '#FFF',
    fontWeight: '600',
    marginRight: 120,
    fontStyle: 'italic'
},
textsView: {
    marginTop: '85%',
    marginLeft: 20,
},
title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#C37B89',
    paddingBottom: 10,
}
})

export default Home;