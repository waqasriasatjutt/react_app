import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { fetchProductBySlug } from '@/lib/odoo';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/products/AddToCartButton';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const p = await fetchProductBySlug(params.slug);
    return { title: p ? `${p.name} — Shop` : 'Product not found' };
  } catch {
    return { title: 'Product — Shop' };
  }
}

export default async function ProductDetail({ params }) {
  let product = null;
  try {
    product = await fetchProductBySlug(params.slug);
  } catch (err) {
    return (
      <section className="container mx-auto py-12">
        <div className="card-surface p-6 border-red-500/30">
          <p className="text-red-400 font-medium">Couldn't load this product.</p>
          <p className="text-xs text-white/50 mt-2 font-mono">{err.message}</p>
        </div>
      </section>
    );
  }

  if (!product) notFound();

  return (
    <section className="container mx-auto py-8 sm:py-12">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6">
        <ChevronLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        <div className="card-surface relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          {product.category && (
            <span className="text-xs uppercase tracking-widest text-primary mb-2">
              {product.category}
            </span>
          )}
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">{product.name}</h1>
          {product.sku && (
            <span className="text-xs text-white/50 mt-2 font-mono">SKU {product.sku}</span>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-semibold">{formatPrice(product.price)}</span>
            <span className={`text-xs font-medium ${product.inStock ? 'text-emerald-400' : 'text-amber-400'}`}>
              {product.inStock ? 'In stock' : 'Made to order'}
            </span>
          </div>

          {product.description && (
            <p className="mt-5 text-white/70 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {product.description}
            </p>
          )}

          <div className="mt-6">
            <AddToCartButton product={product} size="lg" fullWidth />
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <li className="card-surface p-3 flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Free over $99
            </li>
            <li className="card-surface p-3 flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-primary" /> 30-day returns
            </li>
            <li className="card-surface p-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Lifetime support
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
