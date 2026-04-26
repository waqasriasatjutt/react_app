import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import PromoBanner from '@/components/home/PromoBanner';
import Testimonials from '@/components/home/Testimonials';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={null}><CategoriesGrid /></Suspense>
      <Suspense fallback={null}><NewArrivals /></Suspense>
      <Suspense fallback={null}><FeaturedProducts /></Suspense>
      <PromoBanner />
      <Testimonials />
    </>
  );
}
