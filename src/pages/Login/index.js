import React, {useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button} from 'react-native';
import {useAuth} from '../../contexts/Auth';

import { Paper, ProgressCircle } from 'material-bread';


import Image from '../../../assets/bg-login.jpg'

import { Formik } from 'formik'
import * as yup from 'yup'

//Importar o props de navegação.
export default function Login(){
    const {signIn } = useAuth();
    const [loading, setLoading] = useState(false);

    //Ao submeter o formulário será carregado e os parametros serão passados para a Context API de Login
    function Submit(values){
        setLoading(true)
        signIn(values)
    }
    

    return(
        <View style={styles.container}>
            <ImageBackground source={Image} style={styles.image}>
                <Paper shadow={4} style={styles.paper}>
                    <Text style={styles.titulo}>Encontrar Gasolina</Text>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => Submit(values)}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                        }) => (
                            <View>
                            <TextInput
                                name="email"
                                placeholder="Email"
                                placeholderTextColor="#ddd"
                                style={styles.textInput}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            {errors.email &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }
                            <TextInput
                                name="password"
                                placeholder="Senha"
                                placeholderTextColor="#ddd"
                                style={styles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                            {errors.password &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                            {!loading &&
                            <Button
                                color="orange"
                                onPress={handleSubmit}
                                title="Fazer Login"
                            />
                            }
                            {loading &&
                            <ProgressCircle color={'#E91E63'} indeterminate />
                            }

                            </View>
                        )}
                    </Formik>
                </Paper>
            </ImageBackground>
        </View>
    )
}
//Criando as validações
const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Entre com um e-mail válido")
      .required('Email é obrigatório'),
    password: yup
      .string()
      .min(8, ({ min }) => `Sua senha deve ter ${min} characters`)
      .required('Senha é obrigatório'),
})

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
    },
    paper:{
        backgroundColor: '#222',
        padding: 15
        
    },
    textInput:{
        color:'yellow',
        paddingTop: 15,
        paddingBottom: 15,
    }
  });