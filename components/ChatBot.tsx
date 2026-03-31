// components/ChatBot.tsx
// ── Floating AI Chatbot powered by Claude ────────────────────
// Appears as a button in bottom-right corner of the dashboard
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, X, Send, Bot, User,
  Loader2, Sparkles, ChevronDown,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────
interface Message {
  role:    'user' | 'assistant';
  content: string;
}

// ── Suggested starter questions ───────────────────────────────
const SUGGESTIONS = [
  'Which model performed best and why?',
  'What is the promo impact on Type A stores?',
  'Which stores have the highest predicted sales?',
  'How does competition distance affect stores?',
  'What does MAPE mean in simple terms?',
  'Why do sales drop on Sundays?',
];

// ── Markdown-lite renderer ────────────────────────────────────
function renderText(text: string) {
  return text
    .split('\n')
    .map((line, i) => {
      // Bold **text**
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Bullet points
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return `<div class="flex gap-2 my-0.5"><span class="text-blue-400 shrink-0">•</span><span>${line.slice(2)}</span></div>`;
      }
      // Headers ##
      if (line.startsWith('## ')) {
        return `<p class="font-bold text-slate-200 mt-2 mb-1">${line.slice(3)}</p>`;
      }
      // Empty line
      if (line.trim() === '') return '<div class="h-1" />';
      return `<p>${line}</p>`;
    })
    .join('');
}

// ── Main Component ────────────────────────────────────────────
export default function ChatBot() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [messages,  setMessages]  = useState<Message[]>([]);
  const [input,     setInput]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [showSugg,  setShowSugg]  = useState(true);
  const [unread,    setUnread]    = useState(0);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setUnread(0);
    }
  }, [isOpen]);

  // ── Send message ─────────────────────────────────────────
  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput('');
    setShowSugg(false);

    const userMsg: Message = { role: 'user', content };
    const updatedMessages   = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          messages: updatedMessages.map(m => ({
            role:    m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? 'Request failed');

      const assistantMsg: Message = {
        role:    'assistant',
        content: data.response,
      };
      setMessages(prev => [...prev, assistantMsg]);

      // Increment unread if chat is closed
      if (!isOpen) setUnread(n => n + 1);

    } catch (err) {
      setMessages(prev => [...prev, {
        role:    'assistant',
        content: '⚠️ Sorry, I encountered an error. Please try again in a moment.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowSugg(true);
    setUnread(0);
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-2xl
                   bg-gradient-to-br from-blue-600 to-purple-700
                   flex items-center justify-center
                   hover:scale-110 transition-transform duration-200
                   focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
        {/* Unread badge */}
        {unread > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500
                           text-white text-xs font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9998] w-[380px] max-w-[calc(100vw-24px)]
                        flex flex-col rounded-2xl shadow-2xl overflow-hidden
                        border border-slate-700 bg-slate-900
                        animate-fade-in"
             style={{ height: '580px', display: 'flex', flexDirection: 'column' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3
                          bg-gradient-to-r from-blue-600/20 to-purple-600/20
                          border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600
                              flex items-center justify-center shadow">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Rossmann AI Assistant</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Powered by Claude · Ready to help
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button onClick={clearChat}
                  className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 rounded transition-colors">
                  Clear
                </button>
              )}
              <button onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors">
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4" style={{ minHeight: 0 }}>

            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600
                                flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm
                                px-3.5 py-2.5 text-sm text-slate-300 leading-relaxed max-w-[85%]">
                  👋 Hi! I'm the <span className="text-blue-400 font-semibold">Rossmann AI Assistant</span>.
                  <br /><br />
                  Ask me anything about:
                  <br />
                  🏪 Store performance & insights
                  <br />
                  📈 Sales forecasts & predictions
                  <br />
                  🤖 ML model comparison
                  <br />
                  📣 Promo impact analysis
                  <br />
                  💡 General data science questions
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5
                  ${msg.role === 'user'
                    ? 'bg-blue-600'
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
                  {msg.role === 'user'
                    ? <User size={13} className="text-white" />
                    : <Bot  size={13} className="text-white" />}
                </div>

                {/* Bubble */}
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-slate-800 border border-slate-700 text-slate-300 rounded-tl-sm'}`}>
                  {msg.role === 'assistant' ? (
                    <div dangerouslySetInnerHTML={{ __html: renderText(msg.content) }} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600
                                flex items-center justify-center shrink-0">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm
                                px-4 py-3 flex items-center gap-2">
                  <Loader2 size={14} className="text-blue-400 animate-spin" />
                  <span className="text-xs text-slate-400">Analysing Rossmann data...</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {showSugg && messages.length === 0 && (
            <div className="px-3 pb-2">
              <p className="text-xs text-slate-500 mb-2 px-1">💡 Try asking:</p>
              <div className="flex flex-col gap-1.5">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left text-xs text-slate-300 bg-slate-800 hover:bg-slate-700
                               border border-slate-700 hover:border-slate-600
                               rounded-xl px-3 py-2 transition-all duration-150"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="px-3 pb-3 pt-2 border-t border-slate-700">
            <div className="flex gap-2 items-end bg-slate-800 border border-slate-700
                            rounded-xl px-3 py-2 focus-within:border-blue-500/50 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything about Rossmann data..."
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500
                           outline-none resize-none"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700
                           flex items-center justify-center shrink-0
                           transition-colors duration-150 disabled:cursor-not-allowed"
              >
                {loading
                  ? <Loader2 size={14} className="text-white animate-spin" />
                  : <Send size={14} className="text-white" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-600 text-center mt-1.5">
              Powered by Claude AI · Rossmann dataset context included
            </p>
          </div>
        </div>
      )}
    </>
  );
}
