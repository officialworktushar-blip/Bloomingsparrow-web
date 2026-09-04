import Link from 'next/link';

const SECTION_HEADING = 'text-[1.1rem] sm:text-[1.2rem] font-semibold text-[#252525] font-serif mt-10 mb-3';
const BODY = 'text-[0.85rem] text-[#252525]/80 leading-[1.85] font-sans mb-4';
const BULLET = 'text-[0.85rem] text-[#252525]/80 leading-[1.85] font-sans ml-4 mb-1.5 list-disc';

export default function TermsPage() {
  const lastUpdated = 'July 2026';

  return (
    <main className="bg-[#fcf7f3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-16 sm:py-20">
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[#7e7e84] font-medium font-sans">
            <li><Link href="/" className="hover:text-[#252525] transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-[#efede8]">/</li>
            <li className="text-[#252525]">Terms &amp; Conditions</li>
          </ol>
        </nav>

        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] font-semibold text-[#252525] mb-4">Terms &amp; Conditions</h1>
        <div className="w-12 h-[2px] bg-[#287379] mb-4" />
        <p className="text-[0.75rem] text-[#7e7e84] font-sans mb-8">Last updated: {lastUpdated}</p>

        <p className="BODY text-[0.82rem] mb-6 p-3 rounded-lg bg-[#d24418]/10 border border-[#d24418]/20 text-[#d24418] font-sans leading-relaxed">
          Disclaimer: These Terms and Conditions are boilerplate content and should be reviewed by a qualified legal professional before publishing to ensure compliance with applicable Indian laws, including the Indian Contract Act 1872, the Consumer Protection Act 2019, and the Information Technology Act 2000.
        </p>

        <p className={BODY}>
          These Terms and Conditions (&quot;Terms&quot;) govern your use of the Blooming Sparrow website and the purchase of handcrafted products from our online store. By accessing our website or placing an order, you agree to be bound by these Terms.
        </p>

        <h2 className={SECTION_HEADING}>1. Acceptance of Terms</h2>
        <p className={BODY}>
          By accessing or using the Blooming Sparrow website (bloomingsparrow.com), you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, please do not use our website.
        </p>

        <h2 className={SECTION_HEADING}>2. Use of the Website</h2>
        <p className={BODY}>You agree to use our website only for lawful purposes and in accordance with these Terms. You must not:</p>
        <ul className="mb-4">
          <li className={BULLET}>Use the website for any fraudulent or illegal activity</li>
          <li className={BULLET}>Attempt to gain unauthorised access to any part of the website</li>
          <li className={BULLET}>Interfere with or disrupt the website&apos;s functionality or servers</li>
          <li className={BULLET}>Reproduce, duplicate, copy, sell, or exploit any content without our written consent</li>
        </ul>

        <h2 className={SECTION_HEADING}>3. Products and Pricing</h2>
        <p className={BODY}>
          We make every effort to display product descriptions, images, dimensions, and prices as accurately as possible. However, slight variations may occur due to the handcrafted nature of our products and differences in screen settings.
        </p>
        <p className={BODY}>
          All prices displayed on the website are in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We reserve the right to modify prices at any time without prior notice. However, price changes will not affect orders that have already been confirmed.
        </p>
        <p className={BODY}>
          In the event of a pricing error on a listed product, we reserve the right to cancel the order and issue a full refund. We will notify you promptly if this occurs.
        </p>

        <h2 className={SECTION_HEADING}>4. Orders and Acceptance</h2>
        <p className={BODY}>
          Placing an order on our website constitutes an offer to purchase the selected products. An order is considered accepted only when you receive an order confirmation email from us. We reserve the right to refuse or cancel any order at our discretion, including but not limited to cases of pricing errors, suspected fraud, or product unavailability.
        </p>

        <h2 className={SECTION_HEADING}>5. Cancellation</h2>
        <p className={BODY}>
          You may cancel your order within 24 hours of placing it, provided it has not yet been dispatched. To cancel, email us at bloomingsparrow@gmail.com with your order ID. Once an order has been dispatched, it cannot be cancelled but may be returned after delivery in accordance with our Return Policy.
        </p>

        <h2 className={SECTION_HEADING}>6. Shipping and Delivery</h2>
        <p className={BODY}>
          Shipping and delivery are subject to the terms outlined in our Shipping &amp; Delivery Policy. Delivery dates provided at checkout are estimates and not guarantees. Blooming Sparrow is not liable for delays caused by courier partners, natural events, or circumstances beyond our control.
        </p>

        <h2 className={SECTION_HEADING}>7. Returns and Refunds</h2>
        <p className={BODY}>
          Returns and refunds are governed by our Returns &amp; Refunds Policy. By placing an order, you acknowledge and agree to the terms of our return policy, including the 7-day return window and eligibility conditions.
        </p>

        <h2 className={SECTION_HEADING}>8. Intellectual Property</h2>
        <p className={BODY}>
          All content on this website — including product images, descriptions, logos, graphics, text, and design elements — is the intellectual property of Blooming Sparrow and is protected under Indian copyright and trademark laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
        </p>

        <h2 className={SECTION_HEADING}>9. Limitation of Liability</h2>
        <p className={BODY}>
          To the maximum extent permitted by law, Blooming Sparrow shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the website or purchase of products. Our total liability for any claim arising from an order shall not exceed the amount paid by you for the product in question.
        </p>

        <h2 className={SECTION_HEADING}>10. Indemnification</h2>
        <p className={BODY}>
          You agree to indemnify and hold harmless Blooming Sparrow, its owners, employees, and partners from any claims, losses, damages, or expenses (including legal fees) arising from your use of the website or violation of these Terms.
        </p>

        <h2 className={SECTION_HEADING}>11. Governing Law</h2>
        <p className={BODY}>
          These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in India.
        </p>

        <h2 className={SECTION_HEADING}>12. Changes to These Terms</h2>
        <p className={BODY}>
          We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after any changes constitutes acceptance of the updated Terms.
        </p>

        <h2 className={SECTION_HEADING}>13. Contact Information</h2>
        <p className={BODY}>
          For questions about these Terms and Conditions, please contact:
        </p>
        <p className={BODY}>
          Blooming Sparrow<br />
          Email: <a href="mailto:bloomingsparrow@gmail.com" className="underline hover:text-[#252525] transition-colors">bloomingsparrow@gmail.com</a>
        </p>

        <div className="mt-12 pt-8 border-t border-[#efede8]">
          <p className="text-[0.82rem] text-[#7e7e84] font-sans">
            These Terms and Conditions should be reviewed by a legal professional before publishing to ensure compliance with applicable Indian laws.
          </p>
        </div>
      </div>
    </main>
  );
}
