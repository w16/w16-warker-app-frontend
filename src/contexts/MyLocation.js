import React, { createContext, useContext, useState } from 'react'

const MapContext = createContext();

export default function MapProvider({children}){
    const [location, setLocation] = useState(null)

    return(
        <MapContext.Provider
            value={{
                location,
                setLocation
            }}
        >
            {children}
        </MapContext.Provider>
    )
}

export function useLocation() {
    const context = useContext(MapContext);
    const { location, setLocation} = context;
    return { location, setLocation }
}