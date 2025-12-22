"use client";

import Dice from "./Dice";
import Controls from "./Controls";
import { useState } from "react";

export default function PlayerArea() {

    const [selectedDice, setSelectedDice] = useState<number[]>([]);

    function onRollAgain() {
        console.log("Rolling dice:", selectedDice);
    }

    function onEndTurn() {
        console.log("End turn clicked");
    }

    function toggleDie(index: number) {
        if (selectedDice.includes(index)) {
            setSelectedDice(selectedDice.filter(i => i !== index));
        } else {
            setSelectedDice([...selectedDice, index]);
        }
    }

    return (
        <div className="flex flex-col items-center py-3 px-3 gap-3 w-auto h-auto bg-[#8F92A7]">
            <Dice selectedDice={selectedDice} toggleDie={toggleDie} />
            <Controls onRollAgain={onRollAgain} onEndTurn={onEndTurn} />
        </div>
    );
}
