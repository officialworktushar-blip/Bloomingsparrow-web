'use client';

import { useEffect, useState } from 'react';

type EnquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
};

export default function EnquiryModal({ isOpen, onClose, productTitle }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[300] flex items-center justify-center opacity-100 pointer-events-auto transition-opacity duration-[250ms] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl p-8 w-[460px] max-w-[92vw] shadow-[0_8px_28px_rgba(0,0,0,0.12)] transform translate-y-0 transition-transform duration-300 relative border border-[#E4DED3]">
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F3EC] text-[#8C8477] cursor-pointer text-sm transition-all hover:bg-[#EFEAE1] hover:text-[#1C1A18]"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="font-serif text-[1.5rem] font-semibold text-[#1C1A18] mb-1" id="modal-heading">
          Enquire About This Piece
        </h2>
        <p className="text-[0.825rem] text-[#8C8477] mb-6 font-sans">
          We&apos;ll get back to you within 24 hours.
        </p>
        <form id="enquiry-form" noValidate onSubmit={handleSubmit}>
          <div className="mb-3.5">
            <label className="block text-[0.68rem] font-medium tracking-[0.08em] uppercase text-[#8C8477] mb-1.5 font-sans" htmlFor="modal-name">
              Your Name
            </label>
            <input
              className="w-full border border-[#E4DED3] rounded-xl py-2.5 px-4 font-sans text-[0.85rem] text-[#1C1A18] outline-none transition-all bg-[#F7F3EC] focus:border-[#1C1A18] focus:bg-white"
              type="text"
              id="modal-name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3.5">
            <label className="block text-[0.68rem] font-medium tracking-[0.08em] uppercase text-[#8C8477] mb-1.5 font-sans" htmlFor="modal-email">
              Email Address
            </label>
            <input
              className="w-full border border-[#E4DED3] rounded-xl py-2.5 px-4 font-sans text-[0.85rem] text-[#1C1A18] outline-none transition-all bg-[#F7F3EC] focus:border-[#1C1A18] focus:bg-white"
              type="email"
              id="modal-email"
              placeholder="you@email.com"
              required
            />
          </div>
          <div className="mb-3.5">
            <label className="block text-[0.68rem] font-medium tracking-[0.08em] uppercase text-[#8C8477] mb-1.5 font-sans" htmlFor="modal-subject">
              Subject
            </label>
            <input
              className="w-full border border-[#E4DED3] rounded-xl py-2.5 px-4 font-sans text-[0.85rem] text-[#1C1A18] outline-none transition-all bg-[#F7F3EC] focus:border-[#1C1A18] focus:bg-white"
              type="text"
              id="modal-subject"
              placeholder="Subject"
              defaultValue={`Enquiry: ${productTitle}`}
              required
            />
          </div>
          <div className="mb-3.5">
            <label className="block text-[0.68rem] font-medium tracking-[0.08em] uppercase text-[#8C8477] mb-1.5 font-sans" htmlFor="modal-message">
              Message
            </label>
            <textarea
              className="w-full border border-[#E4DED3] rounded-xl py-2.5 px-4 font-sans text-[0.85rem] text-[#1C1A18] outline-none transition-all bg-[#F7F3EC] focus:border-[#1C1A18] focus:bg-white h-24 resize-none"
              id="modal-message"
              placeholder="Tell us what you'd like to know…"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#1C1A18] text-white text-[0.85rem] font-medium font-sans cursor-pointer transition-all mt-1.5 hover:bg-[#2E2B27]"
            id="modal-submit-btn"
            style={submitted ? { background: '#4B5D45' } : {}}
          >
            {submitted ? 'Sent ✓' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
