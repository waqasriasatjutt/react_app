import Link from 'next/link';
import { ShoppingBag, MapPin, CreditCard, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Account — Shop' };

const TILES = [
  { href: '/account/orders', icon: ShoppingBag, title: 'Orders', text: 'Track and manage your purchases.' },
  { href: '/account/addresses', icon: MapPin, title: 'Addresses', text: 'Where we ship to.' },
  { href: '/account/payment', icon: CreditCard, title: 'Payment methods', text: 'Cards on file.' },
];

export default function AccountPage() {
  return (
    <section className="container mx-auto py-8 sm:py-12">
      <header className="mb-8 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary mb-1">Your account</p>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-primary/20 text-primary">
              <User className="h-5 w-5" />
            </span>
            Hello, guest
          </h1>
        </div>
        <Link href="/login" className="hidden sm:block">
          <Button variant="outline" className="gap-2">
            <LogIn className="h-4 w-4" /> Sign in
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TILES.map(({ href, icon: Icon, title, text }) => (
          <Link key={href} href={href} className="card-surface p-5 flex flex-col gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-xs text-white/60">{text}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 sm:hidden">
        <Link href="/login"><Button variant="primary" size="lg" className="w-full">Sign in</Button></Link>
      </div>
    </section>
  );
}
