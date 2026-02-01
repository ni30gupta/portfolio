"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/**
 * INFINITE SCROLL using IntersectionObserver
 * ===========================================
 * Simple approach: Watch last item, fetch when visible
 */

function useInfiniteScroll(callback) {
  const observer = useRef();
  
  return useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback(); // Load more when last item visible
      }
    });
    
    if (node) observer.current.observe(node);
  }, [callback]);
}

export default function InfiniteScrollDemo() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const ITEMS_PER_PAGE = 10;
  const MAX_ITEMS = 50;

  // Fetch next batch of items
  const fetchItems = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // API delay
    
    const startIndex = items.length; // Use items count instead of page
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
      id: startIndex + i + 1,
      title: `Item #${startIndex + i + 1}`,
      description: `This is item ${startIndex + i + 1}`,
      timestamp: new Date().toISOString(),
    }));
    
    setItems(prev => [...prev, ...newItems]);
    setLoading(false);
    
    // Check if we've reached max items
    if (startIndex + ITEMS_PER_PAGE >= MAX_ITEMS) {
      setHasMore(false);
    }
  }, [items.length, loading, hasMore]);

  // Initial load
  useEffect(() => {
    fetchItems();
  }, []);

  const lastItemRef = useInfiniteScroll(fetchItems);

  const handleReset = () => {
    setItems([]);
    setHasMore(true);
    setLoading(false);
    fetchItems()
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Header with Stats */}
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 sticky top-15">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Infinite Scroll Demo
          </h2>
          <button
            onClick={handleReset}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Reset
          </button>
        </div>
        
        <div className="flex gap-4 text-sm ">
          <div className="px-3 py-2 rounded bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
            Items: <span className="font-bold text-zinc-900 dark:text-zinc-50">{items.length}</span>
          </div>
          <div className={`px-3 py-2 rounded ${hasMore ? 'bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-500 text-zinc-900 dark:bg-red-800 dark:text-zinc-50'}`}>
            {hasMore ? '✅ More items' : '✅ All loaded'}
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Items Feed
        </h3>
        
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={items.length === index + 1 ? lastItemRef : null}
              className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:border-indigo-400"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="ml-4 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                  {item.id}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">Loading...</p>
          </div>
        )}

        {/* End Message */}
        {!hasMore && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded text-center">
            <p className="text-green-900 dark:text-green-300 font-medium">
              ✅ All {MAX_ITEMS} items loaded!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
