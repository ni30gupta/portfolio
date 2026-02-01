"use client";

import Link from "next/link";
import { useState } from "react";
import AuthenticationDemo from "@/components/AuthenticationDemo";

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Authentication</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Login flows with JWT tokens and protected routes
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
            <li>JWT (JSON Web Tokens) for stateless authentication</li>
            <li>Protected routes - redirect if not authenticated</li>
            <li>Token storage (localStorage, cookies, httpOnly)</li>
            <li>Refresh tokens for extended sessions</li>
            <li>Role-based access control (RBAC)</li>
          </ul>
        </section>

        {/* Demo Component */}
        <AuthenticationDemo />

        <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md dark:from-blue-950/30 dark:to-indigo-950/30 mt-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            🔧 What This Demo Does
          </h2>
          <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                1. Simulated Authentication Flow
              </h3>
              <p className="text-sm">
                Implements a complete login/register system with client-side validation. 
                Uses localStorage to persist JWT tokens and user data (in production, use httpOnly cookies for security).
                Demonstrates password hashing concepts and form validation patterns.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                2. Protected Route Pattern
              </h3>
              <p className="text-sm">
                Shows how to protect content behind authentication. The "Protected" route checks for a valid token 
                before displaying content. If no token exists, it automatically redirects to the login page - 
                simulating Next.js middleware or route guards in production apps.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                3. Token Management
              </h3>
              <p className="text-sm">
                Demonstrates JWT token lifecycle: generation on login, storage in localStorage, 
                validation before accessing protected routes, and removal on logout. In production, 
                tokens would be validated server-side with a secret key.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                4. Client-Side Routing Simulation
              </h3>
              <p className="text-sm">
                Uses React state to simulate route changes between Login and Protected pages. 
                Shows how authentication state affects navigation - users can't manually navigate 
                to protected content without logging in first.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                5. User Session Persistence
              </h3>
              <p className="text-sm">
                Maintains user session across page refreshes by checking localStorage on component mount. 
                Automatically restores the logged-in state if a valid token exists, providing a seamless user experience.
              </p>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-zinc-900/50 rounded-lg">
              <p className="text-sm font-semibold mb-1 text-zinc-900 dark:text-zinc-50">
                🔄 How It Works:
              </p>
              <ol className="text-sm list-decimal list-inside space-y-1">
                <li>User enters credentials → Client validates format</li>
                <li>On submit → Generates fake JWT token + stores in localStorage</li>
                <li>User navigates to Protected route → Checks for token</li>
                <li>If token exists → Shows protected content</li>
                <li>If no token → Redirects to Login page</li>
                <li>Logout → Clears localStorage + resets state</li>
              </ol>
            </div>

            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
              <p className="text-sm font-semibold mb-1 text-amber-900 dark:text-amber-300">
                ⚠️ Production Notes:
              </p>
              <ul className="text-sm text-amber-800 dark:text-amber-400 space-y-1">
                <li>• Use httpOnly cookies instead of localStorage for security</li>
                <li>• Implement server-side token validation with secret keys</li>
                <li>• Add refresh token rotation for extended sessions</li>
                <li>• Use HTTPS only - never send tokens over HTTP</li>
                <li>• Implement CSRF protection for state-changing operations</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
