/**
 * Subpath hosting (e.g. https://user.github.io/my-repo): `site.url` in
 * site.config.ts may include a path. Astro handles its own assets and routes,
 * but this site writes root-relative URLs by hand (`/projects/`, `/media/...`),
 * so after the build every such URL is rewritten to carry the base.
 */
import fs from 'node:fs';
import path from 'node:path';

export function splitSiteUrl(url) {
  const u = new URL(url);
  return { origin: u.origin, base: u.pathname.replace(/\/+$/, '') || '/' };
}

const TEXT = /\.(html|css|js|mjs|json|xml|txt|md|webmanifest|svg)$/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (TEXT.test(e.name)) out.push(p);
  }
  return out;
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function rewriteBuild(dist, origin, base) {
  if (base === '/') return;
  // Only paths that exist at the top of the build are rewritten, so text that
  // merely looks like a path ("/g" in a regex, "text/html") is left alone.
  // `pagefind` is written after the build, so it is not on disk yet.
  const top = [...new Set([...fs.readdirSync(dist), 'pagefind'])]
    .filter((n) => n !== base.slice(1))
    .map(esc);
  const known = `(?:${top.join('|')})(?=[/"'\`?#)\\s.]|$)`;
  // A quote, paren, "=", "," or space, then "/name".
  const rel = new RegExp(`(["'\`(=])/(?=${known})`, 'g');
  const abs = new RegExp(`${esc(origin)}/(?=${known})`, 'g');
  const home = /(\s(?:href|action)=")\/(?=["#?])/g;
  const metaHome = /(url=)\/(?=["'])/g;

  for (const file of walk(dist)) {
    const src = fs.readFileSync(file, 'utf8');
    let out = src.replace(rel, `$1${base}/`).replace(abs, `${origin}${base}/`);
    if (file.endsWith('.html'))
      out = out.replace(home, `$1${base}/`).replace(metaHome, `$1${base}/`);
    if (out !== src) fs.writeFileSync(file, out);
  }
}
