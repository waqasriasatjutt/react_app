'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductGallery({ images = [], alt }) {
  const valid = images.filter(Boolean);
  const [active, setActive] = useState(0);
  if (!valid.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="card-surface relative aspect-square overflow-hidden">
        <Image
          src={valid[active]}
          alt={alt}
          fill
          unoptimized
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {valid.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {valid.slice(0, 5).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-md overflow-hidden border transition
                          ${i === active ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-white/30'}`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt="" fill unoptimized sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
