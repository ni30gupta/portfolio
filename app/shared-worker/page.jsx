"use client";

import { useState } from "react";
import { useSharedWS } from '../../components/hooks/useSharedWS';
import Link from "next/link";

const NAMES = [
    "Arjun", "Krishna", "Radha", "Shiva", "Vishnu", "Lakshmi", "Ganesh", "Durga", "Hanuman", "Rama",
    "Sita", "Bharat", "Laxman", "Kali", "Brahma", "Saraswati", "Indra", "Agni", "Varuna", "Yama"
];

export default function SharedWorkerDemoPage() {
    const [name, setName] = useState(() => {
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
        const randomNum = Math.floor(Math.random() * 99) + 1;
        return `${randomName}_${randomNum}`;
    });
    const [text, setText] = useState("");
    const { supported, ready, clients, messages, sendMessage } = useSharedWS(name);

    const ts = () => {
        const hasPerf = typeof performance !== "undefined" && typeof performance.now === "function" && typeof performance.timeOrigin === "number";
        let t = Date.now(); // ms since epoch
        if (hasPerf) t = performance.timeOrigin + performance.now(); // high-res ms
        const d = new Date(Math.floor(t));
        const m = String(d.getMinutes()).padStart(2, "0");
        const s = String(d.getSeconds()).padStart(2, "0");
        const us = String(Math.floor((t % 1000) * 1000)).padStart(6, "0"); // microseconds within the current second
        return `${m}:${s}:${us}`;
    };
    
    // Lifecycle Step 1: UI mounted and hook invoked
    console.log(`[${ts()}][Step 1] UI page mounted: initializing useSharedWS`, { username: name });

    if (!supported) {
        return (
            <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
                <main className="mx-auto max-w-4xl">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">SharedWorker not supported in this browser</h2>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">Try Chrome or Edge.</p>
                    <Link href="/" className="mt-4 inline-block text-sm text-zinc-700 hover:underline dark:text-zinc-300">
                        ← Back
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
            <main className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Shared Worker</h1>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Background worker shared across multiple browser tabs/windows
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
                        <li>One worker instance shared across multiple tabs/windows</li>
                        <li>Communication via postMessage between pages and worker</li>
                        <li>Perfect for coordinating state/chat across browser contexts</li>
                        <li>Separate from Service Workers (different lifecycle)</li>
                        <li>Browser support: Chrome, Edge (not Safari/Firefox mobile)</li>
                    </ul>
                </section>

                {/* Demo Component */}
                <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 mb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">Multi-tab Sync Demo</h2>

            <div className="mt-6">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Username</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-72 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
            </div>

            <div className="mt-4 text-sm">
                <div className="text-zinc-700 dark:text-zinc-300">
                    <span className="font-semibold">Status:</span>{" "}
                    {ready ? <span className="text-green-600 dark:text-green-400">✅ connected</span> : <span className="text-amber-600 dark:text-amber-400">⏳ connecting...</span>}
                </div>
                <div className="text-zinc-700 dark:text-zinc-300">
                    <span className="font-semibold">Tabs connected:</span> {clients}
                </div>
            </div>

            <div className="mt-6 flex gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && text.trim()) {
                            console.log(`[${ts()}][Action] UI sendMessage via Enter`, { text: text.trim(), from: name });
                            sendMessage(text.trim());
                            setText("");
                        }
                    }}
                />
                <button
                    onClick={() => {
                        if (!text.trim()) return;
                        console.log(`[${ts()}][Action] UI sendMessage via button`, { text: text.trim(), from: name });
                        sendMessage(text.trim());
                        setText("");
                    }}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                    Send
                </button>
            </div>

            <div className="mt-6 h-[420px] overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900/40">
                {messages.length === 0 ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">No messages yet. Open this page in another tab.</p>
                ) : (
                    messages.map((m) => (
                        <div
                            key={m.id}
                            className="mb-2 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                        >
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                <b className="text-zinc-700 dark:text-zinc-200">{m.from}</b> • {m.ts}
                            </div>
                            <div className="mt-1 text-sm">{m.text}</div>
                        </div>
                    ))
                )}
            </div>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                Tip: Same page 2 tabs me open karo. Message ek tab se send karo, dusre me instantly show hoga.
            </p>
                </section>

                <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-md dark:from-blue-950/30 dark:to-cyan-950/30">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">🔧 What This App Does with Shared Workers</h2>
                    <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">1. Single Shared Instance</h3>
                            <p className="text-sm">
                                Creates one shared worker instance (<code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">/public/workers/ws-shared-worker.js</code>) that runs in the background. 
                                All tabs connecting to this page share the SAME worker instance - not separate copies.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">2. Multi-Tab Chat System</h3>
                            <p className="text-sm">
                                Each tab connects to the worker via a <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">MessagePort</code>. The worker maintains a list of all connected ports (tabs). 
                                When one tab sends a message, the worker broadcasts it to ALL connected tabs instantly - simulating a real-time chat/websocket experience.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">3. Client Counting</h3>
                            <p className="text-sm">
                                Tracks how many tabs are connected. When a tab opens, <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">clients++</code>. 
                                When closed (or sends DISCONNECT), <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">clients--</code>. 
                                All tabs see the same client count because the worker broadcasts updates.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">4. Auto Server Pings</h3>
                            <p className="text-sm">
                                The worker runs a <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">setInterval</code> every 5 seconds to broadcast 
                                a "server ping" message to all tabs. This simulates how a real websocket server would send periodic updates.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">5. Custom Hook Integration</h3>
                            <p className="text-sm">
                                The <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">useSharedWS</code> hook manages the worker connection, 
                                message sending/receiving, and state synchronization. It provides a clean React API: 
                                <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">sendMessage()</code>, <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">messages[]</code>, <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">clients</code>.
                            </p>
                        </div>

                        <div className="mt-4 p-3 bg-white dark:bg-zinc-900/50 rounded-lg">
                            <p className="text-sm font-semibold mb-1 text-zinc-900 dark:text-zinc-50">🔁 How It Works:</p>
                            <ol className="text-sm list-decimal list-inside space-y-1">
                                <li>Tab A opens → creates SharedWorker (or connects to existing) → port stored in worker's array</li>
                                <li>Tab B opens → connects to SAME worker instance → another port added to array</li>
                                <li>Tab A sends message → worker receives on port A → broadcasts to ALL ports (A & B)</li>
                                <li>Both tabs see the same message instantly</li>
                                <li>Worker sends auto pings every 5s → all tabs receive simultaneously</li>
                                <li>Tab closes → DISCONNECT message → port removed → client count updated → broadcast to remaining tabs</li>
                            </ol>
                        </div>

                        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
                            <p className="text-sm font-semibold mb-1 text-amber-900 dark:text-amber-300">💡 Try This:</p>
                            <p className="text-sm text-amber-800 dark:text-amber-400">
                                Open this page in 2-3 different tabs. Type a message in one tab and hit send. 
                                Watch it appear INSTANTLY in all other tabs without any server! The shared worker is acting like a local message broker.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
