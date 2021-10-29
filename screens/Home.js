import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Image, FlatList } from 'react-native';
import { auth } from '../firebase';
import { AntDesign, FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons'; 
import ItemsHome from '../components/ItemsHome';
import BottomTabs from '../components/BottomTabs'


function Home({route, navigation}) {

    const DATA = [
        {
            id: "1",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Nike Shoes come",
            description: "Black and white shoes for party chgdw dghgehwq",
            like: "heart",
            price: "2.500 FCFA"
        },
        {
            id: "2",
            image: "https://cdn-novelty.raksul.com/public_images/5b147176-544c-4305-8380-6ff541771853",
            title: "Puma Shoes",
            description: "enjoy the beauty of the shoe",
            like: "heart",
            price: "96668.50 FCFA"
        },
        {
            id: "3",
            image: "data:image/jpeg;base64,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",
            title: "Adidas",
            description: "Black and white New sortie",
            like: "heart",
            price: "2.500 FCFA"
        },
        {
            id: "4",
            image: "https://th.bing.com/th/id/OIP.aOUgEFUh8v-Vgt6bF2BRFwDYEg?w=169&h=220&c=7&r=0&o=5&pid=1.7",
            title: "Nike",
            description: "no more says",
            like: "heart",
            price: "2.500 FCFA"
        },
        {
            id: "5",
            image: "data:image/jpeg;base64,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",
            title: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            price: "6.900FCFA"
        },
        {
            id: "6",
            image: "https://th.bing.com/th/id/OIP.a0F0IsOCuvtmKj1Thmrd2AHaMV?w=186&h=310&c=7&r=0&o=5&pid=1.7",
            title: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            price: "2.540FCFA"
        },
        {
            id: "14",
            image: "https://th.bing.com/th/id/OIP.CZB0bE1jozkGp3585znRJwHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7",
            title: "Nike Shoes come",
            description: "Black and white shoes for party chgdw dghgehwq",
            like: "heart",
            price: "2.500FCFA"
        },
        {
            id: "22",
            image: "https://th.bing.com/th/id/OIP.6OI-0NfjMZtcYKH8VulQjgHaFe?w=236&h=180&c=7&r=0&o=5&pid=1.7",
            title: "Puma Shoes",
            description: "enjoy the beauty of the shoe",
            like: "heart",
            price: "92.500 CFA"
        },
        {
            id: "31",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Adidas",
            description: "Black and white New sortie",
            like: "heart",
            price: "2.500FCFA"
        },
        {
            id: "41",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Nike",
            description: "no more says",
            like: "heart",
            price: "2.500FCFA"
        },
        {
            id: "51",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            price: "6.900FCFA"
        },
        {
            id: "61",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            price: "2.540FCFA"
        },
        {
            id: "12",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Nike Shoes come",
            description: "Black and white shoes for party chgdw dghgehwq",
            like: "heart",
            price: "2.500FCFA"
        },
        {
            id: "24",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Puma Shoes",
            description: "enjoy the beauty of the shoe",
            like: "heart",
            price: "92.500 CFA"
        },
        {
            id: "34",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Adidas",
            description: "Black and white New sortie",
            like: "heart",
            price: "2.500FCFA"
        },
        {
            id: "44",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Nike",
            description: "no more says",
            like: "heart",
            price: "2.500FCFA"
        },
        {
            id: "54",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            price: "6.900FCFA"
        },
        {
            id: "64",
            image: "https://res.cloudinary.com/atoms-shoes/image/upload/c_scale,w_1400,q_auto,f_auto/v1622733115/products/shoes/model000/black-white_profile",
            title: "Nike Shoes",
            description: "Black and white shoes for party",
            like: "heart",
            price: "2.540FCFA"
        },
      ]

    const [searchValue, onChangeSearchValue] = useState('')
    
    return (

   <View style={styles.container}>
       <View style={styles.header}>
           <TextInput onChangeText={onChangeSearchValue} value={searchValue} placeholder=" search" maxLength={45} style={styles.searchInput}/>
           <TouchableOpacity>
                <AntDesign name="search1" size={32} color="black" style={styles.searchIcon}/>
           </TouchableOpacity>
       </View>

       <ScrollView showsVerticalScrollIndicator={false}>
       <View>
           <Text style={styles.text1}>Hey Here!</Text>
           <Text style={styles.text2}>Let's get something ?</Text>
       </View>
       <View style={styles.categories}>
           <Text style={styles.categorytext}>Top Categories</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewcat}>
                <CatIcons name="tshirt"  iconName="Habits" color="#ff006e"/>
                <CatIcons name="shoe-prints" iconName="Chaussure" color="#0466c8"/>
                <CatIcons name="codepen" iconName="Gadget" color="#03071e"/>
                <CatIcons name="shopping-bag" iconName="Sacs" color="#C37B89"/>
                <CatIcons name="mobile" iconName="Telephone" color="#000"/>
                <CatIcons name="book" iconName="Book" color="#f77f00"/>
                <CatIcons name="chalkboard-teacher" iconName="PC" color="#000"/>
           </ScrollView>
       </View>
       <View>
           <ItemsHome data={DATA}/>
       </View>
       </ScrollView>
       <BottomTabs/>
       
   </View>
 );
}

const styles = StyleSheet.create({
container: {
    marginHorizontal: 10,
    flex: 1,
},
categories: {
    marginTop: 20,
    marginBottom: 10,
},
categorytext: {
    fontSize: 20,
    fontWeight:"400"
},
header: {
    marginTop: 35,
    // paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 10,
},
searchInput: {
    height: 50,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 8,
    // borderColor: '#C37B89',
    borderWidth: 0.2,
    fontSize: 20,
    fontWeight: '300',
    paddingHorizontal: 15,
},
searchIcon: {
    marginLeft: 8,
},
text1: {
    fontSize: 30,
    fontWeight:"700",
    marginTop: 20,
},
text2: {
    fontSize: 16,
    fontWeight: "200",
    fontStyle: "italic"
},
scrollViewcat: {
    marginVertical: 10,
    backgroundColor: "#edf2f4",
    padding: 10,
},
catIcons: {
    paddingHorizontal: 20,
    alignItems: "center"
},
})

const CatIcons = ({name, size=60, color="#ced4da", iconName}) => {

   return (
       <TouchableOpacity onPress={() => console.log(iconName)}>
            <View style={styles.catIcons}>
               <FontAwesome5 name={name} size={size} color={color}/>
               <Text style={{marginTop: 5}}>{iconName}</Text>
            </View>
       </TouchableOpacity>
   )
}

export default Home;