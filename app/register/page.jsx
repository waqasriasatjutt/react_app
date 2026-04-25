'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function RegisterPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    alert('Registration not yet wired — NextAuth + Odoo res.partner sync pending.');
  };

  return (
    <section className="container mx-auto py-12 sm:py-20 max-w-md">
      <header className="mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-primary mb-2">Get started</p>
        <h1 className="text-2xl sm:text-3xl font-bold">Create account</h1>
      </header>

      <form onSubmit={onSubmit} className="card-surface p-6 sm:p-8 flex flex-col gap-4">
        <Field label="Full name" type="text" required />
        <Field label="Email" type="email" required />
        <Field label="Password" type="password" required minLength={8} />
        <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={submitting}>
          {submitting ? 'Creating…' : 'Create account'}
        </Button>
        <p className="text-xs text-center text-white/60">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </form>
    </section>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-white/60">{label}</span>
      <input
        className="bg-bg/60 border border-border rounded-md px-3 py-2 text-sm
                   focus:outline-none focus:border-primary/60"
        {...rest}
      />
    </label>
  );
}
