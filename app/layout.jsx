import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Shop',
  description: 'A modern ecommerce experience',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg text-white antialiased">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="page-enter pt-16 sm:pt-20 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
