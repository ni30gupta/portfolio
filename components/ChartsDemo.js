"use client";

import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartsDemo() {
  const [activeTab, setActiveTab] = useState("crypto");
  const [cryptoUrl, setCryptoUrl] = useState(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
  );
  const [weatherUrl, setWeatherUrl] = useState(
    "https://api.open-meteo.com/v1/forecast?latitude=28.7041&longitude=77.1025&hourly=temperature_2m&timezone=Asia/Kolkata&forecast_days=7"
  );

  // Use the existing useFetch hook
  const { data: cryptoData, loading: cryptoLoading, error: cryptoError } = useFetch({ url: cryptoUrl });
  const { data: weatherData, loading: weatherLoading, error: weatherError } = useFetch({ url: weatherUrl });

  const loading = cryptoLoading || weatherLoading;

  const handleRefresh = () => {
    // Force refetch by updating URLs with timestamp
    setCryptoUrl(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&t=${Date.now()}`
    );
    setWeatherUrl(
      `https://api.open-meteo.com/v1/forecast?latitude=28.7041&longitude=77.1025&hourly=temperature_2m&timezone=Asia/Kolkata&forecast_days=7&t=${Date.now()}`
    );
  };

  // Process Bitcoin price data for Line Chart
  const getBitcoinLineData = () => {
    if (!cryptoData) return null;

    const prices = cryptoData.prices.slice(-168); // Last 7 days (hourly)
    const labels = prices.map((p) => {
      const date = new Date(p[0]);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    return {
      labels: labels.filter((_, i) => i % 24 === 0), // Show daily labels
      datasets: [
        {
          label: "Bitcoin (BTC) Market Price in United States Dollars - 7 Day Trend",
          data: prices.filter((_, i) => i % 24 === 0).map((p) => p[1]),
          borderColor: "rgb(249, 115, 22)",
          backgroundColor: "rgba(249, 115, 22, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  // Process weather data for Bar Chart
  const getWeatherBarData = () => {
    if (!weatherData) return null;

    const temps = weatherData.hourly.temperature_2m.slice(0, 168); // 7 days
    const dailyAvg = [];
    const labels = [];

    for (let i = 0; i < 7; i++) {
      const dayTemps = temps.slice(i * 24, (i + 1) * 24);
      const avg = dayTemps.reduce((a, b) => a + b, 0) / dayTemps.length;
      dailyAvg.push(avg.toFixed(1));
      
      const date = new Date();
      date.setDate(date.getDate() + i);
      labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
    }

    return {
      labels,
      datasets: [
        {
          label: "Average Daily Temperature in Celsius (°C) - Delhi, India",
          data: dailyAvg,
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(249, 115, 22, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(168, 85, 247, 0.8)",
            "rgba(236, 72, 153, 0.8)",
            "rgba(14, 165, 233, 0.8)",
          ],
          borderRadius: 6,
        },
      ],
    };
  };

  // Process Bitcoin volume data for Doughnut Chart
  const getBitcoinDoughnutData = () => {
    if (!cryptoData) return null;

    // CoinGecko returns hourly data for 7 days (168 data points)
    // Sample every 24 hours to get 7 distinct days
    const allVolumes = cryptoData.total_volumes;
    const volumes = [];
    for (let i = 0; i < 7; i++) {
      const index = allVolumes.length - 1 - (i * 24); // Sample every 24 hours backwards
      if (index >= 0) {
        volumes.unshift(allVolumes[index]); // Add to beginning to maintain chronological order
      }
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const labels = volumes.map((v) => {
      const date = new Date(v[0]);
      const volumeInBillions = (v[1] / 1e9).toFixed(2);
      return `${dayNames[date.getDay()]} ${monthNames[date.getMonth()]} ${date.getDate()} - $${volumeInBillions}B`;
    });

    return {
      labels,
      datasets: [
        {
          label: "24-Hour Trading Volume in Billions of USD (Aggregated from all exchanges)",
          data: volumes.map((v) => (v[1] / 1e9).toFixed(2)), // Convert to billions
          backgroundColor: [
            "rgba(239, 68, 68, 0.8)",
            "rgba(249, 115, 22, 0.8)",
            "rgba(234, 179, 8, 0.8)",
            "rgba(34, 197, 94, 0.8)",
            "rgba(59, 130, 246, 0.8)",
            "rgba(168, 85, 247, 0.8)",
            "rgba(236, 72, 153, 0.8)",
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(113, 113, 122)",
          font: { size: 12 },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date (Month/Day)",
          color: "rgb(113, 113, 122)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: { color: "rgb(113, 113, 122)" },
        grid: { color: "rgba(113, 113, 122, 0.1)" },
      },
      y: {
        title: {
          display: true,
          text: "Value",
          color: "rgb(113, 113, 122)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: { color: "rgb(113, 113, 122)" },
        grid: { color: "rgba(113, 113, 122, 0.1)" },
      },
    },
  };

  const weatherChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(113, 113, 122)",
          font: { size: 12 },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date (Month/Day)",
          color: "rgb(113, 113, 122)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: { color: "rgb(113, 113, 122)" },
        grid: { color: "rgba(113, 113, 122, 0.1)" },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
          color: "rgb(113, 113, 122)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: { color: "rgb(113, 113, 122)" },
        grid: { color: "rgba(113, 113, 122, 0.1)" },
      },
    },
  };

  const priceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(113, 113, 122)",
          font: { size: 12 },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date (Month/Day)",
          color: "rgb(113, 113, 122)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: { color: "rgb(113, 113, 122)" },
        grid: { color: "rgba(113, 113, 122, 0.1)" },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
          color: "rgb(113, 113, 122)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: { 
          color: "rgb(113, 113, 122)",
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        },
        grid: { color: "rgba(113, 113, 122, 0.1)" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "rgb(113, 113, 122)",
          font: { size: 12 },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="mt-6 rounded-2xl bg-white p-12 shadow-md dark:bg-zinc-900 text-center">
        <div className="inline-block animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading data from APIs...</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Live Data Visualization
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Real-time data from CoinGecko & Open-Meteo APIs
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("crypto")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "crypto"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            Cryptocurrency
          </button>
          <button
            onClick={() => setActiveTab("weather")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "weather"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            Weather
          </button>
        </div>
      </div>

      {/* Crypto Charts */}
      {activeTab === "crypto" && (
        <>
          {/* Line Chart - Bitcoin Price */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              📈 Bitcoin (BTC) Price Trend Analysis
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Real-time cryptocurrency market data showing Bitcoin price movements over the past 7 days in USD
            </p>
            <div className="h-80">
              {getBitcoinLineData() && (
                <Line data={getBitcoinLineData()} options={priceChartOptions} />
              )}
            </div>
          </div>

          {/* Doughnut Chart - Trading Volume */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              🍩 Bitcoin Trading Volume Distribution Analysis
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Daily trading volume breakdown in billions of USD - Aggregated data from all major cryptocurrency exchanges worldwide
            </p>
            <div className="h-80">
              {getBitcoinDoughnutData() && (
                <Doughnut data={getBitcoinDoughnutData()} options={doughnutOptions} />
              )}
            </div>
          </div>
        </>
      )}

      {/* Weather Chart */}
      {activeTab === "weather" && (
        <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            🌡️ Delhi Weather Forecast - Temperature Analysis
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            7-day weather forecast showing average daily temperature in Celsius (°C) for Delhi, India - Data from Open-Meteo API
          </p>
          <div className="h-80">
            {getWeatherBarData() && (
              <Bar data={getWeatherBarData()} options={weatherChartOptions} />
            )}
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Chart Library</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">Chart.js</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Data Sources</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">Public APIs</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Chart Types</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">3 Types</p>
        </div>
      </div>
    </div>
  );
}
