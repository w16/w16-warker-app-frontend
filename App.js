import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Mapa  from './components/Mapa';
import TestComponent  from './components/TestComponent';
import ListarCidades from './components/ListarCidades';

export default function App() {
  return (
    <View style={styles.container}>
        <Mapa />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
