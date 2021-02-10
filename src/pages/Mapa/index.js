import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

import axios from 'axios'

import * as Location from 'expo-location';

import { useLocation } from "../../contexts/MyLocation"
import { usePostos } from "../../contexts/Postos"
  

export default function Mapa() {
    //Chamando a ações da Context API
    const { location, setLocation } = useLocation();
    const { postos, setPostos } = usePostos();

    //Pegando minha locaização!
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão Negada');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
 
    //Pegando todos os postos via Axios
    useEffect(() => {
      const fetchData = async () => {
      const result = await axios(
          'https://ametistaodonto.com.br/warker/postos.json',
      );
  
      setPostos(result.data);
      };
  
      fetchData();
  }, []);

  //Só exibe o mapa se pegar minha localização
  if(location){
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
          <Marker
              coordinate={{latitude: location.coords.latitude, longitude:  location.coords.longitude}}
              title={'Minha Localização'}
          />
          {postos.map(data => (
          
              <Marker key={data.id}
              coordinate={{latitude: data.coords.latitude, longitude:  data.coords.longitude}}
              pinColor = {"purple"}
              title={`Posto ${data.id}`}
              description={`Reservatório: ${data.reservatorio}`}
          />
          ))}
      </MapView>
      </View>
    );
    }else{
      return(
        <View style={styles.container}>
          <Text>Carregando...</Text>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
