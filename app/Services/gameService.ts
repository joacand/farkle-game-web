export function calculateScore(diceValues: number[], selectedDice: number[]): { score: number, valid: boolean } {
    const values = diceValues.filter((_, index) => selectedDice.includes(index));

    const counts: Record<number, number> = {};
    for (const v of values) {
        counts[v] = (counts[v] || 0) + 1;
    }

    let score = 0;

    for (let die = 1; die <= 6; die++) {
        const count = counts[die] || 0;

        if (count >= 6) {
            score += die === 1 ? 300 * 4 : die * 100 * 4;
            counts[die] -= 6;
        } else if (count === 5) {
            score += die === 1 ? 300 * 3 : die * 100 * 3;
            counts[die] -= 5;
        } else if (count === 4) {
            score += die === 1 ? 300 * 2 : die * 100 * 2;
            counts[die] -= 4;
        } else if (count === 3) {
            score += die === 1 ? 300 : die * 100;
            counts[die] -= 3;
        }
    }

    if ((counts[1] || 0) > 0) {
        score += counts[1] * 100;
        counts[1] = 0;
    }
    if ((counts[5] || 0) > 0) {
        score += counts[5] * 50;
        counts[5] = 0;
    }

    const valid = !Object.values(counts).some(x => x > 0);

    return { score, valid }
}

export function rollDice(diceValues: number[], selectedDice: number[], usedDice: number[]): number[] {
    return diceValues.map((value, index) => {
        if (selectedDice.includes(index) || usedDice.includes(index)) return value;
        return Math.floor(Math.random() * 6) + 1;
    });
}

export const DEFAULT_TARGET = 2500;