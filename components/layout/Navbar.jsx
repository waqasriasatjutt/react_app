'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, Search as SearchIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import CartBadge from './CartBadge';
import SearchBar from './SearchBar';

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/search',   label: 'Search' },
  { href: '/cart',     label: 'Cart' },
  { href: '/account',  label: 'Account' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 navbar-glass transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/40' : ''
        }`}
      >
        <div className="container mx-auto flex h-16 sm:h-20 items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight shrink-0"
          >
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-glow-primary">
              S
            </span>
            <span className="hidden xs:inline">Shop</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.filter(l => l.href !== '/search').map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search bar — fills remaining space */}
          <div className="hidden md:block flex-1 max-w-md ml-2">
            <SearchBar />
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Mobile search trigger */}
            <Link href="/search" className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Search">
                <SearchIcon className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <CartBadge />
            </Link>

            <Link href="/account" className="hidden sm:inline-flex">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
