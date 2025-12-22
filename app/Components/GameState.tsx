"use client";

export default function GameState({playerScore, computerScore, targetScore}: {playerScore: number, computerScore: number, targetScore: number   }) {
    return (
        <div className="flex flex-col justify-center items-start p-6 gap-2.5 bg-lime-800 max-w-sm w-full">
            <p>Player score: {playerScore}</p>
            <p>Computer score: {computerScore}</p>
            <hr className="border-t border-gray-200 my-1 h-px w-full" />
            <p>Target: {targetScore}</p>
        </div>
    );
}
