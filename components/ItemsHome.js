import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5} from '@expo/vector-icons'; 


const ItemsHome = ({data, onPress}) => {

  const renderItem = ({item}) => (
    <View style={styles.item} >
      <TouchableOpacity onPress={() => console.log(item.id)}>
        <Image source={{uri: item.image}} style={styles.image}></Image>
        <View style={styles.belowPic}>
            <View style={{padding: 5}}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price} numberOfLines={2}>{item.price}</Text>
            </View>
            <View>
                <FontAwesome5 name="heart" size={22} color="black" style={styles.likeView}/>
            </View>
        </View>
      </TouchableOpacity>

    </View>
    
    
  )

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        style={{margin: 5}}
        columnWrapperStyle={styles.row}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
});

export default ItemsHome;