import React, { createContext, useContext, useState } from 'react'

const PostosContext = createContext();

export default function PostosProvider({children}){
    const [postos, setPostos] = useState([])

    return(
        <PostosContext.Provider
            value={{
                postos,
                setPostos
            }}
        >
            {children}
        </PostosContext.Provider>
    )
}

export function usePostos() {
    const context = useContext(PostosContext);
    const { postos, setPostos} = context;
    return { postos, setPostos }
}