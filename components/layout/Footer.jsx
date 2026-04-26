import Link from 'next/link';
import { Truck, ShieldCheck, RotateCcw, Headphones, Instagram, Twitter, Facebook } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

const COLS = [
  {
    title: 'Shop',
    links: [
      { href: '/products', label: 'All products' },
      { href: '/products?sort=create_date+desc', label: 'New arrivals' },
      { href: '/search', label: 'Search' },
    ],
  },
  {
    title: 'Account',
    links: [
      { href: '/account', label: 'My account' },
      { href: '/account/orders', label: 'Orders' },
      { href: '/login', label: 'Sign in' },
      { href: '/register', label: 'Create account' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/cart', label: 'Cart' },
      { href: '/checkout', label: 'Checkout' },
      { href: '/account/addresses', label: 'Addresses' },
      { href: '/account/payment', label: 'Payment methods' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 sm:mt-24">
      {/* Trust strip */}
      <div className="container mx-auto py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { Icon: Truck,        title: 'Free shipping', sub: 'On orders over $99' },
          { Icon: RotateCcw,    title: '30-day returns', sub: 'No questions asked' },
          { Icon: ShieldCheck,  title: 'Secure checkout', sub: 'Card / COD / Bank' },
          { Icon: Headphones,   title: 'Lifetime support', sub: 'Here when you need us' },
        ].map(({ Icon, title, sub }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="grid place-items-center w-9 h-9 rounded-md bg-primary/10 text-primary shrink-0">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium leading-tight">{title}</div>
              <div className="text-xs text-white/55 mt-0.5">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-border" />

      {/* Main footer */}
      <div className="container mx-auto py-10 sm:py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-glow-primary">S</span>
            Shop
          </div>
          <p className="text-sm text-white/60 max-w-sm">
            Curated audio, cameras and desk accessories. Shipping worldwide,
            backed by lifetime support.
          </p>

          <div className="mt-6">
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-2">Stay in the loop</h4>
            <NewsletterForm />
          </div>

          <div className="mt-6 flex items-center gap-2">
            <a href="#" aria-label="Instagram" className="grid place-items-center w-9 h-9 rounded-md border border-border hover:bg-white/5">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="grid place-items-center w-9 h-9 rounded-md border border-border hover:bg-white/5">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid place-items-center w-9 h-9 rounded-md border border-border hover:bg-white/5">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {COLS.map(col => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="border-border" />

      <div className="container mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/50">© {new Date().getFullYear()} Shop. All rights reserved.</p>
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          <span className="px-2 py-1 rounded border border-border bg-white/5">VISA</span>
          <span className="px-2 py-1 rounded border border-border bg-white/5">MASTERCARD</span>
          <span className="px-2 py-1 rounded border border-border bg-white/5">AMEX</span>
          <span className="px-2 py-1 rounded border border-border bg-white/5">COD</span>
          <span className="px-2 py-1 rounded border border-border bg-white/5">BANK</span>
        </div>
      </div>
    </footer>
  );
}
