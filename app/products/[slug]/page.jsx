import { notFound } from 'next/navigation';
import { Truck, Shield, RotateCcw } from 'lucide-react';
import { fetchProductBySlug } from '@/lib/odoo';
import { formatPrice } from '@/lib/utils';
import AddToCartWithQty from '@/components/products/AddToCartWithQty';
import ProductGallery from '@/components/products/ProductGallery';
import RelatedProducts from '@/components/products/RelatedProducts';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

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
    <section className="container mx-auto py-6 sm:py-10">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/products', label: 'Products' },
          ...(product.category ? [{ href: `/products?category=${encodeURIComponent(product.category)}`, label: product.category }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        <ProductGallery images={product.gallery} alt={product.name} />

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

          <div className="mt-4 flex items-baseline gap-3 flex-wrap">
            <span className="text-2xl sm:text-3xl font-semibold">{formatPrice(product.price)}</span>
            <span className={`text-xs font-medium ${product.inStock ? 'text-emerald-400' : 'text-amber-400'}`}>
              {product.inStock ? `In stock${product.qtyAvailable ? ` · ${product.qtyAvailable} available` : ''}` : 'Made to order'}
            </span>
          </div>

          {product.description && (
            <p className="mt-5 text-white/70 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {product.description}
            </p>
          )}

          <div className="mt-6">
            <AddToCartWithQty product={product} />
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <li className="card-surface p-3 flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Free over $99
            </li>
            <li className="card-surface p-3 flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-primary" /> 30-day returns
            </li>
            <li className="card-surface p-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Secure checkout
            </li>
          </ul>

          <p className="mt-5 text-xs text-white/55">
            Pay by <span className="text-white">card</span>, <span className="text-white">bank transfer</span>, or
            {' '}<span className="text-white">cash on delivery</span>.
          </p>
        </div>
      </div>

      <RelatedProducts productId={product.id} categoryId={product.categoryId} />
    </section>
  );
}
