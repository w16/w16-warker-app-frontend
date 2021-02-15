//Coloca pontos customizados no mapa com imagem,titulo,descrição.
import * as React from 'react';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, Animated, PermissionsAndroid } from 'react-native';
import postoFlagImg from '../assets/postoflag.png';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -23.548670;
const LONGITUDE = -46.638248;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;


const marker1 = {
  key: "chave1",
  title: "Gas Station",
  description: "Reservatório 100%",
  image: postoFlagImg,
  coordinate: {latitude: -23.548822, longitude: -46.637714},
}

const marker2 = {
  key: "chave2",
  title: "Gas Station",
  description: "Reservatório 80%",
  image: postoFlagImg,
  coordinate: {latitude: -23.555411, longitude: -46.634158},
}

const marker3 = {
  key: "chave3",
  title: "Gas Station",
  description: "Reservatório 50%",
  image: postoFlagImg,
  coordinate: {latitude: -23.550597, longitude: -46.639218},
}

export default class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          textInputSearch: "",
          region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          markers: [marker1, marker2, marker3],
        };
    
      }
    
      render() {
        return (
          <View style={styles.container}>
            
            <MapView
              provider={this.props.provider}
              style={styles.map}
              initialRegion={this.state.region}
              onPress={this.onMapPress}
            >
               
              {this.state.markers.map(marker => (
                <Marker
                  title={marker.title}
                  description={marker.description}
                  image={postoFlagImg}
                  key={marker.key}
                  coordinate={marker.coordinate}
                />
              ))}
            </MapView>

            <View style={{
               position: 'absolute',
               top: 20,
               backgroundColor: 'transparent',
            }}>
              <TextInput
                   placeholder={" Buscar por cidade..."}
                   style={{ width: 180, height: 40, borderColor: 'gray', backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1 }}
                   onChangeText={(e) => {this.setState({textInputSearch: e.value})}}
                   value={this.state.textInputSearch}
                />              
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.bubble}
              >
                <Text>Estou com sede</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    

    
    const styles = StyleSheet.create({
      container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      inputContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'red',
      },
      textInputSearch: {
        top: 0,
        width: 150,
        height: 50,
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
      },
      latlng: {
        width: 200,
        alignItems: 'stretch',
      },
      button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
      },
    });