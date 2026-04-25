'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { X, ShoppingBag, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MobileMenu({ open, onClose, links }) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in md:hidden" />
        <Dialog.Content
          className="fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-card border-l border-border
                     shadow-2xl p-6 flex flex-col gap-2
                     data-[state=open]:animate-slide-up md:hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-base font-semibold">Menu</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="px-3 py-3 rounded-md text-base font-medium text-white/90
                           hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-border flex flex-col gap-2">
            <Link href="/account/orders" onClick={onClose}>
              <Button variant="outline" className="w-full justify-start gap-3">
                <ShoppingBag className="h-4 w-4" />
                My Orders
              </Button>
            </Link>
            <Link href="/account" onClick={onClose}>
              <Button variant="outline" className="w-full justify-start gap-3">
                <User className="h-4 w-4" />
                Account
              </Button>
            </Link>
            <Link href="/products" onClick={onClose}>
              <Button variant="primary" className="w-full justify-start gap-3">
                <Search className="h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
