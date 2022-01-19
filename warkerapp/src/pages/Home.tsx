import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import illustrationImg from "../assets/images/illustration.svg";
import SearchAppBar from "../components/Search";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from "leaflet"
import useGetLocation from "../hooks/useGetLocation"
import "../styles/auth.scss";
import { Button } from "../components/Button";
import api from "../services/api";
import { iconPumpWithGas, iconPumpMediumGas, iconPumpLowGas } from "../services/iconProvider"

export function Home() {
  const { user, SignInWithGoogle } = useContext(AuthContext);
  const {coords} = useGetLocation()
  const [gasStations, setGasStations] = useState<any[]>([]);
 

  useEffect(()=>{
    api.get("/posto").then((response: { data: { data: any; }; }) => {
      if (response) {
      let data = response.data.data;
      console.log(data);
      setGasStations(data)
    
      return response.data;
    }
    });
  },[])
  

  if(!coords){
    return <span>loading...</span>
  }

function checkQtdReservatory(qtdReservatory:number) {
  
  if(qtdReservatory > 80) {
    return iconPumpWithGas
  }else if (qtdReservatory < 80 && qtdReservatory > 40){
    return iconPumpMediumGas
  }else {
    return iconPumpLowGas
  }

}


function handleGasCheck() {
    console.log(coords);
}

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg}></img>
        <strong>Fuel Check</strong>
        <p>Search for the gas station closest to you in real time</p>
        <p>Welcome, {user?.name}</p>
      </aside>
      <main>
        <div className="main-content-login">
          <header>
              <div className="header">
                <h2>Explorar</h2>
                <h3 className="filterh3"><Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.74)" }} to="/home/filter">Filtrar</Link></h3>
              </div>
          </header>
          <div className="search-map">
          <SearchAppBar></SearchAppBar>
          <MapContainer id="map" center={{
            lat: coords[0],
            lng: coords[1],
          } as LatLngExpression}
          zoom={8}
          >
            <TileLayer
             attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
             url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}></TileLayer>
            {gasStations.map(posto => {
              return <Marker key={posto.id} icon={checkQtdReservatory(posto.reservatorio)} position={[posto.coords.longitude,posto.coords.latitude] as LatLngExpression }></Marker>
            })}
          </MapContainer>
          <Button onClick={handleGasCheck}>Estou com sede!</Button>      
          </div>
        </div>
      </main>
    </div>
  );
}
