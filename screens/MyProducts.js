import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native'
import ItemsHome from '../components/ItemsHome';
import {auth, firebase} from '../firebase';


function MyProducts({navigation, route}) {

    const [isLoading, setIsLoading] = useState(false);
    const user = auth.currentUser;
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [error, setError] = useState(null);

    // useEffect(() => {

    //     setIsLoading(true);
    //     fetch(`https://finder-app-api.herokuapp.com/searchapp/lost_items/`, {
    //         method: 'GET',
    //         headers: {'Content-Type': 'application/json'},
    //     }).then(response => response.json())
    //     .then(result => {
    //         setIsLoading(false);
    //         for(let i=0; i< result.length; i++) {
    //             if(result[i].category_item === user.displayName){
    //                 fetch(`https://finder-app-api.herokuapp.com/searchapp/lost_items/${result[i].id}/`, {
    //                     method: 'GET',
    //                     headers: {'Content-Type': 'application/json'},
    //                 }).then(response => response.json())
    //                 .then(results => {
    //                     setData(results);
    //                     setFullData(results);
    //                     setIsLoading(false);
    //                     console.log(results)
    //                 })
    //                 .catch(err => {
    //                     setIsLoading(false);
    //                     setError(err)
    //                 });
    //             }
    //             else {
    //                 setIsLoading(false);
    //                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //                     <Text style={{ fontSize: 18}}>
    //                         Aucun Kako ajoute...!
    //                     </Text>
    //                 </View>
    //             }
    //         }
    //     })



        // const dbRef = firebase.database().ref();
        // dbRef.child(`users/${user.displayName}/products`).get().then((snapshot) =>{
        //     if(snapshot.exists()) {
        //         console.log(snapshot)
        //     }
        // })

    // })

    if(isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="dodgerblue"/>
            </View>
        )
    }


    const DATA = [
        {
            id: "61",
            item_picture: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            name_on_the_item: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            contact: "2.540FCFA"
        },
        {
            id: "1",
            item_picture: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            name_on_the_item: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            contact: "2.540FCFA"
        },
        {
            id: "1",
            item_picture: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            name_on_the_item: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            contact: "2.540FCFA"
        },
        {
            id: "1",
            item_picture: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            name_on_the_item: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            contact: "2.540FCFA"
        }
    ]

    return (
   <ScrollView style={styles.container}>
       <ItemsHome data={DATA}/>
   </ScrollView>
 );
}

const styles = StyleSheet.create({
container: {
    marginVertical: "5%",
    marginHorizontal: "1%"
}
})

export default MyProducts;