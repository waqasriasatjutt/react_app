'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/products', label: 'Shop' },
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
        <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight"
          >
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-glow-primary">
              S
            </span>
            <span className="hidden xs:inline">Shop</span>
          </Link>

          {/* Desktop links — hidden below md */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster: search (md+), cart, user, hamburger (mobile) */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              {/* Cart badge — hooked to store later */}
              <span className="absolute -top-0.5 -right-0.5 grid place-items-center w-4 h-4 text-[10px] font-semibold rounded-full bg-secondary text-secondary-foreground">
                0
              </span>
            </Link>

            <Link href="/account" className="hidden sm:inline-flex">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Hamburger — visible below md */}
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
