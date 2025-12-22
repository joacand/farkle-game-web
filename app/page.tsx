import GameState from "./Components/GameState";
import PlayerArea from "./Components/PlayerArea";

export default function Home() {
  return (
    <div className="flex flex-row items-center px-4 gap-4 relative w-full h-screen bg-[#333750]">
      { /* Side Bar */ }
      <div className="flex flex-col justify-center items-center p-0 w-1/4 max-w-[250px] h-full">
        <GameState />
      </div>
      { /* Main Game */ }
      <div className="flex flex-row justify-center items-end px-8 gap-2 bg-[rgba(134,87,0,0.28)] h-full w-full max-w-[1600px]">
        <div className="flex flex-col justify-end items-center p-0 gap-2 w-1/2 max-w-[600px] h-auto">
          <PlayerArea />
        </div>
      </div>
    </div>
  );
}
