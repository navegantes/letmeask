import { Link } from "react-router-dom";
import { useContext } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/Falae-logo.svg";

import { Button } from "../components/Button";
import { AuthContext } from "../App";

import "../styles/auth.scss";

export function NewRoom() {
    const { user } = useContext(AuthContext);
    console.log(user);

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
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
