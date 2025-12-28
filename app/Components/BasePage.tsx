"use client";

export default function BasePage({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-sans font-medium text-[16px] leading-[26px] gap-3 flex flex-col max-w-4xl m-10">
            {children}
        </div>
    );
}
