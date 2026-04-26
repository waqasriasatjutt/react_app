import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { fetchNewArrivals } from '@/lib/odoo';
import { formatPrice } from '@/lib/utils';

export default async function HeroSection() {
  let hero = null;
  try {
    const recent = await fetchNewArrivals(1);
    hero = recent[0] || null;
  } catch {
    hero = null;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />

      <div className="container mx-auto py-12 sm:py-16 md:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-10 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                             bg-primary/10 border border-primary/30 text-primary
                             text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Live catalog · powered by Odoo
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Premium gear,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                shipped fast.
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/70 max-w-xl">
              Every product is in stock and ready to ship. Free shipping over $99,
              30-day returns, and Cash on Delivery available at checkout.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/products">
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                  Shop now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products?sort=create_date+desc">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  New arrivals
                </Button>
              </Link>
            </div>

            <ul className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 max-w-md text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-white/70"><Truck className="h-4 w-4 text-primary" /> Free over $99</li>
              <li className="flex items-center gap-2 text-white/70"><ShieldCheck className="h-4 w-4 text-primary" /> Secure checkout</li>
              <li className="flex items-center gap-2 text-white/70"><Headphones className="h-4 w-4 text-primary" /> Lifetime support</li>
            </ul>
          </div>

          {hero && (
            <Link href={`/products/${hero.slug}`} className="relative card-surface overflow-hidden group block">
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-secondary text-secondary-foreground">
                Featured
              </div>
              <div className="relative aspect-[4/5] sm:aspect-[5/6] bg-muted">
                <Image
                  src={hero.image}
                  alt={hero.name}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent p-5 sm:p-6">
                  {hero.category && (
                    <span className="text-[11px] uppercase tracking-widest text-primary">{hero.category}</span>
                  )}
                  <h3 className="text-lg sm:text-2xl font-semibold mt-1 line-clamp-2">{hero.name}</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-bold">{formatPrice(hero.price)}</span>
                    <span className="text-xs sm:text-sm text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      View <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
