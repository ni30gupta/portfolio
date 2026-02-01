"use client";

import Link from "next/link";
import LazyLoadingDemo from "@/components/LazyLoadingDemo";

export default function LazyLoadingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Lazy Loading</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Code splitting and on-demand loading for better performance
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
            <li>React.lazy() for dynamic component imports</li>
            <li>Suspense boundary for loading fallbacks</li>
            <li>Image lazy loading with IntersectionObserver</li>
            <li>Route-based code splitting</li>
            <li>Reduce initial bundle size significantly</li>
          </ul>
        </section>

        {/* Demo Component */}
        <LazyLoadingDemo />
      </main>
    </div>
  );
}
