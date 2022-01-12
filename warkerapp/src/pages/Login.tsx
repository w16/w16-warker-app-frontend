import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/Warker.png"
import googleIconImg from "../assets/images/google-icon.svg"


export function Login() {
    
    return(
        <div>
            <aside>
                <img src={illustrationImg}></img>
                <strong>Fuel Check</strong>
                <p>Search for the gas station closest to you in real time</p>
            </aside>
            <main>
                <div>
                    <img src={logoImg}></img>
                    <button>
                        <img src={googleIconImg}></img>
                        Join w/ Google
                    </button>
                    <div className="separator">join us</div>
                </div>
            </main>
        </div>
    )


}