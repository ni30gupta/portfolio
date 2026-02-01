"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider"; // ← Import our custom hook
import { MoonIcon, SunIcon } from "@/assets/icon";


export default function Navbar() {
  // ← Use context instead of local state (cleaner, shared across app)
  const { isDark, toggleTheme } = useTheme();

  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-sm dark:bg-zinc-900/60 border-b border-zinc-100 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          Portfolio
        </Link>

        {/* <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50">Home</Link>
          <Link href="/" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50">Skills</Link>
          <Link href="/context" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50">Context API</Link>
        </div> */}

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent bg-zinc-100 text-zinc-700 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              {isDark ? <SunIcon className="text-yellow-300" /> : <MoonIcon className="text-indigo-600" />}
            </button>
            <div className="absolute right-0 mt-2 px-3 py-2 bg-zinc-900 dark:bg-zinc-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 pointer-events-none z-10">
              Click to change global theme through Context-API
              <div className="absolute -top-1 right-4 w-2 h-2 bg-zinc-900 dark:bg-zinc-700 rotate-45"></div>
            </div>
          </div>

          <div className="md:hidden">
            <button aria-label="Open menu" className="text-zinc-700 dark:text-zinc-300">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
