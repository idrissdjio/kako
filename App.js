import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AddProduct from './screens/AddProduct';
import MyProducts from './screens/MyProducts';
import MyNavigation from './routes/MyNavigation'
import ProductDetails from './screens/ProductDetails';

export default function App() {

  return (
    <MyNavigation/>
  );
}

