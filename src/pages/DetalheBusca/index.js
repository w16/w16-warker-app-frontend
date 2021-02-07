import React from 'react';
import { View, StyleSheet, Dimensions, Text} from 'react-native';

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

export default function DetalheBusca({ route }){
    const data = route.params.values
    console.log(route)
    return(
        <View style={styles.container}>
           <Text>Segue os Parametros do Filtro buscado em uma Api: Cidade({data.city}) e Reservatório({data.tank}%).</Text>
        </View>
    )
}