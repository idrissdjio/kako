import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Platform, Alert,ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5} from '@expo/vector-icons';
import {auth, firebase} from '../firebase';

function AddProduct({navigation}) {

    const user = auth.currentUser;  

    const [productImage, setProductImage] = useState()
    const [productTitle, setProductTitle] = useState()
    const [productPrice, setProductPrice] = useState()
    const [productDescription, setProductDescription] = useState()
    const [SellerPhone, setSellerPhone] = useState()
    const [isLoading, setIsLoading] = useState(false);

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
    })

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if(!result.cancelled){
            if(Platform.OS === 'ios'){
                // setProductImage(result.uri.replace('file://', ''))
                // console.log(productImage.slice(productImage.lastIndexOf('/') +1))
                // let fileUri = decodeURI(result.uri)
                setProductImage(result.uri)
                console.log(productImage)
            } else{
                setProductImage(result.uri)
            }
            
        }
    }

    
    const handlePost = async () => {
        if(productDescription && productImage && productPrice && productTitle) {
            setIsLoading(true);
            

            const formData = new FormData();

            formData.append("item_picture", {
                uri: productImage,
                type: 'image/jpeg',
                name: 'photo.jpg'
            });

            formData.append("name_on_the_item", productTitle);
            formData.append("description_of_item", productDescription);
            formData.append('contact', productPrice);
            formData.append("city_item", SellerPhone);
            formData.append("category_item", user.displayName);
            formData.append("user_profile", 1);

            fetch(`https://finder-app-api.herokuapp.com/searchapp/lost_items/?expand=category=${user.displayName},city_lost`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'multipart/form-data'},
                body: formData
            }).then(response => response.json())
            .then(result => {
                
                firebase.database().ref(`users/${user.displayName}/products/`).push({
                    seller_id: user.uid,
                    seller_name: user.displayName,
                    image: productImage,
                    price: productPrice,
                    product: productTitle,
                    description: productDescription,
                    numberOfPcs: SellerPhone
                });
                setIsLoading(false);
                alert("Article ajoutee avec sucess!")
                navigation.push("MyTabs")
            })
            .catch(err => console.log(err))

            
            console.log(user)
        } else {
            alert("Svp veuillez remplir tous les champs...")
        }
    }

    if(isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="dodgerblue"/>
            </View>
        )
    }


    return (
   <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
       <View style={styles.header}>
           <UploadProductImage onPress={pickImage} image={productImage}/>
       </View>
       <View style={styles.inputs}>
            <TextInput onChangeText={setProductTitle} value={productTitle} placeholder="eg: Chaussure" maxLength={45} style={styles.textInput}/>
            <TextInput onChangeText={setProductPrice} value={productPrice} placeholder="Prix" maxLength={45} style={styles.textInput} keyboardType="numeric"/>
            <TextInput onChangeText={setProductDescription} value={productDescription} placeholder="Description" maxLength={200} style={styles.textInput}/> 
            <TextInput onChangeText={setSellerPhone} value={SellerPhone} placeholder="Numero Whatsapp (eg: 670707070)" maxLength={45} style={styles.textInput} keyboardType="phone-pad"/>


            <TouchableOpacity 
                   activeOpacity={0.6} 
                   style={styles.PostView}  
                   onPress={handlePost}
                >
                   <Text style={styles.PostText}>Vendre</Text>
            </TouchableOpacity>

       </View>
        </KeyboardAvoidingView>
   </ScrollView>
 );
}

const styles = StyleSheet.create({
container: {
    marginHorizontal: "3%",
    marginTop: "7%",
    marginBottom: 10,
},
header: {
    justifyContent: "space-evenly",
    flexDirection: "row"
},
inputs: {
    marginTop: 30,
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
PostView: {
    marginTop: 18,
    width: '100%',
    height: 60,
    backgroundColor: "#C37B89",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
},
PostText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500"
},
})

export default AddProduct;



function UploadProductImage({onPress, image}) {

    const dimensions = Dimensions.get('window')
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;

    return (
              <View style={imageUploaderStyles.container}>
                  {
                      {image} && <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} resizeMode={'cover'}/>
                  }
                      
                      <View style={imageUploaderStyles.uploadBtnContainer}>
                          <TouchableOpacity onPress={onPress} style={imageUploaderStyles.uploadBtn} >
                              <Text>{image ? 'Edit' : 'Upload'} Product</Text>
                              <FontAwesome5 name="camera" size={20} color="black" />
                          </TouchableOpacity>
                      </View>
              </View>
     
    );
  }
  
  const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:0,
        height:240,
        width:"100%", 
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:20,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'17%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})

// "@react-native-firebase/storage": "^13.0.1",