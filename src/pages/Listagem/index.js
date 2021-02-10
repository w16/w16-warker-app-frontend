import React from 'react';
import { StyleSheet, ScrollView, ImageBackground, } from 'react-native';

//Importando a função de Calculo de distancia para os pontos
import * as dist from "../../services/Distance"


import { DataTable, DataTableRow, DataTableCell, Heading } from 'material-bread';

import Image from '../../../assets/bg-app.jpg'


import { useLocation } from "../../contexts/MyLocation"
import { usePostos } from "../../contexts/Postos"



export default function Listagem({navigation}){
    //Buscando as informações via Context API
    const { location } = useLocation();
    const { postos } = usePostos();


    return(
        <DataTable>
             <ImageBackground source={Image} style={styles.image}>
                <Heading type={6} text="Selecione um dos postos" style={styles.title} />
            <ScrollView>
                <DataTableRow>
                    <DataTableCell text={'Posto ID'} style={{color:'secondary'}} type={'header'}  relativeWidth={1} textStyle={{color:'white'}} />
                    <DataTableCell text={'Reservatório'}  type={'header'}  right textStyle={{color:'white'}} />
                    <DataTableCell text={'Distância'}  type={'header'}  right textStyle={{color:'white'}} />
                </DataTableRow>
                {/* Listando todos os postos com sua devida distancia da minha localização */}
                {postos.map(data => (
                <DataTableRow hover key={data.id} onPress={ () => navigation.navigate('Detalhe', {data})}>
                    <DataTableCell text={`Posto ${data.id}`}  relativeWidth={1} textStyle={{color:'white'}} />
                    <DataTableCell text={`Reservatótio: ${data.reservatorio}`} textStyle={{color:'white'}} right />
                    <DataTableCell text={`${dist.getDistance(location.coords.latitude, location.coords.longitude, data.coords.latitude,  data.coords.longitude)}km`} textStyle={{color:'white'}} right />
                </DataTableRow>
                ))}
            </ScrollView>
            </ImageBackground>
        </DataTable>
    )
}

//Estilizando os componenstes
const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
    },
    title:{
        margin: 30,
        color: 'yellow',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});
  