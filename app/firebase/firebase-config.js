// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNNxKVkehiMgIcraj_2_yJARvJz8OcF1g",
  authDomain: "portfolio-5fabd.firebaseapp.com",
  projectId: "portfolio-5fabd",
  storageBucket: "portfolio-5fabd.firebasestorage.app",
  messagingSenderId: "404779598232",
  appId: "1:404779598232:web:554bae0f851073ec652bed",
  measurementId: "G-WBXP709EVL"
};

// Initialize Firebase only on the client (browser)
let app = null;
let messaging = null;

if (typeof window !== "undefined") {
  // Safely initialize Firebase in the browser environment
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    // initializeApp may throw if called twice; silently ignore in that case
  }

  try {
    // messaging requires Window / service worker environment
    messaging = getMessaging(app);
  } catch (e) {
    // getMessaging may not be available during SSR or in unsupported browsers
    messaging = null;
  }

  try {
    // analytics is optional and only available in browsers
    getAnalytics(app);
  } catch (e) {
    // ignore analytics errors in non-browser environments
  }
}

export { messaging };