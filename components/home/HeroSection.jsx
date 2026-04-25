import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="container mx-auto py-12 sm:py-20 md:py-28 relative">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                           bg-primary/10 border border-primary/30 text-primary
                           text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            New season collection
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Tools for the{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              modern desk
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/70 max-w-xl">
            Curated audio, cameras, and accessories. Free shipping over $99,
            30-day returns, lifetime support on everything we sell.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/products">
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products?filter=new">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View what's new
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
            {[
              { v: '12k+', l: 'Customers' },
              { v: '4.8/5', l: 'Reviews' },
              { v: '48h', l: 'Shipping' },
            ].map(s => (
              <div key={s.l}>
                <div className="text-xl sm:text-2xl font-bold">{s.v}</div>
                <div className="text-xs sm:text-sm text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
