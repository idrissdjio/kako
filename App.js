import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Lo } from 'react-native';
import MyNavigation from './routes/MyNavigation';
import Essaye from './components/ItemsHome';
import Home from './screens/Home';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import VerifyPhone from './screens/VerifyPhone';
import Welcome from './screens/Welcome';
import ItemsHome from './components/ItemsHome';
import Account from './screens/Account';
import MyTabs from './components/MyTabs';
import ImagePicker from './components/ImagePicker';

export default function App() {

  return (
    <MyNavigation/>
  );
}

