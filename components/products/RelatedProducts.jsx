import Link from 'next/link';
import Image from 'next/image';
import { fetchRelated } from '@/lib/odoo';
import { formatPrice } from '@/lib/utils';

export default async function RelatedProducts({ productId, categoryId }) {
  let items = [];
  try {
    items = await fetchRelated(productId, categoryId, 4);
  } catch {
    return null;
  }
  if (items.length === 0) return null;

  return (
    <section className="mt-14 sm:mt-20">
      <h2 className="text-xl sm:text-2xl font-bold mb-5">You may also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {items.map(p => (
          <Link key={p.id} href={`/products/${p.slug}`} className="card-surface overflow-hidden flex flex-col group">
            <div className="relative aspect-square bg-muted overflow-hidden">
              <Image src={p.image} alt={p.name} fill unoptimized sizes="200px"
                     className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm font-medium leading-snug line-clamp-2">{p.name}</h3>
              <span className="mt-auto pt-2 text-base font-semibold">{formatPrice(p.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
