"use client";

import Game from "@/app/Components/Game";
import useLobby from "@/app/Hooks/useLobby";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/Components/AuthContext";
import BasePage from "@/app/Components/BasePage";
import PrimaryButton from "@/app/Components/PrimaryButton";
import { joinLobby } from "@/app/Services/lobbyService";
import { useEffect } from "react";

export default function LobbyContent() {
    const { user, loading } = useAuth();

    const searchParams = useSearchParams();
    const lobbyId = searchParams.get("lobbyId") as string;

    const lobbyData = useLobby(lobbyId, !loading && !!user);

    useEffect(() => {
        if (!user || !lobbyId || lobbyId === "" || !lobbyData) { return; }

        const playerIds = Object.keys(lobbyData.players);

        if (lobbyData.players[user.uid]) { return; }

        if (playerIds.length >= 2) return;

        joinLobby(user, lobbyId);
    }, [user, lobbyId, lobbyData])

    if (!lobbyData || !user?.uid || loading) {
        return <BasePage>Loading lobby...</BasePage>;
    }

    const playerIds = Object.keys(lobbyData.players);
    if (Object.keys(lobbyData.players).length === 2 && !playerIds.includes(user.uid)) {
        return (
            <BasePage>
                <h1>Error joining lobby</h1>
                <p>You tried to join a full lobby you are not a part of.</p>
                <PrimaryButton href="/">Back</PrimaryButton>
            </BasePage>);
    }

    return <Game playerId={user.uid} lobbyId={lobbyId} />
}