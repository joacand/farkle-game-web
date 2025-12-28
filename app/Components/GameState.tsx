"use client";

import TextLayout from "./TextLayout";

export default function GameState({ playerScore, computerScore, targetScore, lobbyId = "" }: { playerScore: number, computerScore: number, targetScore: number, lobbyId?: string }) {
    return (
        <TextLayout>
            {lobbyId && <div>
                <p className="text-m">Lobby:</p>
                <p className="text-xs cursor-pointer select-all text-orange-200 hover:text-orange-400"
                    onClick={() => navigator.clipboard.writeText(lobbyId)}
                    title="Click to copy">{lobbyId}</p>
            </div >}
            <h2 className="text-3xl">Score</h2>
            <p>You: {playerScore}</p>
            <p>Opponent: {computerScore}</p>
            <hr className="border-t border-gray-200 my-1 h-px w-full" />
            <p className="text-2xl">Target: {targetScore}</p>

        </TextLayout>
    );
}
