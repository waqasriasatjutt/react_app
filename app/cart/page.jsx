'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { useEffect, useState } from 'react';

const SHIPPING_THRESHOLD = 99;
const SHIPPING_FEE = 9;

export default function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (!mounted) {
    return <section className="container mx-auto py-12"><div className="h-40" /></section>;
  }

  if (items.length === 0) {
    return (
      <section className="container mx-auto py-16 sm:py-24 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto text-white/30 mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold">Your cart is empty</h1>
        <p className="text-white/60 mt-2">Add a few items and they'll show up here.</p>
        <div className="mt-6">
          <Link href="/products"><Button variant="primary" size="lg">Start shopping</Button></Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-8 sm:py-12">
      <header className="mb-6 sm:mb-8 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary mb-1">Cart</p>
          <h1 className="text-2xl sm:text-3xl font-bold">Your items ({items.length})</h1>
        </div>
        <button onClick={clear} className="text-xs text-white/50 hover:text-white">Clear all</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10 items-start">
        {/* Items */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {items.map((it) => (
            <div key={it.id} className="card-surface p-3 sm:p-4 flex gap-3 sm:gap-4">
              <Link
                href={`/products/${it.slug}`}
                className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted"
              >
                <Image src={it.image} alt={it.name} fill unoptimized className="object-cover" sizes="96px" />
              </Link>

              <div className="flex flex-col flex-1 min-w-0">
                <Link href={`/products/${it.slug}`} className="font-medium leading-snug line-clamp-2 hover:text-primary">
                  {it.name}
                </Link>
                <span className="text-xs text-white/50 mt-1">{formatPrice(it.price)} each</span>

                <div className="mt-auto flex items-end justify-between gap-3">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button
                      onClick={() => setQty(it.id, it.qty - 1)}
                      className="w-8 h-8 grid place-items-center hover:bg-white/5 rounded-l-md"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{it.qty}</span>
                    <button
                      onClick={() => setQty(it.id, it.qty + 1)}
                      className="w-8 h-8 grid place-items-center hover:bg-white/5 rounded-r-md"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm sm:text-base">{formatPrice(it.qty * it.price)}</span>
                    <button
                      onClick={() => remove(it.id)}
                      className="text-white/50 hover:text-red-400"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="card-surface p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-white/60">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-white/60">Shipping</dt><dd>{shipping === 0 ? <span className="text-emerald-400">Free</span> : formatPrice(shipping)}</dd></div>
            {subtotal > 0 && subtotal < SHIPPING_THRESHOLD && (
              <p className="text-xs text-white/50 pt-1">
                Add {formatPrice(SHIPPING_THRESHOLD - subtotal)} more for free shipping.
              </p>
            )}
          </dl>
          <hr className="my-4 border-border" />
          <div className="flex justify-between text-base font-semibold mb-5">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link href="/checkout">
            <Button variant="primary" size="lg" className="w-full">Checkout</Button>
          </Link>
          <Link href="/products" className="mt-3 block text-center text-xs text-white/50 hover:text-white">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
