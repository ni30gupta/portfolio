"use client";

import Link from "next/link";
import DebouncingDemo from "@/components/DebouncingDemo";

export default function DebouncingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Debounce & Throttle
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Optimize performance by controlling function execution rate
            </p>
          </div>
          <div>
            <Link href="/" className="text-sm text-zinc-700 hover:underline dark:text-zinc-300">
              ← Back
            </Link>
          </div>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Key Concepts</h2>
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Debounce</h3>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                Delays function execution until after user stops typing/acting for specified time.
                Perfect for search inputs, form validation.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Throttle</h3>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                Ensures function executes at most once per specified time period.
                Great for scroll events, window resize, button clicks.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Component */}
        <DebouncingDemo />
      </main>
    </div>
  );
}
