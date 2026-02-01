"use client";

import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../app/firebase/firebase-config";

const VAPID_KEY = "BByq5SKtcOOuiVBcFUwWELhW83ugylmtXIdU4NL5GpEoWSX8wUiljNUo3PaLDpVseXDWT0lwvK14xqOYH1zoP60";

export default function ServiceWorkerBasic() {
  const [token, setToken] = useState("");
  const [serverTitle, setServerTitle] = useState("Test from server");
  const [serverBody, setServerBody] = useState("Hello from server-side send-push API");
  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    const initFCM = async () => {
      try {
        // 1) register service worker
        // Try to register a Firebase-compatible service worker first if present,
        // otherwise fall back to the demo /sw.js. Keep failures silent to avoid
        // noisy logs in production while preserving stability.
        let registration = null;
        try {
          registration = await navigator.serviceWorker.register("/firebase-sw.js");
        } catch (e) {
          try {
            registration = await navigator.serviceWorker.register("/sw.js");
          } catch (e2) {
            // registration failed for both workers — bail out silently
            return;
          }
        }

        if (!messaging) {
          // messaging unavailable (SSR or unsupported environment) — do nothing
          return;
        }

        // 2) ask permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("Notification permission denied");
          return;
        }

        // 3) get token
        const t = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (t) {
          console.log("FCM Token:", t);
          setToken(t);
        } else {
          console.log("No token received");
        }
      } catch (err) {
        console.error("FCM error:", err);
      }
    };

    if ("serviceWorker" in navigator) initFCM();

    // foreground messages (only if messaging is available)
    if (messaging) {
      try {
        onMessage(messaging, (payload) => {
          console.log("Foreground message:", payload);

          const title = payload?.notification?.title || "Notification";
          const body = payload?.notification?.body || "";

          new Notification(title, { body });
        });
      } catch (e) {
        console.warn("onMessage registration failed:", e);
      }
    }
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-white shadow-sm dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">React FCM Setup</h2>

      <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300"><b>Token:</b></p>
      <textarea
        value={token}
        readOnly
        rows={6}
        className="w-full mt-2 p-3 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
      />

      <div className="mt-4">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Server notification title</label>
        <input
          value={serverTitle}
          onChange={(e) => setServerTitle(e.target.value)}
          className="w-70 p-2 rounded-md border border-zinc-200 bg-white text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
        />

        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 mt-3">Server notification body</label>
        <input
          value={serverBody}
          onChange={(e) => setServerBody(e.target.value)}
          className="w-full p-2 rounded-md border border-zinc-200 bg-white text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
        />

        <button
          onClick={async () => {
            if (!token) {
              setServerResponse({ ok: false, error: "No FCM token available" });
              return;
            }

            setServerResponse({ pending: true });
            try {
              const res = await fetch('/api/send-push', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, title: serverTitle, body: serverBody }),
              });
              const data = await res.json();
              setServerResponse(data);
            } catch (err) {
              setServerResponse({ ok: false, error: err.message });
            }
          }}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Send via server (/api/send-push)
        </button>

        {serverResponse && (
          <div className="mt-4 p-3 rounded-md bg-zinc-50 border border-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
            <pre className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200 m-0">{JSON.stringify(serverResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
