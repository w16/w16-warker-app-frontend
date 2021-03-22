import React, { createContext, ReactNode, useState } from "react";
import { register, login } from '../services/ApiService';
import { t } from "i18n-js";

/**
 * Contexto para tratamento de dados do usuário.
 * Expõe as seguintes funções, que encaminham requisições diretamente à API {@link https://warker-api.herokuapp.com/ Warker}:
 * @func handleRegister -- função de registro de usuário, que invoca em sequência a função de login, se não houver erros no registro.
 * @func handleLogin -- realiza login do usuário, recuperando do servidor o nome fornecido e o token de acesso.
 * @const token -- token de acesso fornecido pela API para consultas ao banco.
 */

/** interface para objeto de número variável de parâmetros associados aos dados de usuário */
interface userData {
    [key: string]: string;
}

interface UserContextData {
    handleRegister: (data: userData) => Promise<boolean>;
    handleLogin: (data: userData) => Promise<boolean>;
    token: string;
};

interface UserProviderProps {
    children: ReactNode;
};

export const UserContext = createContext({} as UserContextData);

export function UserProvider({children}: UserProviderProps){

    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
    const [carName, setCarName] = useState('');
        // Apenas um pequeno mimo ao usuário.

    /* Pequeno hack para utilizar a API para armazenar nome do usuário e nome do veículo numa só variável.*/
    /** @func setNames -- atribui às @const userName e @const carName os valores armazenados na API no momento de registro. */
    function setNames(user:string):void {
        let userData = user.split('|');
        setUserName(userData[0]);
        let car = userData[1] ? userData[1] : t('carName');
        setCarName(car);
    }

    const handleLogin = async (user: userData):Promise<boolean> => {
        try{
            const res = await login(user);
            setToken(res.data.token);
            setNames(res.data.user);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    const handleRegister = async (data: userData):Promise<boolean> => {
        try{
            const user = {
                /* Atributo name recebe nomes do usuário e do veículo */
                "name": `${data.name.trim()}|${data.car.trim()}`,
                "email": data.email,
                "password": data.password
            }
            await register(user);
            /* Se obtiver sucesso no registro, segue automaticamente para login; senão, erro é levantado e bloco try cancelado.
            */
            await handleLogin({
                "email": data.email,
                "password": data.password
            })
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    return (
        <UserContext.Provider value={{
            handleLogin,
            handleRegister,
            token
        }}>
            {children}
        </UserContext.Provider>
    )
};
