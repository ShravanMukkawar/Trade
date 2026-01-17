import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Canvas } from "@react-three/fiber";
import { HeadTrackingRobot } from "./Subscription Plans/HeadTrackingRobot";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "🤖 Greetings, Trader! I'm your IBH investment trading assistant. Ask me anything about stocks, forex, crypto, gold, MetaTrader systems, trading strategies, IBH platform features, or our subscription plans.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const audioRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    audioRef.current = new Audio("/audio/robo.wav");
    audioRef.current.preload = "auto";
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, loading]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
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
      console.error("Error fetching AI response:", error);
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
    <div className="w-full h-screen bg-zinc-50 text-slate-950 flex flex-col overflow-hidden relative">
      <audio ref={audioRef} src="/audio/robo.wav" preload="auto" />
      
      {/* Aurora Background Effect - Light Mode (matching Subscription Plans) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          "--aurora":
            "repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)",
          "--dark-gradient":
            "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
          "--white-gradient":
            "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
          "--blue-300": "#93c5fd",
          "--blue-400": "#60a5fa",
          "--blue-500": "#3b82f6",
          "--indigo-300": "#a5b4fc",
          "--violet-200": "#ddd6fe",
          "--black": "#000",
          "--white": "#fff",
          "--transparent": "transparent",
        }}
      >
        <div
          className="after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[''] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
        ></div>
      </div>
      
      {/* Header */}
      <div className="relative bg-gradient-to-r from-purple-800 via-blue-900 to-cyan-900 text-white p-5 flex items-center justify-between border-b border-cyan-500/30 z-10 backdrop-blur-sm">
        <div className="relative flex items-center gap-4 z-10">
          <div className="relative">
            <div className="w-12 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse-slow shadow-lg">
              <Bot size={28} className="text-white animate-float" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-spin-slow" />
          </div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            IBH Trading Bot
            <span className="text-xs bg-cyan-500/40 px-2.5 py-1 rounded-full border border-cyan-400">PRO</span>
          </h3>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="relative flex-1 overflow-y-auto p-5 scrollbar-visible z-10"
      >
        {/* Robot Background - 3D Model - Exact copy from Subscription Plans - Hidden on mobile */}
        <div className="hidden md:flex fixed inset-0 items-center justify-center pointer-events-none overflow-hidden z-0">
          <div className="w-[800px] h-[800px] rounded-3xl overflow-hidden bg-transparent">
            <Canvas camera={{ position: [0, 0.8, 4], fov: 40 }}>
              <ambientLight intensity={3.8} />
              <directionalLight position={[3, 5, 5]} intensity={2.2} />
              <HeadTrackingRobot position={[0, -1.0, 0]} rotation={[0, 0, 0]} scale={0.9} />
            </Canvas>
          </div>
        </div>

        {/* Message List */}
        <div className="relative z-10 space-y-4 min-h-full max-w-4xl mx-auto">
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
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-white/90 text-slate-900 border border-cyan-500/30 shadow-lg"
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
              <div className="bg-white/90 px-4 py-3 rounded-2xl border border-cyan-500/30 shadow-lg text-slate-900">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} style={{ height: '1px' }} />
        </div>
      </div>

      {/* FAQ Questions Section - Above Input */}
      <div className="px-4 pb-3 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {faqQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleFAQ(q)}
                className="px-4 py-2.5 text-xs font-medium bg-white/80 border border-cyan-500/40 text-slate-700 rounded-full hover:bg-cyan-50 hover:border-cyan-400 transition-all hover:scale-105 shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-cyan-500/20 z-10 relative">
        <div className="flex items-center gap-3 bg-white/90 rounded-full px-5 py-1.5 border border-cyan-500/40 shadow-lg max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about IBH or trading..."
            className="flex-1 bg-transparent text-slate-900 placeholder-gray-500 text-sm focus:outline-none"
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
      `}</style>
    </div>
  );
};

export default ChatPage;
