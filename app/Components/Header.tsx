"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header>
            <Link href={"/"} className="font-normal text-4xl md:text-5xl">🎲 Farkle</Link>
        </header>
    );
}
