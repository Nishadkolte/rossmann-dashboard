// components/ChatBot.tsx
// ── Doggo AI Chatbot — 6 GIFs react to different questions ───
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ── GIF Library ───────────────────────────────────────────────
const GIFS = {
  idle:      '/gifs/idle.gif',
  excited:   '/gifs/excited.gif',
  thinking:  '/gifs/thinking.gif',
  analytics: '/gifs/analytics.gif',
  error:     '/gifs/error.gif',
  store:     '/gifs/thinking.gif',
};

type GifMood = keyof typeof GIFS;

const MOOD_LABELS: Record<GifMood, string> = {
  idle:      '😊 Ready to help!',
  excited:   '🎉 Great question!',
  thinking:  '🤔 Sniffing out the answer...',
  analytics: '📊 Crunching numbers!',
  error:     '😢 Something went wrong!',
  store:     '🏪 On it!',
};

const MOOD_COLORS: Record<GifMood, string> = {
  idle:      '#3b82f6',
  excited:   '#10b981',
  thinking:  '#f59e0b',
  analytics: '#8b5cf6',
  error:     '#ef4444',
  store:     '#06b6d4',
};

function detectMood(text: string): GifMood {
  const t = text.toLowerCase();
  if (t.includes('error') || t.includes('wrong') || t.includes('broken')) return 'error';
  if (t.includes('sales') || t.includes('forecast') || t.includes('top') ||
      t.includes('highest') || t.includes('predict') || t.includes('revenue') ||
      t.includes('winner') || t.includes('best') || t.includes('which store')) return 'excited';
  if (t.includes('rmse') || t.includes('mape') || t.includes('r2') || t.includes('r²') ||
      t.includes('model') || t.includes('lightgbm') || t.includes('xgboost') ||
      t.includes('prophet') || t.includes('sarima') || t.includes('accuracy') ||
      t.includes('tuning') || t.includes('metric') || t.includes('compare')) return 'analytics';
  if (t.includes('store') || t.includes('type a') || t.includes('type b') ||
      t.includes('type c') || t.includes('type d') || t.includes('promo') ||
      t.includes('assortment') || t.includes('competition') || t.includes('sunday') ||
      t.includes('holiday') || t.includes('open') || t.includes('closed')) return 'store';
  return 'excited';
}

function detectResponseMood(text: string): GifMood {
  const t = text.toLowerCase();
  if (t.includes('sorry') || t.includes('error') || t.includes('⚠️')) return 'error';
  if (t.includes('lightgbm') || t.includes('rmse') || t.includes('mape')) return 'analytics';
  if (t.includes('store') || t.includes('promo') || t.includes('type a')) return 'store';
  return 'excited';
}

function renderText(text: string) {
  return text.split('\n').map((line) => {
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (line.startsWith('- ') || line.startsWith('• '))
      return `<div style="display:flex;gap:6px;margin:3px 0"><span style="color:#f5c518;flex-shrink:0">🐾</span><span>${line.slice(2)}</span></div>`;
    if (line.startsWith('## '))
      return `<p style="font-weight:600;color:#e2e8f0;margin:8px 0 4px">${line.slice(3)}</p>`;
    if (line.trim() === '') return '<div style="height:4px"></div>';
    return `<p style="margin:2px 0">${line}</p>`;
  }).join('');
}

const SUGGESTIONS = [
  'Which model performed best and why?',
  'What is the promo impact on Type A stores?',
  'Which stores have the highest predicted sales?',
  'What does MAPE mean in simple terms?',
];

