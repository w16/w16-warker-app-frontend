import { useContext } from "react";
import { AuthContext } from "../App";
import illustrationImg from "../assets/images/illustration.svg";
import SearchAppBar from "../components/Search";
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
                <h3 onClick={(e)=>{console.log("estou sendo clicado")}}>Filtrar</h3>
              </div>
          </header>
          <div className="search-map">
          <SearchAppBar></SearchAppBar>
          </div>
        </div>
      </main>
    </div>
  );
}
