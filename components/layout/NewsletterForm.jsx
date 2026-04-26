'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('loading');
    await new Promise((r) => setTimeout(r, 500));
    setState('done');
    setEmail('');
    setTimeout(() => setState('idle'), 3000);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 h-10 px-3 rounded-l-md bg-white/5 border border-border border-r-0
                   text-sm text-white placeholder:text-white/40
                   focus:outline-none focus:border-primary/60"
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="h-10 px-3 rounded-r-md bg-primary text-primary-foreground
                   text-sm font-medium hover:opacity-90 disabled:opacity-60
                   inline-flex items-center gap-1"
      >
        {state === 'done' ? 'Subscribed' : <>Subscribe <ArrowRight className="h-3.5 w-3.5" /></>}
      </button>
    </form>
  );
}
