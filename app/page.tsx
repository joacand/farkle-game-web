"use client";

import { useEffect, useRef, useState } from "react";
import GameState from "./Components/GameState";
import PlayerArea from "./Components/PlayerArea";
import Rules from "./Components/Rules";
import Header from "./Components/Header";
import StatusText from "./Components/StatusText";

export default function Home() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [targetScore] = useState(1500);

  const [showStatus, setShowStatus] = useState(false);
  const [statusText, setStatusText] = useState("");

  const [playersTurn, setPlayersTurn] = useState(true);

  function status(text: string) {
    setStatusText(text);
    setShowStatus(true);
  }

  function updateScores(player: number, computer: number) {
    const turnName = playersTurn ? "Player" : "Computer";
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

  { /* AI logic, do not read this part of the code... In development. */ }
  const aiRollAgainRef = useRef<() => void>(undefined);
  const aiEndTurnRef = useRef<() => void>(undefined);
  const aiToggleDieRef = useRef<(index: number) => void>(undefined);
  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
  const aiLockRef = useRef(false);
  const playersTurnRef = useRef(playersTurn);
  useEffect(() => {
    playersTurnRef.current = playersTurn;
  }, [playersTurn]);
  useEffect(() => {
    if (playersTurn || aiLockRef.current) { return; }
    aiLockRef.current = true;

    async function executeAi() {
      aiToggleDieRef.current?.(0);
      await wait(1500);
      if (playersTurnRef.current) { return; }
      aiToggleDieRef.current?.(1);
      await wait(1500);
      if (playersTurnRef.current) { return; }
      aiRollAgainRef.current?.();
      await wait(1500);
      if (playersTurnRef.current) { return; }
      aiEndTurnRef.current?.();

    }

    executeAi();
    aiLockRef.current = false;

    // This is a bit hacky since we use this as the dependency. It will not cause problems though due to the IF statement above. Improvement possible.
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [playersTurn]);
  { /* End AI logic */ }

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
              toggleDieRef={(fn) => (aiToggleDieRef.current = fn)} />
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
