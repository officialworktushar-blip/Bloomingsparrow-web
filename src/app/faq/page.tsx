'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type FAQItem = { q: string; a: string };
type FAQSection = { title: string; items: FAQItem[] };

const SECTIONS: FAQSection[] = [
  {
    title: 'Orders & Payment',
    items: [
      {
        q: 'How do I place an order?',
        a: 'Simply browse our collection, add the items you love to your cart, and proceed to checkout. You can pay via UPI, credit/debit cards, net banking, wallets, or choose Cash on Delivery where available. You will receive an order confirmation email immediately after placing your order.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), net banking, and popular digital wallets. Cash on Delivery (COD) is available for select pin codes. All online payments are processed through a secure, PCI-compliant payment gateway.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'You can request a modification or cancellation within 24 hours of placing your order, provided it has not yet been dispatched. Email us at bloomingsparrow@gmail.com with your order ID and the changes you need. Once an order is dispatched, it cannot be cancelled — but you can return it after delivery.',
      },
      {
        q: 'Is it safe to enter my card details on your website?',
        a: 'Absolutely. We use industry-standard SSL encryption and a PCI-compliant payment gateway. Your card details are never stored on our servers — they are processed directly by the payment provider.',
      },
      {
        q: 'Will I receive an order confirmation?',
        a: 'Yes. You will receive an instant order confirmation via email and SMS after placing your order. This includes your order ID, items ordered, and payment details. If you do not receive a confirmation, please check your spam folder or contact us.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Orders are typically processed and dispatched within 2–3 business days. After dispatch, metro city deliveries take approximately 3–5 business days, while tier-2 and tier-3 cities may take 5–7 business days. Remote or rural areas may take up to 10 business days. Delivery timelines shown at checkout are estimates and not guaranteed.',
      },
      {
        q: 'Do you ship pan-India?',
        a: 'Yes, we deliver to all serviceable pin codes across India. During checkout, enter your pin code to confirm delivery availability for your area. If your pin code is not serviceable, we will notify you and offer a full refund.',
      },
      {
        q: 'Is shipping really free?',
        a: 'Yes, we offer free standard shipping on every order — no minimum order value, no hidden charges. The price you see at checkout is the final price you pay.',
      },
      {
        q: 'How do I track my order?',
        a: 'Once your order is shipped, you will receive a tracking link via email and SMS. You can also log in to your account and check the status under "Track My Order" in your profile dashboard.',
      },
      {
        q: 'What if my package is delayed, lost, or damaged in transit?',
        a: 'While we work with reliable courier partners, delays can occasionally happen. If your order is significantly delayed beyond the estimated date, contact us and we will investigate with the shipping partner. If a package arrives damaged, please report it within 48 hours with photos — we will arrange a replacement or full refund. For lost packages, we will reship the order or issue a complete refund.',
      },
    ],
  },
  {
    title: 'Product & Craftsmanship',
    items: [
      {
        q: 'Are these products really handmade?',
        a: 'Yes, every product on Blooming Sparrow is handcrafted by skilled Indian artisans. From Rogan art painted with castor-oil-based pigments to hand-hammered copper bells and terracotta bird sculptures, each piece is made using traditional techniques passed down through generations.',
      },
      {
        q: 'Will my product look exactly like the photo?',
        a: 'Because each item is handmade, slight variations in colour, texture, and detailing are natural and part of what makes your piece unique. We photograph products as accurately as possible, but minor differences between the photo and the actual item are a hallmark of genuine handcraft — not a defect.',
      },
      {
        q: 'How do I care for my handcrafted item?',
        a: 'Care depends on the material. Generally: keep items away from direct sunlight and moisture to preserve colours. For leather goods, periodically condition with a leather balm. For painted or lacquered pieces, wipe gently with a soft dry cloth. Avoid harsh chemicals or abrasive cleaners. Detailed care instructions are included with each product where applicable.',
      },
      {
        q: 'Who are the artisans behind these products?',
        a: 'We work directly with artisan communities across India — the Khatri family workshop in Kutch for Rogan art, Thathera brass artisans in Varanasi, Krishnanagar clay artists in West Bengal, and many more. Each product page lists the specific artisan or workshop that created it.',
      },
      {
        q: 'Do you offer gift packaging?',
        a: 'Currently, all orders are shipped in protective packaging designed to keep handcrafted items safe during transit. We are working on introducing premium gift packaging options soon. For special gifting requests, email us at bloomingsparrow@gmail.com and we will do our best to accommodate.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 7-day return policy from the date of delivery. If you are not satisfied with your purchase for any reason, you can initiate a return within 7 days of receiving your order.',
      },
      {
        q: 'How do I request a return?',
        a: 'Email us at bloomingsparrow@gmail.com with your order ID, the item you wish to return, and the reason. Our team will review your request and provide return instructions, including the pickup address and packaging guidance. You can also reach us through the Contact Us page on our website.',
      },
      {
        q: 'When will I get my refund?',
        a: 'Once we receive and inspect the returned item, refunds are processed within 5–7 business days. The amount is credited to your original payment method. For COD orders, refunds are transferred via bank transfer — please provide your bank details when initiating the return.',
      },
      {
        q: 'What conditions must returned items meet?',
        a: 'Items must be unused, in their original packaging, and in the same condition as received. Handcrafted products may have natural variations in texture, colour, or finish — these are characteristics of genuine artisan work, not defects, and do not qualify as grounds for return.',
      },
      {
        q: 'Are all items eligible for return?',
        a: 'Most items are eligible. However, customised or personalised items cannot be returned unless they arrive damaged or defective. Items returned after the 7-day window or without original packaging may not qualify for a full refund.',
      },
    ],
  },
  {
    title: 'Account & Support',
    items: [
      {
        q: 'How do I contact customer support?',
        a: 'You can reach us at bloomingsparrow@gmail.com or through the Contact Us button on our FAQ and product pages. We respond to all enquiries within 24 hours during business days (Monday–Saturday). For urgent order issues, please include your order ID in the subject line.',
      },
      {
        q: 'Do I need an account to place an order?',
        a: 'No, you can check out as a guest. However, creating an account lets you track orders, save your wishlist, view order history, and enjoy a faster checkout experience on future purchases.',
      },
      {
        q: 'How do I create an account?',
        a: 'Click the profile icon in the top-right corner of any page and select "Register." You can sign up with your email address or log in through your existing account to access your dashboard, wishlist, and order history.',
      },
      {
        q: 'I forgot my password — how do I reset it?',
        a: 'On the login page, click "Forgot Password" and enter your registered email address. You will receive a password reset link within a few minutes. If you do not receive the email, check your spam folder or contact support.',
      },
      {
        q: 'How do I update my account details?',
        a: 'Log in to your account, go to your profile dashboard, and edit your name, email, phone number, or saved addresses. Changes take effect immediately.',
      },
    ],
  },
];

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

