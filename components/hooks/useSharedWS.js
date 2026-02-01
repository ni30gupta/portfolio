"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function useSharedWS(username = "anonymous") {
    console.log('in hook')
    const workerRef = useRef(null);
    const portRef = useRef(null);
    const initRef = useRef(false);
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

    const [ready, setReady] = useState(false);
    const [clients, setClients] = useState(0);
    const [messages, setMessages] = useState([]);

    const canUse = useMemo(() => {
        return typeof window !== "undefined" && "SharedWorker" in window;
    }, []);

    useEffect(() => {
        if (!canUse) return;
        if (initRef.current) {
            console.log(`[${ts()}][Guard] Hook already initialized; skipping duplicate init`);
            return;
        }
        initRef.current = true;

        console.log(`[${ts()}][Step 2] Hook: creating SharedWorker and starting port`, { username });
        const worker = new SharedWorker("/workers/ws-shared-worker.js");
        workerRef.current = worker;

        const port = worker.port;
        portRef.current = port;

        port.start();

        // Inform worker that this client is connected (optional metadata)
        try {
            port.postMessage({ type: "REGISTER", from: username });
            console.log(`[${ts()}][Step 2] Hook: REGISTER sent to worker`, { from: username });
        } catch {}

        port.onmessage = (event) => {
            const data = event.data;
            console.log('data.......... in hook', data)
            if (data?.type === "WELCOME") {
                console.log(`[${ts()}][Step 4] Hook: received WELCOME from worker; connection ready`);
                setReady(true);
            }

            if (data?.type === "CLIENTS") {
                console.log(`[${ts()}][Hook] received CLIENTS count`, data.count);
                setClients(data.count ?? 0);
            }

            if (data?.type === "NEW_MESSAGE" || data?.type === "SERVER_MESSAGE") {
                console.log(`[${ts()}][Hook] received message`, data.message);
                setMessages((prev) => [data.message, ...prev]);
            }
        };

        port.onmessageerror = (e) => {
            console.error(`[${ts()}][Hook] SharedWorker port message error`, e);
        };

        const onUnload = () => {
            try {
                port.postMessage({ type: "DISCONNECT" });
                console.log(`[${ts()}][Hook] DISCONNECT sent to worker`);
            } catch {}
            try {
                port.close();
                console.log(`[${ts()}][Hook] port closed`);
            } catch {}
        };

        window.addEventListener("beforeunload", onUnload);

        return () => {
            // Gracefully disconnect this tab's port and update clients
            window.removeEventListener("beforeunload", onUnload);
            onUnload();
        };
    }, [canUse]);

    const sendMessage = (text) => {
        if (!portRef.current) return;
        console.log(`[${ts()}][Hook] sendMessage posting to worker`, { text, from: username });
        portRef.current.postMessage({
            type: "SEND_MESSAGE",
            text,
            from: username,
        });
    };

    return {
        supported: canUse,
        ready,
        clients,
        messages,
        sendMessage,
    };
}
