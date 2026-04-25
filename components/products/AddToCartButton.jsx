'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart';

export default function AddToCartButton({ product, size = 'md', fullWidth = false }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Button
      variant="primary"
      size={size}
      className={`gap-2 ${fullWidth ? 'w-full' : ''}`}
      onClick={handleClick}
    >
      {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
      {added ? 'Added' : 'Add to cart'}
    </Button>
  );
}
