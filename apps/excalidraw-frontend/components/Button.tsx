import { MouseEventHandler } from "react";

export default function Button({
  children,
  onClick,
  disabled,
  className = ""
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-blue-400 px-16 py-4 rounded-2xl hover:bg-blue-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {children}
      </button>
    </div>
  );
}