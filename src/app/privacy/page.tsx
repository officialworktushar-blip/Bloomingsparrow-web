import Link from 'next/link';

const SECTION_HEADING = 'text-[1.1rem] sm:text-[1.2rem] font-semibold text-[#1C1A18] font-serif mt-10 mb-3';
const BODY = 'text-[0.85rem] text-[#1C1A18]/80 leading-[1.85] font-sans mb-4';
const BULLET = 'text-[0.85rem] text-[#1C1A18]/80 leading-[1.85] font-sans ml-4 mb-1.5 list-disc';

export default function PrivacyPage() {
  const lastUpdated = 'July 2026';

  return (
    <main className="bg-[#F7F3EC] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-16 sm:py-20">
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[#8C8477] font-medium font-sans">
            <li><Link href="/" className="hover:text-[#1C1A18] transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-[#E4DED3]">/</li>
            <li className="text-[#1C1A18]">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] font-semibold text-[#1C1A18] mb-4">Privacy Policy</h1>
        <div className="w-12 h-[2px] bg-[#C8A96E] mb-4" />
        <p className="text-[0.75rem] text-[#8C8477] font-sans mb-8">Last updated: {lastUpdated}</p>

        <p className="BODY text-[0.82rem] mb-6 p-3 rounded-lg bg-[#B5533C]/10 border border-[#B5533C]/20 text-[#B5533C] font-sans leading-relaxed">
          Disclaimer: This privacy policy is boilerplate content and should be reviewed by a qualified legal professional before publishing to ensure compliance with applicable data protection laws, including the Information Technology Act 2000, the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011, and the Digital Personal Data Protection Act 2023.
        </p>

        <p className={BODY}>
          This Privacy Policy describes how Blooming Sparrow (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your personal information when you visit our website and purchase our handcrafted products.
        </p>

        <h2 className={SECTION_HEADING}>1. Information We Collect</h2>
        <p className={BODY}>We collect the following types of information:</p>
        <p className={BODY}><strong className="text-[#1C1A18]">Personal Information you provide directly:</strong></p>
        <ul className="mb-3">
          <li className={BULLET}>Full name</li>
          <li className={BULLET}>Email address</li>
          <li className={BULLET}>Phone number</li>
          <li className={BULLET}>Shipping and billing address</li>
          <li className={BULLET}>Payment information (processed securely by our payment gateway — we do not store card numbers)</li>
        </ul>
        <p className={BODY}><strong className="text-[#1C1A18]">Information collected automatically:</strong></p>
        <ul className="mb-4">
          <li className={BULLET}>Device type, browser, and operating system</li>
          <li className={BULLET}>IP address and approximate location</li>
          <li className={BULLET}>Pages visited, time spent, and navigation paths</li>
          <li className={BULLET}>Referring website or source</li>
        </ul>

        <h2 className={SECTION_HEADING}>2. How We Use Your Information</h2>
        <p className={BODY}>We use your information for the following purposes:</p>
        <ul className="mb-4">
          <li className={BULLET}>Processing and fulfilling your orders</li>
          <li className={BULLET}>Sending order confirmations, shipping updates, and delivery notifications</li>
          <li className={BULLET}>Responding to your customer service enquiries</li>
          <li className={BULLET}>Improving our website, products, and user experience</li>
          <li className={BULLET}>Sending promotional emails and newsletters (only with your consent — you can unsubscribe at any time)</li>
          <li className={BULLET}>Detecting and preventing fraud or unauthorised access</li>
        </ul>

        <h2 className={SECTION_HEADING}>3. Cookies</h2>
        <p className={BODY}>
          Our website uses cookies and similar technologies to enhance your browsing experience, analyse site traffic, and understand usage patterns. Cookies are small text files stored on your device. You can control cookies through your browser settings — disabling cookies may limit certain website functionalities.
        </p>

        <h2 className={SECTION_HEADING}>4. Third-Party Sharing</h2>
        <p className={BODY}>
          We do not sell, rent, or trade your personal information. We share data only with trusted service providers who assist in operating our business:
        </p>
        <ul className="mb-4">
          <li className={BULLET}>Payment gateway providers — to process transactions securely</li>
          <li className={BULLET}>Shipping and courier partners — to deliver your orders</li>
          <li className={BULLET}>Email and communication services — to send order updates and support responses</li>
          <li className={BULLET}>Analytics providers — to understand website usage and improve our services</li>
        </ul>
        <p className={BODY}>
          These providers are contractually obligated to protect your data and use it only for the purposes for which it was shared.
        </p>

        <h2 className={SECTION_HEADING}>5. Data Security</h2>
        <p className={BODY}>
          We implement industry-standard security measures to protect your personal information, including SSL encryption, secure server infrastructure, access controls, and regular security audits. While we strive to protect your data, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className={SECTION_HEADING}>6. Data Retention</h2>
        <p className={BODY}>
          We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order-related data is retained for a minimum period as required under Indian tax and commercial laws.
        </p>

        <h2 className={SECTION_HEADING}>7. Your Rights</h2>
        <p className={BODY}>You have the right to:</p>
        <ul className="mb-4">
          <li className={BULLET}>Access the personal information we hold about you</li>
          <li className={BULLET}>Request correction of inaccurate or incomplete data</li>
          <li className={BULLET}>Request deletion of your personal data (subject to legal retention requirements)</li>
          <li className={BULLET}>Opt out of marketing communications at any time</li>
          <li className={BULLET}>Withdraw consent for data processing where applicable</li>
        </ul>
        <p className={BODY}>
          To exercise any of these rights, please contact us at bloomingsparrow@gmail.com.
        </p>

        <h2 className={SECTION_HEADING}>8. Children&apos;s Privacy</h2>
        <p className={BODY}>
          Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.
        </p>

        <h2 className={SECTION_HEADING}>9. Changes to This Policy</h2>
        <p className={BODY}>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
        </p>

        <h2 className={SECTION_HEADING}>10. Contact Us</h2>
        <p className={BODY}>
          For any questions or concerns about this Privacy Policy or our data practices, please contact:
        </p>
        <p className={BODY}>
          Blooming Sparrow<br />
          Email: <a href="mailto:bloomingsparrow@gmail.com" className="underline hover:text-[#1C1A18] transition-colors">bloomingsparrow@gmail.com</a>
        </p>

        <div className="mt-12 pt-8 border-t border-[#E4DED3]">
          <p className="text-[0.82rem] text-[#8C8477] font-sans">
            This privacy policy should be reviewed by a legal professional before publishing to ensure compliance with applicable Indian data protection laws.
          </p>
        </div>
      </div>
    </main>
  );
}
