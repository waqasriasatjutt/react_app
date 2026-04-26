'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuantityPicker from './QuantityPicker';
import { useCart } from '@/store/cart';

export default function AddToCartWithQty({ product }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(
      { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.thumb || product.image },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <QuantityPicker value={qty} onChange={setQty} />
      <Button onClick={onAdd} variant="primary" size="lg" className="flex-1 gap-2">
        {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to cart</>}
      </Button>
    </div>
  );
}
