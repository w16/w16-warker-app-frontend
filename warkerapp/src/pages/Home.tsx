import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../App";
import illustrationImg from "../assets/images/illustration.svg";
import SearchAppBar from "../components/Search";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from "leaflet"
import "../styles/auth.scss";

export function Home() {
  const { user, SignInWithGoogle } = useContext(AuthContext);

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
          <div>
          <MapContainer id="map" center={{
            lat: -27.647926875493706,
            lng: -48.44147344104905,
          } as LatLngExpression}
          zoom={8}
          whenCreated={()=>{}}
          >
            <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}></TileLayer>
            <Marker position={[-27.647926875493706,-48.44147344104905] as LatLngExpression }></Marker>
          </MapContainer>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
