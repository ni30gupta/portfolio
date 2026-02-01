"use client";

import React,{ useState } from "react";

function UserCard({ user = {} }) {
  const {
    name = "Unknown",
    role = "Developer",
    avatarUrl = null,
    bio = "",
    location = null,
    stats = {},
  } = user;

  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(stats.followers ?? 0);
console.log('in usercard')
  function toggleFollow() {
    setFollowed((v) => {
      const next = !v;
      setFollowers((f) => (next ? f + 1 : Math.max(0, f - 1)));
      return next;
    });
  }

  // Fallback avatar: initials
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="m-2 flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={`${name} avatar`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-zinc-700 dark:text-zinc-200">
              {initials}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{name}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{role}{location ? ` · ${location}` : ""}</p>
          {bio && <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{bio}</p>}
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={toggleFollow}
            aria-pressed={followed}
            className="inline-flex h-9 items-center rounded-md bg-indigo-600 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {followed ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-zinc-100 pt-3 text-sm dark:border-zinc-800">
        <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">{followers}</span>
          <span className="text-xs">Followers</span>
          <span className="mx-2 h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
          <span className="text-xs">{stats.posts ?? 0} posts</span>
        </div>

        <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
          <a href={user.twitter ?? "#"} target="_blank" rel="noreferrer" className="text-sm hover:underline">
            Twitter
          </a>
          <a href={user.github ?? "#"} target="_blank" rel="noreferrer" className="text-sm hover:underline">
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

export default React.memo(UserCard);