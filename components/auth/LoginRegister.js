"use client";

import { useState } from "react";

export default function LoginRegister({ onAuthSuccess }) {
  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate authentication
    const mockUser = {
      id: 1,
      name: "Demo User",
      email: loginEmail,
      role: "user",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.token"
    };
    
    // Store token (in real app, use httpOnly cookies)
    localStorage.setItem("authToken", mockUser.token);
    localStorage.setItem("user", JSON.stringify(mockUser));
    
    setLoginEmail("");
    setLoginPassword("");
    
    // Notify parent component of successful auth
    onAuthSuccess(mockUser);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Login to Continue
      </h2>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="demo@example.com"
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Login
        </button>
      </form>

      
    </div>
  );
}
