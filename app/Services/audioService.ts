let isMuted = false;

export function setMuted(value: boolean) {
    isMuted = value;
}

export function toggleMuted() {
    isMuted = !isMuted;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function playSound(soundFile: string, alternatives: number = 0) {
    if (isMuted) { return; }

    if (alternatives > 0) {
        const n = Math.floor(Math.random() * alternatives) + 1;
        soundFile = soundFile.replace("{n}", n.toString());
    }
    const filePath = `${BASE}/audio/${soundFile}`;
    const audio = new Audio(filePath);
    audio.play().catch(err => console.warn(`Failed to play audio from file ${filePath}:`, err));
}