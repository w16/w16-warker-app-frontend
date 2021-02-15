
//Coloca pontos customizados no mapa com imagem,titulo,descrição.
import * as React from 'react';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, PermissionsAndroid } from 'react-native';
import postoFlagImg from '../assets/postoflag.png';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;


export default class MapaClicarEColocarImagemCustomizada extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          markers: [],
        };
    
        this.onMapPress = this.onMapPress.bind(this);
      }
    
      onMapPress(e) {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: e.nativeEvent.coordinate,
              key: `Gas Station ${id++}`,
            },
          ],
        });
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
                  title={marker.key}
                  description={"Minha Descrição"}
                  image={postoFlagImg}
                  key={marker.key}
                  coordinate={marker.coordinate}
                />
              ))}
            </MapView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ markers: [] })}
                style={styles.bubble}
              >
                <Text>Tap to create a marker of random color</Text>
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
    