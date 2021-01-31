import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

import axios from 'axios'


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

  

export default function Mapa() {
    const [data, setData] = useState([]);
 
    useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            'https://ametistaodonto.com.br/warker/postos.json',
        );
    
        setData(result.data);
        };
    
        fetchData();
    }, []);
    
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: -19.897819549026508,
        longitude:-43.93196266471054,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
        {data.map(data => (
        
            <Marker key={data.id}
            coordinate={{latitude: data.coords.latitude, longitude:  data.coords.longitude}}
            pinColor = {"purple"}
            title={`Posto ${data.id}`}
            description={`Reservatótio: ${data.reservatorio}`}
        />
        ))}
    </MapView>
    </View>
  );
}

