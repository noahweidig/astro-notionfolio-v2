/**
 * Writes the static files that can't import site.config.ts themselves from the
 * values in it: public/CNAME, robots.txt, site.webmanifest, the legacy
 * redirect pages, and the Cloudflare worker's allowed origins.
 *
 *   npm run sync
 *
 * Runs ahead of `dev` and every build, so those files never drift from the
 * config. Safe to run repeatedly; files whose content is unchanged are left
 * alone.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../site.config.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = new URL(config.site.url).origin;
const host = new URL(origin).hostname;

function write(rel, content) {
  const file = path.join(root, rel);
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log(`sync-config: wrote ${rel}`);
}

// GitHub Pages custom domain. Omitted for the default *.github.io address.
const cname = path.join(root, 'public/CNAME');
if (config.site.customDomain) write('public/CNAME', `${host}\n`);
else if (fs.existsSync(cname)) {
  fs.rmSync(cname);
  console.log('sync-config: removed public/CNAME');
}

write('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap-index.xml\n`);

const manifestFile = path.join(root, 'public/site.webmanifest');
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
manifest.name = config.person.legalName;
manifest.short_name = config.person.shortName;
write('public/site.webmanifest', `${JSON.stringify(manifest, null, 2)}\n`);

for (const page of ['contact', 'cv', 'privacy', 'styleguide']) {
  const rel = `public/${page}.html`;
  const html = fs.readFileSync(path.join(root, rel), 'utf8');
  write(rel, html.replace(/(rel="canonical" href=")[^"]*(")/, `$1${origin}/${page}/$2`));
}

const wrangler = path.join(root, 'worker/wrangler.toml');
if (fs.existsSync(wrangler)) {
  const toml = fs.readFileSync(wrangler, 'utf8');
  write(
    'worker/wrangler.toml',
    toml.replace(/^ALLOWED_ORIGINS = .*$/m, `ALLOWED_ORIGINS = "${origin},http://localhost:4321"`),
  );
}
