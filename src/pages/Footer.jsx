import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, Instagram, MessageCircle, 
  ArrowRight, ChevronUp 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { Icon: Instagram, href: 'https://www.instagram.com/ibh.trade.09?igsh=MXF2NjE5YTIxa2Q2dQ==', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600' },
    { Icon: Mail, href: 'mailto:Investmentbankinghouse@gmail.com', label: 'Gmail', color: 'hover:bg-red-600' },
    { Icon: MessageCircle, href: 'https://wa.me/918275746327', label: 'WhatsApp', color: 'hover:bg-green-600' }
  ];

  return (
    <footer id="contact-section" className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-300 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 215, 0, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            animation: 'moveBackground 20s linear infinite'
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-10 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Company Info - Spans 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-lg blur-xl group-hover:bg-yellow-500/40 transition-all duration-300"></div>
                  <img 
                    src="/images/icon/logo2.jpg" 
                    alt="IBH Logo" 
                    className="relative h-14 w-14 rounded-lg transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    IBH
                  </h2>
                  <p className="text-xs text-gray-400">Investment Banking House</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 leading-relaxed">
                Premier boutique investment bank specializing in mergers & acquisitions, 
                capital raising, and strategic advisory for growth-stage companies worldwide.
              </p>

              {/* Social Media */}
              <div className="pt-4">
                <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map(({ Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 ${color} hover:text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services - Spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Services
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></span>
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  'Debt & Equity Financing',
                  'Bitcoin Trading',
                  'Trading View Analytics',
                  'Meta Trade Platform',
                  'Market Analysis',
                  'Portfolio Management',
                  'Risk Assessment'
                ].map((item, index) => (
                  <li key={item} style={{ animationDelay: `${index * 50}ms` }}>
                    <a
                      href="#"
                      className="group flex items-center text-gray-400 hover:text-yellow-500 transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company - Spans 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Company
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></span>
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  'About Us',
                  'Leadership',
                  'Careers',
                  'News & Insights',
                  'Press Releases',
                  'Partners',
                  'Contact Us'
                ].map((item, index) => (
                  <li key={item} style={{ animationDelay: `${index * 50}ms` }}>
                    <a
                      href="#"
                      className="group flex items-center text-gray-400 hover:text-yellow-500 transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info - Spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></span>
              </h3>
              <ul className="space-y-5 text-sm">
                <li className="group">
                  <a href="tel:+918275746327" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/30 transition-all duration-300">
                    <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-yellow-500" />
                    </div>
                    <span className="text-gray-400 group-hover:text-yellow-500 transition-colors">
                      +91 82757 46327
                    </span>
                  </a>
                </li>
                <li className="group">
                  <a href="mailto:Investmentbankinghouse@gmail.com" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/30 transition-all duration-300">
                    <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-yellow-500" />
                    </div>
                    <span className="text-gray-400 group-hover:text-yellow-500 transition-colors">
                      Investmentbankinghouse@gmail.com
                    </span>
                  </a>
                </li>
              </ul>

              {/* WhatsApp Channel Button */}
              <div className="mt-6">
                <a
                  href="https://wa.me/918275746327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Join Our WhatsApp Channel</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-6">
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-center text-sm">
              © {currentYear} <span className="text-yellow-500 font-semibold">IBH Capital Partners</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 rounded-full shadow-lg shadow-yellow-500/50 transition-all duration-300 transform hover:scale-110 z-50 animate-bounce"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes moveBackground {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }
      `}</style>
    </footer>
  );
}