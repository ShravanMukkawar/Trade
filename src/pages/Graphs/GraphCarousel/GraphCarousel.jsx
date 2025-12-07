import React, { useState } from "react";
import ExchangeRateGraph from "../ExchangeRateGraph";
import BitcoinGraph from "../BitcoinGraph/BitcoinGraph";

const GRAPHS = [
  {
    id: "usd-eur",
    component: ExchangeRateGraph,
    label: "USD → EUR",
  },
  {
    id: "bitcoin",
    component: BitcoinGraph,
    label: "Bitcoin",
  },
];

const GraphCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const CurrentGraph = GRAPHS[currentIndex].component;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? GRAPHS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === GRAPHS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-visible">
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 md:p-3 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-200 hover:bg-slate-800/90 active:scale-95 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
        aria-label="Previous graph"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 md:p-3 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-200 hover:bg-slate-800/90 active:scale-95 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
        aria-label="Next graph"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Graph Indicator Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {GRAPHS.map((graph, index) => (
          <button
            key={graph.id}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-6 sm:w-8 bg-emerald-400"
                : "w-1.5 sm:w-2 bg-slate-600 hover:bg-slate-500"
            }`}
            aria-label={`Go to ${graph.label} graph`}
          />
        ))}
      </div>

      {/* Current Graph */}
      <div className="w-full overflow-visible">
        <CurrentGraph />
      </div>
    </div>
  );
};

export default GraphCarousel;

