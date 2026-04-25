import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Payment — Shop' };

export default function PaymentPage() {
  return (
    <section className="container mx-auto py-12 sm:py-20 text-center">
      <CreditCard className="h-12 w-12 mx-auto text-white/30 mb-4" />
      <h1 className="text-2xl sm:text-3xl font-bold">No payment methods</h1>
      <p className="text-white/60 mt-2">Cards saved at checkout will appear here.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/login"><Button variant="primary">Sign in</Button></Link>
        <Link href="/account"><Button variant="outline">Back</Button></Link>
      </div>
    </section>
  );
}
