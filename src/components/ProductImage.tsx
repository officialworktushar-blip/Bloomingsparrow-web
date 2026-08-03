'use client';

import { useState } from 'react';
import { resolveImageSrc } from '@/lib/data';

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  draggable?: boolean;
};

export default function ProductImage({ src, alt, className, style, loading = 'lazy', draggable }: Props) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveImageSrc(failed ? '' : src);
  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      draggable={draggable}
      onError={() => setFailed(true)}
    />
  );
}
