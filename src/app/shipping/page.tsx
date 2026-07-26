import Link from 'next/link';

const SECTION_HEADING = 'text-[1.1rem] sm:text-[1.2rem] font-semibold text-[#1C1A18] font-serif mt-10 mb-3';
const BODY = 'text-[0.85rem] text-[#1C1A18]/80 leading-[1.85] font-sans mb-4';
const BULLET = 'text-[0.85rem] text-[#1C1A18]/80 leading-[1.85] font-sans ml-4 mb-1.5 list-disc';

export default function ShippingPage() {
  return (
    <main className="bg-[#F7F3EC] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-16 sm:py-20">
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[#8C8477] font-medium font-sans">
            <li><Link href="/" className="hover:text-[#1C1A18] transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-[#E4DED3]">/</li>
            <li className="text-[#1C1A18]">Shipping &amp; Delivery</li>
          </ol>
        </nav>

        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] font-semibold text-[#1C1A18] mb-4">Shipping &amp; Delivery</h1>
        <div className="w-12 h-[2px] bg-[#C8A96E] mb-8" />

        <p className={BODY}>
          At Blooming Sparrow, every order is packed with care to ensure your handcrafted piece arrives safely. Below you will find everything you need to know about how we ship and deliver your orders.
        </p>

        <h2 className={SECTION_HEADING}>Processing Time</h2>
        <p className={BODY}>
          All orders are processed within 2–3 business days (Monday–Saturday, excluding public holidays). Since each product is handcrafted or hand-finished, some items may require additional preparation time. If there is a delay, we will notify you by email.
        </p>

        <h2 className={SECTION_HEADING}>Delivery Timelines</h2>
        <p className={BODY}>After dispatch, estimated delivery times are:</p>
        <ul className="mb-4">
          <li className={BULLET}>Metro cities (Delhi, Mumbai, Bangalore, Kolkata, Chennai, Hyderabad, etc.): 3–5 business days</li>
          <li className={BULLET}>Tier-2 and Tier-3 cities: 5–7 business days</li>
          <li className={BULLET}>Remote and rural areas: 7–10 business days</li>
        </ul>
        <p className={BODY}>
          Delivery dates shown at checkout are estimates and not guarantees. Actual delivery times may vary due to courier partner delays, weather, holidays, or remote location accessibility.
        </p>

        <h2 className={SECTION_HEADING}>Free Shipping</h2>
        <p className={BODY}>
          We offer free standard shipping on every order across India — no minimum order value, no hidden charges. The price you see at checkout is the final price you pay.
        </p>

        <h2 className={SECTION_HEADING}>Pan-India Coverage</h2>
        <p className={BODY}>
          We deliver to all serviceable pin codes across India. During checkout, enter your pin code to confirm delivery availability. If your area is not currently serviceable, we will notify you and process a full refund.
        </p>

        <h2 className={SECTION_HEADING}>Order Tracking</h2>
        <p className={BODY}>
          Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order from your account dashboard under "Track My Order." Tracking updates may take 24–48 hours to reflect after dispatch.
        </p>

        <h2 className={SECTION_HEADING}>Courier Partners</h2>
        <p className={BODY}>
          We work with trusted courier partners including Delhivery, Blue Dart, and India Post to ensure reliable delivery. The courier is selected based on your location and order size to provide the fastest and most reliable service.
        </p>

        <h2 className={SECTION_HEADING}>Delayed, Lost, or Damaged Packages</h2>
        <p className={BODY}>
          If your order is significantly delayed beyond the estimated delivery date, please contact us and we will investigate with the shipping partner. For packages confirmed as lost in transit, we will reship the order or issue a complete refund.
        </p>
        <p className={BODY}>
          If your package arrives visibly damaged, please report it within 48 hours of delivery by emailing us at bloomingsparrow@gmail.com with photographs of the damage. We will arrange a replacement or full refund promptly.
        </p>

        <h2 className={SECTION_HEADING}>Incorrect Address</h2>
        <p className={BODY}>
          Please ensure your shipping address is complete and accurate at checkout. Blooming Sparrow is not responsible for orders shipped to incorrectly entered addresses. If you notice an error after placing your order, contact us immediately — we can update the address only if the order has not yet been dispatched.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E4DED3]">
          <p className="text-[0.82rem] text-[#8C8477] font-sans">
            For shipping-related queries, email us at{' '}
            <a href="mailto:bloomingsparrow@gmail.com" className="underline hover:text-[#1C1A18] transition-colors">bloomingsparrow@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
