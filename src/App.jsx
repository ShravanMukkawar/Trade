import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navbar from "./pages/Navbar";
import SubscriptionPlans from "./pages/Subscription Plans/SubscriptionPlans";
import ScrollVelocity from "./Scroll Velocity/ScrollVelocity";
import SkillsPage from "./pages/SkillPage";
import Chatbot from "./pages/Chatbot";
import Graphs from "./pages/Graphs/Graphs";
import Footer from "./pages/Footer";
import { lazy, Suspense } from "react";
// 💡 Lazy Load ONLY Heavy Component
const Robot = lazy(() => import("./pages/Robot"));
import About from "./pages/About";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import News from "./pages/News";
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuroraBackground showRadialGradient={false}>
        <Navbar />

        <div className="relative z-10 pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SEO 
                    description="Investment Banking House (IBH) - Premier investment banking and investment trading services. Automated trading, algorithmic trading, forex trading, crypto trading, and MT4/MT5 trading platforms in India. Professional investment trading solutions with 24/7 automated systems."
                    keywords="investment banking, investment trading, investment banking house, algorithmic trading, automated trading, forex trading, crypto trading, investment services india, trading platform, investment trading company, investment banking services, automated investment trading"
                    ogDescription="Investment Banking House (IBH) - Premier investment banking and investment trading services. Automated trading, algorithmic trading, forex trading, and crypto trading solutions in India."
                    canonical="https://www.ibhalgo.com/"
                  />
                  {/* Structured Data - Organization */}
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FinancialService",
                      "@id": "https://www.ibhalgo.com/#organization",
                      "name": "Investment Banking House",
                      "alternateName": ["IBH", "Investment Banking House IBH"],
                      "description": "Investment Banking House (IBH) - Premier investment banking and investment trading services. Automated trading, algorithmic trading, forex trading, crypto trading, and MT4/MT5 trading platforms in India.",
                      "url": "https://www.ibhalgo.com/",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.ibhalgo.com/images/icon/logo2.jpg"
                      },
                      "image": "https://www.ibhalgo.com/images/icon/logo2.jpg",
                      "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-82757-46327",
                        "contactType": "Customer Service",
                        "email": "Investmentbankinghouse@gmail.com",
                        "areaServed": "IN",
                        "availableLanguage": "English"
                      },
                      "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "IN"
                      },
                      "areaServed": {
                        "@type": "Country",
                        "name": "India"
                      },
                      "serviceType": [
                        "Investment Banking",
                        "Investment Trading",
                        "Algorithmic Trading",
                        "Automated Trading",
                        "Automated Forex Trading",
                        "Cryptocurrency Trading",
                        "MT4/MT5 Trading Services",
                        "Trading Signals",
                        "Market Analysis",
                        "Investment Services"
                      ],
                      "keywords": "investment banking, investment trading, investment banking house, algorithmic trading, automated trading, forex trading, crypto trading",
                      "sameAs": [
                        "https://www.instagram.com/ibh.trade.09"
                      ],
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "reviewCount": "1000"
                      }
                    })}
                  </script>
                  {/* Structured Data - WebSite */}
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      "@id": "https://www.ibhalgo.com/#website",
                      "url": "https://www.ibhalgo.com/",
                      "name": "Investment Banking House - IBH",
                      "description": "Investment Banking House (IBH) - Premier investment banking and investment trading services",
                      "publisher": {
                        "@id": "https://www.ibhalgo.com/#organization"
                      },
                      "potentialAction": {
                        "@type": "SearchAction",
                        "target": {
                          "@type": "EntryPoint",
                          "urlTemplate": "https://www.ibhalgo.com/?s={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                      }
                    })}
                  </script>
                  {/* Structured Data - BreadcrumbList */}
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "BreadcrumbList",
                      "itemListElement": [
                        {
                          "@type": "ListItem",
                          "position": 1,
                          "name": "Home",
                          "item": "https://www.ibhalgo.com/"
                        }
                      ]
                    })}
                  </script>
                  {/* HERO SECTION */}
                  <section
                    id="top"
                    className="min-h-screen flex items-center justify-center text-center"
                  >
                    {/* Suspense wrapper only for Robot */}
                    <Suspense fallback={<div style={{ height: "400px" }}></div>}>
                      <Robot />
                    </Suspense>
                  </section>

                  {/* MARQUEE */}
                  <ScrollVelocity
                    texts={[
                      <span key="a" className="flex items-center">
                        <span className="logo-text mx-4">INVESTMENT BANKING HOUSE</span>
                        <img
                          src="/images/icon/logo1.png"
                          className="h-20 w-20 mx-4"
                          alt="IBH Logo"
                        />
                        <span className="logo-text mx-4">INVESTMENT BANKING HOUSE</span>
                        <img
                          src="/images/icon/logo1.png"
                          className="h-20 w-20 mx-4"
                          alt="IBH Logo"
                        />
                        <span className="logo-text mx-4">INVESTMENT BANKING HOUSE</span>
                        <img
                          src="/images/icon/logo1.png"
                          className="h-20 w-20 mx-4"
                          alt="IBH Logo"
                        />
                        <span className="logo-text mx-4">INVESTMENT BANKING HOUSE</span>
                        <img
                          src="/images/icon/logo1.png"
                          className="h-20 w-20 mx-4"
                          alt="IBH Logo"
                        />
                      </span>,
                    ]}
                    velocity={120}
                  />

                  {/* SKILLS SECTION */}
                  <section
                    id="skills-section"
                    className="min-h-screen flex items-center"
                    style={{ backgroundColor: "#0C0C0C" }}
                  >
                    <SkillsPage />
                  </section>

                  {/* PLANS SECTION */}
                  <section className="min-h-screen flex items-center">
                    <SubscriptionPlans />
                  </section>

                  {/* GRAPHS SECTION
                  <section className="min-h-screen flex items-center pt-0">
                    <Graphs />
                  </section> */}

                  {/* FOOTER */}
                  <Footer />
                </>
              }
            />

            {/* Additional Routes */}
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/learn" element={<Learn />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/Subscription" element={<SubscriptionPlans />} />  
          </Routes>
        </div>
      </AuroraBackground>

      {/* Chatbot outside background */}
      <Chatbot />
    </Router>
  );
};

export default App;