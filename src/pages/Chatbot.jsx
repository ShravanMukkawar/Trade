import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, TrendingUp, Bot, Sparkles } from "lucide-react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "🤖 Greetings, Trader! I'm your IBH investment trading assistant. Ask me anything about stocks, forex, crypto, gold, MetaTrader systems, trading strategies, IBH platform features, or our subscription plans.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY =import.meta.env.VITE_API_KEY;
  console.log("API_KEY:", API_KEY); // For
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isTradingRelated = (query) => {
    const tradingKeywords = [
      "stock", "trade", "trading", "market", "forex", "crypto", "bitcoin",
      "ethereum", "buy", "sell", "invest", "portfolio", "chart", "technical",
      "fundamental", "analysis", "price", "trend", "support", "resistance",
      "indicator", "moving average", "rsi", "macd", "candlestick", "volume",
      "bull", "bear", "exchange", "broker", "dividend", "etf", "index",
      "futures", "options", "derivative", "hedge", "position", "long", "short",
      "leverage", "margin", "stop loss", "take profit", "risk", "return",
      "ibh", "subscription", "metatrader", "gold", "xauusd", "tradingview"
    ];
    
    const lowerQuery = query.toLowerCase();
    return tradingKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  // FAQ Questions
  const faqQuestions = [
    "What is IBH?",
    "Why IBH is different from the market?",
    "What are the features of IBH?",
    "What are the subscription plans?"
  ];

  const handleFAQ = (question) => {
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    sendFAQ(question);
  };
const sendFAQ = async (question) => {
    setLoading(true);

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
You are an official AI assistant for IBH (Investment Banking House).

Always respond in a helpful, clear, professional manner.

IBH INFORMATION YOU MUST USE:
- IBH = Investment Banking House
- IBH supports MetaTrader 4 & MetaTrader 5
- IBH offers trading signals for Gold, Forex, Bitcoin, and currencies
- IBH uses TradingView analytics & indicators
- IBH provides 24/7 support
- IBH automates live trading execution
- IBH provides unlimited trading signals

SUBSCRIPTION PLANS:
- Starter A — Rs 9,600 — Gold XAU/USD — unlimited signals
- Starter B — Rs 9,600 — USOIL + currency pairs — automated trading
- Premium — Rs 12,000 — Gold + Bitcoin + Forex — automated & unlimited signals
- Professional — Rs 16,000 — 2 trading accounts — full automation

USER QUESTION:
${question}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "❌ IBH system error — try again."
      }]);
    }
    setLoading(false);
  };

   const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const userQuery = input;
    setInput("");
    setLoading(true);

    try {
      if (!isTradingRelated(userQuery)) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "⚠️ I can only assist with IBH, trading, forex, gold, bitcoin, or IBH plans & features.",
          },
        ]);
        setLoading(false);
        return;
      }

      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
You are the IBH trading assistant.

