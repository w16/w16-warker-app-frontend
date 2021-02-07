import React from 'react';

import {useAuth} from '../contexts/Auth';

import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

export default function Routes(){
    //Validar se está logado
    const {signed} = useAuth();

    if(signed){
        return <AppRoutes />
    } else{
        return <AuthRoutes />
    }

};
