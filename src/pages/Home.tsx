import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'// metodo de colocar imagens react
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

//import { auth, firebase } from '../services/firebase';//fazer a navegação entre paginas, quando e ancore se utiliza link rm vez de useHistory

import { Button } from '../components/Button';


import '../styles/auth.scss';

import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';


// webpack 
//SVG vetores nunca perdem resolução


export function Home() {


    const [roomCode, setRoomCode] = useState('');
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()


    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('./rooms/new'); // autenticação firebase

    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        if (!roomRef.exists()) {
            alert('Room does not exists')
            return;
        }
        if (roomRef.val().endedAt) {
            alert('Room already closed');
            return;
        }
        history.push(`/rooms/${roomCode}`)

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas"></img>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da duas audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask"></img>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"></img>
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}

                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}