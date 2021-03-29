import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { t } from '../i18n';
import RNPickerSelect from 'react-native-picker-select';
import { DataContext } from '../contexts/DataContext';
import { CustomSlider } from './FormComponents';
import { useNavigation } from '@react-navigation/core';

/**
 * @file Formulário para filtrar dados buscados na API.
 * @author Lucas Creator
 * 
 */

export default function FilterForm(){

    const navigation = useNavigation()
    
    const { handleGetData } = useContext(DataContext);

    const [cidades, setCidades] = useState([
        {
          "id": 0,
          "cidade": t("loadingList")
        }
    ]);

    const maxReservatorio = 100;
    
    /* Carrega lista de cidades para dropdown de forma assíncrona através da variável 'cidades' */
    useEffect(() => {
        try{
            (async () => {
                const todasCidades = await handleGetData('cidade');
                setCidades(todasCidades.data);
            })();
        }catch(error){
            console.log(error);
        }
    }, []);
    
    function listaCidades() {
        let data = cidades;
        let lista = data.map((item) => {
            return {
                key: item.id,
                value: item.id,
                label: item.cidade
            };
        });
        lista.sort((a, b) => {
            return a.label.localeCompare(b.label);
        })
        return lista;
    }

    
    return (
        <Formik 
            initialValues={{cidade: 0, reservatorio: maxReservatorio, distancia: 0}}
            onSubmit={(values, actions) => {
                if(values.cidade == 0 
                    && values.distancia == 0
                    && values.reservatorio == maxReservatorio){
                    alert(t('noFilter'));
                    return;
                }
                actions.setSubmitting(false);
                navigation.navigate('Map', values);
            }}
        >
        {({ values, handleSubmit, setFieldValue }) => (
            <View style={styles.form}>
                <View style={styles.fields} >
                    {/* Novamente, problema com o componente de Material Bread; utilizando então uma alternativa.
                        Mantida forma de atribuição de estilo conforme modelo online.
                    */}
                    <RNPickerSelect
                        placeholder={{ label: t('cidade'), value: 0, key: 0 }}
                        onValueChange={(value) => {
                            setFieldValue('cidade', value);
                        }}
                        items={listaCidades()}
                        style={pickerSelectStyles}
                    />
                    <Text style={styles.label}>
                        {t('minAvailability')} {values.reservatorio.toFixed(0)}%
                    </Text>
                    {/* Componente personalizado (ver FormComponents) */}
                    <CustomSlider
                        inverted={true}
                        callback={(value) => {
                            setFieldValue('reservatorio', maxReservatorio - value);
                        }}
                        maxValue={maxReservatorio}
                    />
                    <Text style={styles.label}>
                      {t('maxDistance')} {values.distancia.toFixed(1)} km
                    </Text>
                    <CustomSlider
                        inverted={false}
                        callback={(value) => {
                            setFieldValue('distancia', value);
                        }}
                        maxValue={20}
                    />
                </View>
                <View style={styles.buttonView}>
                    <Text
                        style={styles.buttonText}
                        onPress={handleSubmit as any}
                    >
                        {t('filter')}
                    </Text>
                </View>
            </View>
        )}
        </Formik>
    )
}

const { width, height } = Dimensions.get('window');

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});      

const styles = StyleSheet.create({
    form: {
        flex: 1,
        position: 'absolute',
        width: 300,
        height: "100%",
    },

    fields: {
        top: 50,
    },

    label: {
        fontSize: 16,
        color: "#3C3F40",
        marginTop: height / 6,
    },

    buttonView: {
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

    buttonText: {
        marginVertical: 10,
        height: 100,
        fontSize: 15,
        color:"#F7F7F7",
        flex: 1,
        flexWrap: 'wrap',
    },
})