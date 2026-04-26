import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Sara K.',   role: 'Verified buyer', stars: 5, body: 'Shipping was quick and the packaging felt premium. Will buy again.' },
  { name: 'Omar A.',   role: 'Verified buyer', stars: 5, body: 'Cash-on-delivery option made it really easy. Product matched the listing.' },
  { name: 'Lina M.',   role: 'Verified buyer', stars: 4, body: 'Returns process was painless. Customer support replied within hours.' },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto py-12 sm:py-16">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs uppercase tracking-widest text-primary mb-1">From real shoppers</p>
        <h2 className="text-2xl sm:text-3xl font-bold">What customers say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {REVIEWS.map(r => (
          <figure key={r.name} className="card-surface p-5 sm:p-6 flex flex-col">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i}
                      className={`h-4 w-4 ${i < r.stars ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
              ))}
            </div>
            <blockquote className="text-sm sm:text-base text-white/80 leading-relaxed">
              "{r.body}"
            </blockquote>
            <figcaption className="mt-4 text-xs text-white/55">
              <span className="text-white font-medium">{r.name}</span> · {r.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
