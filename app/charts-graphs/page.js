"use client";

import Link from "next/link";
import ChartsDemo from "@/components/ChartsDemo";

export default function ChartsGraphsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Charts & Graphs
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Data visualization using Chart.js with real-time API data
            </p>
          </div>
          <div>
            <Link
              href="/"
              className="text-sm text-zinc-700 hover:underline dark:text-zinc-300"
            >
              ← Back
            </Link>
          </div>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Key Concepts
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Chart.js for responsive, animated charts</li>
            <li>Line charts for trends over time</li>
            <li>Bar charts for comparing categories</li>
            <li>Doughnut/Pie charts for proportional data</li>
            <li>Real-time data fetching from public APIs</li>
            <li>Responsive design that adapts to screen size</li>
          </ul>
        </section>

        <ChartsDemo />

        <section className="rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-md dark:from-cyan-950/30 dark:to-blue-950/30 mt-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            🔧 What This Demo Shows
          </h2>
          <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                1. Chart.js Integration
              </h3>
              <p className="text-sm">
                Uses <code className="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">react-chartjs-2</code> wrapper
                around Chart.js library. Registers necessary components (scales, elements, plugins) for different chart types.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                2. Real API Data
              </h3>
              <p className="text-sm">
                <strong>CoinGecko API:</strong> Fetches Bitcoin price and trading volume data (last 7 days)
                <br />
                <strong>Open-Meteo API:</strong> Fetches weather forecast for Delhi (7-day temperature)
                <br />
                Both are free public APIs with no authentication required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                3. Multiple Chart Types
              </h3>
              <p className="text-sm">
                <strong>Line Chart:</strong> Shows Bitcoin price trends with filled area
                <br />
                <strong>Bar Chart:</strong> Compares daily average temperatures
                <br />
                <strong>Doughnut Chart:</strong> Displays trading volume distribution
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                4. Data Processing
              </h3>
              <p className="text-sm">
                Raw API data is transformed into Chart.js format with labels and datasets.
                Hourly data is aggregated into daily averages for better visualization.
              </p>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-zinc-900/50 rounded-lg">
              <p className="text-sm font-semibold mb-1 text-zinc-900 dark:text-zinc-50">
                🔄 How It Works:
              </p>
              <ol className="text-sm list-decimal list-inside space-y-1">
                <li>Component mounts → useEffect triggers API calls</li>
                <li>Fetch crypto data from CoinGecko + weather from Open-Meteo</li>
                <li>Process raw data into chart-ready format</li>
                <li>Chart.js renders interactive, animated visualizations</li>
                <li>Click "Refresh Data" to fetch latest updates</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
