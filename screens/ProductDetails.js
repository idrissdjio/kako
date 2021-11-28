import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking'

function ProductDetails({route}) {

    const {title, description, seller, sellerContact, picture, datePost, price} = route.params

    const handleContact = () => {
        Linking.openURL(`https://api.WhatsApp.com/send?phone=237${sellerContact}`)
    }

    return (
   <View style={styles.container}>
       <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{uri: picture}} style={styles.image}></Image>
            <View style={styles.bottomView}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{price} CFA</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.seller}>Vendeur: {seller}</Text>
                <Text>{sellerContact}</Text>
                <Text>{datePost}</Text>
            </View>
       </ScrollView>
       <TouchableOpacity 
            activeOpacity={0.6} 
            style={styles.contact}  
            onPress={handleContact}
            >
            <FontAwesome name="whatsapp" size={40} color="white" />
            <Text style={styles.contactText}>Contactez Vendeur...</Text>
        </TouchableOpacity>
    </View>
 );
}

const styles = StyleSheet.create({
bottomView: {
    marginTop: 10,
    marginLeft: 10,
},
container: {
    marginVertical: "5%",
    marginHorizontal: "3%",
    marginBottom: 10,
    flex: 1,
},
description: {
    color: 'grey',
    fontStyle: "italic",
},
image: {
    width: "100%",
    height: 460,
    borderRadius: 10,
},
title: {
    fontWeight: "500",
    fontSize: 22,
},
price: {
    fontSize: 20,
    marginBottom: 15,
},
seller: {
    marginTop: 10,
    fontWeight: "500",
    fontStyle: "italic"
},
contact: {
    width: '100%',
    height: 60,
    backgroundColor: "#C37B89",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
},
contactText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500",
    marginLeft: 10,
},
})

export default ProductDetails;