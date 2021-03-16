import { createContext, ReactNode } from "react";

interface UserContextData {};

interface UserProviderProps {
    children: ReactNode;
};

export const UserContext = createContext({} as UserContextData);

export function UserProvider({children}: UserProviderProps){
    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
};
