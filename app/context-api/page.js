"use client";

import { MoonIcon, SunIcon } from "@/assets/icon";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

export default function ContextPage() {
    const { isDark, toggleTheme } = useTheme();


  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Context API</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Built-in React state sharing without prop drilling
            </p>
          </div>
          <div>
            <Link href="/" className="text-sm text-zinc-700 hover:underline dark:text-zinc-300">
              ← Back
            </Link>
          </div>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Key Concepts</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>createContext() to define a context</li>
            <li>Context.Provider wraps components to share state</li>
            <li>useContext() hook to consume context values</li>
            <li>Best for theme, auth, and low-frequency updates</li>
            <li>Avoid performance issues by splitting contexts</li>
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 text-center">
          <div className="flex items-center justify-center gap-3">
            <p className="m-0 text-zinc-700 dark:text-zinc-300">Click the icon to change the global theme:
              <br/> <span> (The same behaviour can be achieve by clicking in navbar )</span>
            </p>

            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent bg-zinc-100 text-zinc-700 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              {isDark ? <SunIcon className="text-yellow-300" /> : <MoonIcon className="text-indigo-600" />}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
