let isMuted = false;

export function setMuted(value: boolean) {
    isMuted = value;
}

export function toggleMuted() {
    isMuted = !isMuted;
}

export function playSound(soundFile: string, alternatives: number = 0) {
    if (isMuted) { return; }

    if (alternatives > 0) {
        const n = Math.floor(Math.random() * alternatives) + 1;
        soundFile = soundFile.replace("{n}", n.toString());
    }
    const audio = new Audio(`/audio/${soundFile}`);
    audio.play().catch(err => console.warn("Failed to play audio:", err));
}