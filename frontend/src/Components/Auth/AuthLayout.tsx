import type { ReactNode } from "react";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#0f172a] px-6 transition-all">

      {/* Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 dark:text-white"
      >
        {darkMode ? "Light" : "Dark"}
      </button>

      <div className="w-full max-w-md bg-white dark:bg-[#1e293b] dark:text-white rounded-2xl shadow-lg p-8 transition-all">
        {children}
      </div>
    </div>
  );
}