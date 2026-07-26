'use client';

import { useState } from 'react';

type InfoItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: string;
};

function buildItems(description?: string): InfoItem[] {
  const items: InfoItem[] = [];

  if (description && description.trim() !== '') {
    items.push({
      id: 'description',
      label: 'Description',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      content: description,
    });
  }

  items.push(
    {
      id: 'delivery-info',
      label: 'Delivery Information',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <path d="M16 8h4l3 5v5a1 1 0 01-1 1h-2" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      content:
        'We offer free shipping across India on all orders. Orders are typically dispatched within 2–3 business days. Delivery timelines may vary based on your location — metro cities usually receive orders within 5–7 business days, while other areas may take 7–10 business days. You will receive a tracking link via email once your order is shipped.',
    },
    {
      id: 'shipping-details',
      label: 'Shipping Details',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      content:
        'Each handcrafted item is carefully wrapped in protective packaging to ensure it reaches you in perfect condition. We ship via trusted courier partners with end-to-end tracking. International shipping is available for select countries — please contact us for rates and estimated delivery times before placing an order.',
    },
    {
      id: 'how-to-care',
      label: 'How To Care',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      content:
        'Being handcrafted, each piece is unique and deserves gentle care. Keep away from direct sunlight and moisture to preserve colours and textures. For leather items, occasionally condition with a leather balm. For painted or lacquered pieces, wipe gently with a soft dry cloth. Avoid harsh chemicals or abrasive cleaners. Store in a cool, dry place when not in use.',
    },
  );

  return items;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function AccordionRow({ item }: { item: InfoItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E4DED3] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center px-4 py-4 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="flex items-center justify-center w-5 h-5 shrink-0 text-[#8C8477] transition-colors group-hover:text-[#1C1A18]">
          {item.icon}
        </span>
        <span className="ml-3 flex-1 min-w-0 text-[0.8rem] font-semibold tracking-[0.08em] uppercase text-[#1C1A18] font-sans whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-[#8C8477] transition-colors">
          {item.label}
        </span>
        <span className="ml-4 shrink-0">
          <ChevronIcon open={open} />
        </span>
      </button>
      <div
        className="accordion-content"
        style={{ maxHeight: open ? '600px' : '0', opacity: open ? 1 : 0 }}
        role="region"
      >
        <div className="px-4 pb-4 pl-[52px] text-[0.8rem] text-[#8C8477] leading-[1.8] font-sans">
          {item.content}
        </div>
      </div>
    </div>
  );
}

export default function ProductInfoAccordion({ description }: { description?: string }) {
  const items = buildItems(description);

  return (
    <div className="rounded-xl border border-[#E4DED3] bg-white overflow-hidden mb-8">
      {items.map(item => (
        <AccordionRow key={item.id} item={item} />
      ))}
    </div>
  );
}
