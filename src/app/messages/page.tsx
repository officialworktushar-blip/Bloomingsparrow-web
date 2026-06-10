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
    <main className={`inner-page msg-layout ${activeThread ? 'thread-selected' : ''}`} id="main-content">
      {/* Thread list */}
      <div className="msg-sidebar" id="msg-sidebar" role="list" aria-label="Message threads">
        <div className="msg-sidebar-header">
          <h1 className="page-title" style={{ fontSize: '1.5rem' }}>Messages</h1>
        </div>

        <div className={`msg-thread ${activeThread === 1 ? 'active' : ''}`} role="listitem" tabIndex={0} onClick={() => setActiveThread(1)} aria-label="Blooming Sparrow Team">
          <div className="thread-avatar"><img src="/images/logo.png" alt="Blooming Sparrow" /></div>
          <div className="thread-info">
            <div className="thread-name">Blooming Sparrow Team</div>
            <div className="thread-preview">Your enquiry about "Brass Temple Bell" has been received…</div>
          </div>
          <div className="thread-meta">
            <div className="thread-time">2h ago</div>
            <div className="thread-badge">2</div>
          </div>
        </div>

        <div className={`msg-thread ${activeThread === 2 ? 'active' : ''}`} role="listitem" tabIndex={0} onClick={() => setActiveThread(2)} aria-label="Khatri Family Workshop">
          <div className="thread-avatar thread-avatar--art"><img src="/images/rogan_1.png" alt="Rogan Art" /></div>
          <div className="thread-info">
            <div className="thread-name">Khatri Family Workshop</div>
            <div className="thread-preview">Namaste! We are happy to answer your questions about…</div>
          </div>
          <div className="thread-meta">
            <div className="thread-time">Yesterday</div>
          </div>
        </div>

        <div className={`msg-thread ${activeThread === 3 ? 'active' : ''}`} role="listitem" tabIndex={0} onClick={() => setActiveThread(3)} aria-label="Artisan Support">
          <div className="thread-avatar thread-avatar--support">♻</div>
          <div className="thread-info">
            <div className="thread-name">Artisan Support</div>
            <div className="thread-preview">Thank you for your order enquiry. We will ship within…</div>
          </div>
          <div className="thread-meta">
            <div className="thread-time">3 days ago</div>
          </div>
        </div>

        <div className="msg-empty-threads">
          <p>Start a conversation by enquiring<br/>about any art piece.</p>
          <Link href="/" className="wl-browse-btn" style={{ marginTop: '.75rem' }}>Browse Gallery</Link>
        </div>
      </div>

      {/* Chat window */}
      <div className="msg-chat" id="msg-chat" role="main" aria-label="Chat window">
        <div className="chat-header" id="chat-header">
          <div className="chat-avatar"><img src="/images/logo.png" alt="Blooming Sparrow" /></div>
          <div className="chat-info">
            <div className="chat-name">Blooming Sparrow Team</div>
            <div className="chat-status">Typically replies within 24 hours</div>
          </div>
        </div>

        <div className="chat-messages" id="chat-messages" role="log" aria-live="polite">
          <div className="chat-date-divider">Today</div>

          {activeThread === 1 ? messages.map((m) => (
            <div key={m.id} className={`chat-msg ${m.isMe ? 'chat-msg--me' : 'chat-msg--them'}`}>
              <div className="msg-bubble">{m.text}</div>
              <div className="msg-time">{m.time}</div>
            </div>
          )) : (
            <div className="chat-msg chat-msg--them">
              <div className="msg-bubble">This thread is currently empty in the demo.</div>
              <div className="msg-time">Just now</div>
            </div>
          )}
          <div ref={msgsEndRef} />
        </div>

        <form className="chat-input-wrap" id="chat-form" onSubmit={sendMessage} noValidate>
          <input 
            type="text" 
            id="chat-input" 
            className="chat-input" 
            placeholder="Type a message…" 
            aria-label="Type a message" 
            autoComplete="off"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="chat-send" id="chat-send" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>
    </main>
  );
}
