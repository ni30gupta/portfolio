"use client";

import Link from "next/link";
import InfiniteScrollDemo from "@/components/InfiniteScrollDemo";

export default function InfiniteScrollPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Infinite Scroll</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Load more content automatically as user scrolls
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
            <li>IntersectionObserver API for scroll detection</li>
            <li>Load data when user reaches bottom</li>
            <li>Pagination without page numbers</li>
            <li>Better UX than "Load More" button</li>
            <li>Used by Twitter, Instagram, Pinterest</li>
          </ul>
        </section>

        {/* Demo Component */}
        <InfiniteScrollDemo />
      </main>
    </div>
  );
}