export default function ChatBot() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showSugg, setShowSugg] = useState(true);
  const [unread,   setUnread]   = useState(0);
  const [mood,     setMood]     = useState<GifMood>('idle');
  const [gifKey,   setGifKey]   = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 150); setUnread(0); }
    else setMood('idle');
  }, [isOpen]);

  const changeMood = (m: GifMood) => { setMood(m); setGifKey(k => k + 1); };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');
    setShowSugg(false);
    changeMood(detectMood(content));
    const userMsg: Message = { role: 'user', content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);
    setTimeout(() => changeMood('thinking'), 300);
    try {
      const res  = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      const reply = data.response as string;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      changeMood(detectResponseMood(reply));
      if (!isOpen) setUnread(n => n + 1);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Woof! Something went wrong — try again!' }]);
      changeMood('error');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const gif   = GIFS[mood];
  const label = MOOD_LABELS[mood];
  const color = MOOD_COLORS[mood];

  const avatarStyle = (size: number, border: string): React.CSSProperties => ({
    width: size, height: size, borderRadius: '50%', objectFit: 'cover' as const,
    border: `2px solid ${border}`, display: 'block', flexShrink: 0,
  });

  return (
    <>
      {/* ── Floating Button ── */}
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Open Doggo AI"
        style={{ position:'fixed', bottom:'16px', right:'20px', zIndex:9999,
          background:'transparent', border:'none', cursor:'pointer', padding:0,
          display:'flex', flexDirection:'column', alignItems:'center', gap:'4px',
          filter:'drop-shadow(0 6px 20px rgba(200,130,50,0.5))',
        }}>
        <div style={{ position:'relative' }}>
          <img key={gifKey} src={gif} alt="Doggo AI" referrerPolicy="no-referrer"
            style={{ ...avatarStyle(72, color),
              transition:'transform 0.2s',
              transform: isOpen ? 'scale(0.9)' : 'scale(1)',
            }}/>
          {unread > 0 && !isOpen && (
            <div style={{ position:'absolute', top:'-4px', right:'-4px',
              width:'20px', height:'20px', borderRadius:'50%',
              background:'#ef4444', color:'white', fontSize:'11px', fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center',
              border:'2px solid #0d1117',
            }}>{unread}</div>
          )}
          {isOpen && (
            <div style={{ position:'absolute', top:'-2px', right:'-2px',
              background:'#334155', borderRadius:'50%', width:'20px', height:'20px',
              display:'flex', alignItems:'center', justifyContent:'center',
              border:'2px solid #0d1117',
            }}><X size={11} color="#94a3b8"/></div>
          )}
        </div>
        {!isOpen && (
          <div style={{ background:'#e8a850', color:'#1a0a00', fontSize:'10px',
            fontWeight:700, padding:'2px 8px', borderRadius:'10px',
            letterSpacing:'0.3px', whiteSpace:'nowrap', fontFamily:'system-ui',
          }}>Ask Doggo! 🐾</div>
        )}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div style={{ position:'fixed', bottom:'108px', right:'20px', zIndex:9998,
          width:'380px', maxWidth:'calc(100vw - 20px)', height:'580px',
          display:'flex', flexDirection:'column', borderRadius:'20px', overflow:'hidden',
          border:'1.5px solid #2d3748', background:'#0d1117',
          boxShadow:'0 24px 60px rgba(0,0,0,0.7)',
        }}>

          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px',
            padding:'10px 14px', background:'#140d00',
            borderBottom:'1px solid #2d3748', flexShrink:0,
          }}>
            <div style={{ position:'relative', flexShrink:0 }}>
              <img key={`h-${gifKey}`} src={gif} alt="Doggo" referrerPolicy="no-referrer"
                style={avatarStyle(48, color)}/>
              <div style={{ position:'absolute', bottom:'1px', right:'1px',
                width:'12px', height:'12px', borderRadius:'50%',
                background: color, border:'2px solid #140d00',
              }}/>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ margin:0, fontWeight:700, fontSize:'14px', color:'#e8a850', fontFamily:'system-ui' }}>
                Doggo AI Assistant 🐾
              </p>
              <p style={{ margin:0, fontSize:'11px', color: color, fontFamily:'system-ui', fontWeight:500 }}>
                {label}
              </p>
            </div>
            <button onClick={() => setIsOpen(false)}
              style={{ background:'transparent', border:'none', cursor:'pointer', color:'#94a3b8', padding:'4px' }}>
              <X size={16}/>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'12px 14px',
            display:'flex', flexDirection:'column', gap:'14px', minHeight:0,
          }}>

            {messages.length === 0 && (
              <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                <img src={GIFS.idle} alt="Doggo" referrerPolicy="no-referrer"
                  style={avatarStyle(32, '#e8a850')}/>
                <div style={{ background:'#1e293b', border:'1px solid #334155',
                  borderRadius:'16px', borderTopLeftRadius:'4px',
                  padding:'12px 14px', fontSize:'13px', color:'#cbd5e1',
                  lineHeight:'1.65', maxWidth:'85%', fontFamily:'system-ui',
                }}>
                  <strong style={{ color:'#e8a850' }}>Woof! 🐾 Hello there!</strong>
                  <br/><br/>
                  I&apos;m your Rossmann AI expert! My mood changes with every question:
                  <br/><br/>
                  🎉 Sales &amp; forecast → I get excited!<br/>
                  📊 Model comparison → I go analytical!<br/>
                  🏪 Store &amp; promo → I pay attention!<br/>
                  🤔 While thinking → watch me ponder!
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', width:'100%',
              }}>
                {msg.role === 'assistant' ? (
                  <img src={i === messages.length - 1 ? gif : GIFS.idle}
                    alt="Doggo" referrerPolicy="no-referrer" style={avatarStyle(30, i === messages.length - 1 ? color : '#e8a850')}/>
                ) : (
                  <div style={{ width:'30px', height:'30px', borderRadius:'50%',
                    background:'#1d4ed8', display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:'14px', flexShrink:0,
                  }}>👤</div>
                )}
                <div style={{ maxWidth:'80%', padding:'10px 13px', borderRadius:'16px',
                  fontSize:'13px', lineHeight:'1.6', fontFamily:'system-ui',
                  ...(msg.role === 'user'
                    ? { background:'#1d4ed8', color:'white', borderTopRightRadius:'4px' }
                    : { background:'#1e293b', color:'#cbd5e1', border:'1px solid #334155', borderTopLeftRadius:'4px' }
                  ),
                }}>
                  {msg.role === 'assistant'
                    ? <div dangerouslySetInnerHTML={{ __html: renderText(msg.content) }}/>
                    : msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                <img key={`t-${gifKey}`} src={GIFS.thinking} alt="thinking" referrerPolicy="no-referrer"
                  style={avatarStyle(30, '#f59e0b')}/>
                <div style={{ background:'#1e293b', border:'1px solid #334155',
                  borderRadius:'16px', borderTopLeftRadius:'4px',
                  padding:'12px 16px', display:'flex', alignItems:'center', gap:'8px',
                }}>
                  <Loader2 size={14} color="#f59e0b" style={{ animation:'spin 1s linear infinite' }}/>
                  <span style={{ fontSize:'12px', color:'#94a3b8', fontFamily:'system-ui' }}>
                    Sniffing out the answer...
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Suggestions */}
          {showSugg && messages.length === 0 && (
            <div style={{ padding:'0 14px 8px', flexShrink:0 }}>
              <p style={{ fontSize:'11px', color:'#64748b', margin:'0 0 6px', fontFamily:'system-ui' }}>
                🐾 Try asking — watch my mood change!
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => sendMessage(s)}
                    style={{ textAlign:'left', fontSize:'12px', color:'#94a3b8',
                      background:'#1e293b', border:'1px solid #334155', borderRadius:'10px',
                      padding:'7px 12px', cursor:'pointer', fontFamily:'system-ui',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#2d3748'; (e.currentTarget as HTMLElement).style.color='#e2e8f0'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#1e293b'; (e.currentTarget as HTMLElement).style.color='#94a3b8'; }}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{ padding:'10px 12px 14px', borderTop:'1px solid #2d3748', flexShrink:0 }}>
            <div style={{ display:'flex', gap:'8px', alignItems:'center',
              background:'#1e293b', border:'1px solid #334155',
              borderRadius:'14px', padding:'8px 12px',
            }}>
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                disabled={loading}
                placeholder="Ask Doggo anything about Rossmann..."
                style={{ flex:1, background:'transparent', border:'none', outline:'none',
                  fontSize:'13px', color:'#e2e8f0', fontFamily:'system-ui',
                }}/>
              <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
                style={{ width:'32px', height:'32px', borderRadius:'10px',
                  background: input.trim() && !loading ? '#e8a850' : '#334155',
                  border:'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0, transition:'all 0.15s',
                }}>
                {loading
                  ? <Loader2 size={14} color="#94a3b8" style={{ animation:'spin 1s linear infinite' }}/>
                  : <Send size={14} color={input.trim() ? '#1a0a00' : '#64748b'}/>
                }
              </button>
            </div>
            <p style={{ margin:'6px 0 0', textAlign:'center', fontSize:'10px',
              color:'#475569', fontFamily:'system-ui',
            }}>Powered by Claude AI · Rossmann dataset expert 🐾</p>
          </div>
        </div>
      )}
    </>
  );
}
