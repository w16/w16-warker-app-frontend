import React, { createContext, useContext, useState, useEffect } from 'react'

import AsyncStorage from '@react-native-community/async-storage';


import * as auth from '../services/Auth'

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    //Adicionando as informações no AsyncStorage
    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@WARKER:user');    
        
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
        }
    
        loadStorageData();
      });

      //Função para realizar o login e pegando as informações la na pastar services
      async function signIn(values) {
        const response = await auth.Login(values);
        setUser(response.user);
    
        // //Paga salvar no asyncstorage, tenho que passar em string as informações de retorno da api 
        await AsyncStorage.setItem('@WARKER:user', JSON.stringify(response.user));
      }

      //Função para fazer logout e limpar os estados e AsyncStorage
      async function signOut() {
        await AsyncStorage.clear();
        setUser(null);
      }

    //Retornando as informações do contexto para as telas
    return(
        <AuthContext.Provider
            value={{signed: !!user, user, signIn, signOut}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth deve ser usando no AuthProvider.');
    }
  
    return context;
}
