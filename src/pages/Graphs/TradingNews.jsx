import { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink, Calendar, Newspaper, RefreshCw } from 'lucide-react';

const TradingNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using NewsAPI.org - You can replace with your preferred API
  // Free tier: https://newsapi.org/
  const API_KEY = 'd559c65874ef4711816b2f2a88e0cba6'; // Replace with your API key
  
  // Demo news for fallback
  const getDemoNews = () => [
    {
      title: "Bitcoin Surges Past $45,000 Mark Amid Institutional Interest",
      description: "Cryptocurrency market sees significant gains as major institutions announce increased Bitcoin holdings.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400",
      publishedAt: new Date().toISOString(),
      source: { name: "Crypto News" }
    },
    {
      title: "Federal Reserve Maintains Interest Rates, Markets React Positively",
      description: "Stock markets rally as Fed signals steady monetary policy for the coming quarter.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { name: "Financial Times" }
    },
    {
      title: "Gold Prices Hit New Yearly High on Economic Uncertainty",
      description: "Safe-haven assets gain traction as investors seek stability amid global market volatility.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { name: "Bloomberg" }
    },
    {
      title: "Forex Markets See Increased Volatility in Asian Trading Session",
      description: "Currency pairs show significant movement following economic data releases from major Asian economies.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: { name: "Reuters" }
    },
    {
      title: "Tech Stocks Lead Market Rally as Earnings Season Begins",
      description: "Major technology companies report better-than-expected quarterly results, boosting investor confidence.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: { name: "CNBC" }
    },
    {
      title: "Oil Prices Stabilize After Recent Fluctuations",
      description: "Energy markets find equilibrium as supply concerns ease and demand forecasts remain steady.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400",
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      source: { name: "Market Watch" }
    }
  ];

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Using NewsAPI with financial/trading related queries
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=(trading OR stocks OR forex OR bitcoin OR cryptocurrency OR finance)&sortBy=publishedAt&language=en&pageSize=6&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      setNews(data.articles || []);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Unable to load news. Please try again later.');
      // Fallback to demo news if API fails
      setNews(getDemoNews());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section className="w-full bg-transparent py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Animation */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-[0_1px_2px_rgba(26,26,26,0.35)] animate-fade-in-up">
            Latest Trading News
          </h2>
          <p className="text-lg md:text-xl text-[rgba(48,39,32,0.68)] max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Stay updated with real-time market insights and breaking financial news.
          </p>
          
          <button
            onClick={fetchNews}
            disabled={loading}
            className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh News</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200 animate-fade-in">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchNews}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <article
                key={index}
                className="group bg-white/90 backdrop-blur-md rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in-up border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 group-hover:rotate-2"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <TrendingUp className="w-16 h-16 text-yellow-500 animate-pulse" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full transform transition-transform group-hover:scale-110">
                    {article.source?.name || 'News'}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Date */}
                  <div className="flex items-center text-xs text-gray-500 transform transition-transform group-hover:translate-x-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(article.publishedAt)}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.description || 'Click to read more about this trading news...'}
                  </p>

                  {/* Read More Link */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-all duration-300 group/link"
                  >
                    Read more
                    <ExternalLink className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-2" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl animate-fade-in">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-bounce" />
            <p className="text-gray-600">No news available at the moment</p>
          </div>
        )}

      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
};

export default TradingNews;