USER ASKS:
${userQuery}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ IBH system error." }
      ]);
    }

    setLoading(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 pointer-events-auto z-30">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      )}

      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-red-500 to-pink-600 text-white p-3 rounded-full shadow-2xl transition-all transform hover:scale-110 hover:rotate-90"
          style={{ transition: "all 0.3s ease" }}
        >
          <X size={20} />
        </button>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 bot-button"
          style={{ transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}
        >
          <Bot size={28} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[380px] max-w-[calc(100vw-3rem)] h-[580px] max-h-[calc(100vh-8rem)] rounded-3xl shadow-2xl flex flex-col animate-slideUp overflow-hidden border-4 border-cyan-400/30 chat-window">

          {/* HEADER */}
          <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-cyan-900 text-white p-4 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="grid-pattern"></div>
            </div>
            
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse-slow shadow-lg shadow-cyan-500/50">
                  <Bot className="w-6 h-6 text-white animate-float" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg tracking-wide flex items-center gap-2">
                  IBH Trading Bot
                  <span className="text-xs bg-cyan-500/30 px-2 py-0.5 rounded-full border border-cyan-400/50">PRO</span>
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <p className="text-xs text-cyan-200">Neural Network Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGES UI */}
            <div
              className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 space-y-4 custom-scrollbar relative min-h-0"
              style={{ overflowY: "auto", maxHeight: "100%", touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
            >
            {/* ROBOT BACKGROUND */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
              <svg width="280" height="280" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float-slow max-w-full max-h-full">
                <rect x="60" y="40" width="80" height="70" rx="10" fill="url(#robotGradient)" stroke="#22d3ee" strokeWidth="2"/>
                <line x1="100" y1="40" x2="100" y2="25" stroke="#22d3ee" strokeWidth="2"/>
                <circle cx="100" cy="22" r="4" fill="#22d3ee">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="80" cy="65" r="8" fill="#06b6d4">
                  <animate attributeName="fill" values="#06b6d4;#22d3ee;#06b6d4" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="120" cy="65" r="8" fill="#06b6d4">
                  <animate attributeName="fill" values="#06b6d4;#22d3ee;#06b6d4" dur="3s" repeatCount="indefinite"/>
                </circle>
                <rect x="75" y="85" width="50" height="15" rx="3" fill="#0e7490" opacity="0.6"/>
                <line x1="80" y1="92" x2="95" y2="92" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
                  <animate attributeName="x2" values="95;120;95" dur="4s" repeatCount="indefinite"/>
                </line>
                <rect x="70" y="115" width="60" height="50" rx="8" fill="url(#robotGradient)" stroke="#22d3ee" strokeWidth="2"/>
                <rect x="85" y="125" width="30" height="30" rx="4" fill="#0e7490" opacity="0.4"/>
                <circle cx="100" cy="140" r="6" fill="#22d3ee" opacity="0.8">
                  <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
                </circle>
                <rect x="45" y="120" width="20" height="40" rx="5" fill="url(#robotGradient)" stroke="#22d3ee" strokeWidth="2"/>
                <rect x="135" y="120" width="20" height="40" rx="5" fill="url(#robotGradient)" stroke="#22d3ee" strokeWidth="2"/>
                <rect x="75" y="170" width="20" height="25" rx="4" fill="url(#robotGradient)" stroke="#22d3ee" strokeWidth="2"/>
                <rect x="105" y="170" width="20" height="25" rx="4" fill="url(#robotGradient)" stroke="#22d3ee" strokeWidth="2"/>
                <defs>
                  <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0 shadow-lg shadow-cyan-500/30">
                    <Bot size={18} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] sm:max-w-[80%] p-4 rounded-2xl break-words ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none shadow-lg shadow-purple-500/30 border border-purple-400/30"
                      : "bg-gradient-to-br from-slate-700 to-slate-800 text-gray-100 rounded-bl-none shadow-lg border border-cyan-500/20"
                  } message-bubble`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ml-2 flex-shrink-0 shadow-lg shadow-purple-500/30">
                    <TrendingUp size={18} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0 shadow-lg shadow-cyan-500/30">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-4 rounded-2xl rounded-bl-none shadow-lg border border-cyan-500/20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100 shadow-lg shadow-blue-400/50"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200 shadow-lg shadow-purple-400/50"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

            {/* FAQ BUTTONS */}
            <div className="mt-6 flex flex-wrap gap-2">
              {faqQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleFAQ(q)}
                  className="px-3 py-2 text-xs bg-slate-700 border border-cyan-400/40 rounded-full hover:bg-slate-600 text-cyan-200"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT AREA */}
          <div className="p-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-cyan-500/20 flex-shrink-0">
            <div className="flex gap-2 items-center bg-slate-800/50 rounded-full p-1.5 border-2 border-cyan-500/30 input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about IBH or trading..."
                className="flex-1 px-3 py-2 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none min-w-0 text-sm"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2.5 rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/50 flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------ CSS ANIMATIONS STAY THE SAME (unchanged) ------ */}
<style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(-5px, -20px);
          }
          75% {
            transform: translate(-10px, -10px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .bot-button {
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.4), 0 0 60px rgba(168, 85, 247, 0.2);
        }

        .bot-button:hover {
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.6), 0 0 80px rgba(168, 85, 247, 0.3);
        }

        .chat-window {
          backdrop-filter: blur(10px);
          box-shadow: 0 0 50px rgba(34, 211, 238, 0.3), 0 0 100px rgba(168, 85, 247, 0.2);
        }

        .message-bubble {
          backdrop-filter: blur(10px);
        }

        .input-container {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(20px, 20px);
          }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent);
          border-radius: 50%;
          animation: particle-float 6s ease-in-out infinite;
        }

        .particle-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 40%;
          left: 80%;
          animation-delay: 1s;
        }

        .particle-3 {
          top: 60%;
          left: 20%;
          animation-delay: 2s;
        }

        .particle-4 {
          top: 80%;
          left: 70%;
          animation-delay: 3s;
        }

        .particle-5 {
          top: 30%;
          left: 50%;
          animation-delay: 1.5s;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #22d3ee, #60a5fa);
        }

        @media (max-width: 768px) {
          .chat-window {
            right: 1rem !important;
            left: 1rem !important;
            width: auto !important;
            max-width: calc(100vw - 2rem) !important;
          }
        }

        @media (max-width: 480px) {
          .bot-button {
            bottom: 1rem !important;
            right: 1rem !important;
            padding: 0.875rem !important;
          }
          
          .chat-window {
            bottom: 5rem !important;
            height: calc(100vh - 7rem) !important;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;