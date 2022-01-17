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

export function Home() {
  const { user, SignInWithGoogle } = useContext(AuthContext);
  const {coords} = useGetLocation()

  const [nearGas, setNearGas] = useState<number[] | null>()

  if(!coords){
    return <span>loading...</span>
  }

  //quando clicar no botao estou com sede me transportar pro posto mais proximo

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
                <h3 className="filterh3"><Link to="/home/filter">Filtrar</Link></h3>
              </div>
          </header>
          <div className="search-map">
          <SearchAppBar></SearchAppBar>
          <MapContainer id="map" center={{
            lat: coords[0],
            lng: coords[1],
          } as LatLngExpression}
          zoom={8}
          whenCreated={()=>{}}
          >
            <TileLayer
             attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
             url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}></TileLayer>
            <Marker position={[coords[0],coords[1]] as LatLngExpression }></Marker>
          </MapContainer>
          <Button onClick={handleGasCheck}>Estou com sede!</Button>      
          </div>
        </div>
      </main>
    </div>
  );
}
