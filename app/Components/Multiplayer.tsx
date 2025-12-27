"use client";

import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";

interface MultiplayerProps {
    children: React.ReactNode
    multiplayer: boolean
}

export default function Multiplayer({ children, multiplayer }: MultiplayerProps) {
    const [displayGame, setDisplayGame] = useState(false);
    const [lobbyId, setLobbyId] = useState("");

    useEffect(() => {
        if (!multiplayer) { return }

        const firebaseConfig = {
            apiKey: "AIzaSyBJJacx3HNR5hoAO9X2CqbIrhFrIkkJ9WU",
            authDomain: "farkle-web.firebaseapp.com",
            projectId: "farkle-web",
            storageBucket: "farkle-web.firebasestorage.app",
            messagingSenderId: "1097086142650",
            appId: "1:1097086142650:web:ac57db224de91580c79a83"
        };

        const app = initializeApp(firebaseConfig);

        console.log(app);

        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(`User signed in: ${uid}`);
            } else {
                console.log("User is signed out");
            }
        });

        signInAnonymously(auth)
            .then(() => {
                console.log("Signed in anonymously")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`Failed to sign in: ${errorCode} ${errorMessage}`)
                setDisplayGame(true);
            });
    }, [multiplayer]);

    function joinLobby() {
        setDisplayGame(true);
    }

    function createLobby() {
        setDisplayGame(true);
    }

    return (
        <>
            {!displayGame &&
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl">Multiplayer</h2>
                    <p className="text-lg">Enter an existing lobby-id and click join, or create a new lobby.</p>
                    <input className="w-full px-2 py-0 rounded-md bg-orange-100 text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        defaultValue={lobbyId} onChange={e => setLobbyId(e.target.value)} />
                    <PrimaryButton onClick={joinLobby}>Join lobby</PrimaryButton>
                    <PrimaryButton onClick={createLobby}>Create new lobby</PrimaryButton>
                </div>
            }
            {displayGame && children}
        </>
    );
}