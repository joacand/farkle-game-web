import { useEffect, useState } from "react";
import LobbyData from "../Models/LobbyData";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Services/firebase";

export default function useLobby(lobbyId: string) {
    const [lobbyData, setLobbyData] = useState<LobbyData | null>(null);

    useEffect(() => {
        const lobbyRef = doc(db, "lobbies", lobbyId);

        const unsubscribe = onSnapshot(lobbyRef, (docSnap) => {
            if (docSnap.exists()) {
                setLobbyData(docSnap.data() as LobbyData);
            } else {
                setLobbyData(null);
            }
        });

        return unsubscribe;
    }, [lobbyId])

    return lobbyData;
}
