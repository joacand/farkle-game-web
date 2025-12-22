"use client";

export default function GameState({ playerScore, computerScore, targetScore }: { playerScore: number, computerScore: number, targetScore: number }) {
    return (
        <div className="flex flex-col justify-center items-start p-6 gap-2.5 bg-[#a26106] max-w-sm w-full rounded-md text-xl">
            <h2 className="text-3xl">Scores</h2>
            <p>Player: {playerScore}</p>
            <p>Computer: {computerScore}</p>
            <hr className="border-t border-gray-200 my-1 h-px w-full" />
            <p className="text-2xl">Target: {targetScore}</p>
        </div>
    );
}
