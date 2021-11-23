import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import VerifyPhone from '../screens/VerifyPhone';
import Home from '../screens/Home';
import Account from '../screens/Account';
import MyTabs from '../components/MyTabs';
import SignOut from '../components/SignOut';
import SettingScreen from '../screens/SettingScreen';
import MyShop from '../screens/MyShop';
import AddProduct from '../screens/AddProduct';
import MyProducts from '../screens/MyProducts';
import ProductDetails from '../screens/ProductDetails';

const Stack = createNativeStackNavigator();

function MyNavigation(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="VerifyPhone" component={VerifyPhone}/>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
                <Stack.Screen name="Account" component={Account} options={{gestureEnabled: false,}}/>
                <Stack.Screen name="MyTabs" component={MyTabs} options={{gestureEnabled: false, headerShown: false}}/>
                <Stack.Screen name="SignOut" component={SignOut}/>
                <Stack.Screen name="Settings" component={SettingScreen}/>
                <Stack.Screen name="MyShop" component={MyShop}/>
                <Stack.Screen name = "AddProduct" component={AddProduct}/>
                <Stack.Screen name = "MyProducts" component={MyProducts}/>
                <Stack.Screen name = "ProductDetails" component={ProductDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
 );
}

const styles = StyleSheet.create({
container: {}
})

export default MyNavigation;