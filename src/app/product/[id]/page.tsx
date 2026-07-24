'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { useStore } from '@/store/useStore';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductDeliveryCheck from '@/components/ProductDeliveryCheck';
import ProductAccordion from '@/components/ProductAccordion';
import ProductRelated from '@/components/ProductRelated';
import EnquiryModal from '@/components/EnquiryModal';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const imageUrls = p.image ? [p.image] : [];

  const accordionItems = [
    { id: 'details', title: 'Details', content: p.description || '' },
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
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: 'Each handcrafted piece is unique. Minor variations in colour, texture, and form are inherent to artisanal work and add to the character of the piece. Product images are as accurate as possible, but actual colours may vary slightly due to screen settings.',
    },
  ];

  return (
    <main className="bg-[#F7F3EC] min-h-screen" id="main-content" aria-label="Product detail">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-6 sm:pt-8 pb-16 sm:pb-20">
        <button
          className="inline-flex items-center gap-2 text-[0.8rem] text-[#8C8477] py-2 transition-colors mb-6 sm:mb-8 hover:text-[#1C1A18] group font-sans cursor-pointer"
          onClick={() => router.back()}
          aria-label="Go back to previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Collection
        </button>

        <div id="product-content" role="region" aria-label="Product information">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-14 items-start">
            <ProductImageGallery images={imageUrls} title={p.title} />

            <div className="lg:sticky lg:top-[100px]">
              <ProductInfo
                product={p}
                cartItem={cartItem}
                isWishlisted={isWL}
                onToggleWishlist={toggleWishlist}
              />
              <ProductDeliveryCheck />
            </div>
          </div>

          <div className="mt-8">
            <ProductAccordion items={accordionItems} />
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-[0.8rem] text-[#8C8477] font-medium font-sans py-2 px-5 rounded-full border border-[#E4DED3] transition-all hover:border-[#1C1A18] hover:text-[#1C1A18] cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Enquire About This Piece
            </button>
          </div>

          <ProductRelated products={related} categoryLabel={p.categoryLabel} />
        </div>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productTitle={p.title}
      />
    </main>
  );
}
