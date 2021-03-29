import React, { useContext, useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, Polyline, Region } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text, TextInput, SafeAreaView, Image } from 'react-native';
import { GeolocationContext } from '../contexts/GeolocationContext';
import { DataContext } from '../contexts/DataContext';
import { useNavigation } from '@react-navigation/core';
import { t } from '../i18n';
import { UserContext } from '../contexts/UserContext';
import { CoordinateLongitudeLatitude } from 'haversine';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PostosData } from '../../interfaces';

/**
 * @file Funções para renderização do mapa e marcadores.
 * @author Lucas Creator
 * 
 * 
 */

/* Módulo "bilíngue": optou-se por criar funções e variáveis com nomes em português quando essas interagem diretamente com dados vindos do banco, em português.
*/

export default function Map(params?: any) {
    const navigation = useNavigation();
   
    const mapRef = useRef<MapView>(null);
    const markerRef = useRef<Marker>(null);

    const { calculateDistance, location } = useContext(GeolocationContext);
    const { handleGetData } = useContext(DataContext);
    const { carName } = useContext(UserContext);

    const [coordinates, setCoordinates] = useState([location,]);
    const [postos, setPostos] = useState([] as PostosData[]);
    const [idToSearch, setIdToSearch] = useState('');

    function extraiCoordenadas(posto: PostosData): CoordinateLongitudeLatitude {
        //Sim, as variáveis estão invertidas no banco... acontece, mesmo nas melhores empresas. :-)
        return {
            latitude: Number(posto.coords.longitude),
            longitude: Number(posto.coords.latitude)
        }
    }

    /* Força redesenho da tela para apagar deslocamento */
    function redraw(lista: PostosData[]): void {
        setPostos([]);
        setTimeout(() => {
            setPostos(lista);
        }, 100);
    }
    
    /* Aplica filtros passados por usuário */
    function filtra(lista: PostosData[]): PostosData[]{
        let listaFiltrada = lista;
        if(params.params?.reservatorio && params.params.reservatorio < 100){
            listaFiltrada = listaFiltrada.filter((posto) => {
                return posto.reservatorio >= params.params.reservatorio.toFixed(0);
            });
        }
        
        if(params.params?.distancia){
            listaFiltrada = listaFiltrada.filter((posto) => {
                return calculateDistance(extraiCoordenadas(posto)) <=
                        params.params.distancia;
            });
        }
            
        return listaFiltrada;
    }

    /* Carrega lista de postos assincronamente, filtrando por cidade se usuário tiver feito tal requisição, ou buscando lista completa */
    useEffect(() => {
        (async () => {
            let listaFiltrada: PostosData[] = [];
                if(params.params?.cidade){
                    const lista: PostosData[] | void = await handleGetData('cidade', params.params.cidade);
                    listaFiltrada = filtra(lista.postos);
                }else{
                    const lista = await handleGetData('posto');
                    listaFiltrada = filtra(lista.data);
                }
            redraw(listaFiltrada);
        })();
    },[params.params]);
    
    /* Define região de visualização do mapa, incluindo localização do usuário e postos selecionados. */
    function defineRegion(points: PostosData[]): Region {
        let [minLat, maxLat, minLong, maxLong]: number[] = [0];
        
        ((loc) => {
            minLat = maxLat = loc.latitude;
            minLong = maxLong = loc.longitude;
        })(location)

        points.map((point) => {
            minLat = Math.min(minLat, point.coords.longitude);
            maxLat = Math.max(maxLat, point.coords.longitude);
            minLong = Math.min(minLong, point.coords.latitude);
            maxLong = Math.max(maxLong, point.coords.latitude);
        })

        const avgLat = (minLat + maxLat)/2;
        const avgLong = (minLong + maxLong)/2;
        const deltaLat = (maxLat - minLat) * 2;
        const deltaLong = (maxLong - minLong) * 2;

        return {
            latitude: avgLat,
            longitude: avgLong,
            latitudeDelta: deltaLat,
            longitudeDelta: deltaLong
        }
    }

    const region = defineRegion(postos);

    mapRef?.current?.animateToRegion(region,2000);


    /* Busca único posto por id, exibindo detalhes do mesmo. */
    const buscaPosto = async (id: number) => {
        const posto: PostosData | void = await handleGetData('posto', String(id));
        if(typeof posto == 'object')
            setPostos([posto]);
        else
            alert(t('postoNaoEncontrado'));
    } 

    function searchById() {
        const id = parseInt(idToSearch);
        if(isNaN(id)){
            alert(t('invalidId'));
        }else{
            buscaPosto(id);
        }
        setIdToSearch('');
    }

    /* Busca posto mais próximo para servir botão 'thirsty' */
    function maisProximo(lista: PostosData[]): PostosData {
        let listaOrdenada = lista
            .map(posto => {
                posto['distancia'] = calculateDistance(extraiCoordenadas(posto));
                return posto;
            })
            .sort((x, y) => x.distancia - y.distancia);
        return listaOrdenada[0];
    }
    

    const myCarIsThirsty = async () =>{
        const lista: PostosData[] | void = await handleGetData('posto');
        const posto = maisProximo(lista.data);
        setPostos([posto]);
        mostraTrajetoria(posto);
    };

    /* Mostra trajetória até posto escolhido.
    No mundo pós-apocalíptico desenhado não há mais ruas ou estruturas bem definidas, então a trejetória pode ser mostrada como uma linha reta.
    */
    function mostraTrajetoria(posto: PostosData): void {
        setCoordinates([location, extraiCoordenadas(posto)]);
        setTimeout(() => {
            setCoordinates([location]);
        }, 5000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.mapContainer}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={true}
                loadingEnabled={true}
                zoomEnabled={true}
                rotateEnabled={true}
                moveOnMarkerPress={true}
                ref={mapRef}
            >
                {postos.map(posto => {
                    const coordenadas = extraiCoordenadas(posto);
                    const image = posto.id % 10;
                    return (
                        <Marker
                            ref={markerRef}
                            coordinate={coordenadas}
                            title={String(posto.id)}
                            key={posto.id}
                            // Para simular moveOnMarkerPress em iOS 
                            onSelect={() => {
                                mapRef?.current?.animateToRegion({
                                    ...coordenadas,
                                    latitudeDelta: 0,
                                    longitudeDelta: 0
                                },1000);
                            }}
                        >
                            <Callout 
                                style={styles.infoCallout}
                                onPress={() => {
                                    redraw([posto]);
                                    mostraTrajetoria(posto);
                                }}
                            >
                                <View style={styles.info}>
                                    <Text style={styles.infoTextTitle}>
                                        {t('PostoNum') + posto.id}
                                    </Text>
                                    <Text>
                                        <Image 
                                            style={styles.infoImage}
                                            source={require('../../assets/4.png')}
                                        />                        
                                    </Text>
                                    <Text style={styles.infoTextDesc}>
                                        {posto.reservatorio + '%. ' + t('letsGo') + ' ⬈'}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
                <Polyline
                    coordinates={coordinates}
                    strokeWidth={3}
                    strokeColor={"#CA5501"}
                />
            </MapView>

            <View style={styles.searchView}>
                <Image
                    style={styles.searchImage}
                    source={require('../../assets/search_icon.png')}
                />
                <TextInput
                    style={styles.searchBox}
                    placeholder={t('searchByIdOrFilter')}
                    placeholderTextColor={'#65696B'}
                    keyboardType="numbers-and-punctuation"
                    returnKeyType="search"
                    value={idToSearch}
                    onChangeText={setIdToSearch}
                    onSubmitEditing={()=>{searchById()}}                        
                />
                <View style={styles.filterView} >
                    <TouchableOpacity
                        style={styles.filterArea}
                        onPress={() => navigation.push('Filter')}
                    >
                        <Image 
                            style={styles.filterImage}
                            source={require('../../assets/filter_icon.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.thirstView}>
                <Text
                    style={styles.thirstText}
                    onPress={() => myCarIsThirsty()}
                >
                    <Image 
                        style={styles.thirstImage}
                        source={require('../../assets/fuel_icon.png')}
                    />
                    {" " + carName + t('isThirsty')}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    mapContainer: {
        width: width,
        height: height * 0.89,
        position: "absolute",
        top: 0,
    },

    infoCallout: {
        backgroundColor: "pink",
    },

    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        margin: 1,
        backgroundColor: "#CA5501",
        borderRadius: 5,
    },

    infoImage: {
        zIndex: 1,
        height: width * 0.2,
        width: width * 0.4,
        resizeMode: "stretch",
        alignItems: 'center',
    },
    
    infoTextTitle: {
        color: "#F3F4F5",
        fontSize: 18,
    },

    infoTextDesc: {
        color: "#F3F4F5",
        fontSize: 18,
    },

    searchView: {
        position: 'absolute',
        top: 10,
        width: 300
    },

    searchBox: {
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 35,
        fontSize: 14,
        backgroundColor: "#F3F4F5",
        color: '#65696B',
        borderWidth: 1,
        borderColor: "#A3A4A5",
    },

    searchImage: {
        zIndex: 1,
        height: 25,
        width: 25,
        resizeMode : 'stretch',
        alignItems: 'center',
        top: 37,
        left: 10,
    },

    filterView: {
        alignSelf: "flex-end",
        top: -50,
    },

    filterArea: {
        zIndex: 1,
        height: 50,
        width: 50,
        alignItems: "center"
    },

    filterImage: {
        height: 25,
        width: 25,
        resizeMode : 'stretch',
        alignItems: 'center',
        top: 10
    },

    thirstView: {
        position: 'absolute',
        bottom: 35,
        height: 50,
        width: 300,
        backgroundColor: "#CA5501",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: "center",
    },

    thirstText: {
        marginVertical: 10,
        height: 100,
        fontSize: 15,
        color:"#F7F7F7",
        flex: 1,
        flexWrap: 'wrap',
    },
    
    thirstImage: {
        height: 20,
        width: 20,
        resizeMode : 'stretch',
    },
});
