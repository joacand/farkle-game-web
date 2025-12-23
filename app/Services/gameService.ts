export function calculateScore(diceValues: number[], selectedDice: number[]): number {
    const values = diceValues.filter((_, index) => selectedDice.includes(index));

    if (values.length === 6) {
        const firstValue = values[0];
        if (values.every(v => v === firstValue)) {
            if (firstValue === 1) return 300 * 4;
            return firstValue * 100 * 4;
        }
        return 0;
    }

    if (values.length === 5) {
        const firstValue = values[0];
        if (values.every(v => v === firstValue)) {
            if (firstValue === 1) return 300 * 3;
            return firstValue * 100 * 3;
        }
        return 0;
    }

    if (values.length === 4) {
        const firstValue = values[0];
        if (values.every(v => v === firstValue)) {
            if (firstValue === 1) return 300 * 2;
            return firstValue * 100 * 2;
        }
        return 0;
    }

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
