"use client";

import Link from "next/link";
import Introduction from "@/components/Introduction";
import Experience from "@/components/Experience";

import { skills } from './utils/skills_list'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Introduction Section */}
      <Introduction />

      {/* Skills Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Technical Skills
          </h2>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Click a card to view a short showcase and examples for each skill.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => {
            const href = s.slug ;
            return (
              <Link
                key={s.slug}
                href={href}
                className="group transform rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-2xl dark:bg-zinc-900"
              >
                <div
                  className={`mb-4 h-12 w-12 rounded-xl ${s.color} flex items-center justify-center text-white text-lg font-semibold`}
                >
                  {s.title.split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{s.short}</p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    Frontend
                  </span>
                  <span className="ml-auto text-sm font-medium text-indigo-600 group-hover:underline dark:text-indigo-400">
                    View →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Experience Section */}
      <Experience />
    </div>
  );
}
