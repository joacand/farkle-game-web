"use client";

import { useState } from "react";
import GameState from "./Components/GameState";
import PlayerArea from "./Components/PlayerArea";
import Rules from "./Components/Rules";
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

  function targetChanged(target: number) {
    setTargetScore(target);
    resetGame();
  }

  const {
    aiRollAgainRef,
    aiEndTurnRef,
    aiToggleDieRef } = useComputerPlayer(playersTurn, aiGameState);

  return (
    <>
      { /* Side Bar */}
      <div className="flex flex-col items-center gap-2 p-0 w-[250px] h-full rounded-md">
        <GameState playerScore={playerScore} computerScore={computerScore} targetScore={targetScore} />
        <Rules />
        <ApplicationControls setTargetScore={targetChanged} />
      </div>
      { /* Main Game */}
      <div className="flex flex-col justify-between px-8 gap-2 w-full max-w-[1600px] rounded-md"
        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/wood-pattern.png)` }}>
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
    </>
  );
}
