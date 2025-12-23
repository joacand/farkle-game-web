import { useEffect, useRef } from "react";

// What the computer "can see"
export type ComputerGameState = {
    diceValues: number[];
    selectedDice: number[];
    usedDice: number[];
};

// Possible moves together with the probability weight
type Move = number[];
type WeightedMove = [Move, number];

export default function useComputerPlayer(playersTurn: boolean, state: ComputerGameState | null) {

    const aiRollAgainRef = useRef<() => void>(undefined);
    const aiEndTurnRef = useRef<() => void>(undefined);
    const aiToggleDieRef = useRef<(index: number) => void>(undefined);

    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
    const aiLockRef = useRef(false);
    const playersTurnRef = useRef(playersTurn);
    const stateRef = useRef(state);

    function calculateDiceSelection(state: ComputerGameState | null): number[] {
        if (!state) { return []; }

        const possibleSelections = state.diceValues
            .map((value, index) => ({ value, index }))
            .filter(d =>
                !state.usedDice.includes(d.index) &&
                !state.selectedDice.includes(d.index)
            );

        if (possibleSelections.length === 0) {
            return [];
        }

        const possibleMoves: WeightedMove[] = [];

        // Single selections of 1 or 5
        for (const d of possibleSelections) {
            if (d.value === 1) { possibleMoves.push([[d.index], 100]); }
            if (d.value === 5) { possibleMoves.push([[d.index], 10]); }
        }

        // Six of a kind
        const valueMap = new Map<number, number[]>();
        for (const d of possibleSelections) {
            if (!valueMap.has(d.value)) valueMap.set(d.value, []);
            valueMap.get(d.value)!.push(d.index);
        }
        for (const [, indexes] of valueMap) {
            if (indexes.length >= 6) {
                const move = indexes.slice(0, 5);
                const weight = 99999999;
                possibleMoves.push([move, weight]);
            }
        }

        // Five of a kind with 1-1-1-1-1 being weighted higher
        for (const [, indexes] of valueMap) {
            if (indexes.length >= 5) {
                const move = indexes.slice(0, 5);
                const weight = 1600;
                possibleMoves.push([move, weight]);
            }
        }

        // Four of a kind with 1-1-1-1 being weighted higher
        for (const [, indexes] of valueMap) {
            if (indexes.length >= 4) {
                const move = indexes.slice(0, 4);
                const weight = 700;
                possibleMoves.push([move, weight]);
            }
        }

        // Three of a kind with 1-1-1 being weighted higher
        for (const [value, indexes] of valueMap) {
            if (indexes.length >= 3) {
                const move = indexes.slice(0, 3);
                const weight = value === 1 ? 200 : 70;
                possibleMoves.push([move, weight]);
            }
        }

        if (possibleMoves.length === 0) {
            return [];
        }

        const totalWeight = possibleMoves.reduce((sum, move) => sum + move[1], 0);
        let choice = Math.random() * totalWeight;
        for (const [move, weight] of possibleMoves) {
            if (choice < weight) {
                return move;
            }
            choice -= weight;
        }
        return [];
    }

    function shouldRollAgain(diceLeft: number): boolean {
        if (diceLeft >= 5) return Math.random() < 0.9;
        if (diceLeft === 4) return Math.random() < 0.70;
        if (diceLeft === 3) return Math.random() < 0.45;
        if (diceLeft === 2) return Math.random() < 0.25;
        if (diceLeft === 1) return Math.random() < 0.15;
        return true;
    }

    function waitTimeout(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    useEffect(() => {
        playersTurnRef.current = playersTurn;
    }, [playersTurn]);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        if (playersTurn || aiLockRef.current || !stateRef.current) { return; }
        aiLockRef.current = true;

        async function executeAi() {
            while (!playersTurnRef.current) {
                if (playersTurn || !stateRef.current) { return; }

                const selectedDice = calculateDiceSelection(stateRef.current);
                if (selectedDice.length === 0) {
                    aiEndTurnRef.current?.();
                    return;
                }

                for (const dieIndex of selectedDice) {
                    aiToggleDieRef.current?.(dieIndex);
                    await wait(waitTimeout(500, 1800));
                }

                const diceLeft = stateRef.current!.diceValues
                    .map((value, index) => ({ value, index }))
                    .filter(d =>
                        !stateRef.current!.usedDice.includes(d.index) &&
                        !stateRef.current!.selectedDice.includes(d.index) &&
                        !selectedDice.includes(d.index)
                    );

                if (shouldRollAgain(diceLeft.length)) {
                    if (playersTurnRef.current) { return; }
                    aiRollAgainRef.current?.();
                    await wait(waitTimeout(500, 1800));
                } else {
                    if (playersTurnRef.current) { return; }
                    aiEndTurnRef.current?.();
                    await wait(waitTimeout(500, 1800));
                }
            }
        }

        executeAi().finally(() => {
            aiLockRef.current = false;
        });

        // This is a bit hacky since we use this as the dependency. It will not cause problems though due to the IF statement above. Improvement possible.
        // eslint-disable-next-line react-hooks/set-state-in-effect
    }, [playersTurn, state]);


    return {
        aiRollAgainRef,
        aiEndTurnRef,
        aiToggleDieRef
    }
}