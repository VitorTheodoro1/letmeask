import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg';
import answeImg from '../assets/images/answer.svg';


import '../styles/room.scss';
import { useHistory, useParams } from 'react-router-dom'
// import { FormEvent, useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { database } from '../services/firebase';
// import { useEffect } from 'react';
import { Question } from '../components/Question/index';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';



type RoomParams = {
    id: string;
}


export function AdminRoom() {
    // const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();//passando o id para o codigo da sala
    const roomId = params.id
    // const [newQuestion, setNewQuestion] = useState('');
    const { title, questions } = useRoom(roomId)


    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })
        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que quer deletar a pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

        }

    }
    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        });
    }



    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" ></img>
                    <div>
                        <RoomCode code={roomId}></RoomCode>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>

                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}// precisa passar a key para o react diferenciar uma pergunta para outra
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                            >
                                {!question.isAnswered && (// utilizei o fragment
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida"></img>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answeImg} alt="Dar destaque a pergunta"></img>
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta"></img>
                                </button>
                            </Question>
                        )
                    })}
                </div>

            </main>
        </div>
    );
}