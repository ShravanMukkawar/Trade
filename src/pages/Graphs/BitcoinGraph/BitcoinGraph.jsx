import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";

const RANGE_OPTIONS = [
  { label: "1D", days: 1 },
  { label: "7D", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
];

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

const BitcoinGraph = () => {
  const [selectedRange, setSelectedRange] = useState(RANGE_OPTIONS[0]); // default 1D
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=${selectedRange.days}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const json = await res.json();
        
        // Transform the data from CoinGecko format [timestamp_ms, price] to our format
        const points = json.prices.map(([timestamp, price]) => ({
          date: selectedRange.days === 1 
            ? formatTime(timestamp) 
            : formatTimestamp(timestamp),
          timestamp: timestamp,
          rate: price,
        }));

        setData(points);
      } catch (e) {
        setError(
          "Unable to load Bitcoin price data right now. Please try again later."
        );
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]);

  const handleDownload = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: "#020617",
        scale: window.devicePixelRatio || 2,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `bitcoin-price-${selectedRange.label.toLowerCase()}.png`;
      link.click();
    } catch (e) {
      console.error("Failed to download chart", e);
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-10 lg:py-16 text-slate-100">
      <header className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide mb-2 text-slate-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
          Bitcoin (BTC) Price
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-700 max-w-2xl">
          Historical Bitcoin price in INR using live data.
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="inline-flex rounded-full bg-slate-900/60 border border-slate-700/70 p-0.5 sm:p-1 w-fit overflow-x-auto">
          {RANGE_OPTIONS.map((range) => {
            const isActive = range.label === selectedRange.label;
            return (
              <button
                key={range.label}
                type="button"
                onClick={() => setSelectedRange(range)}
                className={`px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-400 text-slate-900 shadow-[0_0_20px_rgba(52,211,153,0.6)] font-medium"
                    : "text-slate-300 hover:bg-slate-800/80"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border border-slate-700 bg-slate-900/80 text-xs sm:text-sm text-slate-200 hover:bg-slate-800/90 transition-colors whitespace-nowrap"
        >
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400" />
          <span className="hidden sm:inline">Download chart as PNG</span>
          <span className="sm:hidden">Download</span>
        </button>
      </div>

      {/* Chart container */}
      <div
        ref={chartRef}
        className="relative rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-black/90 p-3 sm:p-4 md:p-6 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
      >
        {loading && (
          <div className="flex items-center justify-center h-64 sm:h-72 md:h-80 lg:h-96 text-slate-300">
            <span className="animate-pulse text-xs sm:text-sm md:text-base px-2 text-center">
              Fetching live Bitcoin price data…
            </span>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center h-64 sm:h-72 md:h-80 lg:h-96 text-center px-4">
            <p className="text-xs sm:text-sm md:text-base text-red-400 mb-2">{error}</p>
            <p className="text-xs sm:text-sm text-slate-500">
              Check your connection or try again in a few minutes.
            </p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="h-64 sm:h-72 md:h-80 lg:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, left: 0, right: 10 }}>
                <CartesianGrid
                  stroke="rgba(148, 163, 184, 0.25)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#1f2937" }}
                  minTickGap={20}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#1f2937" }}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15,23,42,0.98)",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(51,65,85,0.8)",
                    padding: "8px 10px",
                  }}
                  labelStyle={{ color: "#e5e7eb", fontSize: 12 }}
                  itemStyle={{ color: "#a5b4fc", fontSize: 12 }}
                  formatter={(value) => [`₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, "Price"]} // eslint-disable-line
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0, fill: "#22c55e" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
};

export default BitcoinGraph;

