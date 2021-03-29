import React from 'react';
import { StyleSheet, ActivityIndicator, Text, TextInput, View, Dimensions } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { t } from '../i18n';
import { useNavigation } from '@react-navigation/core';
import Slider from '@react-native-community/slider';
import { userData, handlerFunction } from '../../interfaces';

/**
 * @file Componentes parametrizados que se repetem em formulários.
 * @author Lucas Creator
 * 
 */

 const { height } = Dimensions.get('window');

 interface SliderProps {
     inverted: boolean;
     maxValue: number;
     callback: (value: any) => void;
 }

interface fieldProps {
    field: string;
    props: FormikProps<any>;
}

interface FormProps {
    formName: string;
    fields: string[];
    handler: handlerFunction;
    validationSchema: any;
}

export function TextInputWithError({...params}: fieldProps): JSX.Element {

    /* Não pude utilizar componentes de 'formik' como 'Field' pois sempre geravam erros deste tipo (possível relação com versão de RNSVG):
    
        Invariant Violation: View config getter callback for component `input` must be a function (received `undefined`). Make sure to start component names with a capital letter.
    */

    return (
        <>
        <TextInput
            style={styles.input}
            secureTextEntry={params.field == 'password'}
            keyboardType={params.field == 'email' ? "email-address" : "default"}
            returnKeyType="default"
            onSubmitEditing={(e) => params.props.handleSubmit(e)}
            placeholder={t(params.field)}

            onBlur={params.props.handleBlur(params.field)}
            onChangeText={params.props.handleChange(params.field)}
        />

        {params.props.touched[params.field] && params.props.errors[params.field] && 
            <Text style={styles.error}>{params.props.errors[params.field]}</Text>
        }
        </>
    )
}


export const FormWithTextInputs: React.FC<FormProps> = ({
            formName, fields, handler, validationSchema
        }): JSX.Element => {
    /**
     * Formulário completo para telas de acesso.
     * Chamado com devidos parâmetros por telas de login e cadastro.
     * Invoca TextInputWithError para criação dos campos de texto.
     */

    const navigation = useNavigation()
    
    const initialValues: userData = {}
    fields.map((item) => initialValues[item] = '');

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                (async () => {
                    const res = await handler(values);
                    actions.setSubmitting(false);
                    if(res) {
                        navigation.navigate('Map');
                    }else{
                        alert(t('cant'+formName));
                    }
                })()
            }}
            validationSchema={validationSchema}
        >
        {(props) => (
            <View style={styles.form}>
                <Text style={styles.title}>LARKER</Text>
                <View style={styles.fields} >
                    {formName == 'Login' && (
                        <Text style={styles.question}>
                            {t('firsTimeQuestion')}
                            <Text
                                style={styles.link}
                                onPress={() => navigation.navigate('Register')}
                            >
                                {t("GoToRegister")}
                            </Text>
                        </Text>
                    )}
                    {fields.map(field => 
                        <TextInputWithError
                            field={field}
                            key={field}
                            props={props}
                        />
                    )}
                </View>
                {props.isSubmitting ? (
                    <ActivityIndicator size="large" color="#CA5501" />
                ) : (

                    <View style={styles.buttonView}>
                        <Text
                            style={styles.buttonText}
                            onPress={props.handleSubmit as any}
                        >
                            {t('submit'+formName)}
                        </Text>
                    </View>
                )}
                {/* Uma pequena gambiarra acima ("handleSubmit as any") para contornar um problema aparentemente já conhecido e ainda não tratado: 
                    https://stackoverflow.com/questions/63109457/react-native-typescript-formik-cast-event-type#comment112126430_63109457
                */}
            </View>
        )}
        </Formik>
    )
}


export const CustomSlider: React.FC<SliderProps> = ({inverted, maxValue, callback}): JSX.Element => {
            /*
            Outro problema com componente de Material Bread, que retorna erro abaixo. Utilizando então alternativa.

                Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.

                Please update the following components: %s, Slider
            */
    return (
        <Slider
            inverted={inverted}
            style={{width: 300, height: 40, marginVertical: 10}}
            minimumValue={0}
            maximumValue={maxValue}
            minimumTrackTintColor="#CA5501"
            maximumTrackTintColor="#F3F4F5"
            thumbTintColor="#CA5501"
            onValueChange={callback}
        />
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        position: 'absolute',
        width: 300,
        height: "100%"
    },

    title: {
        top: 50,
        fontSize: 55,
        color: "#CA5501",
        alignSelf: "center"
    },

    fields: {
        top: height / 5.5,
    },

    question: {
        fontSize: 15,
        height: height / 6,
        marginTop: 10,
        color: "#3C3F40",
        fontWeight: "bold",
        alignSelf: "flex-end"
    },

    link: {
        fontSize: 15,
        color: "#CA5501",
        alignItems: "center",
    },

    input: {
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 35,
        marginVertical: 4,
        fontSize: 14,
        backgroundColor: "#F3F4F5",
        color: '#65696B',
        borderWidth: 1,
        borderColor: "#A3A4A5",
    },

    error: {
        color: '#CA5501',
        fontWeight: "bold",
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