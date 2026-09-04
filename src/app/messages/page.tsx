'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState(1);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Blooming Sparrow! 🌟 How can we help you today?", time: "10:00 AM", isMe: false },
    { id: 2, text: "Hi! I'm interested in the Brass Temple Bell. Is it still available?", time: "10:15 AM", isMe: true },
    { id: 3, text: "Yes, the Brass Temple Bell is available! It is handcast by our Thathera artisans in Varanasi. Would you like to know more about its dimensions or customisation options?", time: "10:17 AM", isMe: false },
    { id: 4, text: "That sounds wonderful. What is the shipping time to Mumbai?", time: "10:22 AM", isMe: true },
    { id: 5, text: "Shipping to Mumbai typically takes 3–5 business days. We use insured courier service and each piece is carefully packed in protective material. 📦", time: "10:24 AM", isMe: false }
  ]);
  
  const msgsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeThread]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const now = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    const newMsg = { id: Date.now(), text: inputText.trim(), time: now, isMe: true };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      const replyNow = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
      setMessages(prev => [...prev, { id: Date.now(), text: "Thank you for your message! Our team will get back to you shortly. 🙏", time: replyNow, isMe: false }]);
    }, 1200);
  };

  return (
    <main className="flex flex-col md:flex-row gap-0 p-0 max-w-none h-auto md:h-[calc(100vh-148px)] overflow-visible md:overflow-hidden w-full mx-auto" id="main-content">
      {/* Thread list */}
      <div className="w-full md:w-[320px] md:min-w-[260px] shrink-0 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col bg-white overflow-y-auto" id="msg-sidebar" role="list" aria-label="Message threads">
        <div className="pt-5 pb-3 px-5 border-b border-gray-200">
          <h1 className="font-serif text-gray-900 font-normal" style={{ fontSize: '1.5rem' }}>Messages</h1>
        </div>

        <div className={`flex items-center gap-3.5 py-4 px-5 cursor-pointer transition-all duration-[220ms] border-b border-gray-200 hover:bg-[#fcf7f3] ${activeThread === 1 ? '!bg-[#e8e7d5]' : ''}`} role="listitem" tabIndex={0} onClick={() => setActiveThread(1)} aria-label="Blooming Sparrow Team">
          <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-[#fcf7f3]"><img className="w-full h-full object-contain" src="/images/logo.png" alt="Blooming Sparrow" /></div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.9rem] font-medium text-gray-900 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Blooming Sparrow Team</div>
            <div className="text-[0.8rem] text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">Your enquiry about "Brass Temple Bell" has been received…</div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="text-[0.72rem] text-gray-400">2h ago</div>
            <div className="bg-[#287379] text-white text-[0.7rem] font-semibold py-[0.15rem] px-2 rounded-[10px] min-w-[20px] text-center">2</div>
          </div>
        </div>

        <div className={`flex items-center gap-3.5 py-4 px-5 cursor-pointer transition-all duration-[220ms] border-b border-gray-200 hover:bg-[#fcf7f3] ${activeThread === 2 ? '!bg-[#e8e7d5]' : ''}`} role="listitem" tabIndex={0} onClick={() => setActiveThread(2)} aria-label="Khatri Family Workshop">
          <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-[#fcf7f3]"><img className="w-full h-full object-cover" src="/images/rogan_1.png" alt="Rogan Art" /></div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.9rem] font-medium text-gray-900 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Khatri Family Workshop</div>
            <div className="text-[0.8rem] text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">Namaste! We are happy to answer your questions about…</div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="text-[0.72rem] text-gray-400">Yesterday</div>
          </div>
        </div>

        <div className={`flex items-center gap-3.5 py-4 px-5 cursor-pointer transition-all duration-[220ms] border-b border-gray-200 hover:bg-[#fcf7f3] ${activeThread === 3 ? '!bg-[#e8e7d5]' : ''}`} role="listitem" tabIndex={0} onClick={() => setActiveThread(3)} aria-label="Artisan Support">
          <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-[1.1rem] shrink-0">♻</div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.9rem] font-medium text-gray-900 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Artisan Support</div>
            <div className="text-[0.8rem] text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">Thank you for your order enquiry. We will ship within…</div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="text-[0.72rem] text-gray-400">3 days ago</div>
          </div>
        </div>

        <div className="py-8 px-5 text-center text-gray-500 text-[0.85rem] leading-[1.6] flex flex-col items-center">
          <p>Start a conversation by enquiring<br/>about any art piece.</p>
          <Link href="/" className="inline-flex items-center py-[0.55rem] px-[1.4rem] rounded-full bg-gray-900 text-white text-[0.85rem] font-medium font-sans transition-all hover:bg-[#287379]" style={{ marginTop: '.75rem' }}>Browse Gallery</Link>
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#fcf7f3] h-[60vh] md:h-auto" id="msg-chat" role="main" aria-label="Chat window">
        <div className="flex items-center gap-3.5 py-3.5 px-5 border-b border-gray-200 bg-white shrink-0" id="chat-header">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#fcf7f3]"><img className="w-full h-full object-contain" src="/images/logo.png" alt="Blooming Sparrow" /></div>
          <div className="chat-info">
            <div className="text-[0.9rem] font-medium text-gray-900">Blooming Sparrow Team</div>
            <div className="text-[0.75rem] text-gray-400">Typically replies within 24 hours</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-5 flex flex-col gap-3" id="chat-messages" role="log" aria-live="polite">
          <div className="text-center text-[0.72rem] text-gray-400 my-2 tracking-[0.06em] uppercase">Today</div>

          {activeThread === 1 ? messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[72%] py-3 px-4 rounded-[18px] text-[0.875rem] leading-[1.55] ${m.isMe ? 'bg-gray-900 text-white rounded-br-[4px]' : 'bg-white rounded-tl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.07)]'}`}>{m.text}</div>
              <div className="text-[0.7rem] text-gray-400 mt-1 px-1">{m.time}</div>
            </div>
          )) : (
            <div className="flex flex-col items-start">
              <div className="max-w-[72%] py-3 px-4 rounded-[18px] text-[0.875rem] leading-[1.55] bg-white rounded-tl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.07)]">This thread is currently empty in the demo.</div>
              <div className="text-[0.7rem] text-gray-400 mt-1 px-1">Just now</div>
            </div>
          )}
          <div ref={msgsEndRef} />
        </div>

        <form className="flex items-center gap-3 py-3.5 px-5 border-t border-gray-200 bg-white shrink-0" id="chat-form" onSubmit={sendMessage} noValidate>
          <input 
            type="text" 
            id="chat-input" 
            className="flex-1 h-[42px] rounded-full border-[1.5px] border-gray-200 px-4 font-sans text-[0.875rem] text-gray-900 outline-none transition-all duration-[220ms] bg-[#fcf7f3] focus:border-gray-900 focus:bg-white" 
            placeholder="Type a message…" 
            aria-label="Type a message" 
            autoComplete="off"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center border-none cursor-pointer transition-all duration-[220ms] shrink-0 hover:bg-[#287379] hover:scale-105" id="chat-send" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>
    </main>
  );
}
