"use client";

import { useState } from "react";
import GameState from "./Components/GameState";
import PlayerArea from "./Components/PlayerArea";
import Rules from "./Components/Rules";
import Header from "./Components/Header";
import StatusText from "./Components/StatusText";
import useComputerPlayer, { ComputerGameState } from "./Hooks/useAiPlayer";

export default function Home() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [targetScore] = useState(1500);

  const [showStatus, setShowStatus] = useState(false);
  const [statusText, setStatusText] = useState("");

  const [playersTurn, setPlayersTurn] = useState(true);
  const [aiGameState, setAiGameState] = useState<ComputerGameState | null>(null);

  function status(text: string) {
    setStatusText(text);
    setShowStatus(true);
  }

  function updateScores(player: number, computer: number) {
    const turnName = playersTurn ? "You" : "Opponent";
    if (player === 0 && computer === 0) {
      status(`Farkle! ${turnName} gained no points gained this turn.`);
    } else if (player > 0) {
      status(`${turnName} gained ${player} points.`);
    } else {
      status(`${turnName} gained ${computer} points.`);
    }
    setPlayerScore(current => player + current);
    setComputerScore(current => computer + current);
    setPlayersTurn(current => !current);
  }

  const {
    aiRollAgainRef,
    aiEndTurnRef,
    aiToggleDieRef } = useComputerPlayer(playersTurn, aiGameState);

  return (
    <div className="flex flex-col items-center p-5 gap-4 w-full h-screen bg-[#212121] ">
      <Header />
      <div className="flex flex-row px-4 p-4 gap-4 relative w-full max-w-[1400px] h-screen bg-[#723e11] rounded-md
            text-l text-gray-100 tracking-tight">
        { /* Side Bar */}
        <div className="flex flex-col items-center gap-2 p-0 w-1/4 max-w-[250px] h-full bg-[#864c0d] rounded-md">
          <GameState playerScore={playerScore} computerScore={computerScore} targetScore={targetScore} />
          <Rules />
        </div>
        { /* Main Game */}
        <div className="flex flex-col justify-between  px-8 gap-2 bg-[#a26106] h-full w-full max-w-[1600px] rounded-md">
          <div className="flex flex-col justify-start items-center p-0 h-auto rounded-md">
            <PlayerArea updateScores={updateScores} isPlayer={false} hasTurn={!playersTurn}
              onRollAgainRef={(fn) => (aiRollAgainRef.current = fn)}
              onEndTurnRef={(fn) => (aiEndTurnRef.current = fn)}
              toggleDieRef={(fn) => (aiToggleDieRef.current = fn)}
              onGameStateChange={setAiGameState} />
          </div>
          <div className="flex flex-col justify-end items-center p-0 h-auto rounded-md">
            {showStatus && <StatusText onClose={() => setShowStatus(false)}>{statusText}</StatusText>}
            <PlayerArea updateScores={updateScores} isPlayer={true} hasTurn={playersTurn} />
          </div>
        </div>
      </div>
    </div>
  );
}
