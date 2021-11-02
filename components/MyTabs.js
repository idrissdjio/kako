import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5} from '@expo/vector-icons'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from '../screens/Account';
import Home from '../screens/Home';
import Messages from '../screens/Messages';
import Cart from '../screens/Cart';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {height: 60},
          headerShown: false,
          tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            size=35

            if (route.name === 'Home') {
              iconName = "home"
            } else if (route.name === 'Messages') {
              iconName = "sms"
            } else if (route.name === 'Cart') {
              iconName = "shopping-cart"
            } else if (route.name === 'Account') {
              iconName = "user-alt"
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} style={{alignSelf: 'center'}}/>;
          },
          tabBarActiveTintColor: '#C37B89',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name="Messages" component={Messages} options={{headerShown: true}}/>
        <Tab.Screen name="Cart" component={Cart} options={{headerShown: true}}/>
        <Tab.Screen name="Account" component={Account} options={{headerShown: true}}/>
      </Tab.Navigator>
  );
}