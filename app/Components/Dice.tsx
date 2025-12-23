"use client";

import Die from "./Die";

export default function Dice({ selectedDice = [], diceValues = [], usedDice = [], toggleDie, rollTrigger }: { selectedDice: number[], diceValues: number[], usedDice: number[], toggleDie: (index: number) => void, rollTrigger: number }) {

    return (
        <div className="flex flex-row flex-wrap justify-center items-center py-2 gap-3">
            {diceValues.map((value, index) => (
                <Die
                    value={value}
                    key={index}
                    selected={selectedDice.includes(index)}
                    used={usedDice.includes(index)}
                    onClick={() => toggleDie(index)}
                    rollTrigger={rollTrigger} />
            ))}
        </div>
    );
}
