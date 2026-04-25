import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '@/lib/odoo';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Products — Shop' };

export default async function ProductsPage({ searchParams }) {
  const category = searchParams?.category || null;

  let products = [];
  let error = null;
  try {
    products = await fetchProducts({ limit: 48, category });
  } catch (err) {
    error = err.message;
  }

  return (
    <section className="container mx-auto py-10 sm:py-14">
      <header className="mb-8 sm:mb-10 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary mb-2">Catalog</p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            {category ? `Products in "${category}"` : 'All products'}
          </h1>
          <p className="text-sm sm:text-base text-white/60 mt-2">
            {error ? 'Catalog unavailable.' : `${products.length} item${products.length === 1 ? '' : 's'} live from our backend.`}
          </p>
        </div>
        {category && (
          <Link href="/products" className="text-sm text-primary hover:underline">Clear filter →</Link>
        )}
      </header>

      {error && (
        <div className="card-surface p-6 border-red-500/30">
          <p className="text-red-400 font-medium">Couldn't reach the catalog.</p>
          <p className="text-xs text-white/50 mt-2 font-mono">{error}</p>
        </div>
      )}

      {!error && products.length === 0 && (
        <div className="card-surface p-10 text-center">
          <p className="text-white/60">No products yet{category ? ` in "${category}"` : ''}.</p>
          {category && (
            <div className="mt-4">
              <Link href="/products" className="text-primary hover:underline text-sm">See all products</Link>
            </div>
          )}
        </div>
      )}

      {!error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(p => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="card-surface overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="text-sm sm:text-base font-medium leading-snug line-clamp-2">
                  {p.name}
                </h3>
                {p.category && (
                  <span className="mt-1 text-xs text-white/50">{p.category}</span>
                )}
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
      )}
    </section>
  );
}
