import { useContext } from "react"
import { AuthContext } from "../App"
import illustrationImg from "../assets/images/illustration.svg"
import "../styles/auth.scss"

export function Home() {

    return(

        <div id="page-auth">
            <aside>
                <img src={illustrationImg}></img>
                <strong>Fuel Check</strong>
                <p>Search for the gas station closest to you in real time</p>
            </aside>
            <main>
                <div className="main-content">
                   <h1>APP</h1>
                </div>
            </main>
        </div>





    )
}