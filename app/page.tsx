"use client";

import { useState } from "react";
import GameState from "./Components/GameState";
import PlayerArea from "./Components/PlayerArea";
import Rules from "./Components/Rules";
import Header from "./Components/Header";
import StatusText from "./Components/StatusText";
import useComputerPlayer, { ComputerGameState } from "./Hooks/useAiPlayer";
import { playSound } from "./Services/audioService";
import ApplicationControls from "./Components/ApplicationControls";

export default function Home() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [targetScore, setTargetScore] = useState(2500);

  const [showStatusO, setShowStatusO] = useState(false);
  const [statusTextO, setStatusTextO] = useState("");
  const [showStatusP, setShowStatusP] = useState(false);
  const [statusTextP, setStatusTextP] = useState("");

  const [playersTurn, setPlayersTurn] = useState(true);
  const [aiGameState, setAiGameState] = useState<ComputerGameState | null>(null);

  function status(text: string, player: boolean) {
    if (player) {
      setStatusTextP(text);
      setShowStatusP(true);
    } else {
      setStatusTextO(text);
      setShowStatusO(true);
    }
  }

  function updateScores(player: number, computer: number) {
    const turnName = playersTurn ? "You" : "Opponent";
    if (player === 0 && computer === 0) {
      status(`Bust!`, playersTurn);
    } else if (player > 0) {
      status(`${turnName} gained ${player} points.`, playersTurn);
    } else {
      status(`${turnName} gained ${computer} points.`, playersTurn);
    }
    const newPlayerScore = playerScore + player;
    const newComputerScore = computerScore + computer;
    setPlayerScore(newPlayerScore);
    setComputerScore(newComputerScore);
    if (!winCondition(newPlayerScore, newComputerScore)) {
      setPlayersTurn(current => !current);
    }
  }

  function winCondition(playerScore: number, computerScore: number): boolean {
    if (playerScore >= targetScore) {
      playSound("victory.wav")
      status("Congratulations! You have won the game! 🥳", true);
      resetGame();
      return true;
    } else if (computerScore >= targetScore) {
      playSound("defeat.wav")
      status("Opponent has won the game 😔. Better luck next time!", false);
      resetGame();
      return true;
    }
    return false;
  }

  function resetGame() {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayersTurn(true);
  }

  function targetChanged(target:number) {
    setTargetScore(target);
    resetGame();
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
        <div className="flex flex-col items-center gap-2 p-0 w-[250px] h-full bg-[#864c0d] rounded-md">
          <GameState playerScore={playerScore} computerScore={computerScore} targetScore={targetScore} />
          <Rules />
          <ApplicationControls setTargetScore={targetChanged} />
        </div>
        { /* Main Game */}
        <div className="flex flex-col justify-between px-8 gap-2 bg-[#a26106] w-full max-w-[1600px] rounded-md">
          <div className="flex flex-col items-center p-0 rounded-md gap-2 overflow-x-auto">
            <PlayerArea updateScores={updateScores} isPlayer={false} hasTurn={!playersTurn}
              onRollAgainRef={(fn) => (aiRollAgainRef.current = fn)}
              onEndTurnRef={(fn) => (aiEndTurnRef.current = fn)}
              toggleDieRef={(fn) => (aiToggleDieRef.current = fn)}
              onGameStateChange={setAiGameState} />
            {showStatusO && <StatusText onClose={() => setShowStatusO(false)}>{statusTextO}</StatusText>}
          </div>
          <div className="flex flex-col items-center p-0 rounded-md gap-2">
            {showStatusP && <StatusText onClose={() => setShowStatusP(false)}>{statusTextP}</StatusText>}
            <PlayerArea updateScores={updateScores} isPlayer={true} hasTurn={playersTurn} />
          </div>
        </div>
      </div>
    </div>
  );
}
