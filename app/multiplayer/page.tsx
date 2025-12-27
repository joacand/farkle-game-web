"use client";

import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Services/firebase"
import PrimaryButton from "../Components/PrimaryButton";
import { useRouter } from "next/navigation";

export default function Multiplayer({ }) {
    const router = useRouter();

    const [lobbyId, setLobbyId] = useState("");

    useEffect(() => {
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
            });
    }, []);

    function joinLobby() {
        // TODO: Join lobby logic
        router.push("/");
    }

    function createLobby() {
        // TODO: Create lobby logic
        router.push("/");
    }

    return (
        <>
            <div className="font-sans font-medium text-[16px] leading-[26px] gap-3 flex flex-col max-w-2xl m-10">
                <h2 className="text-3xl">Multiplayer</h2>
                <p >Enter an existing lobby-id and click join, or create a new lobby.</p>
                <input className="w-full px-2 py-0 rounded-md bg-orange-100 text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    defaultValue={lobbyId} onChange={e => setLobbyId(e.target.value)} />
                <PrimaryButton onClick={joinLobby}>Join lobby</PrimaryButton>
                <PrimaryButton onClick={createLobby}>Create new lobby</PrimaryButton>
                <PrimaryButton href="/">Cancel</PrimaryButton>
            </div>
        </>
    );
}
