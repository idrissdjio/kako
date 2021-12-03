import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { AntDesign, FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons'; 
import ItemsHome from '../components/ItemsHome';
import BottomTabs from '../components/BottomTabs';
import filter from 'lodash.filter';


function Home({route, navigation}) {
    
    const [searchValue, onChangeSearchValue] = useState('')
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
          return contains(user, formattedQuery);
        });
        setData(filteredData);
        setQuery(text);
    }

    const contains = ({name_on_the_item, description_of_item, iconName}, query) => {

        if (name_on_the_item.includes(query) || description_of_item.includes(query)) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://finder-app-api.herokuapp.com/searchapp/lost_items/?expand=category,city_lost`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(response => response.json())
        .then(results => {
            setData(results);
            setFullData(results);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err)
        });
    }, [setData]);

    if(isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="dodgerblue"/>
            </View>
        )
    }

    if(error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18}}>
                    Error fetching data... Check your network connection!
                </Text>
            </View>
        );
    }

    
    return (

   <View style={styles.container}>
       {/* <View style={styles.header}>
           <TextInput onChangeText={setQuery} value={query} placeholder=" search" maxLength={45} style={styles.searchInput}/>
           <TouchableOpacity>
                <AntDesign name="search1" size={32} color="black" style={styles.searchIcon}/>
           </TouchableOpacity>
       </View> */}

       {/* <ScrollView showsVerticalScrollIndicator={false}> */}
       {/* <View>
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
       </View> */}
       {/* <View> */}
           <ItemsHome data={data} navigation={navigation} route={route} handleSearch={handleSearch} query={query}/>
       {/* </View> */}
       {/* </ScrollView> */}
       
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
    marginTop: 10,
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