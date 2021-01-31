import React from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';

import { Button } from 'material-bread';

import Image from '../../../assets/bg-login.jpg'

//Estilizando a Tela de Login
const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    titulo:{
        fontSize: 25,
        textTransform: 'uppercase',
        marginBottom: 20,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        
        justifyContent: "center",
        alignItems: 'center'
    }
  });

//Importar o props de navegação.
export default function Login({navigation}){
    return(
        <View style={styles.container}>
            <ImageBackground source={Image} style={styles.image}>
                <Text style={styles.titulo}>Encontrar Gasolina</Text>

                {/* Navegar para tela sobre */}
                <Button
                    text={'Buscar Postos'}
                    onPress={ () => navigation.navigate('Mapa')}
                    type="flat" color={'orange'}
                />
                </ImageBackground>
        </View>
    )
}