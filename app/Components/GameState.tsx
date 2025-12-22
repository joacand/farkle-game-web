"use client";

import { useState } from "react";

export default function GameState() {

    const [playerScore, setPlayerScore] = useState(720);
    const [computerScore, setComputerScore] = useState(520);
    const [targetScore, setTargetScore] = useState(2500);

    return (
        <div className="flex flex-col justify-center items-start p-6 gap-2.5 bg-lime-800 max-w-sm">
            <p>Player score: {playerScore}</p>
            <p>Computer score: {computerScore}</p>
            <hr className="border-t border-gray-200 my-1 h-px w-full" />
            <p>Target: {targetScore}</p>
        </div>
    );
}
