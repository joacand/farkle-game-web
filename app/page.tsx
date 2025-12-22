"use client";

import { useState } from "react";
import GameState from "./Components/GameState";
import PlayerArea from "./Components/PlayerArea";
import Rules from "./Components/Rules";
import Header from "./Components/Header";

export default function Home() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [targetScore, setTargetScore] = useState(1500);

  function updateScores(player: number, computer: number) {
    console.log("Updating scores:", player, computer);
    setPlayerScore(current => player + current);
    setComputerScore(current => computer + current);
  }

  return (
    <div className="flex flex-col items-center p-5 gap-4 w-full h-screen bg-[#333750]">
      <Header />
      <div className="flex flex-row items-center px-4 gap-4 relative w-full h-screen bg-[#333750]">
        { /* Side Bar */}
        <div className="flex flex-col justify-center items-center gap-2 p-0 w-1/4 max-w-[250px] h-full">
          <GameState playerScore={playerScore} computerScore={computerScore} targetScore={targetScore} />
          <Rules />
        </div>
        { /* Main Game */}
        <div className="flex flex-row justify-center items-end px-8 gap-2 bg-[rgba(134,87,0,0.28)] h-full w-full max-w-[1600px]">
          <div className="flex flex-col justify-end items-center p-0 gap-2 w-1/2 max-w-[600px] h-auto">
            <PlayerArea updateScores={updateScores} isPlayer={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
