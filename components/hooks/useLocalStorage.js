"use client";

import { useState, useEffect } from "react";

/**
 * useLocalStorage hook
 * - key: localStorage key
 * - initialValue: default value (will be used if no value found)
 *
 * Returns: [value, setValue]
 * setValue accepts either a value or an updater function (like setState)
 */
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
      return raw ? JSON.parse(raw) : initialValue;
    } catch (e) {
      console.warn("useLocalStorage: failed to read", e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (state === undefined) return;
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn("useLocalStorage: failed to write", e);
    }
  }, [key, state]);

  const setValue = (val) => {
    setState((prev) => (typeof val === "function" ? val(prev) : val));
  };

  return [state, setValue];
}
