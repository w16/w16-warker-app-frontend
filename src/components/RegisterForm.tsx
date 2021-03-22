import React, { useContext } from 'react';
import * as Yup from 'yup';
import { t } from 'i18n-js';
import { UserContext } from '../contexts/UserContext';
import { FormWithTextInputs } from './FormComponents';

/**
 * @file Formulário de cadastro. 
 * @author Lucas Creator
 * 
 * D.R.Y.: Invoca componente paramétrico de {@link ./FormComponents|FormWithTextInputs}.
 */

const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('nameRequired')),
    email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
    password: Yup.string().required(t('passwordRequired'))
});
 
 export default function RegisterForm() {
    const { handleRegister } = useContext(UserContext);

    return (
        <FormWithTextInputs
            formName={'Register'}
            fields={['name', 'email', 'password', 'car']}
            handler={handleRegister}
            validationSchema={validationSchema}
        />
    );
}
