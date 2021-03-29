import React, { createContext, ReactNode, useContext } from "react";
import { getData } from '../services/ApiService';
import { UserContext } from "./UserContext";
import { GeolocationContext } from "./GeolocationContext";
import { PostosData } from '../../interfaces';

/**
 * @file Manipula dados retornados pela API para servir mapa.
 * @author Lucas Creator
 * 
 * Expõe a seguinte função:
 * @func handleGetData -- busca dados de postos e cidades na API.
 */

interface DataContextData {
    handleGetData: (table: string, id?:string) => Promise<void>;
};

interface DataProviderProps {
    children: ReactNode;
};

export const DataContext = createContext({} as DataContextData);

export function DataProvider({children}: DataProviderProps){
    const { token } = useContext(UserContext);

    const { calculateDistance, location } = useContext(GeolocationContext);

    const handleGetData = async (table: string, id=''): Promise<PostosData[]> => {
        const data = await getData(token, table, id);
        return data;
    }
    
    return (
        <DataContext.Provider value={{
            handleGetData
        }}>
            {children}
        </DataContext.Provider>
    )
};
