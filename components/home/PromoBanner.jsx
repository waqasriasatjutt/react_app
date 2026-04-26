import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BadgePercent } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="container mx-auto py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/15 via-bg to-secondary/15 p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />

        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              <BadgePercent className="h-3.5 w-3.5" /> Limited time
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
              Save 20% with code <span className="font-mono px-2 py-0.5 bg-white/10 rounded text-primary">FIRST20</span>
            </h3>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl">
              Pay by card, bank transfer, or cash on delivery. Same-day dispatch
              for orders before 2pm. Free shipping on orders over $99.
            </p>
          </div>
          <Link href="/products" className="md:justify-self-end">
            <Button variant="primary" size="lg" className="gap-2">
              Browse the catalog <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
