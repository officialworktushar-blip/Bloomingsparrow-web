'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="sticky top-0 z-[100] bg-[#FAFAFA]/95 backdrop-blur-md border-b border-gray-200 py-2.5 px-4">
      <form className="relative max-w-[640px] mx-auto" role="search" onSubmit={handleSearch}>
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input 
          type="search" 
          id="search-input" 
          placeholder="Search art, craft, category…" 
          aria-label="Search" 
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-[42px] rounded-full border-[1.5px] border-gray-200 bg-white pl-[2.8rem] pr-5 text-[0.875rem] text-gray-900 outline-none transition-all focus:border-gray-900 focus:shadow-[0_0_0_3px_rgba(17,17,17,0.06)] placeholder:text-gray-400"
        />
      </form>
    </div>
  );
}
