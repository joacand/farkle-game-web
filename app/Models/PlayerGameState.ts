export type PlayerGameState = {
    diceValues: number[];
    selectedDice: number[];
    usedDice: number[];
    sessionScore: number;
    result?: TurnResult;
};

export type TurnResult =
    | { type: "NONE" }
    | { type: "UPDATE_SCORE"; points: number };

export const initialPlayerGameState: PlayerGameState = {
    diceValues: [1, 1, 1, 1, 1, 1],
    selectedDice: [],
    usedDice: [],
    sessionScore: 0,
};