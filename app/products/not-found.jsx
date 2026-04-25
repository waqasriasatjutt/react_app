import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <section className="container mx-auto py-20 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold">Product not found</h1>
      <p className="text-white/60 mt-3">It may have been removed or the link is broken.</p>
      <div className="mt-6">
        <Link href="/products"><Button variant="primary">Browse all products</Button></Link>
      </div>
    </section>
  );
}
