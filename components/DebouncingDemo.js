"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom throttle hook
function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    const now = Date.now();
    
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
}

export default function DebouncingDemo() {
  // Debounce demo state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [apiCallCount, setApiCallCount] = useState(0);
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Throttle demo state
  const [scrollCount, setScrollCount] = useState(0);
  const [throttledScrollCount, setThrottledScrollCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [throttledClickCount, setThrottledClickCount] = useState(0);

  // Search results
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Mock data
  const mockData = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "Java", "C++", "Ruby", "PHP",
    "Go", "Rust", "Swift", "Kotlin", "Dart"
  ];

  // Debounced search effect
  useEffect(() => {
    if (debouncedSearch) {
      setSearching(true);
      setApiCallCount(prev => prev + 1);
      
      // Simulate API call
      setTimeout(() => {
        const results = mockData.filter(item =>
          item.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        setSearchResults(results);
        setSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearch]);

  // Throttled scroll handler
  const handleThrottledScroll = useThrottle(() => {
    setThrottledScrollCount(prev => prev + 1);
  }, 1000);

  const handleScroll = () => {
    setScrollCount(prev => prev + 1);
    handleThrottledScroll();
  };

  // Throttled click handler
  const handleThrottledClick = useThrottle(() => {
    setThrottledClickCount(prev => prev + 1);
  }, 1000);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    handleThrottledClick();
  };

  const resetDemos = () => {
    setSearchTerm("");
    setSearchCount(0);
    setApiCallCount(0);
    setSearchResults([]);
    setScrollCount(0);
    setThrottledScrollCount(0);
    setClickCount(0);
    setThrottledClickCount(0);
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Debounce Demo */}
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          1. Debounce Demo - Search Input
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Type to search. API calls happen only after you stop typing for 500ms.
        </p>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearchCount(prev => prev + 1);
              }}
              placeholder="Search programming languages..."
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <div className="font-medium text-blue-900 dark:text-blue-300">
                Keystrokes
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {searchCount}
              </div>
            </div>
            <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <div className="font-medium text-green-900 dark:text-green-300">
                API Calls
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {apiCallCount}
              </div>
            </div>
            <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
              <div className="font-medium text-purple-900 dark:text-purple-300">
                Saved Calls
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {searchCount - apiCallCount}
              </div>
            </div>
          </div>

          {searching && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
              Searching...
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Results ({searchResults.length}):
              </div>
              <div className="flex flex-wrap gap-2">
                {searchResults.map((result) => (
                  <span
                    key={result}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          2. Throttle Demo - Button Clicks
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Click rapidly. Throttled handler executes max once per second.
        </p>

        <button
          onClick={handleClick}
          className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Click Me Rapidly!
        </button>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <div className="font-medium text-blue-900 dark:text-blue-300">
              Total Clicks
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {clickCount}
            </div>
          </div>
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div className="font-medium text-green-900 dark:text-green-300">
              Throttled Executions
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {throttledClickCount}
            </div>
          </div>
        </div>
      </div>

      {/* Throttle Demo - Scroll */}
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          3. Throttle Demo - Scroll Events
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Scroll in the box below. Throttled handler executes max once per second.
        </p>

        <div
          onScroll={handleScroll}
          className="h-64 overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
        >
          <div className="space-y-4">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-3 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                Scroll item #{i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
            <div className="font-medium text-red-900 dark:text-red-300">
              Total Scroll Events
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {scrollCount}
            </div>
          </div>
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div className="font-medium text-green-900 dark:text-green-300">
              Throttled Executions
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {throttledScrollCount}
            </div>
          </div>
        </div>
      </div>

      {/* Throttle Demo - Clicks */}
      

      {/* Reset Button */}
      <div className="flex justify-center">
        <button
          onClick={resetDemos}
          className="rounded-lg bg-zinc-600 px-6 py-2 font-medium text-white hover:bg-zinc-700"
        >
          Reset All Demos
        </button>
      </div>

      {/* Code Example */}
      {/* <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Code Examples
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-green-400">
{`// Debounce Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Throttle Hook
function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
}

// Usage
const debouncedSearch = useDebounce(searchTerm, 500);
const throttledScroll = useThrottle(handleScroll, 1000);`}
        </pre>
      </div> */}

      <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
          💡 When to use:
        </h4>
        <div className="grid grid-cols-2 gap-4 text-xs text-zinc-700 dark:text-zinc-300">
          <div>
            <strong className="text-zinc-900 dark:text-zinc-50">Debounce:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Search autocomplete</li>
              <li>• Form validation</li>
              <li>• Resize end detection</li>
              <li>• Save draft functionality</li>
            </ul>
          </div>
          <div>
            <strong className="text-zinc-900 dark:text-zinc-50">Throttle:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Scroll events</li>
              <li>• Window resize</li>
              <li>• Mouse move tracking</li>
              <li>• Button spam prevention</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
