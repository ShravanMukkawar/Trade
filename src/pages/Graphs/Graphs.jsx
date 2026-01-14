import React, { useRef, useEffect } from "react";
import GraphCarousel from "./GraphCarousel/GraphCarousel";
import TradingNews from "./TradingNews";
import { useScrollFloat } from "../Subscription Plans/hooks/useScrollFloat";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../../components/SEO";

const Graphs = () => {
  const graphsTitleRef = useRef(null);
  const graphsSubtitleRef = useRef(null);

  useScrollFloat(graphsTitleRef);
  useScrollFloat(graphsSubtitleRef);

  // Refresh ScrollTrigger after component mounts to ensure animations work
  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, 500);

    return () => clearTimeout(refreshTimeout);
  }, []);

  return (
    <>
      <SEO 
        description="Investment trading analytics - Track real-time Bitcoin (BTC USD) and USD EUR forex charts with professional investment trading analysis. View live market data, price trends, and currency pair trading insights from Investment Banking House."
        keywords="investment trading, investment banking, btc usd price chart, usd eur forex chart, forex currency pairs trading, market analysis, professional trading analysis, live trading charts, investment trading analytics"
        ogDescription="Investment trading analytics - Track real-time Bitcoin and USD EUR forex charts with professional investment trading analysis and live market data."
        canonical="https://www.ibhalgo.com/graphs"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.ibhalgo.com/graphs#webpage",
          "url": "https://www.ibhalgo.com/graphs",
          "name": "Investment Trading Analytics - Live Market Charts | Investment Banking House",
          "description": "Investment trading analytics - Track real-time Bitcoin and USD EUR forex charts with professional investment trading analysis from Investment Banking House.",
          "mainEntity": {
            "@id": "https://www.ibhalgo.com/#organization"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ibhalgo.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Investment Trading Charts",
                "item": "https://www.ibhalgo.com/graphs"
              }
            ]
          }
        })}
      </script>
      <main className="w-full min-h-screen flex flex-col items-center justify-center py-0 sm:py-1 md:py-2 lg:py-4">
      <div className="w-full pt-0 pb-1 sm:pb-2 md:pb-3 lg:pb-4 lg:pt-4 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header Section */}
          <div className="text-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
            {/* Desktop: animated heading/subheading (useScrollFloat refs) */}
            <div className="hidden lg:block">
              <h1
                ref={graphsTitleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-medium mb-2 tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-[0_1px_2px_rgba(26,26,26,0.35)]"
              >
                Live Market Charts
              </h1>
              <p
                ref={graphsSubtitleRef}
                className="text-lg md:text-xl text-[rgba(48,39,32,0.68)] max-w-3xl mx-auto leading-relaxed mt-1"
              >
                Track real-time price trends across multiple assets with intuitive, data-driven visuals.
              </p>
            </div>

            {/* Mobile/Tablet: static heading/subheading, same styling, no animation */}
            <div className="block lg:hidden">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 tracking-[0.1em] sm:tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-[0_1px_2px_rgba(26,26,26,0.35)] px-2"
              >
                Live Market Charts
              </h1>
              <p
                className="text-sm sm:text-base md:text-lg text-[rgba(48,39,32,0.68)] max-w-3xl mx-auto leading-relaxed mt-1 px-2"
              >
                Track real-time price trends across multiple assets with intuitive, data-driven visuals.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center overflow-visible px-2 sm:px-4">
        <GraphCarousel />
      </div>

      {/* Trading News Section */}
      <TradingNews />
    </main>
    </>
  );
};

export default Graphs;



