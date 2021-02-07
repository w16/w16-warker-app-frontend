import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { usePostos } from "../../contexts/Postos"
import { useLocation } from "../../contexts/MyLocation"

import * as dist from "../../services/Distance"



export default function Sede(){
    const { postos } = usePostos();
    const { location } = useLocation();

    const [nearPosto, setNearPosto] = useState(false)

    //Carregando o posto mais próximo
    useEffect(() => {
       setNearPosto(dist.nearDistance(postos, location))
      }, [postos]);


    return(
        
        <View>
            {nearPosto &&
                <MapView style={styles.map}
                    initialRegion={{
                    latitude: nearPosto.coords.latitude,
                    longitude: nearPosto.coords.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                    }}
                >
                <Marker
                    coordinate={{latitude: location.coords.latitude, longitude:  location.coords.longitude}}
                    title={'Minha Localização'}
                />                
                <Marker
                    coordinate={{latitude: nearPosto.coords.latitude, longitude:  nearPosto.coords.longitude}}
                    pinColor = {"purple"}
                    title={`Posto mais próximo: ${nearPosto.id}`}
                    description={`Reservatótio: ${nearPosto.reservatorio} e Distancia: ${nearPosto.distance} km`}
                />
              </MapView>
            }
        </View>
    )
}


//estilizando os componentes
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