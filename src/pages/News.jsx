import React from 'react';
import TradingNews from './Graphs/TradingNews';
import SEO from '../components/SEO';

const News = () => {
  return (
    <>
      <SEO 
        description="Investment banking and investment trading news - Stay updated with the latest financial news, market insights, and trading updates. Get real-time forex and crypto market analysis, press releases, and trading signals from Investment Banking House."
        keywords="investment banking news, investment trading news, trading news, forex market news, crypto trading signals, market analysis, financial news india, trading insights, investment banking updates"
        ogDescription="Investment banking and investment trading news - Stay updated with the latest financial news, market insights, and trading updates from Investment Banking House."
        canonical="https://www.ibhalgo.com/news"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://www.ibhalgo.com/news#webpage",
          "url": "https://www.ibhalgo.com/news",
          "name": "Investment Banking & Investment Trading News | Investment Banking House",
          "description": "Investment banking and investment trading news - Stay updated with the latest financial news, market insights, and trading updates from Investment Banking House.",
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
                "name": "Investment Trading News",
                "item": "https://www.ibhalgo.com/news"
              }
            ]
          }
        })}
      </script>
      <main className="w-full min-h-screen flex flex-col items-center justify-center py-0 sm:py-1 md:py-2 lg:py-4">
        <TradingNews />
      </main>
    </>
  );
};

export default News;
