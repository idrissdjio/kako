import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import {auth, firebase} from '../firebase'

function SignUp({navigation}) {

    const [name, onChangeName] = useState("")
    const [phone, onChangePhone] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [confirmPassword, onChangeConfirmPassword] = useState("")

    const handleSignUp = () => {
        if(password == confirmPassword && name && phone) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;

                    firebase.database().ref('users/').push({
                        username: name,
                        email: email,
                        phone, phone,
                        password: password
                    });
                    
                    alert("Compte cree avec sucess")
                    console.log(`Registered with ${user.email}`);
                    navigation.navigate("Login", {password: password, email: email})
                })
                .catch(error => alert(error.message))
        } else if(password !== confirmPassword) {
            alert("Les mots de passe entres ne sont pas identiques!")
        } else {
            alert("Veuillez remplir tous les champs svp!")
        }
        
    }

    return (
   <View style={styles.container}>
       <View style={styles.header}>
           <Text style={styles.title}>Creer un nouveau compte ici</Text>
           <Text style={styles.subTitle}>Nous avons juste besoin de quelques de vos informations</Text>
       </View>
       <View style={styles.body}>
           <TextInput onChangeText={onChangeName} value={name} placeholder="Nom" style={styles.textInput}/>
           <TextInput onChangeText={onChangeEmail} value={email} placeholder="Email" style={styles.textInput}/>
            <TextInput onChangeText={onChangePhone} value={phone} placeholder=" Numero de telephone" keyboardType="phone-pad" maxLength={15} style={styles.textInput}/>
            <TextInput onChangeText={onChangePassword} value={password} placeholder=" Mot de passe" secureTextEntry style={styles.textInput}/>
            <TextInput onChangeText={onChangeConfirmPassword} value={confirmPassword} placeholder="Confirmez Mot de passe" secureTextEntry style={styles.textInput}/>

            <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.signUpView}
                onPress={handleSignUp}
            >
                <Text style={styles.signUpText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.signInTextView}
                onPress={() => navigation.navigate('Login')}
            >
                   <Text>Deja un compte?</Text>
                   <Text style={styles.signInText}>  Sign In</Text>
            </TouchableOpacity>
       </View>
   </View>
 );
}

const styles = StyleSheet.create({
body: {
    flexDirection: "column",
    marginTop: 40,
    marginHorizontal: 10,
},
container: {
    backgroundColor: '#ffffff',
    flex: 1,
    
},
header: {
    marginTop: '20%',
    marginHorizontal: '5%',
},
signUpView: {
    marginTop: 18,
    width: '100%',
    height: 60,
    backgroundColor: "#C37B89",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
},
signUpText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500"
},
title: {
    fontSize: 35,
    marginRight: "10%",
    fontWeight: "600",
},
subTitle: {
    fontSize: 15,
    // color: "#EEEEEE",
    marginRight: "10%",
    marginTop: 5,
},
signInText: {
    color: "#C37B89"
},
signInTextView: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: "55%"
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

export default SignUp;