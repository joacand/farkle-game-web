"use client";

import Link from "next/link";
import PrimaryButton from "../Components/PrimaryButton";

export default function About() {
    return (
        <>
            <div className="font-sans font-medium text-[16px] leading-[26px] gap-3 flex flex-col max-w-2xl m-10">
                <h2 className="text-3xl">Welcome to <strong>Farkle</strong>!</h2>
                <p>This is an implementation of the dice game <q>Farkle</q>. You might recognize it from <em>Kingdom Come: Deliverance</em> and its sequel.</p>
                <p>The rules follow the video game closely, though straights are not included (yet). If you&apos;re new to Farkle, you can check out the <Link href="https://en.wikipedia.org/wiki/Farkle" className="underline">Wikipedia entry</Link> for an introduction.</p>
                <PrimaryButton href="/">Home</PrimaryButton>
            </div>
        </>
    );
}
