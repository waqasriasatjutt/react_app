'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  useEffect(() => setMounted(true), []);

  const shipping = subtotal === 0 ? 0 : subtotal >= 99 ? 0 : 9;
  const total = subtotal + shipping;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Stripe wiring goes here once keys are live. For now: stub a fake order id.
    await new Promise((r) => setTimeout(r, 800));
    const id = 'WT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    clear();
    setSuccess(id);
    setSubmitting(false);
  };

  if (!mounted) return <section className="container mx-auto py-12"><div className="h-40" /></section>;

  if (success) {
    return (
      <section className="container mx-auto py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Order placed</h1>
        <p className="text-white/60 mt-2">Confirmation sent. Order ref <span className="font-mono text-primary">{success}</span>.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/account/orders"><Button variant="outline">View orders</Button></Link>
          <Link href="/products"><Button variant="primary">Keep shopping</Button></Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container mx-auto py-16 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Your cart is empty</h1>
        <p className="text-white/60 mt-2">There's nothing to check out.</p>
        <div className="mt-6"><Link href="/products"><Button variant="primary">Shop now</Button></Link></div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-8 sm:py-12">
      <header className="mb-6 sm:mb-8">
        <p className="text-xs uppercase tracking-widest text-primary mb-1">Checkout</p>
        <h1 className="text-2xl sm:text-3xl font-bold">Shipping & payment</h1>
      </header>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10 items-start">
        <div className="flex flex-col gap-6">
          <fieldset className="card-surface p-5 sm:p-6">
            <legend className="text-sm font-semibold mb-3">Contact</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone" type="tel" />
            </div>
          </fieldset>

          <fieldset className="card-surface p-5 sm:p-6">
            <legend className="text-sm font-semibold mb-3">Shipping address</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field name="firstName" label="First name" required />
              <Field name="lastName" label="Last name" required />
              <Field name="address" label="Address" className="sm:col-span-2" required />
              <Field name="city" label="City" required />
              <Field name="zip" label="Postal code" required />
              <Field name="country" label="Country" defaultValue="United States" required />
            </div>
          </fieldset>

          <fieldset className="card-surface p-5 sm:p-6">
            <legend className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" /> Payment
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field name="card" label="Card number" placeholder="4242 4242 4242 4242" className="sm:col-span-2" required />
              <Field name="exp" label="Expiry" placeholder="MM/YY" required />
              <Field name="cvc" label="CVC" placeholder="123" required />
            </div>
            <p className="mt-3 text-xs text-white/50">Card details are not yet processed — Stripe wiring TBD.</p>
          </fieldset>
        </div>

        <aside className="card-surface p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <ul className="space-y-3 text-sm">
            {items.map((it) => (
              <li key={it.id} className="flex justify-between gap-3">
                <span className="line-clamp-1">{it.qty}× {it.name}</span>
                <span>{formatPrice(it.qty * it.price)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-border" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-white/60">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-white/60">Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
          </dl>
          <hr className="my-4 border-border" />
          <div className="flex justify-between text-base font-semibold mb-5">
            <span>Total</span><span>{formatPrice(total)}</span>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
            {submitting ? 'Placing order…' : `Pay ${formatPrice(total)}`}
          </Button>
          <p className="mt-3 text-[11px] text-white/50 text-center">
            By placing your order you agree to our terms.
          </p>
        </aside>
      </form>
    </section>
  );
}

function Field({ label, name, className = '', ...rest }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs text-white/60">{label}</span>
      <input
        name={name}
        className="bg-bg/60 border border-border rounded-md px-3 py-2 text-sm
                   focus:outline-none focus:border-primary/60 transition-colors"
        {...rest}
      />
    </label>
  );
}
