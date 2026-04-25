import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';

export default function CategoriesGrid() {
  return (
    <section className="container mx-auto py-12 sm:py-16">
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Shop by category</h2>
          <p className="text-sm sm:text-base text-white/60 mt-1">Find what you need fast.</p>
        </div>
        <Link href="/products" className="text-primary text-sm font-medium hover:underline hidden sm:inline">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className={`relative card-surface p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3 aspect-square overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-50 group-hover:opacity-100 transition-opacity`} />
            <span className="relative text-3xl sm:text-4xl">{cat.icon}</span>
            <span className="relative text-xs sm:text-sm font-medium text-center">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
