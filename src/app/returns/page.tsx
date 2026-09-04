import Link from 'next/link';

const SECTION_HEADING = 'text-[1.1rem] sm:text-[1.2rem] font-semibold text-[#252525] font-serif mt-10 mb-3';
const BODY = 'text-[0.85rem] text-[#252525]/80 leading-[1.85] font-sans mb-4';
const BULLET = 'text-[0.85rem] text-[#252525]/80 leading-[1.85] font-sans ml-4 mb-1.5 list-disc';

export default function ReturnsPage() {
  return (
    <main className="bg-[#fcf7f3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-16 sm:py-20">
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[#7e7e84] font-medium font-sans">
            <li><Link href="/" className="hover:text-[#252525] transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-[#efede8]">/</li>
            <li className="text-[#252525]">Returns &amp; Refunds</li>
          </ol>
        </nav>

        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] font-semibold text-[#252525] mb-4">Returns &amp; Refunds</h1>
        <div className="w-12 h-[2px] bg-[#287379] mb-8" />

        <p className={BODY}>
          We want you to love every handcrafted piece you receive. If something is not right, our return process is simple and hassle-free.
        </p>

        <h2 className={SECTION_HEADING}>7-Day Return Policy</h2>
        <p className={BODY}>
          We offer a 7-day return policy from the date of delivery. If you are not satisfied with your purchase for any reason, you may request a return within 7 days of receiving your order.
        </p>

        <h2 className={SECTION_HEADING}>Return Eligibility</h2>
        <p className={BODY}>To be eligible for a return, the following conditions must be met:</p>
        <ul className="mb-4">
          <li className={BULLET}>The item must be unused and in the same condition you received it</li>
          <li className={BULLET}>It must be in its original packaging</li>
          <li className={BULLET}>You must have the order confirmation or receipt</li>
          <li className={BULLET}>The return request must be made within 7 days of delivery</li>
        </ul>
        <p className={BODY}>
          Please note: Handcrafted products may have natural variations in colour, texture, and finish. These are inherent characteristics of genuine artisan work and are not considered defects.
        </p>

        <h2 className={SECTION_HEADING}>Non-Returnable Items</h2>
        <p className={BODY}>The following items are not eligible for return:</p>
        <ul className="mb-4">
          <li className={BULLET}>Customised or personalised items (unless damaged or defective on arrival)</li>
          <li className={BULLET}>Items returned after the 7-day window</li>
          <li className={BULLET}>Items without original packaging or that have been used, washed, or altered</li>
        </ul>

        <h2 className={SECTION_HEADING}>How to Request a Return</h2>
        <p className={BODY}>
          To initiate a return, email us at bloomingsparrow@gmail.com with:
        </p>
        <ul className="mb-4">
          <li className={BULLET}>Your order ID</li>
          <li className={BULLET}>The item(s) you wish to return</li>
          <li className={BULLET}>Reason for the return</li>
        </ul>
        <p className={BODY}>
          Our team will review your request and respond within 24 hours with return instructions, including the pickup address and packaging guidance. We will arrange a free pickup for eligible returns.
        </p>

        <h2 className={SECTION_HEADING}>Refund Method &amp; Timeline</h2>
        <p className={BODY}>
          Once we receive and inspect the returned item, your refund will be processed within 5–7 business days:
        </p>
        <ul className="mb-4">
          <li className={BULLET}>Online payments: Refunded to the original payment method (credit/debit card, UPI, net banking)</li>
          <li className={BULLET}>Cash on Delivery: Refunded via bank transfer — please provide your bank account details when initiating the return</li>
        </ul>
        <p className={BODY}>
          You will receive an email confirmation once your refund has been processed. Depending on your bank or payment provider, it may take an additional 2–3 business days for the amount to reflect in your account.
        </p>

        <h2 className={SECTION_HEADING}>Damaged or Defective Items</h2>
        <p className={BODY}>
          We take great care in packaging every order. However, if your product arrives damaged or defective, please contact us within 48 hours of delivery with photographs of the damage. We will arrange a replacement or issue a full refund — no return shipping required.
        </p>

        <h2 className={SECTION_HEADING}>Exchanges</h2>
        <p className={BODY}>
          We currently do not offer direct exchanges. If you would like a different item, please initiate a return for the original product and place a new order for the item you prefer.
        </p>

        <div className="mt-12 pt-8 border-t border-[#efede8]">
          <p className="text-[0.82rem] text-[#7e7e84] font-sans">
            For return or refund queries, email us at{' '}
            <a href="mailto:bloomingsparrow@gmail.com" className="underline hover:text-[#252525] transition-colors">bloomingsparrow@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
