import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider} from './src/contexts/Auth';

import Routes from './src/routes';

export default function App(){
  return (
    <NavigationContainer>
      <AuthProvider>
          <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};