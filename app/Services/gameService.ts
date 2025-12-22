export function calculateScore(diceValues: number[], selectedDice: number[]): number {
    const values = diceValues.filter((_, index) => selectedDice.includes(index));

    if (values.length === 3) {
        const firstValue = values[0];
        if (values.every(v => v === firstValue)) {
            if (firstValue === 1) return 300;
            return firstValue * 100;
        }
        return 0;
    }

    if (values.length === 1) {
        if (values.includes(1)) return 100;
        if (values.includes(5)) return 50;
    }

    return 0;
}

export function rollDice(diceValues: number[], selectedDice: number[], usedDice: number[]): number[] {
    return diceValues.map((value, index) => {
        if (selectedDice.includes(index) || usedDice.includes(index)) return value;
        return Math.floor(Math.random() * 6) + 1;
    });
}
