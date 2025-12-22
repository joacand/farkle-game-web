"use client";

import Dice from "./Dice";
import Controls from "./Controls";
import { useEffect, useReducer } from "react";
import { initialPlayerGameState } from "../Models/PlayerGameState";
import { gameReducer } from "../Services/gameReducer";

interface PlayerAreaProps {
    updateScores: (player: number, computer: number) => void;
    isPlayer: boolean;
    hasTurn: boolean;
    onRollAgainRef?: (fn: () => void) => void;
    onEndTurnRef?: (fn: () => void) => void;
    toggleDieRef?: (fn: (index: number) => void) => void;
}

export default function PlayerArea({ updateScores, isPlayer, hasTurn, onRollAgainRef, onEndTurnRef, toggleDieRef }: PlayerAreaProps) {
    const [gameState, dispatch] = useReducer(gameReducer, initialPlayerGameState);

    function updateScore(score: number) {
        if (isPlayer) {
            updateScores(score, 0);
        } else {
            updateScores(0, score);
        }
    }

    // Functions for Computer
    useEffect(() => {
        if (onRollAgainRef) onRollAgainRef(onRollAgain);
        if (onEndTurnRef) onEndTurnRef(onEndTurn);
        if (toggleDieRef) toggleDieRef(toggleDie);
    }, []);
    // End functions for Computer

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
            <Dice selectedDice={gameState.selectedDice} diceValues={gameState.diceValues} usedDice={gameState.usedDice} toggleDie={isPlayer ? toggleDie : () => { }} />
            {isPlayer && <Controls onRollAgain={onRollAgain} onEndTurn={onEndTurn}
                rollAgainDisabled={!hasTurn || gameState.selectedDice.length === 0}
                endTurnDisabled={!hasTurn} />}
        </div>
    );
}
