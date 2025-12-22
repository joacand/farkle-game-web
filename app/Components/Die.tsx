"use client";

import { Key } from "react";

export default function Die({ value = 1, selected = false, used = false, onClick, size = 94 }: { value: number, selected?: boolean, used?: boolean, onClick?: () => void, size?: number }) {

    const dots: Record<number, [number, number][]> = {
        1: [[1, 1]],
        2: [
            [0, 0],
            [2, 2],
        ],
        3: [
            [0, 0],
            [1, 1],
            [2, 2],
        ],
        4: [
            [0, 0],
            [0, 2],
            [2, 0],
            [2, 2],
        ],
        5: [
            [0, 0],
            [0, 2],
            [1, 1],
            [2, 0],
            [2, 2],
        ],
        6: [
            [0, 0],
            [0, 2],
            [1, 0],
            [1, 2],
            [2, 0],
            [2, 2],
        ],
    };

    return (
        <div className={`bg-white border-2 border-black rounded-lg grid grid-cols-3 grid-rows-3 gap-2 p-2 relative
            ${selected ? "ring-4 ring-yellow-400" : ""}
            ${used ? "ring-4 ring-red-400" : ""}`} onClick={onClick}
            style={{ width: size, height: size }}>
            {dots[value].map(([row, col]: [number, number], index: Key | null | undefined) => (
                <div
                    key={index}
                    className="bg-black rounded-full justify-self-center self-center"
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
