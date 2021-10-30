import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import VerifyPhone from '../screens/VerifyPhone';
import Home from '../screens/Home';
import SignOut from '../screens/SignOut';
import Account from '../screens/Account';
import MyTabs from '../components/MyTabs';

const Stack = createNativeStackNavigator();

function MyNavigation(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home} options={{gestureEnabled: false,}}/>
                <Stack.Screen name="VerifyPhone" component={VerifyPhone}/>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="SignOut" component={SignOut}/>
                <Stack.Screen name="Account" component={Account}/>
                <Stack.Screen name="MyTabs" component={MyTabs}/>
            </Stack.Navigator>
        </NavigationContainer>
 );
}

const styles = StyleSheet.create({
container: {}
})

export default MyNavigation;