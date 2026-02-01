/* global importScripts */
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDNNxKVkehiMgIcraj_2_yJARvJz8OcF1g",
    authDomain: "portfolio-5fabd.firebaseapp.com",
    projectId: "portfolio-5fabd",
    storageBucket: "portfolio-5fabd.firebasestorage.app",
    messagingSenderId: "404779598232",
    appId: "1:404779598232:web:554bae0f851073ec652bed",
    measurementId: "G-WBXP709EVL"
});

const messaging = firebase.messaging(); 

// Ensure the service worker takes control as soon as possible
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Firebase compat background messaging handler (keeps original behaviour)
messaging.onBackgroundMessage(function (payload) {
    // Note: keep logging minimal in production
    const title = payload?.notification?.title || "Notification";
    const options = {
        body: payload?.notification?.body || "",
        data: payload?.data || {},
    };

    self.registration.showNotification(title, options);
});

// Also listen for generic 'push' events so DevTools "Push" simulation works
self.addEventListener('push', (event) => {
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = { title: 'Notification', body: event.data?.text() || '' };
    }

    const title = data.title || 'Push Notification';
    const options = {
        body: data.body || '',
        data: data,
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = (event.notification.data && event.notification.data.url) || '/';

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
            const hadWindowToFocus = clientsArr.some((windowClient) => {
                if (windowClient.url === urlToOpen) {
                    windowClient.focus();
                    return true;
                }
                return false;
            });

            if (!hadWindowToFocus) {
                return self.clients.openWindow(urlToOpen);
            }
        })
    );
});
