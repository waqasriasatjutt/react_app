// Server-only Odoo JSON-RPC client. Do NOT import from a client component.
// Reads creds from env: ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASSWORD.
import 'server-only';

const URL = process.env.ODOO_URL;
const DB = process.env.ODOO_DB;
const USER = process.env.ODOO_USER;
const PASSWORD = process.env.ODOO_PASSWORD;

let cachedUid = null;

async function rpc(service, method, args) {
  if (!URL) throw new Error('ODOO_URL not configured');
  const res = await fetch(`${URL}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: { service, method, args },
    }),
  });
  if (!res.ok) throw new Error(`Odoo HTTP ${res.status}`);
  const data = await res.json();
  if (data.error) {
    const msg = data.error.data?.message || data.error.message || 'Odoo error';
    throw new Error(msg);
  }
  return data.result;
}

async function getUid() {
  if (cachedUid) return cachedUid;
  if (!URL || !DB || !USER || !PASSWORD) {
    throw new Error('Odoo env not configured (ODOO_URL/DB/USER/PASSWORD)');
  }
  cachedUid = await rpc('common', 'authenticate', [DB, USER, PASSWORD, {}]);
  if (!cachedUid) throw new Error('Odoo authentication failed');
  return cachedUid;
}

export async function searchRead(model, domain, fields, opts = {}) {
  const uid = await getUid();
  return rpc('object', 'execute_kw', [
    DB, uid, PASSWORD,
    model, 'search_read',
    [domain, fields],
    { limit: opts.limit || 50, offset: opts.offset || 0, order: opts.order || 'id desc' },
  ]);
}

export async function read(model, ids, fields) {
  const uid = await getUid();
  return rpc('object', 'execute_kw', [
    DB, uid, PASSWORD,
    model, 'read', [ids, fields], {},
  ]);
}

export function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

export function imageUrl(model, id, field = 'image_512') {
  return `${URL}/web/image?model=${model}&id=${id}&field=${field}`;
}

function mapProduct(p) {
  return {
    id: p.id,
    slug: `${slugify(p.name)}-${p.id}`,
    name: p.name,
    price: p.list_price,
    description: p.description_sale || '',
    sku: p.default_code || '',
    category: Array.isArray(p.categ_id) ? p.categ_id[1] : '',
    categoryId: Array.isArray(p.categ_id) ? p.categ_id[0] : 0,
    image: imageUrl('product.template', p.id, 'image_1024'),
    thumb: imageUrl('product.template', p.id, 'image_256'),
  };
}

export async function fetchProducts({ limit = 24, category = null, sort = 'name asc' } = {}) {
  const domain = [
    ['sale_ok', '=', true],
    ['active', '=', true],
  ];
  if (category) {
    domain.push(['categ_id.name', 'ilike', category]);
  }
  const rows = await searchRead(
    'product.template',
    domain,
    ['id', 'name', 'list_price', 'description_sale', 'default_code', 'categ_id'],
    { limit, order: sort },
  );
  return rows.map(mapProduct);
}

export async function fetchNewArrivals(limit = 8) {
  const rows = await searchRead(
    'product.template',
    [['sale_ok', '=', true], ['active', '=', true]],
    ['id', 'name', 'list_price', 'description_sale', 'default_code', 'categ_id'],
    { limit, order: 'create_date desc, id desc' },
  );
  return rows.map(mapProduct);
}

export async function searchProducts(q, limit = 24) {
  const term = (q || '').trim();
  if (!term) return [];
  const domain = [
    ['sale_ok', '=', true],
    ['active', '=', true],
    '|', '|',
    ['name', 'ilike', term],
    ['default_code', 'ilike', term],
    ['description_sale', 'ilike', term],
  ];
  const rows = await searchRead(
    'product.template',
    domain,
    ['id', 'name', 'list_price', 'description_sale', 'default_code', 'categ_id'],
    { limit, order: 'name asc' },
  );
  return rows.map(mapProduct);
}

export async function fetchRelated(productId, categoryId, limit = 4) {
  const domain = [
    ['sale_ok', '=', true],
    ['active', '=', true],
    ['id', '!=', productId],
  ];
  if (categoryId) domain.push(['categ_id', '=', categoryId]);
  const rows = await searchRead(
    'product.template',
    domain,
    ['id', 'name', 'list_price', 'description_sale', 'default_code', 'categ_id'],
    { limit, order: 'id desc' },
  );
  return rows.map(mapProduct);
}

export async function fetchProductBySlug(slug) {
  const id = parseInt(String(slug).split('-').pop(), 10);
  if (!Number.isFinite(id)) return null;
  const rows = await read('product.template', [id], [
    'id', 'name', 'list_price', 'description_sale', 'default_code', 'categ_id',
    'qty_available', 'product_template_image_ids',
  ]);
  if (!rows.length) return null;
  const p = rows[0];

  const galleryIds = Array.isArray(p.product_template_image_ids) ? p.product_template_image_ids : [];
  const gallery = [
    imageUrl('product.template', p.id, 'image_1024'),
    ...galleryIds.map((gid) => imageUrl('product.image', gid, 'image_1024')),
  ];

  return {
    ...mapProduct(p),
    inStock: (p.qty_available ?? 0) > 0,
    qtyAvailable: p.qty_available ?? 0,
    gallery,
  };
}

export async function fetchCategories(limit = 12) {
  const rows = await searchRead(
    'product.category',
    [['parent_id', '=', false]],
    ['id', 'name'],
    { limit, order: 'name asc' },
  );
  return rows.map(c => ({
    id: c.id,
    slug: slugify(c.name),
    label: c.name,
  }));
}
