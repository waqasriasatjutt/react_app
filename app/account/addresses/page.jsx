import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Addresses — Shop' };

export default function AddressesPage() {
  return (
    <section className="container mx-auto py-12 sm:py-20 text-center">
      <MapPin className="h-12 w-12 mx-auto text-white/30 mb-4" />
      <h1 className="text-2xl sm:text-3xl font-bold">No saved addresses</h1>
      <p className="text-white/60 mt-2">Sign in to save and manage shipping addresses.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/login"><Button variant="primary">Sign in</Button></Link>
        <Link href="/account"><Button variant="outline">Back</Button></Link>
      </div>
    </section>
  );
}
