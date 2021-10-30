// import React from 'react'
// import { View, Text, TouchableOpacity } from 'react-native'
// import { FontAwesome5} from '@expo/vector-icons'; 

// export default function BottomTabs({navigation}) {
//     return (
//         <View 
//             style={{
//                 flexDirection: "row", 
//                 margin: 10, 
//                 justifyContent: "space-between", 
//                 marginHorizontal: 25
//             }}
//         > 
//             <Icon icon='home' text="Home" onPress={() => navigation.navigate("Home")}/>
//             <Icon icon='sms' text="messages"/>
//             <Icon icon='shopping-cart' text="Cart"/>
//             <Icon icon='user-alt' text="Account"/>
//         </View>
//     )
// }

// export const Icon = ({icon, text, onPress}) => (
//     <TouchableOpacity onPress={onPress}>
//         <View>
//         <FontAwesome5 
//          name={icon} 
//          size={25} 
//          style={{
//              marginBottom: 3,
//              alignSelf: 'center'
//          }}
//      />
//      <Text>{text}</Text>
//     </View>
//     </TouchableOpacity>    
// )

import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}