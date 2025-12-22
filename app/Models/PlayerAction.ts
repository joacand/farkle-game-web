export type PlayerAction =
    | { type: "ROLL" }
    | { type: "ROLL_AGAIN" }
    | { type: "END_TURN" }
    | { type: "TOGGLE_DIE"; index: number }
    | { type: "RESET_SESSION" }
    | { type: "CLEAR_RESULT" };