"use client";

import { Key, useEffect, useState } from "react";

export default function Die({ value = 1, selected = false, used = false, onClick, size = 94, visible = true, rollTrigger = 0 }:
    { value: number, selected?: boolean, used?: boolean, onClick?: () => void, size?: number, visible: boolean, rollTrigger?: number }) {

    const [rolling, setRolling] = useState(false);

    const dots: Record<number, [number, number][]> = {
        1: [[1, 1]],
        2: [[0, 0], [2, 2]],
        3: [[0, 0], [1, 1], [2, 2]],
        4: [[0, 0], [0, 2], [2, 0], [2, 2]],
        5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
        6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRolling(true);
        const timer = setTimeout(() => setRolling(false), 400);
        return () => clearTimeout(timer);
    }, [rollTrigger]);

    const dieStyle = {
        width: size,
        height: size,
        background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 80%, #cbd5e1 100%)",
    };

    function dieClicked() {
        if (visible && onClick) onClick();
    }

    return (
        <div className={`bg-white border-2 border-black rounded-lg grid grid-cols-3 grid-rows-3 gap-2 p-2 relative
            ${selected ? "ring-4 ring-yellow-300" : ""}
            ${used ? "ring-4 ring-red-500" : ""}
            ${rolling && !used && !selected ? "animate-roll" : ""}
            ${visible ? "cursor-pointer" : ""}`} onClick={dieClicked}
            style={dieStyle}>

            {dots[value].map(([row, col]: [number, number], index: Key | null | undefined) => (
                <div
                    key={index}
                    className={`${visible ? "bg-black" : ""} rounded-full justify-self-center self-center`}
                    style={{
                        gridRowStart: row + 1,
                        gridColumnStart: col + 1,
                        width: size / 6,
                        height: size / 6,
                    }}
                ></div>
            ))}
        </div>
    );
}
