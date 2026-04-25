'use client';

import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    alert('Auth not yet wired — NextAuth secrets pending.');
  };

  return (
    <section className="container mx-auto py-12 sm:py-20 max-w-md">
      <header className="mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-primary mb-2">Welcome back</p>
        <h1 className="text-2xl sm:text-3xl font-bold">Sign in</h1>
      </header>

      <form onSubmit={onSubmit} className="card-surface p-6 sm:p-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-white/60">Email</span>
          <div className="relative">
            <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              required
              className="w-full bg-bg/60 border border-border rounded-md pl-9 pr-3 py-2 text-sm
                         focus:outline-none focus:border-primary/60"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-white/60">Password</span>
          <div className="relative">
            <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="password"
              required
              className="w-full bg-bg/60 border border-border rounded-md pl-9 pr-3 py-2 text-sm
                         focus:outline-none focus:border-primary/60"
            />
          </div>
        </label>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>

        <p className="text-xs text-center text-white/60">
          Don't have an account? <Link href="/register" className="text-primary hover:underline">Create one</Link>
        </p>
      </form>
    </section>
  );
}
