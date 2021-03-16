import { createContext, ReactNode } from 'react';

interface ApiContextData {};

interface ApiProviderProps {
    children: ReactNode;
};

export const ApiContext = createContext({} as ApiContextData);

export function ApiProvider({children}: ApiProviderProps){
    return (
        <ApiContext.Provider value={{}}>
            {children}
        </ApiContext.Provider>
    )
};
