import { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink, Calendar, Newspaper, RefreshCw } from 'lucide-react';

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
`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=finance OR trading OR stocks OR crypto OR forex&language=en&size=6`
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

  return (
    <section className="w-full bg-transparent py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-lg animate-fade-in-up">
            Latest Trading News
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Stay updated with real-time market insights and breaking financial news.
          </p>

          <button
            onClick={fetchNews}
            disabled={loading}
            className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh News</span>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/80 animate-pulse rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchNews}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* News Cards */}
        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <article
                key={index}
                className="group bg-white/90 rounded-xl shadow-md hover:shadow-2xl overflow-hidden transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <TrendingUp className="w-16 h-16 text-yellow-500 animate-pulse" />
                    </div>
                  )}

                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                    {article.source?.name || "News"}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(article.publishedAt)}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.description}
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
                  >
                    Read more
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-12 bg-white/50 rounded-xl animate-fade-in">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-bounce" />
            <p className="text-gray-600">No news available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TradingNews;
