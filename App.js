import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {  createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Icon } from 'material-bread';

//Importando nossas páginas
import Login from './src/pages/Login';
import Mapa from './src/pages/Mapa';
import Listagem from './src/pages/Listagem';
import Detalhe from './src/pages/Detalhe';

import Busca from './src/pages/Busca';
import Sede from './src/pages/Sede';
//Criando nosso stack navigation
const Stack = createStackNavigator()

//Criando nosso tab navigation
const Tab = createBottomTabNavigator()

//Criando nossa navegação da Tab
function Tabs(){
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mapa') {
            iconName = 'map'
          } else if (route.name === 'Listagem') {
            iconName = 'list'
          } else if (route.name === 'Busca') {
            iconName = 'search'
          } else if (route.name === 'Sede') {
            iconName = 'favorite'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'yellow',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#222',
      },
      }}
    >
      <Tab.Screen name="Mapa" component={Mapa} />
      <Tab.Screen name="Listagem" component={Listagem} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Detalhe" component={Detalhe}
        options={{
          headerStyle:{
            backgroundColor: '#222'
          },
          headerTintColor: 'yellow',
        }}/>
        
        {/* Estilizando o menu superior
        e Usar a Tab Navigator*/}
        <Stack.Screen
          name="Mapa"
          component={Tabs}
          options={{
            title: "Bem-vindo ao WARKER!",
            headerStyle:{
              backgroundColor: '#121212'
            },
            headerTintColor: '#fff',
            headerLeft: null
          }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}