"use client";

import Game from "@/app/Components/Game";
import useLobby from "@/app/Hooks/useLobby";
import { useSearchParams } from "next/navigation";
import { auth } from "../../Services/firebase"

export default function LobbyContent() {
    const searchParams = useSearchParams();
    const lobbyId = searchParams.get("lobbyId") as string;

    const lobbyData = useLobby(lobbyId);

    if (!lobbyData || !auth.currentUser?.uid) {
        return <p>Loading lobby...</p>;
    }

    return <Game playerId={auth.currentUser.uid} lobbyId={lobbyId} />
}