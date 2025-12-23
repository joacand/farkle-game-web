"use client"

import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { setMuted } from "../Services/audioService";

export default function ApplicationControls() {
    const [audioMuted, setAudioMuted] = useState(false);
    const [audioText, setAudioText] = useState<string>("🔇 Mute");

    function mute(muted: boolean) {
        setMuted(muted);
        setAudioMuted(muted);
        setAudioText(muted ? "🔉 Unmute" : "🔇 Mute");
    }

    useEffect(() => {
        const saved = localStorage.getItem("audioMuted");
        const muted = saved === "true";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        mute(muted);
    }, []);

    function onAudioClick() {
        const newAudioMuted = !audioMuted;
        mute(newAudioMuted);
        localStorage.setItem("audioMuted", newAudioMuted.toString());
    }

    return (
        < div className="flex flex-col justify-center items-start p-6 gap-2.5 bg-[#a26106] max-w-sm w-full rounded-md " >
            <PrimaryButton onClick={onAudioClick}>{audioText}</PrimaryButton>
        </div >
    );
}
