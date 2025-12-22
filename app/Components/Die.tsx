"use client";

export default function Die({ value = 1, selected = false, onClick }: { value: number, selected: boolean, onClick?: () => void }) {

    return (
        <div className={`flex justify-center items-center relative isolate w-20 h-20 md:w-24 md:h-24
            ${selected ? "ring-4 ring-yellow-400" : ""}`} onClick={onClick}>
            <div className="flex justify-center items-center w-full h-full bg-[#0015FF] rounded-xl">
                <p className="font-normal text-4xl md:text-5xl">{value}</p>
            </div>
        </div>
    );
}
