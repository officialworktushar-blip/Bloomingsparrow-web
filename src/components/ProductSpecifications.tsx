import { type ReactNode } from 'react';
import { Product, Specification } from '@/lib/data';

type Props = {
  product: Product;
};

const FALLBACK_FIELDS: { key: keyof Product; label: string }[] = [
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
    FALLBACK_FIELDS.forEach(({ key, label }) => {
      const val = p[key];
      if (val && !(typeof val === 'string' && val.trim() === '')) {
        items.push({ label, value: String(val) });
      }
    });
  }

  return items;
}

const SPEC_ICONS: Record<string, ReactNode> = {
  Material: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Dimensions: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 3H3v18h18V3z" />
      <path d="M9 3v18" />
      <path d="M3 9h18" />
    </svg>
  ),
  Origin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="10" r="3" />
      <path d="M12 2a8 8 0 00-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 00-8-8z" />
    </svg>
  ),
  Artisan: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export default function ProductSpecifications({ product }: Props) {
  const specs = buildSpecifications(product);

  if (specs.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#E4DED3] bg-white p-5">
      <h2 className="text-[0.7rem] tracking-[0.12em] uppercase text-[#8C8477] font-semibold font-sans mb-4">Specifications</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {specs.map((spec, i) => (
          <div key={i}>
            <div className="flex items-center gap-1.5 mb-1.5">
              {SPEC_ICONS[spec.label] && (
                <span className="text-[#8C8477]">{SPEC_ICONS[spec.label]}</span>
              )}
              <div className="product-label">{spec.label}</div>
            </div>
            <div className="text-[0.875rem] text-[#1C1A18] font-medium font-sans leading-[1.8]">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
