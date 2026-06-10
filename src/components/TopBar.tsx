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
    <div className="top-bar">
      <form className="search-wrap" role="search" onSubmit={handleSearch}>
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
        />
      </form>
    </div>
  );
}
