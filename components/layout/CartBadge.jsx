'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';

export default function CartBadge() {
  const count = useCart((s) => s.count());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const display = mounted ? count : 0;

  return (
    <span className="absolute -top-0.5 -right-0.5 grid place-items-center w-4 h-4 text-[10px] font-semibold rounded-full bg-secondary text-secondary-foreground">
      {display}
    </span>
  );
}
