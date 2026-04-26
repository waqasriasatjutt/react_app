'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lock, CreditCard, Truck, Building2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

const COUPONS = {
  FIRST20: { kind: 'percent', value: 20, label: '20% off your first order' },
  FREESHIP: { kind: 'shipping', value: 0, label: 'Free shipping' },
};

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => setMounted(true), []);

  const baseShipping = subtotal === 0 ? 0 : subtotal >= 99 ? 0 : 9;
  const codFee = paymentMethod === 'cod' ? 5 : 0;
  const couponDiscount = coupon?.kind === 'percent' ? Math.round(subtotal * (coupon.value / 100)) : 0;
  const couponShipsFree = coupon?.kind === 'shipping';
  const shipping = couponShipsFree ? 0 : baseShipping;
  const total = Math.max(0, subtotal - couponDiscount + shipping + codFee);

  const applyCoupon = () => {
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setCoupon({ code, ...COUPONS[code] });
    } else {
      setCoupon(null);
      setCouponError('Invalid code');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const id = 'WT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    clear();
    setSuccess({ id, paymentMethod });
    setSubmitting(false);
  };

  if (!mounted) return <section className="container mx-auto py-12"><div className="h-40" /></section>;

  if (success) {
    return (
      <section className="container mx-auto py-16 text-center">
        <div className="grid place-items-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto mb-4">✓</div>
        <h1 className="text-3xl sm:text-4xl font-bold">Order placed</h1>
        <p className="text-white/60 mt-2">
          Order ref <span className="font-mono text-primary">{success.id}</span>.
          {success.paymentMethod === 'cod' && ' Pay in cash on delivery.'}
          {success.paymentMethod === 'bank' && ' Bank transfer instructions sent to your email.'}
          {success.paymentMethod === 'card' && ' Confirmation email is on its way.'}
        </p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
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
    <section className="container mx-auto py-6 sm:py-10">
      <header className="mb-6 sm:mb-8">
        <p className="text-xs uppercase tracking-widest text-primary mb-1">Checkout</p>
        <h1 className="text-2xl sm:text-3xl font-bold">Shipping & payment</h1>
      </header>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
        <div className="flex flex-col gap-6">
          <fieldset className="card-surface p-5 sm:p-6">
            <legend className="text-sm font-semibold mb-3">Contact</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone" type="tel" required />
            </div>
          </fieldset>

          <fieldset className="card-surface p-5 sm:p-6">
            <legend className="text-sm font-semibold mb-3">Shipping address</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field name="firstName" label="First name" required />
              <Field name="lastName" label="Last name" required />
              <Field name="address" label="Address" className="sm:col-span-2" required />
              <Field name="apt" label="Apartment / suite (optional)" className="sm:col-span-2" />
              <Field name="city" label="City" required />
              <Field name="zip" label="Postal code" required />
              <Field name="country" label="Country" defaultValue="United States" required />
            </div>
          </fieldset>

          <fieldset className="card-surface p-5 sm:p-6">
            <legend className="text-sm font-semibold mb-3">Payment method</legend>

            <div className="grid grid-cols-1 gap-2.5">
              <PaymentOption
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                Icon={CreditCard}
                title="Credit / Debit card"
                sub="Visa, Mastercard, Amex"
              />
              <PaymentOption
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                Icon={Truck}
                title="Cash on Delivery"
                sub={`Pay in cash when your order arrives · +${formatPrice(5)} fee`}
              />
              <PaymentOption
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
                Icon={Building2}
                title="Bank transfer"
                sub="Instructions sent to your email after checkout"
              />
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field name="card" label="Card number" placeholder="4242 4242 4242 4242" className="sm:col-span-2" required />
                <Field name="exp" label="Expiry" placeholder="MM/YY" required />
                <Field name="cvc" label="CVC" placeholder="123" required />
                <p className="sm:col-span-2 text-[11px] text-white/45 inline-flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Card is not yet processed — Stripe wiring TBD.
                </p>
              </div>
            )}
            {paymentMethod === 'cod' && (
              <div className="mt-4 text-xs text-white/65 leading-relaxed border-t border-border pt-4">
                Have <span className="text-white font-medium">{formatPrice(total)}</span> ready in cash. Our courier will collect on delivery.
                A small <span className="text-white">{formatPrice(5)}</span> fee applies to all COD orders.
              </div>
            )}
            {paymentMethod === 'bank' && (
              <div className="mt-4 text-xs text-white/65 leading-relaxed border-t border-border pt-4 space-y-1">
                <p>Order confirmation will include our bank details.</p>
                <p>Orders ship within 24h of receiving payment.</p>
              </div>
            )}
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

          {/* Coupon code */}
          <div className="mb-4">
            <label className="text-[11px] uppercase tracking-widest text-white/50 mb-1.5 inline-flex items-center gap-1.5">
              <Tag className="h-3 w-3" /> Promo code
            </label>
            <div className="flex">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="FIRST20"
                className="flex-1 h-9 px-3 rounded-l-md bg-bg/60 border border-border border-r-0 text-sm focus:outline-none focus:border-primary/60"
              />
              <button type="button" onClick={applyCoupon}
                      className="h-9 px-3 rounded-r-md bg-white/10 text-sm font-medium hover:bg-white/15">
                Apply
              </button>
            </div>
            {coupon && (
              <p className="mt-1.5 text-[11px] text-emerald-400">
                {coupon.code} applied — {coupon.label}.{' '}
                <button type="button" onClick={() => { setCoupon(null); setCouponInput(''); }} className="underline">remove</button>
              </p>
            )}
            {couponError && <p className="mt-1.5 text-[11px] text-red-400">{couponError}</p>}
          </div>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-white/60">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-400"><dt>Discount ({coupon.code})</dt><dd>-{formatPrice(couponDiscount)}</dd></div>
            )}
            <div className="flex justify-between">
              <dt className="text-white/60">Shipping</dt>
              <dd>{shipping === 0 ? <span className="text-emerald-400">Free</span> : formatPrice(shipping)}</dd>
            </div>
            {codFee > 0 && (
              <div className="flex justify-between"><dt className="text-white/60">COD fee</dt><dd>{formatPrice(codFee)}</dd></div>
            )}
          </dl>
          <hr className="my-4 border-border" />
          <div className="flex justify-between text-base font-semibold mb-5">
            <span>Total</span><span>{formatPrice(total)}</span>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
            {submitting
              ? 'Placing order…'
              : paymentMethod === 'cod' ? `Place order · ${formatPrice(total)}`
              : paymentMethod === 'bank' ? `Confirm order · ${formatPrice(total)}`
              : `Pay ${formatPrice(total)}`}
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

function PaymentOption({ checked, onChange, Icon, title, sub }) {
  return (
    <label className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition
                       ${checked ? 'border-primary bg-primary/5' : 'border-border hover:border-white/30'}`}>
      <input type="radio" name="payment_method" checked={checked} onChange={onChange}
             className="accent-primary" />
      <Icon className={`h-5 w-5 ${checked ? 'text-primary' : 'text-white/60'}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-[11px] text-white/55 line-clamp-1">{sub}</div>
      </div>
    </label>
  );
}
