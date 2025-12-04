import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, TrendingUp, Bot, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
  const audioRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  console.log("API_KEY:", API_KEY);

  useEffect(() => {
    audioRef.current = new Audio("/audio/robo.wav");
    audioRef.current.preload = "auto";
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleChat = () => {
    playSound();
    setOpen(!open);
  };

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
    return tradingKeywords.some(k => query.toLowerCase().includes(k));
  };

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

      const result = await model.generateContent(`
You are the IBH trading assistant.
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
USER QUESTION: ${question}
`);
      const text = result.response.text();
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ IBH system error — try again." }]);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const userQuery = input;
    setInput("");
    setLoading(true);

    try {
      if (!isTradingRelated(userQuery)) {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: "⚠️ I can only assist with IBH, trading, forex, gold, bitcoin, or IBH plans & features.",
        }]);
        setLoading(false);
        return;
      }

      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(`
You are the IBH trading assistant.
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
USER ASKED: ${userQuery}
`);
      const text = result.response.text();
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);

    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ IBH system error." }]);
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
      <audio ref={audioRef} src="/audio/robo.wav" preload="auto" />

      {!open && (
        <button
          onClick={toggleChat}
          className="fixed bottom-5 right-5 z-50 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 bot-button"
        >
          <Bot size={32} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[380px] h-[630px] max-w-[95vw] max-h-[92vh] bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30 overflow-hidden flex flex-col">

          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-800 via-blue-900 to-cyan-900 text-white p-5 flex items-center justify-between">
            <div className="relative flex items-center gap-4 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse-slow shadow-lg">
                  <Bot size={28} className="text-white animate-float" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-spin-slow" />
              </div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                IBH Trading Bot
                <span className="text-xs bg-cyan-500/40 px-2.5 py-1 rounded-full border border-cyan-400">PRO</span>
              </h3>
            </div>

            <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition z-10">
              <X size={22} />
            </button>
          </div>

          {/* MESSAGES WITH ROBOT BACKGROUND */}
          <div className="relative flex-1 overflow-y-auto p-5 scrollbar-visible">

            {/* ROBOT BACKGROUND INSERTED HERE */}
            <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
              <svg width="280" height="280" viewBox="0 0 200 200" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-float-slow max-w-full max-h-full">
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

            {/* MESSAGE LIST */}
<div className="relative z-10 space-y-4 min-h-full">
  {messages.map((msg, i) => (
    <div
      key={i}
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      } animate-fadeIn`}
    >
      {msg.role === "assistant" && (
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-lg flex-shrink-0">
          <Bot size={22} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
          msg.role === "user"
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            : "bg-slate-700/80 text-gray-100 border border-cyan-500/30"
        }`}
      >
        {msg.role === "assistant" ? (
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        ) : (
          msg.content
        )}
      </div>
    </div>
  ))}

              {loading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Bot size={22} className="text-white" />
                  </div>
                  <div className="bg-slate-700/80 px-4 py-3 rounded-2xl border border-cyan-500/30">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />

              <div className="flex flex-wrap gap-2 pt-6 pb-4">
                {faqQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleFAQ(q)}
                    className="px-4 py-2.5 text-xs font-medium bg-slate-700/60 border border-cyan-500/40 text-cyan-200 rounded-full hover:bg-cyan-900/40 hover:border-cyan-400 transition-all hover:scale-105"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border-t border-cyan-500/20">
            <div className="flex items-center gap-3 bg-slate-800/70 rounded-full px-5 py-1.5 border border-cyan-500/40 shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about IBH or trading..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition-all shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float-slow {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-20px) }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }

        .scrollbar-visible {
          overflow-y: auto;
          scrollbar-width: medium;
          scrollbar-color: #22d3ee #0f172a;
        }
        .scrollbar-visible::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-visible::-webkit-scrollbar-track {
          background: #0f172a;
          border-radius: 10px;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb {
          background: #22d3ee;
          border-radius: 10px;
        }

        .bot-button {
          box-shadow: 0 0 40px rgba(34,211,238,0.6);
        }
      `}</style>
    </>
  );
};

export default Chatbot;
