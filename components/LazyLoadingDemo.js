"use client";

import { useState, Suspense, lazy, useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/store";

// Lazy load Redux page component
const ReduxComponent = lazy(() => import("@/app/redux/page"));

// Lazy load menu components with delay simulation

const ContactComponent = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 p-6 dark:from-green-900/30 dark:to-emerald-900/30">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">
              📧 Contact Us
            </h3>
            <p className="mt-2 text-sm text-green-700 dark:text-green-400 mb-4">
              Reach out to us through any of these channels:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-white p-3 dark:bg-zinc-800 shadow-sm">
                <span className="text-xl">📧</span>
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-300">Email</p>
                  <p className="text-xs text-green-600 dark:text-green-400">hello@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white p-3 dark:bg-zinc-800 shadow-sm">
                <span className="text-xl">📱</span>
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-300">Phone</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white p-3 dark:bg-zinc-800 shadow-sm">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-300">Address</p>
                  <p className="text-xs text-green-600 dark:text-green-400">123 Tech Street, Silicon Valley</p>
                </div>
              </div>
            </div>
          </div>
        )
      });
    }, 1200);
  });
});

const AboutComponent = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="rounded-lg bg-gradient-to-br from-orange-100 to-red-100 p-6 dark:from-orange-900/30 dark:to-red-900/30">
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300">
              ℹ️ About Us
            </h3>
            <p className="mt-2 text-sm text-orange-700 dark:text-orange-400 mb-4">
              We're a passionate team dedicated to delivering excellence.
            </p>
            <div className="space-y-2 text-sm text-orange-700 dark:text-orange-400">
              <p>
                <span className="font-semibold">🎯 Mission:</span> To provide innovative solutions that make a difference.
              </p>
              <p>
                <span className="font-semibold">✨ Values:</span> Quality, Integrity, and Customer Satisfaction.
              </p>
              <p>
                <span className="font-semibold">👥 Team:</span> 50+ talented professionals working together since 2020.
              </p>
              <p>
                <span className="font-semibold">🌍 Impact:</span> Serving 10,000+ happy customers worldwide.
              </p>
            </div>
          </div>
        )
      });
    }, 1200);
  });
});

export default function LazyLoadingDemo() {
  const [activeTab, setActiveTab] = useState("contact");

  // High-quality random images using Lorem Picsum (changes with random param)
  const images = [
    { id: 1, url: `https://picsum.photos/600/400?random=${Math.random()}`, alt: "Random landscape" },
    { id: 2, url: `https://picsum.photos/600/400?random=${Math.random()}`, alt: "Random portrait" },
    { id: 3, url: `https://picsum.photos/600/400?random=${Math.random()}`, alt: "Random workspace" },
    { id: 4, url: `https://picsum.photos/600/400?random=${Math.random()}`, alt: "Random design" },
    { id: 5, url: `https://picsum.photos/600/400?random=${Math.random()}`, alt: "Random nature" },
    { id: 6, url: `https://picsum.photos/600/400?random=${Math.random()}`, alt: "Random tech" },
    { id: 7, url: `https://picsum.photos/600/400?random=${Math.random()}`, alt: "Random art" },
    { id: 8, url: `https://picsum.photos/600/400?random=${Math.random()}`, alt: "Random urban" },
  ];

  const menuItems = [
    { id: "contact", label: "📧 Contact Us" },
    { id: "redux", label: "🛒 Shop Now" },
    { id: "about", label: "ℹ️ About Us" },
  ];

  const renderComponent = () => {
    switch (activeTab) {
      case "redux":
        return (
          <Provider store={store}>
            <ReduxComponent />
          </Provider>
        );
      case "contact":
        return <ContactComponent />;
      case "about":
        return <AboutComponent />;
      default:
        return (
          <Provider store={store}>
            <ReduxComponent />
          </Provider>
        );
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Navbar with Lazy-Loaded Components */}
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Interactive Navigation with Lazy Loading
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Click on menu items to lazy load different components. Redux Shop is loaded on-demand!
        </p>

        {/* Navbar Menu */}
        <div className="flex gap-3 mb-6 border-b border-zinc-200 dark:border-zinc-700">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`cursor-pointer px-4 py-3 font-medium transition-colors duration-200 border-b-2 ${
                activeTab === item.id
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Lazy-Loaded Content */}
        <Suspense
          fallback={
            <div className="rounded-lg bg-zinc-100 p-6 dark:bg-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                <p className="text-zinc-700 dark:text-zinc-300">Loading {activeTab}...</p>
              </div>
            </div>
          }
        >
          {renderComponent()}
        </Suspense>
      </div>      
      
      {/* Image Lazy Loading */}
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Image Lazy Loading
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Images load only when they enter the viewport. Scroll to see them load.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 h-96">
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-bold text-2xl">
                Image {image.id}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Images load automatically when they enter the viewport (native browser feature).
        </div>
      </div>

      

      <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
          💡 Benefits:
        </h4>
        <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
          <li>• Reduced initial bundle size (faster first load)</li>
          <li>• Better performance on slow networks</li>
          <li>• Load code only when needed</li>
          <li>• Improved Time to Interactive (TTI)</li>
        </ul>
      </div>
    </div>
  );
}
