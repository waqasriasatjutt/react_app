import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '@/lib/odoo';
import { formatPrice } from '@/lib/utils';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Products — Shop' };

const SORTS = [
  { value: 'name asc',          label: 'Name A → Z' },
  { value: 'name desc',         label: 'Name Z → A' },
  { value: 'list_price asc',    label: 'Price low to high' },
  { value: 'list_price desc',   label: 'Price high to low' },
  { value: 'create_date desc',  label: 'Newest first' },
];

export default async function ProductsPage({ searchParams }) {
  const category = searchParams?.category || null;
  const sort = SORTS.find(s => s.value === searchParams?.sort)?.value || 'name asc';
  const minPrice = parseFloat(searchParams?.min || '');
  const maxPrice = parseFloat(searchParams?.max || '');

  let products = [];
  let error = null;
  try {
    products = await fetchProducts({ limit: 96, category, sort });
    if (Number.isFinite(minPrice)) products = products.filter(p => p.price >= minPrice);
    if (Number.isFinite(maxPrice)) products = products.filter(p => p.price <= maxPrice);
  } catch (err) {
    error = err.message;
  }

  return (
    <section className="container mx-auto py-6 sm:py-10">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/products', label: 'Products' },
          ...(category ? [{ label: category }] : []),
        ]}
      />

      <header className="mt-3 sm:mt-4 mb-6 sm:mb-8">
        <p className="text-xs uppercase tracking-widest text-primary mb-2">Catalog</p>
        <h1 className="text-3xl sm:text-4xl font-bold">
          {category ? `${category}` : 'All products'}
        </h1>
        <p className="text-sm sm:text-base text-white/60 mt-2">
          {error ? 'Catalog unavailable.' : `${products.length} item${products.length === 1 ? '' : 's'}`}
        </p>
      </header>

      {/* Toolbar: sort + price + clear */}
      <form action="/products" method="get" className="card-surface p-3 sm:p-4 mb-6 sm:mb-8 flex flex-wrap items-end gap-3">
        {category && <input type="hidden" name="category" value={category} />}

        <label className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-widest text-white/50">Sort</span>
          <select name="sort" defaultValue={sort}
                  className="bg-bg/60 border border-border rounded-md px-3 h-9 text-sm focus:outline-none focus:border-primary/60">
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-widest text-white/50">Min price</span>
          <input type="number" name="min" min="0" step="1" defaultValue={searchParams?.min || ''}
                 className="bg-bg/60 border border-border rounded-md px-3 h-9 text-sm w-24 focus:outline-none focus:border-primary/60" />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-widest text-white/50">Max price</span>
          <input type="number" name="max" min="0" step="1" defaultValue={searchParams?.max || ''}
                 className="bg-bg/60 border border-border rounded-md px-3 h-9 text-sm w-24 focus:outline-none focus:border-primary/60" />
        </label>

        <button type="submit" className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          Apply
        </button>

        {(category || searchParams?.sort || searchParams?.min || searchParams?.max) && (
          <Link href="/products" className="text-sm text-white/60 hover:text-white px-2 py-1">
            Clear all
          </Link>
        )}
      </form>

      {error && (
        <div className="card-surface p-6 border-red-500/30">
          <p className="text-red-400 font-medium">Couldn't reach the catalog.</p>
          <p className="text-xs text-white/50 mt-2 font-mono">{error}</p>
        </div>
      )}

      {!error && products.length === 0 && (
        <div className="card-surface p-10 text-center">
          <p className="text-white/60">No products match these filters.</p>
          <div className="mt-4">
            <Link href="/products" className="text-primary hover:underline text-sm">See all products</Link>
          </div>
        </div>
      )}

      {!error && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
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
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-medium leading-snug line-clamp-2">
                  {p.name}
                </h3>
                {p.category && (
                  <span className="mt-1 text-[11px] text-white/50">{p.category}</span>
                )}
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="text-base sm:text-lg font-semibold">
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
