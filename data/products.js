// Seed data — replace with backend API later
export const PRODUCTS = [
  {
    slug: 'wireless-noise-cancelling-headphones',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'audio',
    rating: 4.7,
    badge: 'Best Seller',
  },
  {
    slug: 'compact-mirrorless-camera',
    name: 'Compact Mirrorless Camera',
    price: 899,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    category: 'cameras',
    rating: 4.8,
  },
  {
    slug: 'mechanical-keyboard-low-profile',
    name: 'Low-Profile Mechanical Keyboard',
    price: 159,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    category: 'desk',
    rating: 4.6,
    badge: 'New',
  },
  {
    slug: 'minimalist-leather-backpack',
    name: 'Minimalist Leather Backpack',
    price: 219,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    category: 'bags',
    rating: 4.5,
  },
  {
    slug: 'smart-fitness-watch',
    name: 'Smart Fitness Watch',
    price: 329,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    category: 'wearables',
    rating: 4.4,
  },
  {
    slug: 'aluminum-laptop-stand',
    name: 'Aluminium Laptop Stand',
    price: 79,
    image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&q=80',
    category: 'desk',
    rating: 4.7,
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);
