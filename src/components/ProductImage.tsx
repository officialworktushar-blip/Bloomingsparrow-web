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
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
};

export default function ProductImage({ src, alt, className, style, loading = 'lazy', draggable, onLoad }: Props) {
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
      onLoad={onLoad}
      onError={() => setFailed(true)}
    />
  );
}
