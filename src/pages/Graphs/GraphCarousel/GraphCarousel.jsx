import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const graphParam = searchParams.get('graph');
  
  // Find initial index based on URL param
  const getInitialIndex = () => {
    if (graphParam === 'bitcoin') {
      return GRAPHS.findIndex(g => g.id === 'bitcoin');
    } else if (graphParam === 'usd-eur') {
      return GRAPHS.findIndex(g => g.id === 'usd-eur');
    }
    return 0; // default
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex());
  const [arrowTop, setArrowTop] = useState('50%');
  const [arrowLeft, setArrowLeft] = useState('0px');
  const [arrowRight, setArrowRight] = useState('0px');
  const CurrentGraph = GRAPHS[currentIndex].component;
  const carouselContainerRef = useRef(null);
  const graphContainerRef = useRef(null);
  const chartContainerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Update index when URL param changes
  useEffect(() => {
    if (graphParam === 'bitcoin') {
      const bitcoinIndex = GRAPHS.findIndex(g => g.id === 'bitcoin');
      if (bitcoinIndex !== -1) {
        setCurrentIndex(bitcoinIndex);
      }
    } else if (graphParam === 'usd-eur') {
      const usdEurIndex = GRAPHS.findIndex(g => g.id === 'usd-eur');
      if (usdEurIndex !== -1) {
        setCurrentIndex(usdEurIndex);
      }
    }
  }, [graphParam]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? GRAPHS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === GRAPHS.length - 1 ? 0 : prev + 1));
  };

  // Swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  // Find chart container and update arrow position
  useEffect(() => {
    const updateArrowPosition = () => {
      if (graphContainerRef.current && carouselContainerRef.current) {
        const chartContainer = graphContainerRef.current.querySelector('[class*="rounded-2xl"][class*="border"]');
        if (chartContainer && chartContainer.offsetHeight > 0) {
          chartContainerRef.current = chartContainer;
          // Use requestAnimationFrame to ensure layout is complete
          requestAnimationFrame(() => {
            const chartRect = chartContainer.getBoundingClientRect();
            const carouselRect = carouselContainerRef.current.getBoundingClientRect();
            
            // Only update if we have valid dimensions
            if (chartRect.height > 0 && carouselRect.height > 0) {
              // Calculate vertical center of chart container relative to carousel container
              const relativeTop = chartRect.top - carouselRect.top + chartRect.height / 2;
              const relativeLeft = chartRect.left - carouselRect.left;
              const relativeRight = carouselRect.right - chartRect.right;
              
              setArrowTop(`${relativeTop}px`);
              setArrowLeft(`${relativeLeft}px`);
              setArrowRight(`${relativeRight}px`);
            }
          });
        }
      }
    };

    // Initial update with multiple attempts to catch different render timings
    updateArrowPosition();
    
    // Use requestAnimationFrame for initial positioning
    requestAnimationFrame(() => {
      updateArrowPosition();
    });

    // Update after delays to ensure graph is fully rendered
    const timeout1 = setTimeout(updateArrowPosition, 100);
    const timeout2 = setTimeout(updateArrowPosition, 300);
    const timeout3 = setTimeout(updateArrowPosition, 500);

    // Set up ResizeObserver to watch for chart container size changes
    let resizeObserver = null;
    const setupResizeObserver = () => {
      if (graphContainerRef.current) {
        const chartContainer = graphContainerRef.current.querySelector('[class*="rounded-2xl"][class*="border"]');
        if (chartContainer && window.ResizeObserver && chartContainer.offsetHeight > 0) {
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
          resizeObserver = new ResizeObserver(() => {
            updateArrowPosition();
          });
          resizeObserver.observe(chartContainer);
        }
      }
    };
    
    // Try to set up observer after delays
    setTimeout(setupResizeObserver, 100);
    setTimeout(setupResizeObserver, 300);
    setTimeout(setupResizeObserver, 500);

    // Update on window resize
    window.addEventListener('resize', updateArrowPosition);
    window.addEventListener('scroll', updateArrowPosition, true);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      window.removeEventListener('resize', updateArrowPosition);
      window.removeEventListener('scroll', updateArrowPosition, true);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [currentIndex]);

  return (
    <div ref={carouselContainerRef} className="relative w-full overflow-visible">
      {/* Navigation Arrows */}
      {/* Desktop: Centered vertically on chart, positioned at left/right edges */}
      <button
        onClick={handlePrevious}
        className="hidden lg:block absolute left-4 z-20 p-3 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-200 hover:bg-slate-800/90 active:scale-95 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
        aria-label="Previous graph"
        style={{
          top: arrowTop,
          transform: 'translateY(-50%)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
        className="hidden lg:block absolute right-4 z-20 p-3 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-200 hover:bg-slate-800/90 active:scale-95 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
        aria-label="Next graph"
        style={{
          top: arrowTop,
          transform: 'translateY(-50%)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Mobile/Tablet: Positioned at chart boundary, centered vertically */}
      <button
        onClick={handlePrevious}
        className="lg:hidden absolute z-20 p-1.5 sm:p-2 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-200 hover:bg-slate-800/90 active:scale-95 transition-all shadow-lg backdrop-blur-sm"
        aria-label="Previous graph"
        style={{
          left: arrowLeft,
          top: arrowTop,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5"
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
        className="lg:hidden absolute z-20 p-1.5 sm:p-2 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-200 hover:bg-slate-800/90 active:scale-95 transition-all shadow-lg backdrop-blur-sm"
        aria-label="Next graph"
        style={{
          right: arrowRight,
          top: arrowTop,
          transform: 'translate(50%, -50%)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5"
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

      {/* Current Graph with swipe handlers */}
      <div
        ref={graphContainerRef}
        className="w-full overflow-visible"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <CurrentGraph />
      </div>
    </div>
  );
};

export default GraphCarousel;

