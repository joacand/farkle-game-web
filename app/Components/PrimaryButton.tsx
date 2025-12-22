interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, className, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`relative w-[162px] h-[43px] bg-[#fede3e] rounded-[10px] flex items-center justify-center cursor-pointer ${className}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-transform duration-200 ease-in-out'}
            font-space-grotesk font-medium text-[20px] leading-[26px] text-center text-black`}>
        {children}
    </button>
);

export default PrimaryButton;