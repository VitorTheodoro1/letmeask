import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode // children e componentes react

}


export const AuthContext = createContext({} as AuthContextType);//contexto para compartilhar dados entre todas as paginas

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>(); // user por causa do typescript tipagem

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {// procurando existia ja um login prefeito
            if (user) {// se sim busca as informações
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account')
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })

            }
        })
        return () => {// todas vez que vc declara um eventlistener vc tem a obrigacao de descadastrar
            unsubscribe();
        }
    }, [])// monitorar algo e fazer a funçao caso mude

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account')
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }

    }


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>

    );
}