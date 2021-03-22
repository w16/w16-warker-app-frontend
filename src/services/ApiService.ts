import axios from 'axios';

/**
 * @file Serviço de consultas à API.
 * @author Lucas Creator
 * 
 * Não foram feitos tratamentos específicos para cada status de erro retornado pelo servidor, sendo o mesmo exposto apenas no console, com mensagem padrão para o usuário.
 */

interface userData {
    [key: string]: string;
}

const baseUrl = 'https://warker-api.herokuapp.com/api';

export const register = async (user: userData) => {
    const res = await axios.post(`${baseUrl}/register`, user);
    return res;
}

export const login = async (user: userData) => {
    const res = await axios.post(`${baseUrl}/login`, user);
    return res;
}
   
export const getData = async (token: string, table: string, id: string) => {
    try{    
        const res = await axios.get(
            `${baseUrl}/${table}`.concat(id ? `/${id}` : ''),
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    }catch(err){
        console.log('err: ', err);
    }
}