function FAQRow({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E4DED3] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="flex-1 pr-4 text-[0.85rem] font-semibold text-[#1C1A18] font-sans leading-snug group-hover:text-[#8C8477] transition-colors">
          {item.q}
        </span>
        <ChevronIcon open={open} />
      </button>
      <div
        className="accordion-content"
        style={{ maxHeight: open ? '600px' : '0', opacity: open ? 1 : 0 }}
        role="region"
      >
        <div className="pb-4 px-5 text-[0.82rem] text-[#8C8477] leading-[1.8] font-sans">
          {item.a}
        </div>
      </div>
    </div>
  );
}

function FAQSectionBlock({ section, filter }: { section: FAQSection; filter: string }) {
  const filtered = useMemo(() => {
    if (!filter.trim()) return section.items;
    const lower = filter.toLowerCase();
    return section.items.filter(
      item => item.q.toLowerCase().includes(lower) || item.a.toLowerCase().includes(lower),
    );
  }, [section.items, filter]);

  if (filtered.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="font-serif text-[1.4rem] sm:text-[1.6rem] font-semibold text-[#1C1A18] mb-4">
        {section.title}
      </h2>
      <div className="rounded-xl border border-[#E4DED3] bg-white overflow-hidden">
        {filtered.map((item, i) => (
          <FAQRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState('');

  return (
    <main className="bg-[#F7F3EC] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-16 sm:py-20">
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[#8C8477] font-medium font-sans">
            <li><Link href="/" className="hover:text-[#1C1A18] transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-[#E4DED3]">/</li>
            <li className="text-[#1C1A18]">FAQs</li>
          </ol>
        </nav>

        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] font-semibold text-[#1C1A18] mb-4">
          Frequently Asked Questions
        </h1>
        <div className="w-12 h-[2px] bg-[#C8A96E] mb-6" />
        <p className="text-[0.95rem] leading-relaxed text-[#8C8477] font-sans mb-8">
          Find answers to common questions about ordering, shipping, products, and more.
        </p>

        <div className="relative mb-10">
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#8C8477" strokeWidth="2" className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search questions…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-11 rounded-full border border-[#E4DED3] bg-white pl-10 pr-4 text-[0.85rem] text-[#1C1A18] placeholder-[#8C8477] outline-none font-sans transition-all focus:border-[#1C1A18]"
            aria-label="Search frequently asked questions"
          />
        </div>

        {SECTIONS.map((section, i) => (
          <FAQSectionBlock key={i} section={section} filter={search} />
        ))}

        {!SECTIONS.some(s => {
          const lower = search.toLowerCase();
          return !search.trim() || s.items.some(
            item => item.q.toLowerCase().includes(lower) || item.a.toLowerCase().includes(lower),
          );
        }) && (
          <div className="text-center py-12">
            <p className="text-[0.9rem] text-[#8C8477] font-sans">No matching questions found. Try a different search term.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-[0.85rem] text-[#8C8477] font-sans mb-3">
            Still have questions?
          </p>
          <a
            href="mailto:bloomingsparrow@gmail.com"
            className="inline-flex items-center gap-2 text-[0.8rem] font-medium font-sans py-2.5 px-6 rounded-full border border-[#1C1A18] text-[#1C1A18] hover:bg-[#1C1A18] hover:text-white transition-all duration-200 no-underline"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
