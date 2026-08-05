'use client';

import { useState } from 'react';

type DeliveryResult = {
  available: boolean;
  date?: string;
  message?: string;
};

export default function ProductDeliveryCheck() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<DeliveryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = async () => {
    const trimmed = pincode.trim();
    if (!trimmed || trimmed.length < 4) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://api.bloomingsparrow.com'}/api/public/delivery-check?pincode=${trimmed}`
      );
      if (res.ok) {
        const data = await res.json();
        setResult({
          available: data.available ?? true,
          date: data.date || data.estimatedDate || '',
          message: data.message || '',
        });
      } else {
        const now = new Date();
        now.setDate(now.getDate() + 7);
        setResult({
          available: true,
          date: now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
          message: 'Estimated delivery',
        });
      }
    } catch {
      const now = new Date();
      now.setDate(now.getDate() + 7);
      setResult({
        available: true,
        date: now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
        message: 'Estimated delivery',
      });
    }
    setLoading(false);
    setChecked(true);
  };

  return (
    <div className="rounded-2xl border border-[#E4DED3] bg-white p-5 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-8 rounded-full bg-[#F7F3EC] border border-[#E4DED3] flex items-center justify-center text-[#B5533C]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="1" y="3" width="15" height="13" rx="1" />
            <path d="M16 8h4l3 5v5a1 1 0 01-1 1h-2" />
            <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        </span>
        <div>
          <span className="block text-[0.8rem] font-medium text-[#1C1A18] font-sans">Delivery</span>
          <span className="block text-[0.68rem] text-[#8C8477] font-sans">Check estimated arrival at your pincode</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ''));
            if (checked) { setResult(null); setChecked(false); }
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleCheck(); }}
          className="flex-1 h-10 rounded-lg border border-[#E4DED3] bg-[#F7F3EC] px-3 text-[0.85rem] text-[#1C1A18] outline-none font-sans transition-all focus:border-[#1C1A18]"
          aria-label="Enter pincode for delivery check"
        />
        <button
          onClick={handleCheck}
          disabled={loading || pincode.trim().length < 4}
          className="h-10 px-5 rounded-lg bg-[#1C1A18] text-white text-[0.8rem] font-medium font-sans transition-all hover:bg-[#2E2B27] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Checking…' : 'Check'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.75rem] text-[#8C8477] font-sans">
        <span className="flex items-center gap-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Free shipping
        </span>
        <span className="flex items-center gap-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Easy 7-day returns
        </span>
      </div>

      {checked && result && (
        <div className="mt-3 pt-3 border-t border-[#E4DED3]" role="status" aria-live="polite">
          {result.available ? (
            <div className="flex items-center gap-2 text-[0.8rem] font-sans">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4B5D45" strokeWidth="2" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-[#4B5D45] font-medium">
                {result.message || 'Delivery available'}
                {result.date && ` — Est. ${result.date}`}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[0.8rem] font-sans">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B5533C" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span className="text-[#B5533C]">{result.message || 'Delivery not available for this pincode'}</span>
            </div>
          )}
        </div>
      )}

      {checked && !result && (
        <div className="mt-3 pt-3 border-t border-[#E4DED3]" role="status" aria-live="polite">
          <span className="text-[0.8rem] text-[#8C8477] font-sans">Could not verify delivery. Please try again.</span>
        </div>
      )}
    </div>
  );
}
