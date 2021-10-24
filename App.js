import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Lo } from 'react-native';
import MyNavigation from './routes/MyNavigation';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import VerifyPhone from './screens/VerifyPhone';
import Welcome from './screens/Welcome';

export default function App() {
  return (
    <MyNavigation>
        <Welcome/>
    </MyNavigation>
  );
}

