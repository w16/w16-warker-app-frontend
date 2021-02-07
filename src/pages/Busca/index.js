import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, TextInput} from 'react-native';

import {Heading} from 'material-bread';

import {Picker} from '@react-native-picker/picker';



import Image from '../../../assets/bg-app.jpg'

import { Formik } from 'formik'
import * as yup from 'yup'

export default function Busca({navigation}){

    //Au enviar o formulário, seria enviado para a página de detalhes dos parametros para o filtro
    function Submit(values){
        navigation.navigate('Detalhe Filtro', {values})
    }

    return(
        <ImageBackground source={Image} style={styles.image}>
            <View>
                <Heading type={6} text="Filtro de Busca" style={styles.title} />
                <Formik
                        validationSchema={FilterValidationScheme}
                        initialValues={{city: ''}}
                        onSubmit={values => Submit(values)}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            values,
                            errors,
                        }) => (
                            <View>
                                {/* Select para Dispositivos Mobile */}
                                <Picker
                                    dropdownIconColor='white'
                                    style={styles.allInput}
                                    selectedValue={values.city}
                                    onValueChange={itemValue => setFieldValue('city', itemValue)}
                                >
                                    <Picker.Item label='Selecione uma Cidade' value={values.city} key={0} />
                                    <Picker.Item label='Belo Horizonte' value={'BH'} key={1} />
                                    <Picker.Item label='Florianópolis' value={'FLORIPA'} key={2} />
                                    <Picker.Item label='São Paulo' value={'SP'} key={3} />
                                </Picker>
                                {errors.city &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.city}</Text>
                                }
                                <TextInput
                                    name="tank"
                                    placeholder="Reservatorio acima de (%):"
                                    placeholderTextColor="white"
                                    style={styles.allInput}
                                    onChangeText={handleChange('tank')}
                                    onBlur={handleBlur('tank')}
                                    value={values.tank}
                                    keyboardType='numeric'
                                />
                                {errors.tank &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.tank}</Text>
                                }
                                <Button
                                    color="orange"
                                    onPress={handleSubmit}
                                    title="Fazer Login"
                                />
                            </View>
                        )}
                    </Formik>
            </View>
        </ImageBackground>
    )
}
// Validação para o Select e Tamanho do Reservatorio
const FilterValidationScheme = yup.object().shape({
    city: yup
        .string()
        .required('Selecione uma cidade!'),
    tank: yup
        .number()
        .min(1, "Valor mínimo deve ser maior que 0")
        .max(100, "Valor máximo é até 100")
        .required("Campo obrigarótio")

})
// Estilizando os componentes
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
    },
    allInput:{
        color:'white',
        paddingTop: 15,
        paddingBottom: 15,
    }
  });