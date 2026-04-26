import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-xs sm:text-sm">
      <ol className="flex items-center gap-1 flex-wrap text-white/50">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-white">{item.label}</Link>
            ) : (
              <span className="text-white/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
