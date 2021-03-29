import React, { useContext } from 'react';
import * as Yup from 'yup';
import { t } from '../i18n';
import { UserContext } from '../contexts/UserContext';
import { FormWithTextInputs } from './FormComponents';

/**
 * @file Formulário de cadastro. 
 * @author Lucas Creator
 * 
 * D.R.Y.: Invoca componente paramétrico de {@link ./FormComponents|FormWithTextInputs}.
 */

const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('nameRequired')).max(15),
    email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
    password: Yup.string().required(t('passwordRequired')),
    car: Yup.string().max(8),
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
