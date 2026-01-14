import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, Users, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

const CountUp = ({ end, duration = 2000, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      let startTime;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, end, duration, delay]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        description="Learn about Investment Banking House (IBH) - a premier investment banking and investment trading company in India. Our team of financial experts delivers automated trading, investment trading services, and algorithmic trading solutions."
        keywords="investment banking, investment trading, investment banking house, algorithmic trading company india, automated trading services india, forex trading platform india, professional trading analysis, trading signals subscription, investment trading company"
        ogDescription="Learn about Investment Banking House (IBH) - a premier investment banking and investment trading company in India. Our team delivers automated trading and investment trading services."
        canonical="https://www.ibhalgo.com/about"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://www.ibhalgo.com/about#webpage",
          "url": "https://www.ibhalgo.com/about",
          "name": "About Investment Banking House - Investment Trading Services",
          "description": "Learn about Investment Banking House (IBH) - a premier investment banking and investment trading company in India.",
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
                "name": "About",
                "item": "https://www.ibhalgo.com/about"
              }
            ]
          }
        })}
      </script>
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 md:w-[500px] h-64 sm:h-96 md:h-[500px] bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-cyan-300/8 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="mb-10 sm:mb-12 md:mb-16 text-center">
          <div className="inline-block mb-4 sm:mb-6 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full border border-blue-200/50 shadow-sm">
              <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-blue-500" />
              <span className="text-xs sm:text-sm text-blue-600 font-medium">Empowering Financial Independence Through Innovation</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text">
              About IBH
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]">
            Revolutionizing forex trading through cutting-edge automation and intelligent technology
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {[
            { label: "Active Traders", value: 10, suffix: "K+", delay: 600 },
            { label: "Success Rate", value: 94, suffix: "%", delay: 700 },
            { label: "Countries", value: 50, suffix: "+", delay: 800 }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm p-6 sm:p-7 md:p-8 rounded-2xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-white/80 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] border border-gray-100/50"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <div className="text-4xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-2 sm:mb-3">
                <CountUp end={stat.value} duration={2500} suffix={stat.suffix} delay={stat.delay} />
              </div>
              <div className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Cards */}
        <div className="space-y-10 sm:space-y-12 md:space-y-16 mb-12 sm:mb-14 md:mb-16">
          {/* Mission Card - Centered */}
          <div className="relative opacity-0 animate-[fadeIn_0.8s_ease-out_0.9s_forwards]">
            <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 text-center">
              <div className="inline-block p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 mb-3 sm:mb-4">
                <TrendingUp className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We democratize <span className="text-blue-600 font-semibold">financial independence</span> through 
                cutting-edge automated trading technology, unlocking forex markets for traders worldwide with a platform 
                that maximizes returns while minimizing complexity.
              </p>
            </div>
          </div>

          {/* Technology and Team Cards - Side by Side with Center Line */}
          <div className="relative opacity-0 animate-[fadeIn_0.8s_ease-out_1s_forwards]">
            {/* Vertical Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-400 to-purple-300 transform -translate-x-1/2"></div>
            
            {/* Center IBH Logo - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 lg:w-20 h-16 lg:h-20 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-blue-200 overflow-hidden">
                <img src="/images/logo.png" alt="IBH Logo" className="w-10 lg:w-12 h-10 lg:h-12 object-contain" />
              </div>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
              {/* Technology Card - Left */}
              <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 group">
                <div className="inline-block p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 mb-3 sm:mb-4">
                  <Shield className="w-6 sm:w-7 h-6 sm:h-7 text-cyan-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-cyan-600 transition-colors">
                  Our Technology
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  Powered by <span className="text-cyan-600 font-semibold">enterprise-grade architecture</span> with 99.9% uptime, 
                  our platform delivers real-time analytics with institutional-level security protocols.
                </p>
                
                {/* Tech Features */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {['Real-time Analytics', 'AI-Powered', 'Bank-grade Security', '24/7 Monitoring'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Card - Right */}
              <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 group">
                <div className="inline-block p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 mb-3 sm:mb-4">
                  <Users className="w-6 sm:w-7 h-6 sm:h-7 text-purple-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-purple-600 transition-colors">
                  Our Team
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  Our multidisciplinary team of <span className="text-purple-600 font-semibold">financial experts</span>, 
                  engineers, and data scientists combine decades of expertise with relentless innovation.
                </p>
                
                {/* Team Expertise Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Quant Finance', 'Engineering', 'Data Science', 'UX Design'].map((skill, i) => (
                    <span key={i} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 text-xs font-medium hover:bg-purple-100 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center opacity-0 animate-[fadeIn_0.8s_ease-out_1.2s_forwards]">
          <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl inline-block border border-gray-100/50 shadow-lg max-w-full">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">Ready to Transform Your Trading Experience?</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl px-2">Join thousands of successful traders who have chosen IBH as their trusted partner in financial growth</p>
            <button 
              onClick={() => navigate('/Subscription')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
    </>
  );
};

export default About;