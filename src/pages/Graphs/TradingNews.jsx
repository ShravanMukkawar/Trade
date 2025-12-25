import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Calendar, RefreshCw } from 'lucide-react';

const TradingNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⭐ Replace with your NewsData API key
  const API_KEY = "pub_07effa02b6334e2ea9a031a5fcb0684e";

  // Demo fallback
  const getDemoNews = () => [
    {
      title: "Bitcoin Surges Past $45,000 Mark Amid Institutional Interest",
      description: "Cryptocurrency market sees significant gains as major institutions announce increased Bitcoin holdings.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400",
      publishedAt: new Date().toISOString(),
      source: { name: "Crypto News" }
    }
  ];

  // ⭐ NEWSDATA.IO — FRONTEND SAFE — RETURNS MULTIPLE NEWS
  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=finance OR trading OR stocks OR crypto OR forex&language=en&size=10`
      );

      const data = await response.json();
      console.log("Fetched news data:", data);
      if (data.status !== "success") {
        throw new Error("API error");
      }

      const mapped = (data.results || []).map(a => ({
        title: a.title,
        description: a.description,
        url: a.link,
        urlToImage: a.image_url,
        publishedAt: a.pubDate,
        source: { name: a.source_id || "Financial News" }
      }));

      setNews(mapped);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Unable to load news.");
      setNews(getDemoNews());
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Memoize news categories to prevent recalculation
  const newsCategories = useMemo(() => ({
    featuredNews: news[0],
    marketFocusNews: news.slice(1, 4),
    cryptoNews: news.slice(4, 7),
    analysisNews: news.slice(7, 10),
    additionalNews: news.slice(1, 3)
  }), [news]);

  return (
    <section className="w-full bg-transparent py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with Refresh Button */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-2 tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-[0_1px_2px_rgba(26,26,26,0.35)]">
            Latest Trading News
          </h2>
          <p className="text-lg md:text-xl text-[rgba(48,39,32,0.68)] max-w-3xl mx-auto leading-relaxed mb-4">
            Stay updated with real-time market insights and breaking financial news.
          </p>
          <button
            onClick={fetchNews}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh News</span>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-200 animate-pulse rounded-lg h-96"></div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchNews}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Main News Layout */}
        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Side - Featured Article */}
            <div className="lg:col-span-2 space-y-4">
              {newsCategories.featuredNews && (
                <article className="group block bg-white/95 border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <a
                    href={newsCategories.featuredNews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative h-64 bg-gray-200 overflow-hidden">
                      {newsCategories.featuredNews.urlToImage ? (
                        <img
                          src={newsCategories.featuredNews.urlToImage}
                          alt={newsCategories.featuredNews.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <TrendingUp className="w-16 h-16 text-yellow-500" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">
                        FEATURED
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors leading-tight line-clamp-2">
                        {newsCategories.featuredNews.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                        {newsCategories.featuredNews.description || "Click to read the full article..."}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{formatDate(newsCategories.featuredNews.publishedAt)}</span>
                        <span className="mx-2">•</span>
                        <span className="truncate">{newsCategories.featuredNews.source?.name}</span>
                      </div>
                    </div>
                  </a>
                </article>
              )}

              {/* Additional Featured News Items */}
              <div className="bg-white/95 border border-gray-200 rounded-lg p-4">
                <ul className="space-y-2">
                  {newsCategories.additionalNews.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 text-gray-700 hover:text-yellow-600 transition-colors group"
                      >
                        <span className="text-yellow-600 mt-0.5 flex-shrink-0">•</span>
                        <span className="text-sm font-medium line-clamp-2">{article.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side - News Categories */}
            <div className="space-y-4">
              
              {/* Market Focus Section */}
              <div className="bg-white/95 border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-gray-900 uppercase mb-3 pb-2 border-b-2 border-yellow-500">
                  Market Focus
                </h3>
                <ul className="space-y-2.5">
                  {newsCategories.marketFocusNews.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-xs text-gray-800 group-hover:text-yellow-600 transition-colors leading-snug line-clamp-3 break-words">
                            {article.title}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Crypto News Section */}
              <div className="bg-white/95 border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-gray-900 uppercase mb-3 pb-2 border-b-2 border-blue-500">
                  Crypto Updates
                </h3>
                <ul className="space-y-2.5">
                  {newsCategories.cryptoNews.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-xs text-gray-800 group-hover:text-blue-600 transition-colors leading-snug line-clamp-3 break-words">
                            {article.title}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Market Analysis Section */}
              <div className="bg-white/95 border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-gray-900 uppercase mb-3 pb-2 border-b-2 border-red-500">
                  Market Analysis
                </h3>
                <ul className="space-y-2.5">
                  {newsCategories.analysisNews.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-xs text-gray-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-3 break-words">
                            {article.title}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600">No news available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TradingNews;
