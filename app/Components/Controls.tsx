"use client";

import PrimaryButton from "./PrimaryButton";

interface ControlsProps {
    onRollAgain?: () => void,
    onEndTurn?: () => void
}

export default function Controls({ onRollAgain, onEndTurn }: ControlsProps) {

    return (
        <div className="flex flex-row justify-center items-center px-3 py-3 gap-3 w-auto h-auto">
            <PrimaryButton onClick={onRollAgain}>Roll again</PrimaryButton>
            <PrimaryButton onClick={onEndTurn}>End turn</PrimaryButton>
        </div>
    );
}
