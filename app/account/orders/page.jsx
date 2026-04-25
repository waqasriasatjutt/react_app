import Link from 'next/link';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Orders — Shop' };

export default function OrdersPage() {
  return (
    <section className="container mx-auto py-12 sm:py-20 text-center">
      <Package className="h-12 w-12 mx-auto text-white/30 mb-4" />
      <h1 className="text-2xl sm:text-3xl font-bold">No orders yet</h1>
      <p className="text-white/60 mt-2">Once you check out, your orders show up here.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/products"><Button variant="primary">Start shopping</Button></Link>
        <Link href="/account"><Button variant="outline">Back to account</Button></Link>
      </div>
    </section>
  );
}
