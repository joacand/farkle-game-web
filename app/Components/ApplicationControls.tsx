"use client"

import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { setMuted } from "../Services/audioService";
import { DEFAULT_TARGET } from "../Services/gameService";

interface ApplicationControlsProps {
    setTargetScore: (target: number) => void;
    canSetTarget: boolean;
}

export default function ApplicationControls({ setTargetScore, canSetTarget }: ApplicationControlsProps) {
    const [audioMuted, setAudioMuted] = useState(false);
    const [audioText, setAudioText] = useState<string>("🔇 Mute");
    const [target, setTarget] = useState<string>(DEFAULT_TARGET.toString());

    function mute(muted: boolean) {
        setMuted(muted);
        setAudioMuted(muted);
        setAudioText(muted ? "🔉 Unmute" : "🔇 Mute");
    }

    useEffect(() => {
        const targetFromStorage = localStorage.getItem("farkle.target");
        if (targetFromStorage != null) {
            const parsedInt = parseInt(targetFromStorage, 10);
            if (!isNaN(parsedInt) && parsedInt < 100001) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setTarget(parsedInt.toString());
                setTargetScore(parsedInt);
            }
        }

        const mutedFromStorage = localStorage.getItem("farkle.audioMuted");
        const muted = mutedFromStorage === "true";
        mute(muted);
    }, []);

    function onAudioClick() {
        const newAudioMuted = !audioMuted;
        mute(newAudioMuted);
        localStorage.setItem("farkle.audioMuted", newAudioMuted.toString());
    }

    function changeTarget() {
        const parsedInt = parseInt(target, 10);
        if (!isNaN(parsedInt) && parsedInt < 100001) {
            localStorage.setItem("farkle.target", parsedInt.toString());
            setTargetScore(parsedInt);
        }
    }

    return (
        <div className="flex flex-col justify-center items-start p-6 gap-4 bg-[#a26106] max-w-sm w-full rounded-md">
            <PrimaryButton onClick={onAudioClick}>{audioText}</PrimaryButton>
            {canSetTarget && <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                    <p className="text-white font-medium">Target </p>
                    <input className="w-24 px-2 py-0 rounded-md bg-orange-100 text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        defaultValue={target} onChange={e => setTarget(e.target.value)} />
                </div>
                <PrimaryButton onClick={changeTarget}>Change target</PrimaryButton>
            </div>}
            <PrimaryButton href="/about">About</PrimaryButton>
            <PrimaryButton href="/multiplayer">Multiplayer</PrimaryButton>
        </div >
    );
}
