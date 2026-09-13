import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { readHubPlan, tk } from './data';

interface HealthChatProps {
  paid: boolean;
  onUnlock: () => void;
  name: string;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const HealthChat: React.FC<HealthChatProps> = ({ paid, onUnlock, name }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', text: t(tk('hub.chat.greeting')).replace('{name}', name) }]);
    }
  }, [open, messages.length, name, t]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const reply = (q: string): string => {
    const plan = readHubPlan();
    const foods = Array.isArray(plan?.foodNames) ? plan.foodNames.slice(0, 3) : [];
    const ql = q.toLowerCase();
    if (ql.includes('eat') || ql.includes('food') || ql.includes('meal') || ql.includes('اكل') || ql.includes('باكال')) {
      return foods.length > 0
        ? `🍽️ ${foods.join(' · ')}`
        : t('hub.chat.sub');
    }
    if (ql.includes('exercise') || ql.includes('workout') || ql.includes('tamrin') || ql.includes('تمرين')) {
      const ids = Array.isArray(plan?.exerciseIds) ? plan.exerciseIds.slice(0, 3) : [];
      return ids.length > 0 ? `🏃 ${ids.join(' · ')}` : t('hub.chat.sub');
    }
    if (ql.includes('score') || ql.includes('health') || ql.includes('صحة')) {
      const overall = typeof plan?.overall === 'number' ? plan.overall : null;
      return overall !== null ? `📊 ${t('hub.projection').toLowerCase()}: ${overall}/100` : t('hub.chat.sub');
    }
    return t('hub.chat.sub');
  };

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: reply(q) }]);
    }, 400);
  };

  if (!paid) {
    return (
      <button
        type="button"
        onClick={onUnlock}
        aria-label="Chat"
        className="fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#0F4C3A] shadow-[0_14px_34px_-10px_rgba(212,175,55,0.8)] transition hover:scale-105"
      >
        <MessageCircle size={22} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[88vw] max-w-sm overflow-hidden rounded-3xl border border-[#EFEBE4] bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#0F4C3A] px-5 py-4">
            <div>
              <p className="text-sm font-extrabold text-[#FDFBF7]">{t('hub.chat')}</p>
              <p className="text-[11px] text-[#FDFBF7]/70">{t('hub.chat.sub')}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-[#FDFBF7]/80 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div ref={listRef} className="flex h-72 flex-col gap-3 overflow-y-auto px-4 py-4 bg-[#F4F1EB]/40">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'self-end rounded-br-sm bg-[#0F4C3A] text-[#FDFBF7]'
                    : 'self-start rounded-bl-sm bg-white border border-[#EFEBE4] text-[#4A5A55]'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-[#EFEBE4] px-4 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send();
              }}
              placeholder={t('hub.chat.placeholder')}
              className="flex-1 rounded-xl border border-[#EFEBE4] bg-[#F4F1EB]/40 px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37]"
            />
            <button
              type="button"
              onClick={send}
              aria-label="Send"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0F4C3A] transition hover:bg-[#c9a52e]"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#0F4C3A] shadow-[0_14px_34px_-10px_rgba(212,175,55,0.8)] transition hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
};

export default HealthChat;