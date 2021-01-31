import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ImageBackground, } from 'react-native';

import { DataTable, DataTableRow, DataTableCell, Heading } from 'material-bread';

import axios from 'axios'

import Image from '../../../assets/bg-app.jpg'



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
  //Calcular a distância entre dois pontos Por meio da Latitude e Longitude
  function Distance(lat2, lon2, unit = "K") {
      var lat1 = -19.897819549026508
      var lon1 = -43.93196266471054
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist.toFixed(2);
	}
}


export default function Listagem({navigation}){
    const [data, setData] = useState([]);
    //Realizar a listagem pegando de uma "API"
    useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            'https://ametistaodonto.com.br/warker/postos.json',
        );
    
        setData(result.data);
        };
    
        fetchData();
    }, []);

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
                {data.map(data => (
                <DataTableRow hover key={data.id} onPress={ () => navigation.navigate('Detalhe', {data})}>
                    <DataTableCell text={`Posto ${data.id}`}  relativeWidth={1} textStyle={{color:'white'}} />
                    <DataTableCell text={`Reservatótio: ${data.reservatorio}`} textStyle={{color:'white'}} right />
                    <DataTableCell text={`${Distance(data.coords.latitude,  data.coords.longitude)}km`} textStyle={{color:'white'}} right />
                </DataTableRow>
                ))}
            </ScrollView>
            </ImageBackground>
        </DataTable>
    )
}