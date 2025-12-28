"use client";

export default function TextLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-center items-start p-6 gap-1 bg-[#a26106] max-w-sm w-full rounded-md text-xl">
            {children}
        </div>
    );
}
