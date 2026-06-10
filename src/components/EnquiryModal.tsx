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
    <div className="modal-backdrop open" role="dialog" aria-modal="true" aria-labelledby="modal-heading" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h2 className="modal-title" id="modal-heading">Enquire About This Piece</h2>
        <p className="modal-sub">We'll get back to you within 24 hours.</p>
        <form id="enquiry-form" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modal-name">Your Name</label>
            <input type="text" id="modal-name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="modal-email">Email Address</label>
            <input type="email" id="modal-email" placeholder="you@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="modal-subject">Subject</label>
            <input type="text" id="modal-subject" placeholder="Subject" defaultValue={`Enquiry: ${productTitle}`} required />
          </div>
          <div className="form-group">
            <label htmlFor="modal-message">Message</label>
            <textarea id="modal-message" placeholder="Tell us what you'd like to know…"></textarea>
          </div>
          <button 
            type="submit" 
            className="modal-submit" 
            id="modal-submit-btn"
            style={submitted ? { background: '#4CAF50' } : {}}
          >
            {submitted ? 'Sent ✓' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
