"use client";

import Link from "next/link";
import PushNotificationsDemo from "@/components/PushNotificationsDemo";
import ServiceWorkerBasic from "@/components/ServiceWorkerBasic";

export default function ServiceWorkerPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Service Worker</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Service Workers power offline experiences, caching strategies and background sync for PWAs.
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
            <li>Intercept network requests and serve cached responses</li>
            <li>Background sync and periodic tasks</li>
            <li>Push messages and notification handling</li>
            <li>Lifecycle: install → activate → fetch</li>
            <li>Use Workbox for common production patterns</li>
          </ul>
        </section>

        {/* Demo Component (Push notifications demo lives here) */}
        {/* <PushNotificationsDemo /> */}
        <ServiceWorkerBasic/>

        <section className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-md dark:from-indigo-950/30 dark:to-purple-950/30 mt-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">🔧 What This App Does with Service Workers</h2>
          <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">1. Registration & Lifecycle</h3>
              <p className="text-sm">
                The service worker (<code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">/public/sw.js</code>) is registered when you visit the demo page. 
                It immediately claims all clients using <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">skipWaiting()</code> and <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">clients.claim()</code> during install/activate phases.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">2. Push Notification Handling</h3>
              <p className="text-sm">
                Listens for <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">push</code> events from Firebase Cloud Messaging. When a push arrives, 
                it parses the data payload and displays a notification with custom title, body, icon, and badge.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">3. Local Push Simulation</h3>
              <p className="text-sm">
                For demo purposes, it also responds to <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">message</code> events from the page. 
                When you click "Send Test Notification", the page sends a message to the service worker which then shows a notification locally.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">4. Notification Clicks</h3>
              <p className="text-sm">
                Handles <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">notificationclick</code> events. When you click a notification, it closes it and either focuses an existing tab with the target URL or opens a new window.
              </p>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-zinc-900/50 rounded-lg">
              <p className="text-sm font-semibold mb-1 text-zinc-900 dark:text-zinc-50">🔁 How It Works:</p>
              <ol className="text-sm list-decimal list-inside space-y-1">
                <li>Page registers service worker at <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">/sw.js</code></li>
                <li>Service worker installs & activates in background</li>
                <li>Page sends message or FCM sends push to service worker</li>
                <li>Service worker displays notification using Notification API</li>
                <li>User clicks notification → service worker handles click → opens/focuses window</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
