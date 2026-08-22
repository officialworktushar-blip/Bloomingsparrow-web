'use client';

import { useState } from 'react';

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type Props = {
  items: AccordionItem[];
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);

  if (!item.content || item.content.trim() === '') return null;

  return (
    <div className="border-b border-[#E4DED3] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-4 sm:px-0 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="text-[0.8rem] font-semibold tracking-[0.08em] uppercase text-[#1C1A18] font-sans group-hover:text-[#8C8477] transition-colors">
          {item.title}
        </span>
        <ChevronIcon open={open} />
      </button>
      <div
        className="accordion-content"
        style={{ maxHeight: open ? '600px' : '0', opacity: open ? 1 : 0 }}
        role="region"
      >
        <div className="pb-4 px-4 sm:px-0 text-[0.875rem] text-[#8C8477] leading-[1.7] font-sans whitespace-pre-line">
          {item.content}
        </div>
      </div>
    </div>
  );
}

export default function ProductAccordion({ items }: Props) {
  const visible = items.filter(i => i.content && i.content.trim() !== '');
  if (visible.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#E4DED3] bg-white overflow-hidden mb-8">
      {visible.map(item => (
        <AccordionRow key={item.id} item={item} />
      ))}
    </div>
  );
}
