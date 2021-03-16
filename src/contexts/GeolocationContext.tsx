import { createContext, ReactNode } from "react";

interface GeolocationContextData {};

interface GeolocationProviderProps {
    children: ReactNode;
};

export const GeolocationContext = createContext({} as GeolocationContextData);

export function GeolocationProvider({children}: GeolocationProviderProps){
    return (
        <GeolocationContext.Provider value={{}}>
            {children}
        </GeolocationContext.Provider>
    )
};
