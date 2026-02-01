"use client";

import Link from "next/link";
import VirtualizationDemo from "@/components/VirtualizationDemo";

export default function VirtualizationPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Virtualization</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Efficiently render thousands of items with windowing technique
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
          <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Only render visible items in viewport</li>
            <li>Dramatically improve performance for large lists</li>
            <li>Libraries: react-window, react-virtual, react-virtuoso</li>
            <li>Fixed vs variable height items</li>
            <li>Scroll position management</li>
          </ul>
        </section>

        {/* Demo Component */}
        <VirtualizationDemo />
      </main>
    </div>
  );
}
