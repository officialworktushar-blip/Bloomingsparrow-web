'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';
import { Product } from '@/lib/data';

type Props = {
  product: Product;
  cartItem: { id: string; quantity: number } | undefined;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
};

const INFO_FIELDS: { key: keyof Product; label: string }[] = [
  { key: 'material', label: 'Material' },
  { key: 'dimensions', label: 'Dimensions' },
  { key: 'origin', label: 'Origin' },
  { key: 'artisan', label: 'Artisan' },
];

export default function ProductInfo({ product, cartItem, isWishlisted, onToggleWishlist }: Props) {
  const router = useRouter();
  const { addToCart, updateQuantity } = useStore();
  const p = product;
  const priceClean = p.price.replace('₹', '').trim();

  const handleAddToCart = () => {
    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      numericPrice: parseInt(p.price.replace(/\D/g, ''), 10),
      image: p.image,
      quantity: 1,
    });
    Swal.fire({
      title: 'Added to cart!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      numericPrice: parseInt(p.price.replace(/\D/g, ''), 10),
      image: p.image,
      quantity: 1,
    });
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col">
      <nav className="mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[#8C8477] font-medium font-sans">
          <li>
            <Link href="/" className="hover:text-[#1C1A18] transition-colors">Home</Link>
          </li>
          <li aria-hidden="true" className="text-[#E4DED3]">/</li>
          <li>
            <Link href={`/categories?cat=${p.category}`} className="hover:text-[#1C1A18] transition-colors">
              {p.categoryLabel}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="flex items-start justify-between gap-4 mb-1">
        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] lg:text-[2.8rem] font-semibold leading-[1.15] text-[#1C1A18] tracking-[-0.01em]">
          {p.title}
        </h1>
        <button
          onClick={onToggleWishlist}
          className="shrink-0 mt-2 w-10 h-10 rounded-full border border-[#E4DED3] flex items-center justify-center transition-all duration-200 hover:border-[#B5533C] hover:text-[#B5533C]"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isWishlisted ? '#B5533C' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            className={isWishlisted ? 'text-[#B5533C]' : 'text-[#8C8477]'}
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      <div className="mb-2">
        <span className="text-[0.7rem] tracking-[0.1em] uppercase text-[#8C8477] font-medium font-sans mr-2.5">Price</span>
        <span className="font-serif text-[1.75rem] font-semibold text-[#1C1A18]">₹{priceClean}</span>
      </div>
      <p className="text-[0.8rem] text-[#8C8477] mb-6 font-sans">Inclusive of all taxes · Free shipping</p>

      <div className="flex items-center gap-3 mb-7">
        {cartItem ? (
          <div className="h-[3rem] rounded-full border border-[#1C1A18] bg-white flex items-center justify-between px-5 text-[#1C1A18] font-medium w-[10rem] font-sans">
            <button
              onClick={() => updateQuantity(p.id, cartItem.quantity - 1)}
              className="text-xl px-1.5 hover:text-[#C8A96E] transition-colors leading-none pb-0.5"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="text-[0.95rem] w-8 text-center">{cartItem.quantity}</span>
            <button
              onClick={() => updateQuantity(p.id, cartItem.quantity + 1)}
              className="text-xl px-1.5 hover:text-[#C8A96E] transition-colors leading-none pb-0.5"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button className="btn-secondary" onClick={handleAddToCart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            Add to Cart
          </button>
        )}
        <button className="btn-primary" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>

      {p.description && (
        <p className="text-[0.9rem] text-[#8C8477] leading-[1.8] mb-8 font-sans">
          {p.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-y-7 gap-x-6 mb-8">
        {INFO_FIELDS.map(({ key, label }) => {
          const val = p[key];
          if (!val || (typeof val === 'string' && val.trim() === '')) return null;
          return (
            <div key={key}>
              <div className="product-label mb-1.5">{label}</div>
              <div className="text-[0.875rem] text-[#1C1A18] font-medium font-sans">{val}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
