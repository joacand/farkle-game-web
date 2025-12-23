import { PlayerAction } from "../Models/PlayerAction";
import { PlayerGameState } from "../Models/PlayerGameState";
import { calculateScore, rollDice } from "./gameService";

export function gameReducer(state: PlayerGameState, action: PlayerAction): PlayerGameState {
    switch (action.type) {
        case 'TOGGLE_DIE': {
            return toggleDie(state, action);
        }
        case 'ROLL_AGAIN': {
            return rollAgain(state);
        }
        case 'END_TURN': {
            return endTurn(state);
        }
        case 'ROLL': {
            return roll(state);
        }
        case 'RESET_SESSION': {
            return resetSession(state);
        }
        case 'CLEAR_RESULT': {
            return { ...state, result: undefined };
        }
    }

    function toggleDie(state: PlayerGameState, action: Extract<PlayerAction, { type: "TOGGLE_DIE" }>): PlayerGameState {
        const index = action.index;

        if (state.usedDice.includes(index)) { return state; }

        const newSelectedDice = state.selectedDice.includes(index)
            ? state.selectedDice.filter(i => i !== index)
            : [...state.selectedDice, index];

        return {
            ...state,
            selectedDice: newSelectedDice,
        };
    }

    function rollAgain(state: PlayerGameState): PlayerGameState {
        if (state.selectedDice.length === 0) {
            return {
                ...state,
                sessionScore: 0,
                usedDice: [],
                selectedDice: [],
                diceValues: rollDice(state.diceValues, [], []),
                result: { type: "UPDATE_SCORE", points: 0 }
            };
        }

        const newValues = state.diceValues.map((value, index) => {
            if (state.selectedDice.includes(index) || state.usedDice.includes(index)) return value;
            return Math.floor(Math.random() * 6) + 1
        });

        const [score, newState] = checkScores({ ...state, diceValues: newValues });

        if (score === 0) {
            return {
                ...newState,
                sessionScore: 0,
                usedDice: [],
                selectedDice: [],
                diceValues: rollDice(newState.diceValues, [], []),
                result: { type: "UPDATE_SCORE", points: 0 }
            };
        }

        // Hot dice scenario, reset used dice if all dice have been used
        if (newState.usedDice.length === 5) {
            newState.usedDice = [];
            newState.diceValues = rollDice(newState.diceValues, [], []);
        }

        return {
            ...newState,
            sessionScore: state.sessionScore + score,
            selectedDice: [],
        }
    }

    function endTurn(state: PlayerGameState): PlayerGameState {
        const [score, newState] = checkScores({ ...state });

        if (score === 0) {
            return {
                ...newState,
                sessionScore: 0,
                usedDice: [],
                selectedDice: [],
                diceValues: rollDice(newState.diceValues, [], []),
                result: { type: "UPDATE_SCORE", points: 0 }
            };
        }

        return {
            ...newState,
            sessionScore: 0,
            usedDice: [],
            selectedDice: [],
            diceValues: rollDice(newState.diceValues, [], []),
            result: { type: "UPDATE_SCORE", points: state.sessionScore + score }
        };
    }

    function roll(state: PlayerGameState): PlayerGameState {
        const newValues = rollDice(state.diceValues, state.selectedDice, state.usedDice);
        return {
            ...state,
            diceValues: newValues
        };
    }


    function resetSession(state: PlayerGameState): PlayerGameState {
        return {
            ...state,
            sessionScore: 0,
            usedDice: [],
            selectedDice: [],
            diceValues: rollDice(state.diceValues, [], []),
            result: { type: "UPDATE_SCORE", points: 0 }
        };
    }

    function checkScores(state: PlayerGameState): [number, PlayerGameState] {
        const score = calculateScore(state.diceValues, state.selectedDice);
        if (score === 0) {
            return [0, { ...state }];
        } else {
            return [score,
                {
                    ...state,
                    usedDice: [...state.usedDice, ...state.selectedDice]
                }];
        }
    }
}
