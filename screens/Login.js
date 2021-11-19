import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase';

function Login({navigation}) {

    // const [phone, onChangePhone] = useState("")
    const [password, onChangePassword] = useState("")
    const [email, onChangeEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = () => {
        setIsLoading(true);
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            alert("Login avec sucess")
            navigation.replace("MyTabs")
            setIsLoading(false);
        })
        .catch(error => {alert(error.message); setIsLoading(false);})
    }

    if(isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="dodgerblue"/>
            </View>
        )
    }

    return (
   <ScrollView style={styles.container}>
       <ImageBackground source={require('../assets/login_pic.jpg')} style={styles.image_bg}>
           
           <View style={styles.header}>
               <Text style={styles.title}>KAKO</Text>
           </View>

           <View style={styles.bottomView}>
               {/* <TextInput onChangeText={onChangePhone} value={phone} placeholder=" Numero de telephone" keyboardType="phone-pad" maxLength={15} style={styles.textInput}/> */}
               <TextInput onChangeText={onChangeEmail} value={email} placeholder=" Email" maxLength={45} style={styles.textInput}/>
               <TextInput onChangeText={onChangePassword} value={password} placeholder=" Mot de passe" secureTextEntry style={styles.textInput}/>
               
               <TouchableOpacity>
                    <Text style={styles.forgotPass}>Mot de passe oublie ?</Text>
               </TouchableOpacity>
               
               <TouchableOpacity 
                   activeOpacity={0.6} 
                   style={styles.loginView}  
                   onPress={handleLogin}
                >
                   <Text style={styles.loginText}>Login</Text>
               </TouchableOpacity>
               
               <View style={styles.loginVia}>
                   <Text style={styles.loginViaText}>Or Login via</Text>  
               </View>
               
               <View style={styles.iconsView}>
                    <Entypo name="facebook" size={55} color="dodgerblue" />
                    <AntDesign name="google" size={55} color="#8E0505" />
                    <AntDesign name="apple1" size={55} color="black" />
               </View>
               
               <TouchableOpacity
                    style={styles.signUpTextView}
                    onPress={() => navigation.navigate('SignUp')}
                >
                   <Text>Pas de compte?</Text>
                   <Text style={styles.signUpText}>  Sign Up</Text>
               </TouchableOpacity>
               
           </View>
       </ImageBackground>
   </ScrollView>
 );
}

const styles = StyleSheet.create({
bottomView: {
    marginTop: 60,
    backgroundColor: '#EEEEEE',
    height: '100%',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 40,
},
container: {},
header: {
    marginTop: '25%',
    alignItems: 'center'
},
forgotPass: {
    marginTop: 2,
    marginLeft: "55%",
},
image_bg: {
    width: '100%',
    height: '100%',
},
iconsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
},
loginView: {
    marginTop: 18,
    width: '100%',
    height: 60,
    backgroundColor: "#C37B89",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
},
loginText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500"
},
loginVia: {
    marginTop: 50,
    alignItems: "center"
},
loginViaText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
},
signUpText: {
    color: "#C37B89"
},
signUpTextView: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: "55%"
},
title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFF'
},
textInput: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 8,
    // borderColor: '#C37B89',
    borderWidth: 0.2,
    fontSize: 20,
    fontWeight: '300',
    paddingHorizontal: 15,
},
})

export default Login;