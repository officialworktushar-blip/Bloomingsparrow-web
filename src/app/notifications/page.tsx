'use client';

import { useState } from 'react';

export default function NotificationsPage() {
  const [read, setRead] = useState(false);

  const markAllRead = () => {
    setRead(true);
  };

  return (
    <main className="p-8 pb-16 max-w-[860px] mx-auto w-full" id="main-content">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h1 className="font-serif text-[2rem] font-normal text-gray-900">Notifications</h1>
        <button 
          className="text-[0.8rem] text-gray-500 bg-transparent border-none cursor-pointer font-sans transition-colors duration-200 hover:text-gray-900" 
          id="mark-all-btn" 
          onClick={markAllRead}
          style={read ? { color: '#287379' } : undefined}
        >
          {read ? 'All read ✓' : 'Mark all as read'}
        </button>
      </div>

      <div className="flex flex-col gap-2" id="notif-list" role="list">
        <div className={`flex items-center gap-4 py-4 px-5 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] cursor-default border-l-[3px] border-transparent hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:translate-x-[2px] ${!read ? '!border-l-[#287379] !bg-[#fffdf8]' : ''}`} role="listitem" tabIndex={0}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 bg-[#e8e7d5] text-[#287379]">✦</div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.875rem] text-gray-900 leading-[1.5]"><strong>New Arrival:</strong> "Peacock Rogan Canvas" has just been added to our Rogan Art collection.</div>
            <div className="text-[0.75rem] text-gray-400 mt-1">2 hours ago</div>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0"><img className="w-full h-full object-cover" src="/images/rogan_1.png" alt="Peacock Rogan Canvas" /></div>
        </div>
        <div className={`flex items-center gap-4 py-4 px-5 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] cursor-default border-l-[3px] border-transparent hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:translate-x-[2px] ${!read ? '!border-l-[#287379] !bg-[#fffdf8]' : ''}`} role="listitem" tabIndex={0}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 bg-[#e8f4ff] text-[#4a90d9]">✉</div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.875rem] text-gray-900 leading-[1.5]"><strong>Enquiry Received:</strong> Thank you for your enquiry about "Brass Temple Bell". Our team will respond within 24 hours.</div>
            <div className="text-[0.75rem] text-gray-400 mt-1">Yesterday, 4:30 PM</div>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0"><img className="w-full h-full object-cover" src="/images/bell_1.png" alt="Brass Temple Bell" /></div>
        </div>
        <div className="flex items-center gap-4 py-4 px-5 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] cursor-default border-l-[3px] border-transparent hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:translate-x-[2px]" role="listitem" tabIndex={0}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 bg-[#f0f8ee] text-[#5a9e4a]">%</div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.875rem] text-gray-900 leading-[1.5]"><strong>Special Offer:</strong> Free shipping on all Shola Art orders this week. Explore our collection today!</div>
            <div className="text-[0.75rem] text-gray-400 mt-1">2 days ago</div>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0"><img className="w-full h-full object-cover" src="/images/shola_1.png" alt="Shola Art" /></div>
        </div>
        <div className="flex items-center gap-4 py-4 px-5 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] cursor-default border-l-[3px] border-transparent hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:translate-x-[2px]" role="listitem" tabIndex={0}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 bg-[#e8e7d5] text-[#287379]">✦</div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.875rem] text-gray-900 leading-[1.5]"><strong>New Collection:</strong> Our Bird Making series has expanded — 2 new handcrafted sculptures are now available.</div>
            <div className="text-[0.75rem] text-gray-400 mt-1">3 days ago</div>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0"><img className="w-full h-full object-cover" src="/images/bird_2.png" alt="Bird Making" /></div>
        </div>
        <div className="flex items-center gap-4 py-4 px-5 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] cursor-default border-l-[3px] border-transparent hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:translate-x-[2px]" role="listitem" tabIndex={0}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 bg-[#fff0f0] text-[#e05252]">♡</div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.875rem] text-gray-900 leading-[1.5]"><strong>Wishlist Alert:</strong> "Wire Peacock Sculpture" is in high demand. Limited pieces available.</div>
            <div className="text-[0.75rem] text-gray-400 mt-1">4 days ago</div>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0"><img className="w-full h-full object-cover" src="/images/bird_2.png" alt="Wire Peacock" /></div>
        </div>
        <div className="flex items-center gap-4 py-4 px-5 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] cursor-default border-l-[3px] border-transparent hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:translate-x-[2px]" role="listitem" tabIndex={0}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 bg-[#f0f8ee] text-[#5a9e4a]">★</div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.875rem] text-gray-900 leading-[1.5]"><strong>Welcome to Blooming Sparrow!</strong> Discover India's most exquisite handcrafted arts across 7 curated collections.</div>
            <div className="text-[0.75rem] text-gray-400 mt-1">1 week ago</div>
          </div>
          <div className="w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0"><img className="w-full h-full object-contain p-2" src="/images/logo.png" alt="Blooming Sparrow" /></div>
        </div>
      </div>
    </main>
  );
}
