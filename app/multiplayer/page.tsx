"use client";

import { useState } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import { useRouter } from "next/navigation";
import StatusText from "../Components/StatusText";
import { useAuth } from "../Components/AuthContext";
import BasePage from "../Components/BasePage";
import { tryCleanUpExpiredLobbies as tryCleanUpExpiredLobbies, createLobby, joinLobby as joinLobby } from "../Services/lobbyService";

export default function Multiplayer({ }) {
    const router = useRouter();

    const [lobbyId, setLobbyId] = useState("");
    const [showStatus, setShowStatus] = useState(false);
    const [statusText, setStatusText] = useState("");
    const { user, loading } = useAuth();

    function status(text: string) {
        setStatusText(text);
        setShowStatus(true);
    }

    async function onJoinLobby() {
        try {
            await joinLobby(user, lobbyId);
            const params = new URLSearchParams({ lobbyId });
            router.push(`/multiplayer/lobby?${params.toString()}`);
        } catch (error) {
            status(`Failed to join lobby: ${error}`);
        }
    }

    async function onCreateLobby() {
        try {
            await createLobby(user).then(async lobbyId => {
                const params = new URLSearchParams({ lobbyId });
                router.push(`/multiplayer/lobby?${params.toString()}`);

                await tryCleanUpExpiredLobbies(user);
            });
        } catch (error) {
            status(`Failed to create lobby: ${error}`);
        }
    }

    return (
        <>
            <BasePage>
                <h2 className="text-3xl">Multiplayer</h2>
                <p>Enter an existing lobby ID and click <strong>Join</strong>, or create a new lobby.
                    After creating a lobby, the lobby ID will appear in the top-left corner. You can share the resulting lobby link to invite another player.</p>
                <input className="w-md px-2 py-0 rounded-md bg-orange-100 text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    defaultValue={lobbyId} onChange={e => setLobbyId(e.target.value)} placeholder="Enter lobby identifier here..." />
                <PrimaryButton onClick={onJoinLobby} disabled={loading}>Join lobby</PrimaryButton>
                <PrimaryButton onClick={onCreateLobby} disabled={loading}>Create lobby</PrimaryButton>
                <PrimaryButton href="/">Cancel</PrimaryButton>
                <p><strong>❗Multiplayer Notice:</strong> Multiplayer is currently under development. Please keep the following in mind:</p>
                <ul className="list-disc list-inside">
                    <li><strong>No anti-cheat protection:</strong> Players with technical knowledge can submit fake scores.</li>
                    <li><strong>Target setting is not synced:</strong> Both players must manually set the same <q>Target</q> value.</li>
                    <li><strong>Inactive lobbies expire:</strong> Lobbies are automatically removed after 10 minutes of inactivity.</li>
                </ul>
                {showStatus && <StatusText onClose={() => setShowStatus(false)}>{statusText}</StatusText>}
            </BasePage>
        </>
    );
}
