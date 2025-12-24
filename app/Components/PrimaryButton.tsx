import Link from "next/link";

interface ButtonProps {
    href?: string,
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const baseClass = "relative w-[162px] h-[43px] bg-[#fede3e] rounded-[10px] flex items-center justify-center font-space-grotesk font-medium text-[20px] leading-[26px] text-center text-black transition-transform duration-200 ease-in-out";


const PrimaryButton: React.FC<ButtonProps> = ({ href, children, onClick, className, disabled }) => {
    if (href) {
        return (
            <Link
                href={href}
                className={`${baseClass} ${className} 
                    ${disabled ? 'opacity-50 ' : 'cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out'}`}>
                {children}
            </Link>
        );
    }
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClass} ${className} 
                ${disabled ? 'opacity-50 ' : 'cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out'}`}>
            {children}
        </button>
    );
}

export default PrimaryButton;