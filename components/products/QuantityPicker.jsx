'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantityPicker({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="inline-flex items-center rounded-md border border-border h-11">
      <button type="button" onClick={dec} className="w-10 h-full grid place-items-center hover:bg-white/5 rounded-l-md" aria-label="Decrease">
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-12 text-center font-medium">{value}</span>
      <button type="button" onClick={inc} className="w-10 h-full grid place-items-center hover:bg-white/5 rounded-r-md" aria-label="Increase">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
