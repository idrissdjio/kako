import React, { useState, useEffect } from 'react';
import { Button, Text, StyleSheet, View, Image, TouchableWithoutFeedback, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5} from '@expo/vector-icons'; 
import SignOut from '../components/SignOut';
import {auth, firebase} from '../firebase';


function SettingScreen({navigation}) {
    
    const user = auth.currentUser;  

    const [name, onChangeName] = useState()
    const [phone, onChangePhone] = useState()
    const [email, onChangeEmail] = useState()
    const [location, onChangeLocation] = useState()
    const [password, onChangePassword] = useState()
    const [confirmPassword, onChangeConfirmPassword] = useState()
    const [image, setImage] = useState()

    useEffect(() => {
        (async () =>{
            if(Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if
                (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions')
                }
            }
            
        })();

        const dbRef = firebase.database().ref();
        dbRef.child(`users/${user.displayName}`).get().then((snapshot) => {
            if(snapshot.exists()) {
                onChangePhone(snapshot.val().phone);
                onChangeLocation(snapshot.val().location)
            } else {
                console.log("No data")
            }
        }).catch((error) => {
            console.log(error);
        })

        if(user) {
            onChangeEmail(user.email)
            onChangeName(user.displayName)
            setImage(user.photoURL)
        }

        // console.log(user)
         

    }, [user]);


    function handleUpdate() {

        if(name && image && phone && email && password && password == confirmPassword && email.length>10) {
            if (user !== 0) {
                user.updateProfile({
                    displayName: name,
                    photoURL: image,
                }).then(() => {
                    // console.log(user)
                    alert("Informations mis a jour avec sucess...")
                    navigation.push("MyTabs")
                }).catch((error) => {
                    console.log("error encoureted...")
                    alert("Svp verifiez votre internet...")
                })
    
                if(email.length < 10) {
                    alert("L'addresse email est incorrecte")
                } else {
                    user.updateEmail(email).then(() => {
                        console.log("Email well updated")
                        console.log(email)
                    }).catch((error) => {
                        console.log(error)
                    })
                }

                firebase.database().ref(`users/${name}`).set({
                    username: name,
                    email: email,
                    phone, phone,
                    password: password,
                    profile_picture: image,
                    location: location
                });

            } 
            } else {
                if(email.length < 10) {
                    alert("L'addresse email est incorrecte")
                } else {
                    if(password !== confirmPassword) {
                        alert("les mots de passes doivent etre identiques et avoir au moins 6 caracteres!!!")
                    }  
                     else {
                        alert("Svp remplissez tous les champs")
                    }
                }
        }



    }

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if(!result.cancelled){
            if(Platform.OS === 'ios'){
                setImage(result.uri.replace('file://', ''))
                console.log(image)
            } else{
                setImage(result.uri)
            }
            
        }
    }

    return (
        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.headers}>
                <UploadImage onPress={pickImage} image={image}/>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.body}>
                <TextInput onChangeText={name => onChangeName(name)} value={name} placeholder="Nom" style={styles.textInput}/>
                <TextInput onChangeText={email => onChangeEmail(email)} value={email} placeholder="Email" style={styles.textInput}/>
                <TextInput onChangeText={location => onChangeLocation(location)} value={location} placeholder="Location" style={styles.textInput}/>
                <TextInput onChangeText={phone => onChangePhone(phone)} value={phone} placeholder=" Numero de telephone" keyboardType="phone-pad" maxLength={15} style={styles.textInput}/>
                <TextInput onChangeText={password => onChangePassword(password)} value={password} placeholder=" Mot de passe" secureTextEntry style={styles.textInput}/>
                <TextInput onChangeText={confirmPassword => onChangeConfirmPassword(confirmPassword)} value={confirmPassword} placeholder="Confirmez Mot de passe" secureTextEntry style={styles.textInput}/>
            </View>
            <UpdateProfile onPress={handleUpdate}/>
            <SignOut navigation={navigation}/> 
            </KeyboardAvoidingView>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    image: {
        height: 160,
        width: 160,
        borderRadius: 80,
        backgroundColor: "#fff",
        borderWidth: 2,
    },
    name: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginTop: 10,
    },
    body: {
        flexDirection: "column",
        marginTop: 40,
    },
    textInput: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 8,
        borderWidth: 0.2,
        fontSize: 20,
        fontWeight: '300',
        paddingHorizontal: 15,
    },
    scrollview: {
        marginTop: 15,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    headers: {
        // marginBottom: 10,
        alignItems: "center",
        alignContent: "center"
    },
    icondef: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    updateView: {
        marginTop: 18,
        width: '100%',
        height: 60,
        backgroundColor: "dodgerblue",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    updateText: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "500"
    },
})
export default SettingScreen;


 const UpdateProfile = ({onPress}) => (
    <TouchableOpacity 
    activeOpacity={0.6} 
    style={styles.updateView}
    onPress={onPress}
>
    <Text style={styles.updateText}>Update Profile</Text>
</TouchableOpacity>
)

export function UploadImage({onPress, image}) {
    // const [image, setImage] = useState(null);
    const addImage=()=>{};
   
    return (
              <View style={imageUploaderStyles.container}>
                  {
                      {image} && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                  }
                      
                      <View style={imageUploaderStyles.uploadBtnContainer}>
                          <TouchableOpacity onPress={onPress} style={imageUploaderStyles.uploadBtn} >
                              <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                              <FontAwesome5 name="camera" size={20} color="black" />
                          </TouchableOpacity>
                      </View>
                
  
              </View>
     
    );
  }
  
  const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200, 
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})