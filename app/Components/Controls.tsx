"use client";

import PrimaryButton from "./PrimaryButton";

interface ControlsProps {
    onRollAgain?: () => void,
    onEndTurn?: () => void,
    rollAgainDisabled?: boolean,
    endTurnDisabled?: boolean,
}

export default function Controls({ onRollAgain, onEndTurn, rollAgainDisabled, endTurnDisabled }: ControlsProps) {

    return (
        <div className="flex flex-row justify-center items-center px-3 py-3 gap-3 w-auto h-auto">
            <PrimaryButton onClick={onRollAgain} disabled={rollAgainDisabled}>Roll again</PrimaryButton>
            <PrimaryButton onClick={onEndTurn} disabled={endTurnDisabled}>End turn</PrimaryButton>
        </div>
    );
}
