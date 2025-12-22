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
        <div className="flex flex-row justify-center items-end px-8 gap-2 bg-[#a26106] h-full w-full max-w-[1600px] rounded-md">
          <div className="flex flex-col justify-end items-center p-0 gap-2 w-1/2 max-w-[600px] h-auto rounded-md">
            <PlayerArea updateScores={updateScores} isPlayer={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
