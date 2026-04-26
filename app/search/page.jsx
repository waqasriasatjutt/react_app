import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { searchProducts } from '@/lib/odoo';
import { formatPrice } from '@/lib/utils';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SearchBar from '@/components/layout/SearchBar';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Search — Shop' };

export default async function SearchPage({ searchParams }) {
  const q = (searchParams?.q || '').trim();
  let products = [];
  let error = null;
  if (q) {
    try {
      products = await searchProducts(q, 48);
    } catch (err) {
      error = err.message;
    }
  }

  return (
    <section className="container mx-auto py-8 sm:py-12">
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Search' }]} />

      <header className="mt-3 sm:mt-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold">
          {q ? <>Results for <span className="text-primary">"{q}"</span></> : 'Search'}
        </h1>
        <p className="text-sm sm:text-base text-white/60 mt-2">
          {q
            ? error ? 'Search failed.' : `${products.length} match${products.length === 1 ? '' : 'es'}`
            : 'What are you looking for?'}
        </p>
      </header>

      <div className="max-w-xl mb-8">
        <SearchBar autoFocus={!q} />
      </div>

      {error && (
        <div className="card-surface p-6 border-red-500/30">
          <p className="text-red-400 font-medium">Search unavailable.</p>
          <p className="text-xs text-white/50 mt-2 font-mono">{error}</p>
        </div>
      )}

      {!error && q && products.length === 0 && (
        <div className="card-surface p-10 text-center">
          <Search className="h-10 w-10 mx-auto text-white/30 mb-3" />
          <p className="text-white/70 font-medium">No products matched "{q}"</p>
          <p className="text-xs text-white/50 mt-2">Try a different keyword or browse the full catalog.</p>
          <div className="mt-4">
            <Link href="/products" className="text-primary hover:underline text-sm">Browse all products</Link>
          </div>
        </div>
      )}

      {!error && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
          {products.map(p => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="card-surface overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image src={p.image} alt={p.name} fill unoptimized sizes="200px"
                       className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-medium leading-snug line-clamp-2">{p.name}</h3>
                <span className="mt-auto pt-2 text-base font-semibold">{formatPrice(p.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
