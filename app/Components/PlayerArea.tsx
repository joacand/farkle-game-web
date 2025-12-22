"use client";

import Dice from "./Dice";
import Controls from "./Controls";
import { useEffect, useReducer } from "react";
import { initialPlayerGameState } from "../Models/PlayerGameState";
import { gameReducer } from "../Services/gameReducer";

export default function PlayerArea({ updateScores, isPlayer }: { updateScores: (player: number, computer: number) => void, isPlayer: boolean }) {
    const [gameState, dispatch] = useReducer(gameReducer, initialPlayerGameState);

    function updateScore(score: number) {
        if (isPlayer) {
            updateScores(score, 0);
        } else {
            updateScores(0, score);
        }
    }

    useEffect(() => {
        if (gameState.result && gameState.result.type === "UPDATE_SCORE") {
            updateScore(gameState.result.points);
            dispatch({ type: 'CLEAR_RESULT' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState.result]);

    useEffect(() => {
        console.log("Component loaded!");
        dispatch({ type: 'ROLL' });
    }, []);

    function onRollAgain() {
        dispatch({ type: 'ROLL_AGAIN' });
    }

    function onEndTurn() {
        dispatch({ type: 'END_TURN' });
    }

    function toggleDie(index: number) {
        dispatch({ type: 'TOGGLE_DIE', index });
    }

    return (
        <div className="flex flex-col items-center py-3 px-3 gap-3 w-auto h-auto bg-[#cb8903] rounded-md">
            <Dice selectedDice={gameState.selectedDice} diceValues={gameState.diceValues} usedDice={gameState.usedDice} toggleDie={toggleDie} />
            <Controls onRollAgain={onRollAgain} onEndTurn={onEndTurn} />
        </div>
    );
}
