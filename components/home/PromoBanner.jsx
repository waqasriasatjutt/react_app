import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PromoBanner() {
  return (
    <section className="container mx-auto py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 sm:p-12">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />

        <div className="relative max-w-xl">
          <div className="text-xs sm:text-sm font-medium text-secondary mb-2 uppercase tracking-wider">
            Limited time
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold leading-tight">
            Save 20% on your first order
          </h3>
          <p className="mt-3 sm:mt-4 text-white/70 text-sm sm:text-base">
            Use code <span className="font-mono px-2 py-0.5 bg-white/10 rounded">FIRST20</span> at
            checkout. Free shipping on orders over $99.
          </p>
          <div className="mt-5 sm:mt-6">
            <Link href="/products">
              <Button variant="secondary" size="lg" className="gap-2">
                Browse the collection →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
