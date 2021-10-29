import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/Falae-logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { useContext } from "react";
import { AuthContext } from "../App";
import { Button } from "../components/Button";

import "../styles/auth.scss";

export function Home() {
    const history = useHistory();
    const { user, signInWithGoolge } = useContext(AuthContext);

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoolge();
        }
        history.push("/rooms/new");
    }

    return (
        <div id="page-auth">
            <aside>
                <img
                    src={illustrationImg}
                    alt="Ilustração perguntas e respostas"
                />
                <strong>Crie salas de Q&amp;A ao vivo </strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={LogoImg} alt="logo Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="logo google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em sua sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
