import Link from 'next/link';
import { Tag } from 'lucide-react';
import { fetchCategories } from '@/lib/odoo';

const ACCENTS = [
  'from-primary/30 to-secondary/30',
  'from-secondary/30 to-primary/30',
  'from-primary/40 to-transparent',
  'from-secondary/40 to-transparent',
  'from-primary/30 to-secondary/20',
  'from-secondary/30 to-primary/20',
];

export default async function CategoriesGrid() {
  let cats = [];
  try {
    cats = await fetchCategories(12);
  } catch {
    cats = [];
  }
  if (cats.length === 0) return null;

  return (
    <section className="container mx-auto py-12 sm:py-16">
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary mb-1">Browse</p>
          <h2 className="text-2xl sm:text-3xl font-bold">Shop by category</h2>
        </div>
        <Link href="/products" className="text-primary text-sm font-medium hover:underline hidden sm:inline">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {cats.map((c, i) => (
          <Link
            key={c.id}
            href={`/products?category=${encodeURIComponent(c.label)}`}
            className="relative card-surface p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3 aspect-square overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} opacity-40 group-hover:opacity-70 transition-opacity`} />
            <Tag className="relative h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            <span className="relative text-xs sm:text-sm font-medium text-center line-clamp-2">{c.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
