import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import illustrationImg from "../assets/images/illustration.svg";
import SearchAppBar from "../components/Search";
import SliderSizes from "../components/Slider"
import {Button} from "../components/Button"
import "../styles/auth.scss";

export function Filter() {
  const { user, SignInWithGoogle } = useContext(AuthContext);

  const [combustivel, setCombustivel] = useState(false)


  function hangleCheckBox(event: { target: { value: any; }; }) {
      const vvv = event.target.value
      setCombustivel(vvv)
      console.log(combustivel);
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
                <h2>Filter</h2>
                <h3><Link to="/home">Goback</Link></h3>
              </div>
          </header>
          <div className="search-map">
              <h4>Pesquise por posto</h4>
          <SearchAppBar></SearchAppBar>
          </div>
          <div className="separator-filter"></div>
          <section>
              <div>
              <h4>Combustível</h4>
              <input onChange={hangleCheckBox} type="checkbox" name="combustível" value="Gasolina"></input> Gasolina
              <input onChange={hangleCheckBox} type="checkbox" name="combustível" value="Álcool"></input> Álcool
              <input onChange={hangleCheckBox} type="checkbox" name="combustível" value="Diesel"></input> Diesel    
              </div>  
          </section>
          <div className="separator-filter"></div>
          <section>
                <div>
                    <h4>Nível do reservatório</h4>
                    <input onChange={hangleCheckBox} type="checkbox" name="reservatório" value="Última gota"></input> Gasolina
                    <input onChange={hangleCheckBox} type="checkbox" name="reservatório" value="Duas últimas gotas"></input> Álcool
                    <input onChange={hangleCheckBox} type="checkbox" name="reservatório" value="Reservatório cheio"></input> Diesel  
                </div>
          </section>
          <div className="separator-filter"></div>
            <section>
            <h4>Distância da minha localização</h4>
            <SliderSizes></SliderSizes>
            </section>
            <Button onClick={(e)=>{console.log("estou sendo clicado")}}>Ver resultados</Button>
        </div>
      </main>
    </div>
  );
}