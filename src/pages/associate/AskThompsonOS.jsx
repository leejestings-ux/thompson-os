import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Clock,
  ChevronRight,
  BookOpen,
  FileText,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';
import AppShell from '../../components/shared/AppShell';

// ── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CONVERSATION = [
  {
    role: 'user',
    content: 'What charitable giving structures would work best for Eleanor Fairchild given her interest in education?',
  },
  {
    role: 'assistant',
    content: `Based on Eleanor Fairchild's values profile and her strong interest in educational philanthropy, here are the most suitable structures to consider:

**1. Donor-Advised Fund (DAF)**
A DAF through a community foundation would give Eleanor immediate tax benefits while allowing her to recommend grants to educational institutions over time. This aligns with her expressed desire for flexible, ongoing giving.

**2. Charitable Remainder Trust (CRT)**
Given Eleanor's appreciated securities portfolio, a CRT could provide her with an income stream while ultimately directing assets to her preferred educational organizations. This addresses both her retirement income concerns and philanthropic goals.

**3. Scholarship Fund**
Eleanor specifically mentioned wanting to "open doors for first-generation college students." A named scholarship fund at her alma mater or through a community foundation would create a lasting, personal legacy.

**Recommendation:** I'd suggest starting the SVO conversation around a combined approach — a DAF for immediate giving flexibility paired with a CRT for the longer-term legacy component. Her VBQ responses strongly suggest she values both current impact and enduring legacy.`,
  },
  {
    role: 'user',
    content: 'Can you draft an opening paragraph for her SVO based on this?',
  },
  {
    role: 'assistant',
    content: `Here's a draft opening paragraph for Eleanor Fairchild's Statement of Values & Objectives:

---

*"Eleanor Fairchild's life has been shaped by a deep conviction that education is the most powerful catalyst for human potential. Growing up in a family where learning was cherished but resources were limited, Eleanor understands firsthand the transformative impact of educational opportunity. Now in a season of life where she can meaningfully invest in the next generation, Eleanor seeks to create pathways for first-generation college students — honoring the values her parents instilled while building a legacy that extends far beyond her own lifetime. Her estate plan reflects this vision: thoughtful, purposeful, and deeply personal."*

---

This draws directly from her Values-Based Questionnaire responses (particularly Q3 and Q7) and her intake interview notes from January 15th. Would you like me to continue with the objectives section?`,
  },
];

const SUGGESTED_PROMPTS = [
  { icon: FileText, text: 'Help me draft SVO language for a donor focused on family legacy' },
  { icon: Lightbulb, text: 'What estate planning structures work for donors with business interests?' },
  { icon: BookOpen, text: 'Summarize the Thompson methodology for values discovery' },
  { icon: MessageSquare, text: 'Draft a follow-up email to a donor after their intake meeting' },
];

const RECENT_QUERIES = [
  { query: 'Charitable remainder trust vs. charitable lead trust comparison', time: '2 hours ago' },
  { query: 'How to discuss end-of-life planning with reluctant donors', time: 'Yesterday' },
  { query: 'Best practices for annual SVO renewal meetings', time: 'Yesterday' },
  { query: 'Draft talking points for NPO partner meeting', time: '2 days ago' },
  { query: 'Tax implications of appreciated stock donations', time: '3 days ago' },
];

export default function AskThompsonOS() {
  const [messages, setMessages] = useState(MOCK_CONVERSATION);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Thank you for your question. In a production environment, Thompson OS would leverage AI to provide contextual, donor-specific guidance drawing from your firm\'s methodology, donor profiles, and estate planning best practices. This is a demonstration of the conversational interface.',
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (text) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <AppShell>
      <div className="flex-1 overflow-hidden flex animate-fadeIn">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal to-emerald flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-serif text-navy tracking-tight">Ask Thompson OS</h1>
                <p className="text-xs text-muted">AI-powered estate planning assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-emerald flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    msg.role === 'user'
                      ? 'bg-navy text-white rounded-br-md'
                      : 'bg-white border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="text-sm text-charcoal leading-relaxed prose prose-sm max-w-none [&_strong]:text-navy [&_em]:text-charcoal/80 [&_hr]:my-3 [&_hr]:border-border">
                      {msg.content.split('\n').map((line, j) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <p key={j} className="font-serif font-semibold text-navy mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
                        }
                        if (line === '---') {
                          return <hr key={j} />;
                        }
                        if (line.startsWith('*"') || line.startsWith('"')) {
                          return <p key={j} className="italic text-charcoal/80 leading-relaxed">{line.replace(/^\*|\*$/g, '')}</p>;
                        }
                        if (line === '') return <br key={j} />;
                        return <p key={j} className="mb-1.5">{line}</p>;
                      })}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={16} className="text-navy" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-emerald flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white border border-border rounded-2xl rounded-bl-md px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-teal/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-teal/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-teal/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 3 && (
            <div className="px-6 pb-3">
              <div className="flex gap-2 flex-wrap">
                {SUGGESTED_PROMPTS.map((prompt, i) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handlePromptClick(prompt.text)}
                      className="flex items-center gap-2 text-xs text-muted bg-white border border-border rounded-full px-3 py-2 hover:border-teal/40 hover:text-teal transition-all duration-200 hover:shadow-sm"
                    >
                      <Icon size={13} />
                      <span className="truncate max-w-[250px]">{prompt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="px-6 pb-6 pt-3 border-t border-border bg-white/50">
            <div className="flex items-end gap-3 bg-white border border-border rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-teal/20 focus-within:border-teal transition-all duration-200">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about donor strategies, SVO drafting, estate planning structures..."
                rows={1}
                className="flex-1 resize-none text-sm text-charcoal placeholder:text-muted/50 focus:outline-none bg-transparent leading-relaxed max-h-32"
                style={{ minHeight: '24px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                  input.trim() && !isTyping
                    ? 'bg-teal text-white hover:bg-teal-dark active:scale-95'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-muted/60 text-center mt-2">
              Thompson OS AI draws from your firm's methodology and donor profiles. Always verify recommendations.
            </p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:flex w-72 flex-col border-l border-border bg-white/50">
          <div className="p-5 border-b border-border">
            <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-1">Recent Queries</h2>
            <div className="w-10 h-0.5 bg-teal rounded" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {RECENT_QUERIES.map((q, i) => (
              <button
                key={i}
                onClick={() => handlePromptClick(q.query)}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-navy/5 transition-colors duration-200 group"
              >
                <p className="text-xs text-charcoal leading-relaxed line-clamp-2 group-hover:text-navy transition-colors duration-200">
                  {q.query}
                </p>
                <p className="text-[10px] text-muted mt-1 flex items-center gap-1">
                  <Clock size={10} /> {q.time}
                </p>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="bg-navy/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-teal" />
                <h3 className="text-xs font-serif font-semibold text-navy">Pro Tip</h3>
              </div>
              <p className="text-[11px] text-charcoal/70 leading-relaxed">
                Reference specific donors by name to get personalized guidance based on their intake data and values profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
