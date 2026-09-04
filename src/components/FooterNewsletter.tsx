'use client';

import { FormEvent, useState } from 'react';

export default function FooterNewsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="font-sans text-[0.9rem] font-medium text-[#202025]">
        Thank you for subscribing! We&apos;ll keep you posted on new arrivals and craft stories.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <p className="font-sans text-[0.9rem] text-[#202025]/80 mb-1">
        Join our community for new arrivals, artisan stories and exclusive offers.
      </p>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="h-12 px-4 bg-[#e8e7d5] text-[#202025] placeholder:text-[#7e7e84] border border-[#287379] outline-none focus:bg-white transition-colors font-sans"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center h-12 px-6 bg-[#287379] text-white font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] border border-[#287379] transition-colors hover:bg-[#252525] hover:border-[#252525]"
      >
        Subscribe
      </button>
    </form>
  );
}