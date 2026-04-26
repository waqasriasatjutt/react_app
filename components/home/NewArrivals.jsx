import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { fetchNewArrivals } from '@/lib/odoo';
import { formatPrice } from '@/lib/utils';

export default async function NewArrivals() {
  let products = [];
  try {
    products = await fetchNewArrivals(8);
  } catch {
    return null;
  }
  if (products.length === 0) return null;

  return (
    <section className="container mx-auto py-12 sm:py-16">
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary mb-1">Just landed</p>
          <h2 className="text-2xl sm:text-3xl font-bold">New arrivals</h2>
        </div>
        <Link href="/products?sort=create_date+desc"
              className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
          See all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-flow-col auto-cols-[70%] sm:auto-cols-[40%] md:auto-cols-[28%] lg:auto-cols-[22%]
                      gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4">
        {products.map(p => (
          <Link key={p.id} href={`/products/${p.slug}`}
                className="card-surface overflow-hidden flex flex-col group snap-start">
            <div className="relative aspect-square bg-muted overflow-hidden">
              <Image src={p.image} alt={p.name} fill unoptimized
                     sizes="(max-width:640px) 70vw, 25vw"
                     className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm font-medium leading-snug line-clamp-2">{p.name}</h3>
              {p.category && <span className="text-[11px] text-white/50 mt-0.5">{p.category}</span>}
              <span className="mt-auto pt-2 text-base font-semibold">{formatPrice(p.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
