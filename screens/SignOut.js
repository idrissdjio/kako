import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';

function SignOut({navigation}) {
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    return (
   <View style={styles.container}>
       <Text>Email: {auth.currentUser?.email}</Text>
       <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.logOutView}
                onPress={handleSignOut}
            >
                <Text style={styles.logOutText}>Sign Out</Text>
            </TouchableOpacity>
   </View>
 );
}

const styles = StyleSheet.create({
container: {},
logOutView: {
    marginTop: 18,
    width: '100%',
    height: 60,
    backgroundColor: "#C37B89",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
},
logOutText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500"
},
})


export default SignOut;