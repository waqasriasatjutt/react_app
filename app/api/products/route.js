import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/odoo';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '24', 10), 100);
  try {
    const products = await fetchProducts({ limit });
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
