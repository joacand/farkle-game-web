"use client";

import Dice from "./Dice";
import Controls from "./Controls";
import { useEffect, useState } from "react";

export default function PlayerArea({ updateScores, isPlayer }: { updateScores: (player: number, computer: number) => void, isPlayer: boolean }) {

    const [diceValues, setDiceValues] = useState<number[]>([1, 1, 1, 1, 1]);
    const [selectedDice, setSelectedDice] = useState<number[]>([]);
    const [usedDice, setUsedDice] = useState<number[]>([]);
    const [sessionScore, setSessionScore] = useState(0);

    function rollDice() {
        diceValues.forEach((_, index) => {
            if (selectedDice.includes(index) || usedDice.includes(index)) return;
            const newValue = Math.floor(Math.random() * 6) + 1;

            setDiceValues(prevValues => {
                const newValues = [...prevValues];
                newValues[index] = newValue;
                return newValues;
            });
        });
    }

    useEffect(() => {
        console.log("Component loaded!");
        rollDice();
    }, []);

    function onRollAgain() {
        if (selectedDice.length === 0) {
            console.log("No dice selected, zero score move.");
            resetSession();
            updateScore(0);
            return;
        }

        diceValues.forEach((_, index) => {
            if (selectedDice.includes(index) || usedDice.includes(index)) return;
            const newValue = Math.floor(Math.random() * 6) + 1;

            setDiceValues(prevValues => {
                const newValues = [...prevValues];
                newValues[index] = newValue;
                return newValues;
            });
        });

        const score = checkScores();

        if (score === 0) {
            resetSession();
            updateScore(sessionScore);
            return;
        }

        setSessionScore(prevScore => prevScore + score);
        setSelectedDice([]);
    }

    function onEndTurn() {
        console.log("End turn clicked");

        const score = checkScores();

        if (score === 0) {
            resetSession();
            updateScore(0);
            return;
        }

        const newScore = sessionScore + score;
        setSessionScore(newScore);
        updateScore(newScore);
        resetSession();
    }

    function resetSession() {
        setSessionScore(0);
        setUsedDice([]);
        setSelectedDice([]);
        rollDice();
    }

    function updateScore(score: number) {
        if (isPlayer) {
            updateScores(score, 0);
        } else {
            updateScores(0, score);
        }
    }

    function checkScores(): number {
        const score = calculateScore(diceValues, selectedDice);
        if (score === 0) {
            console.log("No score this turn.");
            return 0;
        } else {
            setUsedDice(prevUsed => [...prevUsed, ...selectedDice]);
            console.log("Score this turn:", score);
            return score;
        }
    }

    function calculateScore(diceValues: number[], selectedDice: number[]): number {
        const values = diceValues.filter((_, index) => selectedDice.includes(index));

        if (values.length === 3) {
            const firstValue = values[0];
            if (values.every(v => v === firstValue)) {
                if (firstValue === 1) return 300;
                return firstValue * 100;
            }
            return 0;
        }

        if (values.length === 1) {
            if (values.includes(1)) return 100;
            if (values.includes(5)) return 50;
        }

        return 0;
    }

    function toggleDie(index: number) {
        if (usedDice.includes(index)) {
            return;
        }
        if (selectedDice.includes(index)) {
            setSelectedDice(selectedDice.filter(i => i !== index));
        } else {
            setSelectedDice([...selectedDice, index]);
        }
    }

    return (
        <div className="flex flex-col items-center py-3 px-3 gap-3 w-auto h-auto bg-[#8F92A7]">
            <Dice selectedDice={selectedDice} diceValues={diceValues} usedDice={usedDice} toggleDie={toggleDie} />
            <Controls onRollAgain={onRollAgain} onEndTurn={onEndTurn} />
        </div>
    );
}
