'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ className = '', autoFocus = false, onSubmitted }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params?.get('q') || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    router.push(`/search?q=${encodeURIComponent(term)}`);
    onSubmitted?.();
  };

  return (
    <form onSubmit={submit} className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 h-4 w-4 text-white/40 pointer-events-none" />
      <input
        ref={inputRef}
        type="search"
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products…"
        className="w-full h-10 pl-9 pr-9 rounded-md bg-white/5 border border-border
                   text-sm text-white placeholder:text-white/40
                   focus:outline-none focus:border-primary/60 focus:bg-white/10 transition"
      />
      {q && (
        <button
          type="button"
          aria-label="Clear"
          onClick={() => setQ('')}
          className="absolute right-2 p-1 text-white/50 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </form>
  );
}
