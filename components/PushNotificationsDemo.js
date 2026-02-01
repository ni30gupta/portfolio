"use client";

import { useState, useEffect } from "react";

export default function PushNotificationsDemo() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState("default");
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check if Push Notifications are supported
    const supported =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window;
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);
      checkSubscription();
    }
  }, []);

  // Register a simple service worker from /sw.js (placed in public/)
  // This ensures `navigator.serviceWorker.ready` resolves and the SW can
  // handle push events or messages for simulated pushes.
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let registered = false;

    (async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        console.log('[PushDemo] Service worker registered:', reg.scope);
        registered = true;
        // Re-check subscription now that SW is registered
        setTimeout(() => checkSubscription(), 500);
      } catch (err) {
        console.error('[PushDemo] Service worker registration failed:', err);
      }
    })();

    return () => {
      // nothing to cleanup here for now
    };
  }, []);

  const checkSubscription = async () => {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        setSubscription(sub);
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  const requestPermission = async () => {
    try {
      setLoading(true);
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        setMessage("✓ Permission granted!");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("✗ Permission denied");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
      setMessage("✗ Error requesting permission");
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async () => {
    try {
      setLoading(true);
      if (permission !== "granted") {
        setMessage("✗ Please grant permission first");
        setTimeout(() => setMessage(""), 2000);
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      
      // In a real app, you'd use actual VAPID keys
      const mockVAPIDKey =
        "BK0vfGgJ6T5kKj4mZ9xL2P8qN3vW5xR7sT1uV9yZ2aB4cD6eF8gH0iJ2kL4mN6o";

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(mockVAPIDKey),
      });

      setSubscription(sub);
      setIsSubscribed(true);
      setMessage("✓ Subscribed to push notifications!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("✗ Error subscribing to notifications");
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    try {
      setLoading(true);
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
        setIsSubscribed(false);
        setMessage("✓ Unsubscribed from push notifications");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      setMessage("✗ Error unsubscribing");
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const sendTestNotification = async () => {
    try {
      setLoading(true);
      
      // Simulate a local notification
      if (permission === "granted") {
        // Prefer sending via Service Worker if available so it behaves like a real push
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'simulate-push',
            title: 'Test Notification',
            body: 'This is a test push notification!',
            icon: '/icon.svg',
            tag: 'test-notification',
          });
        } else {
          // Fallback: use the SW registration to show a notification
          try {
            const reg = await navigator.serviceWorker.ready;
            await reg.showNotification('Test Notification', {
              body: 'This is a test push notification!',
              icon: '/icon.svg',
              badge: '/icon.svg',
              tag: 'test-notification',
            });
          } catch (swErr) {
            // Final fallback: show a window Notification
            const notification = new Notification('Test Notification', {
              body: 'This is a test push notification!',
              icon: '/icon.svg',
              badge: '/icon.svg',
              tag: 'test-notification',
              requireInteraction: false,
            });
            notification.onclick = () => notification.close();
          }
        }

        const now = new Date().toLocaleTimeString();
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            title: 'Test Notification',
            body: 'This is a test push notification!',
            time: now,
            via: 'simulated',
          },
        ]);
      } else {
        setMessage("✗ Notifications not permitted");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setMessage("✗ Error sending notification");
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
        <main className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl bg-red-50 p-6 dark:bg-red-950">
            <h2 className="text-xl font-bold text-red-900 dark:text-red-100">
              Push Notifications Not Supported
            </h2>
            <p className="mt-2 text-red-800 dark:text-red-200">
              Your browser doesn't support Push Notifications API. Try Chrome, Firefox, Edge, or Safari 16+.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Push Notifications
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Demonstrate the Push API and Notifications API for sending timely updates to users.
        </p>

        {/* Status Section */}
        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Permission Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-zinc-700 dark:text-zinc-300">Permission:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  permission === "granted"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : permission === "denied"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                }`}
              >
                {permission.charAt(0).toUpperCase() + permission.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-700 dark:text-zinc-300">Subscription:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isSubscribed
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                }`}
              >
                {isSubscribed ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </section>

        {/* Actions Section */}
        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Actions
          </h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes("✓")
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={requestPermission}
              disabled={loading || permission === "granted"}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Loading..." : "Request Permission"}
            </button>

            <button
              onClick={isSubscribed ? unsubscribe : subscribe}
              disabled={loading || permission !== "granted"}
              className={`px-4 py-2 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${
                isSubscribed
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading
                ? "Loading..."
                : isSubscribed
                  ? "Unsubscribe"
                  : "Subscribe"}
            </button>

            <button
              onClick={sendTestNotification}
              disabled={loading || permission !== "granted"}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition sm:col-span-2"
            >
              {loading ? "Sending..." : "Send Test Notification"}
            </button>
          </div>
        </section>

        {/* Info Section */}
        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            How It Works
          </h2>
          <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                1. Request Permission
              </p>
              <p>
                Ask the user for permission to send notifications via their browser.
              </p>
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                2. Subscribe to Push
              </p>
              <p>
                Register with a push service using VAPID keys and the Push API.
              </p>
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                3. Send via Service Worker
              </p>
              <p>
                The Service Worker receives push events and displays notifications.
              </p>
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                4. User Interaction
              </p>
              <p>
                Users can click notifications to open your app and perform actions.
              </p>
            </div>
          </div>
        </section>

        {/* Notifications Log */}
        {notifications.length > 0 && (
          <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Notifications Log
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 bg-zinc-100 rounded-lg dark:bg-zinc-800 border-l-4 border-indigo-500"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">
                        {notif.title}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {notif.body}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
                      {notif.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
