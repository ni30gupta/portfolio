"use client";

import { useState, useEffect } from "react";
import LoginRegister from "@/components/auth/LoginRegister";
import ProtectedContent from "@/components/auth/ProtectedContent";

export default function AuthenticationDemo() {
  const [currentRoute, setCurrentRoute] = useState("auth"); // "auth" or "protected"
  const [user, setUser] = useState(null);

  // Check authentication on mount for navbar display
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setCurrentRoute("protected"); // Auto-navigate to protected route
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setCurrentRoute("auth");
  };

  // Handle auth required (from protected component)
  const handleAuthRequired = () => {
    setCurrentRoute("auth");
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Personal Navbar - Acts as Route Controller */}
      <nav className="rounded-2xl bg-white shadow-md dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentRoute("auth")}
              className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition ${
                currentRoute === "auth"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentRoute("protected")}
              className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition ${
                currentRoute === "protected"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Protected
            </button>
          </div>
          
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Welcome, <strong className="text-zinc-900 dark:text-zinc-50">{user.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg cursor-pointer bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Route Content - Simulates client-side routing */}
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        {currentRoute === "auth" ? (
          <LoginRegister onAuthSuccess={handleAuthSuccess} />
        ) : (
          <ProtectedContent onAuthRequired={handleAuthRequired} />
        )}
      </div>
    </div>
  );
}
