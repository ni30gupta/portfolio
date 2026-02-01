"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PushNotificationsPage() {
  const router = useRouter();

  useEffect(() => {
    // Replace this route with the Service Worker page where push demo now lives
    router.replace("/service-worker");
  }, [router]);

  // Fallback content while redirecting (or when JS is disabled)
  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Push Notifications</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          This demo has moved under the Service Worker skill. If you are not redirected,
          <Link href="/service-worker" className="text-indigo-600 hover:underline ml-1">click here</Link>.
        </p>
      </main>
    </div>
  );
}
