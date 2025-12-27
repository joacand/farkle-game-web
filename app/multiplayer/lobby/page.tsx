"use client";

import { Suspense } from "react";
import LobbyContent from "./LobbyContent";

export default function LobbyPage() {
    return (
        <Suspense>
            <LobbyContent />
        </Suspense>
    );
}