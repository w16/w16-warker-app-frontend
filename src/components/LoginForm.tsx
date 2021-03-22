import React, { useContext } from 'react';
import * as Yup from 'yup';
import { t } from 'i18n-js';
import { UserContext } from '../contexts/UserContext';
import { FormWithTextInputs } from './FormComponents';

/**
 * @file Formulário de login. 
 * @author Lucas Creator
 * 
 * D.R.Y.: Invoca componente paramétrico de {@link ./FormComponents|FormWithTextInputs}.
 */

const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
    password: Yup.string().required(t('passwordRequired'))
});
 
 export default function LoginForm() {
    const { handleLogin } = useContext(UserContext);

    return (
        <FormWithTextInputs
            formName={'Login'}
            fields={['email', 'password']}
            handler={handleLogin}
            validationSchema={validationSchema}
        />
    );
    
}
