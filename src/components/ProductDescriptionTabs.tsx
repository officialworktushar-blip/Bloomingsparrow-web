'use client';

import { useState } from 'react';
import { Product, Specification } from '@/lib/data';

type Props = {
  product: Product;
};

type TabKey = 'description' | 'shipping' | 'care';

const SPEC_FIELDS: { key: keyof Product; label: string }[] = [
  { key: 'material', label: 'Material' },
  { key: 'dimensions', label: 'Dimensions' },
  { key: 'origin', label: 'Origin' },
  { key: 'artisan', label: 'Artisan' },
];

function buildSpecifications(p: Product): Specification[] {
  const items: Specification[] = [];

  if (p.specifications && p.specifications.length > 0) {
    items.push(...p.specifications.filter(s => s.label.trim() !== '' && s.value.trim() !== ''));
  } else {
    SPEC_FIELDS.forEach(({ key, label }) => {
      const val = p[key];
      if (val && !(typeof val === 'string' && val.trim() === '')) {
        items.push({ label, value: String(val) });
      }
    });
  }

  return items;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'description', label: 'Description' },
  { key: 'shipping', label: 'Shipping Information' },
  { key: 'care', label: 'How To Care' },
];

export default function ProductDescriptionTabs({ product }: Props) {
  const [active, setActive] = useState<TabKey>('description');
  const specs = buildSpecifications(product);

  return (
    <div className="rounded-xl border border-[#efede8] bg-white overflow-hidden mb-8">
      <div
        className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-[#efede8]"
        role="tablist"
        aria-label="Product information tabs"
      >
        {TABS.map(tab => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={`shrink-0 px-4 sm:px-6 h-12 text-[0.75rem] font-semibold tracking-[0.1em] uppercase font-sans transition-colors cursor-pointer no-underline ${
              active === tab.key
                ? 'text-[#252525] border-b-2 border-[#287379]'
                : 'text-[#7e7e84] hover:text-[#252525] border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-5 sm:px-6 py-6 text-[0.875rem] text-[#7e7e84] leading-[1.8] font-sans">
        {active === 'description' && (
          <div>
            <p className="mb-5">{product.description}</p>

            {specs.length > 0 && (
              <table className="w-full text-left mb-0">
                <tbody>
                  {specs.map((spec, i) => (
                    <tr key={i} className="border-t border-[#efede8] first:border-t-0">
                      <th className="py-2.5 pr-4 align-top w-[38%] text-[0.75rem] uppercase tracking-[0.08em] font-semibold text-[#252525]">
                        {spec.label}
                      </th>
                      <td className="py-2.5 align-top text-[0.875rem] text-[#7e7e84]">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {active === 'shipping' && (
          <div className="space-y-4">
            <p>
              We offer free shipping across India on all orders. Orders are typically dispatched
              within 2–3 business days. Delivery timelines may vary based on your location — metro
              cities usually receive orders within 5–7 business days, while other areas may take
              7–10 business days. You will receive a tracking link via email once your order is
              shipped.
            </p>
            <p>
              Each handcrafted item is carefully wrapped in protective packaging to ensure it
              reaches you in perfect condition. We ship via trusted courier partners with end-to-end
              tracking. International shipping is available for select countries — please contact us
              for rates and estimated delivery times before placing an order.
            </p>
          </div>
        )}

        {active === 'care' && (
          <p>
            Being handcrafted, each piece is unique and deserves gentle care. Keep away from direct
            sunlight and moisture to preserve colours and textures. For leather items, occasionally
            condition with a leather balm. For painted or lacquered pieces, wipe gently with a soft
            dry cloth. Avoid harsh chemicals or abrasive cleaners. Store in a cool, dry place when
            not in use.
          </p>
        )}
      </div>
    </div>
  );
}