'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { useStore } from '@/store/useStore';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductDeliveryCheck from '@/components/ProductDeliveryCheck';
import ProductInfoAccordion from '@/components/ProductInfoAccordion';
import ProductAccordion from '@/components/ProductAccordion';
import ProductRelated from '@/components/ProductRelated';
import ProductReviewSection from '@/components/ProductReviewSection';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { cart } = useStore();
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, [fetchProducts]);

  const p = products.find(x => x.id === id);

  if (isLoading && !p) {
    return (
      <main className="bg-[#F7F3EC] min-h-screen" id="main-content" aria-label="Product detail">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-10 pb-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-[#8C8477] font-serif text-[1.2rem] italic">Loading product…</p>
          </div>
        </div>
      </main>
    );
  }

  if (!p) {
    return (
      <main className="bg-[#F7F3EC] min-h-screen" id="main-content" aria-label="Product detail">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-10 pb-20">
          <button
            className="inline-flex items-center gap-2 text-sm text-[#8C8477] py-2 transition-colors mb-8 hover:text-[#1C1A18] group font-sans cursor-pointer"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Gallery
          </button>
          <div id="product-content" role="region" aria-label="Product information">
            <div className="flex items-center justify-center min-h-[40vh]">
              <p className="text-[#8C8477] font-serif text-[1.2rem] italic">Product not found.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const related = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const isWL = isClient && wishlist.includes(String(p.id));
  const cartItem = isClient ? cart.find(item => item.id === p.id) : undefined;

  const toggleWishlist = () => {
    const strId = String(p.id);
    const inList = wishlist.includes(strId);
    const updated = inList ? wishlist.filter(x => x !== strId) : [...wishlist, strId];
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
  };

  const toggleRelatedWishlist = (strId: string) => {
    const inList = wishlist.includes(strId);
    const updated = inList ? wishlist.filter(x => x !== strId) : [...wishlist, strId];
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
  };

  const addRelatedToCart = (product: { id: string; title: string; price: string; image: string; images?: string[] }) => {
    useStore.getState().addToCart({
      id: String(product.id),
      title: product.title,
      price: product.price,
      numericPrice: Number(String(product.price).replace(/[₹,]/g, '')) || 0,
      image: product.images?.[0] || product.image,
      quantity: 1,
    });
  };

  const isRelatedInCart = (strId: string) => cart.some(item => item.id === strId);

  const imageUrls = p.images && p.images.length > 0 ? p.images : p.image ? [p.image] : [];

  const accordionItems = [
    {
      id: 'specifications',
      title: 'Product Specification',
      content: [
        p.material ? `Material: ${p.material}` : '',
        p.dimensions ? `Dimensions: ${p.dimensions}` : '',
        p.origin ? `Origin: ${p.origin}` : '',
        p.artisan ? `Artisan: ${p.artisan}` : '',
      ].filter(Boolean).join('\n'),
    },
  ];

  const RELATED_CATEGORIES: Record<string, string[]> = {
    'rogan-art':      ['shola-art', 'lacquerer-art', 'bell-art'],
    'lacquerer-art':  ['rogan-art', 'bell-art', 'leather-bag'],
    'bell-art':       ['lacquerer-art', 'rogan-art', 'bird-making'],
    'leather-toys':   ['bird-making', 'leather-bag', 'shola-art'],
    'shola-art':      ['bird-making', 'rogan-art', 'leather-toys'],
    'bird-making':    ['shola-art', 'leather-toys', 'bell-art'],
    'leather-bag':    ['leather-toys', 'lacquerer-art', 'bell-art'],
  };

  const allCatsMap = new Map<string, string>();
  products.forEach(x => {
    const slug = String(x.category || '').toLowerCase().replace(/\s+/g, '-');
    const label = x.categoryLabel || x.category || '';
    if (slug && label && !allCatsMap.has(slug)) allCatsMap.set(slug, label);
  });

  let relatedSlugs = RELATED_CATEGORIES[p.category] || [];
  if (relatedSlugs.length === 0) {
    relatedSlugs = Array.from(allCatsMap.keys())
      .filter(s => s !== p.category)
      .slice(0, 3);
  }
  const categories = relatedSlugs
    .filter(slug => slug !== p.category && allCatsMap.has(slug))
    .map(slug => ({ slug, label: allCatsMap.get(slug)! }))
    .slice(0, 4);

  return (
    <main className="bg-[#F7F3EC] min-h-screen" id="main-content" aria-label="Product detail">
      <div className="max-w-[1750px] mx-auto px-5 sm:px-8 pt-[30px] sm:pt-[40px] pb-[80px] sm:pb-[100px]">
        {categories.length > 0 && (
          <nav className="mb-6 sm:mb-8" aria-label="Related categories">
            <p className="text-[0.65rem] tracking-[0.1em] uppercase text-[#8C8477] font-medium font-sans mb-2.5">Explore</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <Link
                  key={c.slug}
                  href={`/categories?cat=${c.slug}`}
                  className={`inline-flex items-center h-8 px-4 rounded-full text-[0.75rem] font-medium font-sans border transition-all duration-200 no-underline ${
                    c.slug === p.category
                      ? 'bg-[#1C1A18] border-[#1C1A18] text-white'
                      : 'bg-white border-[#E4DED3] text-[#8C8477] hover:border-[#1C1A18] hover:text-[#1C1A18]'
                  }`}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </nav>
        )}

        <div id="product-content" role="region" aria-label="Product information">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-[40px] lg:gap-[70px] items-start">
            <ProductImageGallery images={imageUrls} title={p.title} />

            <div className="lg:sticky lg:top-[100px]">
              <ProductInfo
                product={p}
                cartItem={cartItem}
                isWishlisted={isWL}
                onToggleWishlist={toggleWishlist}
              />
              <ProductDeliveryCheck />
              <ProductInfoAccordion description={p.description} />
            </div>
          </div>

          <div className="mt-8">
            <ProductAccordion items={accordionItems} />
          </div>

          <div className="mt-4 flex justify-center">
            <a
              href={`https://wa.link/lvchko`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.8rem] text-[#8C8477] font-medium font-sans py-2 px-5 rounded-full border border-[#E4DED3] transition-all hover:border-[#25D366] hover:text-[#25D366] no-underline"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enquire on WhatsApp
            </a>
          </div>

          <ProductRelated
            products={related}
            categoryLabel={p.categoryLabel}
            wishlist={wishlist}
            onToggleWishlist={toggleRelatedWishlist}
            onAddToCart={addRelatedToCart}
            isInCart={isRelatedInCart}
          />

          <ProductReviewSection productId={p.id} productTitle={p.title} />
        </div>
      </div>

    </main>
  );
}
