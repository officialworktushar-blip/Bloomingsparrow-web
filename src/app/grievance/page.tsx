'use client';

import { useState } from 'react';
import Link from 'next/link';

const SECTION_HEADING = 'text-[1.1rem] sm:text-[1.2rem] font-semibold text-[#1C1A18] font-serif mt-10 mb-3';
const BODY = 'text-[0.85rem] text-[#1C1A18]/80 leading-[1.85] font-sans mb-4';
const BULLET = 'text-[0.85rem] text-[#1C1A18]/80 leading-[1.85] font-sans ml-4 mb-1.5 list-disc';

export default function GrievancePage() {
  const [form, setForm] = useState({ name: '', email: '', orderId: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Grievance: ${form.orderId ? `Order ${form.orderId}` : 'General'} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nOrder ID: ${form.orderId || 'N/A'}\n\nIssue Description:\n${form.description}`,
    );
    window.open(`mailto:bloomingsparrow@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  const inputClass =
    'w-full h-11 rounded-lg border border-[#E4DED3] bg-white px-4 text-[0.85rem] text-[#1C1A18] outline-none font-sans transition-all focus:border-[#1C1A18]';
  const labelClass = 'block text-[0.75rem] tracking-[0.08em] uppercase font-medium text-[#8C8477] font-sans mb-1.5';

  return (
    <main className="bg-[#F7F3EC] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-16 sm:py-20">
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[#8C8477] font-medium font-sans">
            <li><Link href="/" className="hover:text-[#1C1A18] transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-[#E4DED3]">/</li>
            <li className="text-[#1C1A18]">Grievance Redressal</li>
          </ol>
        </nav>

        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] font-semibold text-[#1C1A18] mb-4">Grievance Redressal Mechanism</h1>
        <div className="w-12 h-[2px] bg-[#C8A96E] mb-4" />
        <p className="text-[0.75rem] text-[#8C8477] font-sans mb-8">Last updated: July 2026</p>

        <p className="BODY text-[0.82rem] mb-6 p-3 rounded-lg bg-[#B5533C]/10 border border-[#B5533C]/20 text-[#B5533C] font-sans leading-relaxed">
          Disclaimer: This Grievance Redressal Mechanism is boilerplate content and must be reviewed by a qualified legal professional to ensure compliance with the Consumer Protection (E-Commerce) Rules 2019 and the Information Technology Act 2000 and its amendments. Specific legal requirements may differ based on your business structure and applicable regulations.
        </p>

        <p className={BODY}>
          Blooming Sparrow is committed to resolving customer complaints and grievances in a fair, timely, and transparent manner. This document outlines our grievance redressal process in accordance with applicable Indian e-commerce regulations.
        </p>

        <h2 className={SECTION_HEADING}>Grievance Officer</h2>
        <p className={BODY}>
          In accordance with the Information Technology Act 2000 and the rules made thereunder, the Grievance Officer for Blooming Sparrow can be contacted at:
        </p>
        <div className="bg-white rounded-xl border border-[#E4DED3] p-5 mb-6">
          <p className="text-[0.85rem] text-[#1C1A18] font-sans leading-relaxed">
            <strong>Grievance Officer</strong><br />
            Blooming Sparrow<br />
            Email: <a href="mailto:bloomingsparrow@gmail.com" className="underline hover:text-[#8C8477] transition-colors">bloomingsparrow@gmail.com</a><br />
            Response Time: Within 24 hours of receiving the grievance
          </p>
        </div>

        <h2 className={SECTION_HEADING}>How to File a Grievance</h2>
        <p className={BODY}>
          You may file a grievance by emailing us at bloomingsparrow@gmail.com with the following details:
        </p>
        <ul className="mb-4">
          <li className={BULLET}>Your full name and contact information</li>
          <li className={BULLET}>Order ID (if applicable)</li>
          <li className={BULLET}>Description of the issue or concern</li>
          <li className={BULLET}>Supporting photographs or documents, if relevant</li>
        </ul>

        <h2 className={SECTION_HEADING}>Resolution Timeline</h2>
        <p className={BODY}>We follow a structured grievance resolution process:</p>
        <ul className="mb-4">
          <li className={BULLET}><strong className="text-[#1C1A18]">Acknowledgement:</strong> Within 24 hours of receiving your grievance</li>
          <li className={BULLET}><strong className="text-[#1C1A18]">Investigation:</strong> Our team will review and investigate the matter</li>
          <li className={BULLET}><strong className="text-[#1C1A18]">Resolution:</strong> We aim to resolve most issues within 7–15 business days</li>
          <li className={BULLET}><strong className="text-[#1C1A18]">Escalation:</strong> If unresolved, the matter will be escalated to senior management</li>
        </ul>
        <p className={BODY}>
          For complex cases involving third-party service providers (courier partners, payment gateways), resolution may take up to 30 business days. You will receive regular updates on the status of your complaint.
        </p>

        <h2 className={SECTION_HEADING}>Submit a Grievance</h2>
        <p className={BODY}>
          Use the form below to submit your grievance directly. Your submission will be sent to our Grievance Officer via email.
        </p>

        {submitted ? (
          <div className="bg-white rounded-xl border border-[#4B5D45]/30 p-6 text-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4B5D45" strokeWidth="2" className="mx-auto mb-3" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p className="text-[0.9rem] text-[#4B5D45] font-medium font-sans mb-1">Grievance submitted</p>
            <p className="text-[0.8rem] text-[#8C8477] font-sans">Your email client has opened with the details. Our Grievance Officer will respond within 24 hours.</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', orderId: '', description: '' }); }}
              className="mt-4 text-[0.8rem] font-medium font-sans text-[#8C8477] underline hover:text-[#1C1A18] transition-colors cursor-pointer"
            >
              Submit another grievance
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E4DED3] p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="g-name" className={labelClass}>Name</label>
                <input
                  id="g-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="g-email" className={labelClass}>Email</label>
                <input
                  id="g-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="g-order" className={labelClass}>Order ID (optional)</label>
              <input
                id="g-order"
                type="text"
                value={form.orderId}
                onChange={e => setForm({ ...form, orderId: e.target.value })}
                className={inputClass}
                placeholder="e.g. BS-UI-001"
              />
            </div>
            <div>
              <label htmlFor="g-desc" className={labelClass}>Describe your issue</label>
              <textarea
                id="g-desc"
                required
                rows={5}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className={`${inputClass} h-auto py-3 resize-none`}
                placeholder="Please describe the issue you are facing in detail…"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto h-11 px-8 rounded-full bg-[#1C1A18] text-white text-[0.8rem] font-medium font-sans transition-all hover:bg-[#2E2B27] cursor-pointer"
            >
              Submit Grievance
            </button>
          </form>
        )}

        <h2 className={SECTION_HEADING}>Escalation</h2>
        <p className={BODY}>
          If you are not satisfied with the resolution provided by our Grievance Officer, you have the right to escalate the matter to the relevant consumer forum or applicable regulatory authority as per Indian law. We are committed to fair resolution and consumer satisfaction.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E4DED3]">
          <p className="text-[0.82rem] text-[#8C8477] font-sans">
            This Grievance Redressal Mechanism must be reviewed by a legal professional to ensure compliance with the Consumer Protection (E-Commerce) Rules 2019 and IT Rules 2021.
          </p>
        </div>
      </div>
    </main>
  );
}
