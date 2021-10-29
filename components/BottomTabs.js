import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5} from '@expo/vector-icons'; 

export default function BottomTabs() {
    return (
        <View 
            style={{
                flexDirection: "row", 
                margin: 10, 
                justifyContent: "space-between", 
                marginHorizontal: 25
            }}
        > 
            <Icon icon='home' text="Home"/>
            <Icon icon='shopping-cart' text="Cart"/>
            <Icon icon='heart' text="Grocery"/>
            <Icon icon='user' text="Account"/>
        </View>
    )
}

const Icon = ({icon, text}) => (
    <TouchableOpacity>
        <View>
        <FontAwesome5 
         name={icon} 
         size={25} 
         style={{
             marginBottom: 3,
             alignSelf: 'center'
         }}
     />
     <Text>{text}</Text>
    </View>
    </TouchableOpacity>
    
     
)
