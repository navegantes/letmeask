import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/images/Falae-logo.svg";
import delImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import ansImg from "../assets/images/answer3.svg";

import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";
import { database } from "../services/firebase";

type RoomParams = {
    id: string;
};

export function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();

    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push("/");
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Deseja realmente excluir esta pergunta?")) {
            await database
                .ref(`rooms/${roomId}/questions/${questionId}`)
                .remove();
        }
    }

    async function handleCheckedQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Falaê!" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>
                            Encerrar sala
                        </Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && (
                        <span>{questions.length} pergunta(s)</span>
                    )}
                </div>

                <div className="question-list">
                    {questions.map((question) => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCheckedQuestionAsAnswered(
                                                    question.id
                                                )
                                            }
                                        >
                                            <img
                                                src={checkImg}
                                                alt="Marcar pergunta como respondida"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleHighlightQuestion(
                                                    question.id
                                                )
                                            }
                                        >
                                            <img
                                                src={ansImg}
                                                alt="Dar destaque a pergunta"
                                            />
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteQuestion(question.id)
                                    }
                                >
                                    <img src={delImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
