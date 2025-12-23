import { useEffect, useState } from "react";

interface StatusTextProps {
    children: React.ReactNode;
    duration?: number;
    onClose?: () => void;
}

export default function StatusText({ children, duration = 3000, onClose }: StatusTextProps) {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, duration - 500);

        const removeTimer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className={`flex flex-col justify-center items-start bg-green-900 rounded-md p-2
                transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
            <h2 className="text-2xl">{children}</h2>
        </div>
    );
}
