"use client";

import { useEffect, useState } from "react";
import useComputerPlayer, { ComputerGameState } from "../Hooks/useAiPlayer";
import { playSound } from "../Services/audioService";
import GameState from "./GameState";
import Rules from "./Rules";
import ApplicationControls from "./ApplicationControls";
import PlayerArea from "./PlayerArea";
import StatusText from "./StatusText";
import useLobby from "../Hooks/useLobby";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Services/firebase";
import { EXPIRE_THRESHOLD_MS } from "../Services/lobbyService";

interface GameProps {
    playerId?: string;
    lobbyId?: string;
}

export default function Home({ playerId = "", lobbyId = "" }: GameProps) {
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [targetScore, setTargetScore] = useState(2500);

    const [showStatusO, setShowStatusO] = useState(false);
    const [statusTextO, setStatusTextO] = useState("");
    const [showStatusP, setShowStatusP] = useState(false);
    const [statusTextP, setStatusTextP] = useState("");

    const [playersTurn, setPlayersTurn] = useState(true);
    const [aiGameState, setAiGameState] = useState<ComputerGameState | null>(null);

    if (lobbyId !== "") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const lobbyData = useLobby(lobbyId, lobbyId !== "");

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!lobbyData) { return; }

            setTargetScore(lobbyData.target);

            const player = playerId ? lobbyData.players[playerId] : null;
            const otherPlayerId = Object.keys(lobbyData.players).find(id => id !== playerId);
            const otherPlayer = otherPlayerId ? lobbyData.players[otherPlayerId] : null;

            if (lobbyData.turn !== playerId) {
                // Turn was changed to us. Update data from user
                const otherPlayerId = Object.keys(lobbyData.players).find(id => id !== playerId);
                const otherPlayer = otherPlayerId ? lobbyData.players[otherPlayerId] : null;
                updateScoresMp(otherPlayer?.score ?? 0);
            } else {
                // Our state change, we already know this
            }

            setPlayerScore(player?.score ?? 0);
            setComputerScore(otherPlayer?.score ?? 0);
            if (!winCondition(player?.score ?? 0, otherPlayer?.score ?? 0)) {
                setPlayersTurn(lobbyData.turn !== playerId);
            }
        }, [lobbyData]);
    }

    function status(text: string, player: boolean) {
        if (player) {
            setStatusTextP(text);
            setShowStatusP(true);
        } else {
            setStatusTextO(text);
            setShowStatusO(true);
        }
    }

    function updateScoresMp(totalNewScore: number) {
        const turnName = "Opponent";

        const newScore = totalNewScore - computerScore;

        if (newScore === 0) {
            status(`Bust!`, false);
        } else {
            status(`${turnName} gained ${newScore} points.`, false);
        }
        setComputerScore(totalNewScore);
    }

    async function updateScores(player: number, computer: number) {
        const turnName = playersTurn ? "You" : "Opponent";
        if (player === 0 && computer === 0) {
            status(`Bust!`, playersTurn);
        } else if (player > 0) {
            status(`${turnName} gained ${player} points.`, playersTurn);
        } else {
            status(`${turnName} gained ${computer} points.`, playersTurn);
        }

        const newPlayerScore = playerScore + player;
        const newComputerScore = computerScore + computer;

        if (lobbyId === "") {
            setPlayerScore(newPlayerScore);
            setComputerScore(newComputerScore);
            if (!winCondition(newPlayerScore, newComputerScore)) {
                setPlayersTurn(current => !current);
            }
        } else {
            const uid = auth.currentUser?.uid;
            const lobbyRef = doc(db, "lobbies", lobbyId);
            await updateDoc(lobbyRef, {
                [`players.${uid}.score`]: newPlayerScore,
                [`players.${uid}.lastSeen`]: new Date(),
                "turn": playerId,
                "expiresAt": new Date(Date.now() + EXPIRE_THRESHOLD_MS)
            });
        }
    }

    function winCondition(playerScore: number, computerScore: number): boolean {
        if (playerScore >= targetScore) {
            playSound("victory.wav")
            status("Congratulations! You have won the game! 🥳", true);
            resetGame();
            return true;
        } else if (computerScore >= targetScore) {
            playSound("defeat.wav")
            status("Opponent has won the game 😔. Better luck next time!", false);
            resetGame();
            return true;
        }
        return false;
    }

    function resetGame() {
        setPlayerScore(0);
        setComputerScore(0);
        setPlayersTurn(true);
    }

    function targetChanged(target: number) {
        setTargetScore(target);
        resetGame();
    }

    const {
        aiRollAgainRef,
        aiEndTurnRef,
        aiToggleDieRef } = useComputerPlayer(playersTurn, aiGameState);

    return (
        <>
            { /* Side Bar */}
            <div className="flex flex-col items-center gap-2 p-0 w-[250px] h-full rounded-md overflow-y-auto">
                <GameState playerScore={playerScore} computerScore={computerScore} targetScore={targetScore} lobbyId={lobbyId} />
                <Rules />
                <ApplicationControls setTargetScore={targetChanged} />
            </div>
            { /* Main Game */}
            <div className="flex flex-col justify-between px-8 gap-2 w-full max-w-[1600px] rounded-md"
                style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/wood-pattern.png)` }}>
                <div className="flex flex-col items-center p-0 rounded-md gap-2 overflow-x-auto">
                    <PlayerArea updateScores={updateScores} isPlayer={false} hasTurn={!playersTurn}
                        onRollAgainRef={lobbyId === "" ? (fn) => (aiRollAgainRef.current = fn) : () => { }}
                        onEndTurnRef={lobbyId === "" ? (fn) => (aiEndTurnRef.current = fn) : () => { }}
                        toggleDieRef={lobbyId === "" ? (fn) => (aiToggleDieRef.current = fn) : () => { }}
                        onGameStateChange={setAiGameState} />
                    {showStatusO && <StatusText onClose={() => setShowStatusO(false)}>{statusTextO}</StatusText>}
                </div>
                <div className="flex flex-col items-center p-0 rounded-md gap-2">
                    {showStatusP && <StatusText onClose={() => setShowStatusP(false)}>{statusTextP}</StatusText>}
                    <PlayerArea updateScores={updateScores} isPlayer={true} hasTurn={playersTurn} />
                </div>
            </div>
        </>
    );
}
