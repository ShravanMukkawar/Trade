import { BookOpen, ExternalLink, Download, Star } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';

const Learn = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

const books = [
  {
    title: "The Intelligent Investor",
    description: "The bible of value investing by Benjamin Graham",
    backDescription: "Focuses on value investing principles, margin of safety, and long-term wealth creation. A must-read for serious investors.",
    link: "https://drive.google.com/file/d/1R7bSxMeyvSDKOWsFNoxqxXtYp1QWqW1A/view?usp=sharing",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    title: "The Warren Buffett Way",
    description: "Learn investing through Warren Buffett’s strategy",
    backDescription: "Explains Buffett’s investment philosophy, business analysis, and long-term compounding approach.",
    link: "https://drive.google.com/file/d/1NTggfIzFuQ3QnAjuHHlCWb1bgRwKLWfo/view?usp=sharing",
    color: "from-green-500 to-green-600"
  },
  {
    title: "One Up On Wall Street",
    description: "How individual investors can beat professionals",
    backDescription: "Peter Lynch explains how everyday investors can spot winning stocks using common sense and research.",
    link: "https://drive.google.com/file/d/1Df83nOR2kZy4Z2ZbclkiIkKQu-lV-yVs/view?usp=sharing",
    color: "from-teal-500 to-teal-600"
  },
  {
    title: "The Psychology of Money",
    description: "Timeless lessons on wealth, greed, and happiness",
    backDescription: "Explores how human behavior affects financial decisions more than intelligence or knowledge.",
    link: "https://drive.google.com/file/d/11zkjH1Si2HplS3Hjd7U5wi7-gMY5jINV/view?usp=sharing",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Reminiscences of a Stock Operator",
    description: "Classic trading psychology and market wisdom",
    backDescription: "A semi-autobiographical story teaching timeless lessons about speculation, discipline, and market behavior.",
    link: "https://drive.google.com/file/d/1T73dI9zIXGdbp92e5n89filo3CkUfglv/view?usp=sharing",
    color: "from-rose-500 to-rose-600"
  },
  {
    title: "Trading for a Living",
    description: "Professional trading mindset and techniques",
    backDescription: "Covers psychology, risk management, and trading systems essential for consistent trading.",
    link: "https://drive.google.com/file/d/1j7jwlvAAZ4Z5l8-d1IRaHTAnEKCbMGKS/view?usp=sharing",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Japanese Candlestick Charting Techniques",
    description: "The foundation of modern price action trading",
    backDescription: "Explains candlestick patterns, market psychology behind price movements, and trend analysis.",
    link: "https://drive.google.com/file/d/1uMluLPU2MAwso7WcH39DqscQpSJB3swE/view?usp=sharing",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Mastering Technical Analysis",
    description: "Advanced chart reading and indicators",
    backDescription: "Deep dive into indicators, chart patterns, and technical tools used by professional traders.",
    link: "https://drive.google.com/file/d/1xZ65Bg0wVOnIEGWYtzuA3PjqnHk-vl-j/view?usp=sharing",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    title: "High Probability Trading Strategies",
    description: "Trade setups with strong risk-reward ratios",
    backDescription: "Focuses on identifying trades with higher probability and managing risk effectively.",
    link: "https://drive.google.com/file/d/1SYO-nPjdXiCZB6Js86JjeDeGSXrEQulZ/view?usp=sharing",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    title: "The Complete TurtleTrader",
    description: "Legendary system-based trend following strategy",
    backDescription: "Explains the famous Turtle Trading experiment and rule-based trading systems.",
    link: "https://drive.google.com/file/d/1BVAedJmv9PTn5EZSyyeJwQYcUlxL3QdA/view?usp=sharing",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "NSE NCFM",
    description: "Indian stock market certification material",
    backDescription: "Covers Indian market structure, derivatives, trading rules, and exchange-level knowledge.",
    link: "https://drive.google.com/file/d/1vQDPf1Tyrf1ZM1lf__r0Hc_qP4r1tXv9/view?usp=sharing",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    title: "PCMBrokers (Wiley Finance Series)",
    description: "Professional trading and brokerage insights",
    backDescription: "Advanced concepts in brokerage operations, trading mechanisms, and institutional practices.",
    link: "https://drive.google.com/file/d/1XfN9Wxd_hVV79PI3F72ScqROwustKPrb/view?usp=sharing",
    color: "from-pink-500 to-pink-600"
  }
];

  return (
    <>
      <SEO 
        description="Investment trading education - Enhance your investment banking and investment trading knowledge with curated educational materials. Access trading books, technical analysis guides, and professional trading resources for forex and crypto trading from Investment Banking House."
        keywords="investment trading education, investment banking education, trading resources, trading education, forex trading books, technical analysis, trading strategies, trading signals subscription, investment trading resources"
        ogDescription="Investment trading education - Enhance your investment banking and investment trading knowledge with curated educational materials and professional trading resources."
        canonical="https://www.ibhalgo.com/learn"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://www.ibhalgo.com/learn#webpage",
          "url": "https://www.ibhalgo.com/learn",
          "name": "Investment Trading Education - Trading Resources | Investment Banking House",
          "description": "Investment trading education - Enhance your investment banking and investment trading knowledge with curated educational materials from Investment Banking House.",
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
                "name": "Investment Trading Education",
                "item": "https://www.ibhalgo.com/learn"
              }
            ]
          }
        })}
      </script>
      <section className="w-full min-h-screen bg-transparent py-12 lg:py-16">
      <style>{`
        .flip-card {
          perspective: 1000px;
          height: 280px;
          width: 100%;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }
        
        .flip-card:hover .flip-card-front,
        .flip-card:hover .flip-card-back {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .flip-card-front {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
          transform: rotateY(0deg);
        }
        
        .flip-card-back {
          background: linear-gradient(135deg, rgba(30, 30, 30, 0.98), rgba(50, 50, 50, 0.95));
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.5rem;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2.5s infinite;
        }
        
        .icon-bounce:hover {
          animation: icon-bounce 0.6s ease infinite;
        }
        
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-lg">
            Trading Resources
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Enhance your trading knowledge with our curated collection of educational materials
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {books.map((book, index) => (
            <div
              key={index}
              className="flip-card"
              style={{ 
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front p-5 border border-gray-200 relative overflow-hidden">{hoveredIndex !== index && (
                    <div className="absolute inset-0 shimmer pointer-events-none"></div>
                  )}
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 mb-3 bg-gradient-to-br ${book.color} rounded-lg flex items-center justify-center transform transition-all duration-300 icon-bounce shadow-lg`}>
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {book.description}
                  </p>

                  {/* Hover Hint */}
                  <div className="absolute bottom-3 left-5 right-5 flex items-center justify-center text-xs text-gray-400 italic opacity-70">
                    <span>Hover for details</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                  <div className="text-center">
                    <div className={`w-10 h-10 mx-auto mb-3 bg-gradient-to-br ${book.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3">
                      {book.title}
                    </h3>
                    
                    <p className="text-xs text-gray-300 mb-4 leading-relaxed line-clamp-3">
                      {book.backDescription}
                    </p>
                    
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${book.color} text-white rounded-lg text-sm font-semibold transform transition-all duration-300 hover:scale-110 hover:shadow-2xl`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Access Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            💡 Hover over any card to flip and see more details. Click "Access Now" to open the resource.
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Learn;
