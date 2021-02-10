import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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

export default function Detalhe({route }){
    //Pegando os parametros que foram passado pela tela de listagem
    const data = route.params?.data
    return(
        <View style={styles.container}>
            <MapView style={styles.map}
            initialRegion={{
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >                
                    <Marker key={data.id}
                    coordinate={{latitude:data.coords.latitude, longitude:  data.coords.longitude}}
                    pinColor = {"purple"}
                    title={`Posto ${data.id}`}
                    description={`Reservatótio: ${data.reservatorio}`}
                />
            </MapView>
      </View>
    )
}