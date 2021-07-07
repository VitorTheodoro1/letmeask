import illustrationImg from '../assets/images/illustration.svg'// metodo de colocar imagens react
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';


import { Button } from '../components/Button';


import '../styles/auth.scss';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

// import { AuthContext } from '../contexts/AuthContext';

// import { useContext } from 'react';



// webpack 
//SVG vetores nunca perdem resolução

export function NewRoom() {
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');
    const { user } = useAuth();
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '')//remove os espaços
            return;

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        history.push(`/rooms/${firebaseRoom.key}`)// ir para id da sala criada
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"//texto do botão
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}