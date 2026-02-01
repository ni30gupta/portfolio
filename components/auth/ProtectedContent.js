"use client";

import { useState, useEffect } from "react";

export default function ProtectedContent({ onAuthRequired }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check authentication on mount (simulates route guard behavior)
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");
      
      if (!token || !storedUser) {
        // Not authenticated - redirect to auth
        onAuthRequired();
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        
        // In real app: validate token with backend
        // For demo: just check if token exists
        if (token) {
          setUser(parsedUser);
        } else {
          // Invalid token
          onAuthRequired();
        }
      } catch (e) {
        console.error("Failed to parse user data");
        onAuthRequired();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [onAuthRequired]);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Protected Component
        </h2>
        <div className="rounded-lg bg-zinc-100 p-6 dark:bg-zinc-800 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-zinc-300 rounded w-3/4 mx-auto mb-2 dark:bg-zinc-700"></div>
            <div className="h-4 bg-zinc-300 rounded w-1/2 mx-auto dark:bg-zinc-700"></div>
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Protected Component
        </h2>
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <h3 className="font-semibold text-red-800 dark:text-red-300">
            ⚠️ Access Denied
          </h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Protected Component
      </h2>

      <div className="space-y-4">
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h3 className="font-semibold text-green-800 dark:text-green-300">
            ✓ Access Granted
          </h3>
          <div className="mt-2 space-y-1 text-sm text-green-700 dark:text-green-400">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p className="mt-2"><strong>Token (first 50 chars):</strong></p>
            <p className="font-mono text-xs break-all">{user.token.substring(0, 50)}...</p>
          </div>
        </div>
        
        <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
          <h4 className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">
            🔒 Protected Content
          </h4>
          <p className="text-sm text-indigo-700 dark:text-indigo-400">
            This component checks authentication on mount using useEffect. 
            If no valid token is found, it automatically redirects to the login page.
          </p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-300">
              <span className="text-lg">📊</span>
              <span>View your analytics dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-300">
              <span className="text-lg">⚙️</span>
              <span>Manage your account settings</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-300">
              <span className="text-lg">💬</span>
              <span>Access private messages</span>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
