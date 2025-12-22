"use client";

import Die from "./Die";

export default function Dice({ selectedDice = [], toggleDie }: { selectedDice?: number[], toggleDie: (index: number) => void }) {

    const dice = [1, 1, 1, 1, 1];

    return (
        <div className="flex flex-row justify-center items-center py-2 gap-3 w-auto h-auto">
            {dice.map((value, index) => (
                <Die
                    value={value}
                    key={index}
                    selected={selectedDice.includes(index)}
                    onClick={() => toggleDie(index)} />
            ))}
        </div>
    );
}
