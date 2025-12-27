"use client";

import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../Services/firebase"
import PrimaryButton from "../Components/PrimaryButton";
import { useRouter } from "next/navigation";
import { v4 as uuid } from 'uuid'
import { collection, deleteDoc, doc, getDocs, runTransaction, setDoc } from "firebase/firestore";
import StatusText from "../Components/StatusText";
import LobbyData from "../Models/LobbyData";

export default function Multiplayer({ }) {
    const EXPIRE_THRESHOLD_MS = 10 * 60 * 1000;
    const router = useRouter();

    const [lobbyId, setLobbyId] = useState("");
    const [showStatus, setShowStatus] = useState(false);
    const [statusText, setStatusText] = useState("");

    function status(text: string) {
        setStatusText(text);
        setShowStatus(true);
    }

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

    // Cleans up expired lobbies.
    // Note that any user has access to do this but the server-side rules verify that the expiry-date is actually valid.
    // In other words, users will be blocked from deleting non-expired lobbies server-side.
    async function cleanUpExpiredLobbies() {
        if (!auth.currentUser) { return; }

        try {
            const lobbiesSnap = await getDocs(collection(db, "lobbies"));

            const now = new Date();
            const deletions: Promise<void>[] = [];

            lobbiesSnap.forEach((lobbyDoc) => {
                const data = lobbyDoc.data();
                const expiresAt = data.expiresAt?.toDate?.();

                if (!expiresAt) { return; }

                if (now.getTime() - expiresAt.getTime() > EXPIRE_THRESHOLD_MS) {
                    deletions.push(deleteDoc(doc(db, "lobbies", lobbyDoc.id)));
                }
            });

            await Promise.all(deletions);
            console.log(`Cleaned up ${deletions.length} expired lobbies`);
        } catch (error) {
            console.error("Failed to clean up lobbies:", error);
        }
    }

    async function joinLobby() {
        try {
            if (!auth.currentUser) { throw new Error("User is not signed in"); }

            const uid = auth.currentUser.uid;
            const lobbyRef = doc(db, "lobbies", lobbyId);

            await runTransaction(db, async (tx) => {
                const lobbySnap = await tx.get(lobbyRef);
                if (!lobbySnap.exists) throw new Error("Lobby does not exist");

                const lobbyData = lobbySnap.data() as LobbyData;

                if (lobbyData.players[uid]) {
                    console.log("Already in lobby");
                    return;
                }

                if (Object.keys(lobbyData.players).length >= 2) {
                    throw new Error("Lobby is full");
                }

                tx.update(lobbyRef, {
                    [`players.${uid}`]: {
                        score: 0,
                        lastSeen: new Date()
                    }
                });
            });

            const params = new URLSearchParams({ lobbyId });
            router.push(`/multiplayer/lobby?${params.toString()}`);
        } catch (error) {
            status(`Failed to join lobby: ${error}`);
        }
    }

    async function createLobby() {
        try {
            if (!auth.currentUser) { throw new Error("User is not signed in"); }

            const uid = auth.currentUser.uid;

            const lobbyId = uuid();
            const lobbyRef = doc(db, "lobbies", lobbyId);

            await setDoc(lobbyRef, {
                players: {
                    [uid]: {
                        score: 0,
                        lastSeen: new Date()
                    }
                },
                turn: uid,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + EXPIRE_THRESHOLD_MS)
            });

            const params = new URLSearchParams({ lobbyId });
            router.push(`/multiplayer/lobby?${params.toString()}`);

            await cleanUpExpiredLobbies();
        } catch (error) {
            status(`Failed to create lobby: ${error}`);
        }
    }

    return (
        <>
            <div className="font-sans font-medium text-[16px] leading-[26px] gap-3 flex flex-col max-w-4xl m-10">
                <h2 className="text-3xl">Multiplayer</h2>
                <p>Enter an existing lobby ID and click <strong>Join</strong>, or create a new lobby.
                    After creating a lobby, the lobby ID will appear in the top-left corner.</p>
                <input className="w-md px-2 py-0 rounded-md bg-orange-100 text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    defaultValue={lobbyId} onChange={e => setLobbyId(e.target.value)} placeholder="Enter lobby identifier here..."/>
                <PrimaryButton onClick={joinLobby}>Join lobby</PrimaryButton>
                <PrimaryButton onClick={createLobby}>Create lobby</PrimaryButton>
                <PrimaryButton href="/">Cancel</PrimaryButton>
                <p><strong>❗Multiplayer Notice:</strong> Multiplayer is currently under development. Please keep the following in mind:</p>
                <ul className="list-disc list-inside">
                    <li><strong>No anti-cheat protection:</strong> Players with technical knowledge can submit fake scores.</li>
                    <li><strong>Target setting is not synced:</strong> Both players must manually set the same <q>Target</q> value.</li>
                    <li><strong>Inactive lobbies expire:</strong> Lobbies are automatically removed after 10 minutes of inactivity.</li>
                </ul>
                {showStatus && <StatusText onClose={() => setShowStatus(false)}>{statusText}</StatusText>}
            </div>
        </>
    );
}
