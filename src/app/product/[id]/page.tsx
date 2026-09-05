'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { useStore } from '@/store/useStore';
import { getProductImages } from '@/lib/data';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductDeliveryCheck from '@/components/ProductDeliveryCheck';
import ProductPromoHeader from '@/components/ProductPromoHeader';
import ProductPurchaseBlock from '@/components/ProductPurchaseBlock';
import ProductTrustBadges from '@/components/ProductTrustBadges';
import ProductShareRow from '@/components/ProductShareRow';
import ProductDescriptionTabs from '@/components/ProductDescriptionTabs';
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
      <main className="bg-[#fcf7f3] min-h-screen" id="main-content" aria-label="Product detail">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-10 pb-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-[#7e7e84] font-serif text-[1.2rem] italic">Loading product…</p>
          </div>
        </div>
      </main>
    );
  }

  if (!p) {
    return (
      <main className="bg-[#fcf7f3] min-h-screen" id="main-content" aria-label="Product detail">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-10 pb-20">
          <button
            className="inline-flex items-center gap-2 text-sm text-[#7e7e84] py-2 transition-colors mb-8 hover:text-[#252525] group font-sans cursor-pointer"
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
              <p className="text-[#7e7e84] font-serif text-[1.2rem] italic">Product not found.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const sameCategory = products.filter(x => x.category === p.category && x.id !== p.id);
  const related = (sameCategory.length > 0 ? sameCategory : products.filter(x => x.id !== p.id)).slice(0, 4);
  const isWL = isClient && wishlist.includes(String(p.id));

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

  const imageUrls = getProductImages(p);

  return (
    <main className="bg-[#fcf7f3] min-h-screen" id="main-content" aria-label="Product detail">
      <div className="max-w-[1750px] mx-auto px-5 sm:px-8 pt-8 pb-[80px] sm:pb-[100px]">
        <nav className="flex flex-wrap items-center gap-1.5 text-[0.7rem] tracking-[0.08em] uppercase text-[#7e7e84] font-medium font-sans mb-8 pb-4 border-b border-[#efede8]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#252525] underline-offset-4 hover:underline transition-colors no-underline">Home</Link>
          <span aria-hidden="true" className="text-[#287379]">›</span>
          <Link href={`/categories?cat=${p.category}`} className="hover:text-[#252525] underline-offset-4 hover:underline transition-colors no-underline">
            {p.categoryLabel}
          </Link>
          <span aria-hidden="true" className="text-[#287379]">›</span>
          <span className="text-[#252525]" aria-current="page">{p.title}</span>
        </nav>

        <div id="product-content" role="region" aria-label="Product information" className="lg:grid lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-x-10 lg:gap-y-8">
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="lg:sticky lg:top-[88px] lg:self-start lg:z-10 min-w-0">
              <ProductImageGallery images={imageUrls} title={p.title} bestSeller={p.bestSeller} />
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:min-w-0">
            <ProductPurchaseBlock
              product={p}
              isWishlisted={isWL}
              onToggleWishlist={toggleWishlist}
            />

            <div className="mt-[var(--space-lg)]">
              <ProductTrustBadges />
            </div>

            <div className="mt-[var(--space-md)]">
              <ProductShareRow />
            </div>

            <div className="mt-[var(--space-md)]">
              <ProductPromoHeader />
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-start-1 lg:row-start-2">
            <ProductDeliveryCheck />
          </div>
        </div>

        <div className="mt-8 lg:mt-[var(--space-lg)]">
          <ProductDescriptionTabs product={p} />
        </div>

        <ProductRelated
          products={related}
          categoryLabel={p.categoryLabel}
          categorySlug={p.category}
          wishlist={wishlist}
          onToggleWishlist={toggleRelatedWishlist}
          onAddToCart={addRelatedToCart}
          isInCart={isRelatedInCart}
        />

        <ProductReviewSection productId={p.id} productTitle={p.title} />
      </div>
    </main>
  );
}