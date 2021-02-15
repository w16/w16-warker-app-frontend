//Nesse exemplo se clica no mapa e coloca um ponto vermelho, onde nele se mostra suas caracteristicas.
import * as React from 'react';
import MapView, { Callout, Marker, ProviderPropType } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, PermissionsAndroid } from 'react-native';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Mapa extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            
          },
          poi: null,
          onPoiClick: null,
        };
    
        this.onPoiClick = this.onPoiClick.bind(this);
      }
    
      onPoiClick(e) {
        const poi = e.nativeEvent;
    
        this.setState({
          poi,
        });
      }
    
      render() {
        return (
          <View style={styles.container}>
            <MapView
              provider={this.props.provider}
              style={styles.map}
              initialRegion={this.state.region}
              onPoiClick={this.onPoiClick}
            >
              {this.state.poi && (
                <Marker coordinate={this.state.poi.coordinate}>
                  <Callout>
                    <View>
                      <Text>Coordinate Longitude: {this.state.poi.coordinate.longitude}</Text>
                      <Text>Coordinate Latitude: {this.state.poi.coordinate.latitude}</Text>
                      <Text>Position X: {this.state.poi.position.x}</Text>
                      <Text>Position Y: {this.state.poi.position.y}</Text>        
                      <Text>Place Id: {this.state.poi.placeId}</Text>
                      <Text>Name: {this.state.poi.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              )}
            </MapView>
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
    });