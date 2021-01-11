import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import ProductosProvider from './Context/ProductosContext'
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator1 from './Navigations/StackNavigator1';
import Formulario from './Screens/Formulario'


export default function App() {
  return (
    <ProductosProvider>
    <NavigationContainer>
          <StackNavigator1/>
      </NavigationContainer>
     </ProductosProvider>
  );
}