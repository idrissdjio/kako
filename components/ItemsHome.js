import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from "react-native";
import { FontAwesome5} from '@expo/vector-icons'; 
import filter from 'lodash.filter';


function ItemsHome({data, onPress, navigation, handleSearch, query, handleHeader}) {

  const renderItem = ({item}) => (
    <View style={styles.item} >
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", {
          title: item.name_on_the_item,
          description: item.description_of_item,
          price: item.contact,
          datePost: item.date_lost,
          seller: item.category_item,
          sellerContact: item.city_item,
          picture: item.item_picture
      })}>
        <Image source={{uri: item.item_picture}} style={styles.image}></Image>
        <View style={styles.belowPic}>
            <View style={{padding: 5}}>
              <Text style={styles.title} numberOfLines={1}>{item.name_on_the_item}</Text>
              <Text style={styles.price} numberOfLines={2}>{item.contact}</Text>
            </View>
            <View>
                <FontAwesome5 name="heart" size={22} color="black" style={styles.likeView}/>
            </View>
        </View>
      </TouchableOpacity>
  
    </View>
  )

  function renderHeader() {
    return (
      <View
        style={{
          // backgroundColor: '#fff',
          padding: 10,
          // marginTop: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={handleSearch}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20, height: 50, backgroundColor: '#fff', borderRadius: 20, }}
        />
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
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>

       <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={renderHeader}
            style={{margin: 5}}
            columnWrapperStyle={styles.row}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            style={styles.container}
            // stickyHeaderIndices={[0]}
          />
        </ScrollView>
    </SafeAreaView>
  );
}

// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 4,
    backgroundColor: "#eae4e9",
    borderRadius: 15,
    borderColor: "red",
    width: "48%",
    marginBottom: 5,
  },
  row:{
    flex: 1,
    justifyContent: "space-around"
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  title: {
    fontWeight: "300",
    maxWidth: 100,
  },
  price: {
    maxWidth: 120,
    fontWeight: "800",
  },
  belowPic: {
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    paddingRight: 3,
    justifyContent: "space-between",
    alignItems: "center"
  },
  likeView: {
    marginRight: 2,
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
categories: {
  marginTop: 20,
  marginBottom: 10,
},
categorytext: {
  fontSize: 20,
  fontWeight:"400"
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
});


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

export default ItemsHome;