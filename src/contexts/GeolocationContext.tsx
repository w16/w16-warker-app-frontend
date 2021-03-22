import React, { createContext, ReactNode, useEffect, useState } from "react";
import * as Permissions from 'expo-permissions';
import haversine from "haversine";

/**
 * Contexto de geolocalização. Expõe as seguintes propriedades:
 * @const location -- coordenadas de localização do usuário ou do ponto inicial, caso não haja autorização para geolocalização.
 * @func calculateDistance -- calcula distância de um dado ponto em relação à localização coom descrito acima com base na fórmula de haversine {@link https://en.wikipedia.org/wiki/Haversine_formula|Link} (distâncias entre dois pontos de uma esfera a partir de suas latitudes e longitudes).
 */

/* Localização inicial (home sWeet home) */
const LATITUDE = -27.597;
const LONGITUDE = -48.521;

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface GeolocationContextData {
    location: Coordinates;
    calculateDistance: (targetLocation: Coordinates) => number;
};

interface GeolocationProviderProps {
    children: ReactNode;
};

export const GeolocationContext = createContext({} as GeolocationContextData);

export function GeolocationProvider({children}: GeolocationProviderProps){
    /* Atribuição da loclização inicial com uso do hook useState */
    const [location, setLocation] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE
    });

    function calculateDistance(targetLocation: Coordinates):number {
        return haversine(location, targetLocation) || 0;
      };
    
    /** Solicita uma única vez, no primeiro acesso ao mapa
     * @const permission -- permissão do usuário para acesso à geolocalização
     */
    const [permission, askForPermission] = Permissions.usePermissions(Permissions.LOCATION, {ask: true});
            //askForPermission só funcionou nos testes em Android, sendo então abandonada.
   
    /** Hook useEffect utilizado para iniciar acompanhamento de geoposicionamento do usuário, recebendo como dependência @param permission como descrito acima.
    */
    useEffect(() => {
        if (permission && permission.status === 'granted'){

            /** 
             * @const watchID -- retornada pelo navegador quando iniciado acompanhamento de geoposicionamento, é utilizada no retorno do hook para encerrar acompanhamento.
             * @var position -- retorna coordenadas de geolocalização do usuário, armazenadas em @const location .
             */
            const watchID = navigator.geolocation.watchPosition(
                position => {
                    const { latitude, longitude } = position.coords;
            
                    const newCoordinate = {
                        latitude,
                        longitude
                    };               
                    
                    setLocation(newCoordinate);
                
                },
                error => console.log(error),
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                }
            )
            return () => navigator.geolocation.clearWatch(watchID);
        }
    }, [permission]);

    return (
        <GeolocationContext.Provider value={{
            location,
            calculateDistance
        }}>
            {children}
        </GeolocationContext.Provider>
    )
};
