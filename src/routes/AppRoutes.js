import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Icon } from 'material-bread';

import MapProvider from '../contexts/MyLocation';
import PostosProvider from '../contexts/Postos';


import Mapa from '../pages/Mapa';
import Listagem from '../pages/Listagem';
import Detalhe from '../pages/Detalhe';

import Busca from '../pages/Busca';
import DetalheBusca from '../pages/DetalheBusca';

import Sede from '../pages/Sede';

const AppStack = createStackNavigator();
const AppTab = createBottomTabNavigator()


export default function AppRoutes() {
    return (
      <MapProvider>
        <PostosProvider>
          <AppStack.Navigator initialRouteName="Mapa">
            <AppStack.Screen name="Detalhe" component={Detalhe}
            options={{
              headerStyle:{
                backgroundColor: '#222'
              },
              headerTintColor: 'yellow',
            }}/>
            <AppStack.Screen name="Detalhe Filtro" component={DetalheBusca}
            options={{
              headerStyle:{
                backgroundColor: '#222'
              },
              headerTintColor: 'yellow',
            }}/>
            
            {/* Estilizando o menu superior
            e Usar a Tab Navigator*/}
            <AppStack.Screen
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
            
          </AppStack.Navigator>
        </PostosProvider>
      </MapProvider>
    );
  }

//Criando nosso tab navigation

//Criando nossa navegação da Tab
function Tabs(){
  return(
    <AppTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mapa') {
            iconName = 'map'
          } else if (route.name === 'Listagem') {
            iconName = 'list'
          } else if (route.name === 'Filtro') {
            iconName = 'search'
          } else if (route.name === 'Estou com Sede') {
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
      <AppTab.Screen name="Mapa" component={Mapa} />
      <AppTab.Screen name="Listagem" component={Listagem} />
      <AppTab.Screen name="Filtro" component={Busca} />
      <AppTab.Screen name="Estou com Sede" component={Sede} />
    </AppTab.Navigator>
  )
}


