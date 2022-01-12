import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/gas.svg"
import googleIconImg from "../assets/images/google-icon.svg"
import "../styles/auth.scss"


export function Login() {
    
    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg}></img>
                <strong>Fuel Check</strong>
                <p>Search for the gas station closest to you in real time</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg}></img>
                    <button className="sign-google" >
                        <img src={googleIconImg}></img>
                        Join w/ Google
                    </button>
                    <div className="separator">rate us</div>
                </div>
            </main>
        </div>
    )


}