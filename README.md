# Shop — eshop.way4tech.com

Next.js 14 ecommerce, dark theme, dockerised, auto-deploy on push.

## Local

```bash
npm install
npm run dev
# http://localhost:3000
```

## Production

Lives on devcynx at `/opt/wtsk/stacks/eshop`, container `eshop` on
`proxynet`. NPM (already running on devcynx) reverse-proxies
`https://eshop.way4tech.com` -> `eshop:3000`.

Environment variables live in `.env.production` on the host (NOT in
git). See `.env.production.example` for the keys.

## Auto-deploy

`.github/workflows/deploy.yml` SSHes to devcynx on every push to
`main`, pulls, rebuilds the image, recreates the container.

GitHub repo secrets required:
* `DEVCYNX_HOST` — `187.124.219.238`
* `DEVCYNX_USER` — `root`
* `DEVCYNX_PASSWORD` — root password

## DNS

`eshop.way4tech.com` -> `187.124.219.238` (A record).
SSL issued by NPM via Let's Encrypt HTTP-01 once DNS resolves.
