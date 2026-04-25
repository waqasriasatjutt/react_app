import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { FEATURED_PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function FeaturedProducts() {
  return (
    <section className="container mx-auto py-12 sm:py-16">
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Featured</h2>
          <p className="text-sm sm:text-base text-white/60 mt-1">Hand-picked from this season's collection.</p>
        </div>
        <Link href="/products" className="text-primary text-sm font-medium hover:underline hidden sm:inline">
          See all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {FEATURED_PRODUCTS.map(p => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="card-surface overflow-hidden flex flex-col group"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {p.badge && (
                <span className="absolute top-3 left-3 px-2 py-1 rounded-md
                                 text-xs font-medium bg-primary text-primary-foreground
                                 shadow-glow-primary">
                  {p.badge}
                </span>
              )}
            </div>

            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h3 className="text-sm sm:text-base font-medium leading-snug line-clamp-2">
                {p.name}
              </h3>
              <div className="mt-2 flex items-center gap-1 text-xs text-white/60">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {p.rating}
              </div>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <span className="text-lg sm:text-xl font-semibold">
                  {formatPrice(p.price)}
                </span>
                <span className="text-xs text-primary font-medium">View →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
