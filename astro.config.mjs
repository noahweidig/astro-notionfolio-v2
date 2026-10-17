// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import postAudit from '@casoon/astro-post-audit';
import tailwindcss from '@tailwindcss/vite';
import { remarkAlert } from 'remark-github-blockquote-alert';
import { unified } from '@astrojs/markdown-remark';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';
import { config } from './site.config.ts';
import { splitSiteUrl, rewriteBuild } from './scripts/lib/base-path.mjs';

const COLLECTIONS = ['blog', 'projects', 'publications', 'awards', 'experience', 'education'];

// Path -> most recent frontmatter date, so the sitemap's <lastmod> reflects
// content that already carries an authoritative date instead of build time.
// astro:content isn't resolvable from this file, so frontmatter is read
// directly rather than through the content collections API.
const lastmodByPath = new Map();
// Publication "appearance" records (pub-appearance-of set) are noindexed by
// src/pages/publications/[...slug].astro — excluded here too so the sitemap
// never contradicts that signal.
const excludedPaths = new Set(['/404/', '/500/', '/styleguide/', '/seo/', '/blog/write/']);
const noindexedPaths = new Set();
for (const name of COLLECTIONS) {
  const dir = new URL(`./src/content/${name}/`, import.meta.url);
  let newest;
  for (const slug of readdirSync(dir)) {
    const raw = readFileSync(new URL(`${slug}/index.md`, dir), 'utf-8');
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!match) continue;
    const data = load(match[1]);
    const date = new Date(data.date);
    const path = `/${name}/${slug}/`;
    if (name === 'publications' && data['pub-appearance-of']) {
      noindexedPaths.add(path);
      continue;
    }
    lastmodByPath.set(path, date);
    if (!newest || date > newest) newest = date;
  }
  if (newest) lastmodByPath.set(`/${name}/`, newest);
}

// site.url may carry a path (https://user.github.io/my-repo): the origin is
// Astro's `site`, the path its `base`. Dev serves from the root either way.
// SITE_BASE overrides the path: CI jobs that serve dist/ at a server root
// (Lighthouse, the post-build audit) build with SITE_BASE=/.
const { origin: siteOrigin, base: configBase } = splitSiteUrl(config.site.url);
const siteBase = process.env.SITE_BASE ?? configBase;
const base = process.argv.includes('dev') || process.argv.includes('start') ? '/' : siteBase;

export default defineConfig({
  site: siteOrigin,
  base,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (excludedPaths.has(path.replace(/\/?$/, '/'))) return false;
        return !noindexedPaths.has(path);
      },
      serialize(item) {
        const path = new URL(item.url).pathname;
        const d = lastmodByPath.get(path);
        if (d) item.lastmod = d.toISOString();
        return item;
      },
    }),
    // Hand-written root-relative URLs (/projects/, /media/...) get the base put
    // in front after the build. A no-op when the site is served from a root.
    {
      name: 'base-path',
      hooks: {
        'astro:build:done': ({ dir }) => {
          rewriteBuild(fileURLToPath(dir), siteOrigin, siteBase);
        },
      },
    },
    // @astrojs/sitemap has no stylesheet option; add the shared one after it writes.
    {
      name: 'sitemap-stylesheet',
      hooks: {
        'astro:build:done': ({ dir }) => {
          for (const f of readdirSync(dir)) {
            if (!/^sitemap-.*\.xml$/.test(f)) continue;
            const p = fileURLToPath(new URL(f, dir));
            const xml = readFileSync(p, 'utf-8');
            if (xml.includes('xml-stylesheet')) continue;
            writeFileSync(
              p,
              xml.replace(
                /^(<\?xml[^>]*\?>)/,
                '$1<?xml-stylesheet type="text/css" href="/xml.css"?>',
              ),
            );
          }
        },
      },
    },
    // Post-build audit of the rendered HTML in dist/ — canonicals, headings,
    // link and asset health, structured data. Last in the array so it runs
    // after @astrojs/sitemap has written the sitemap it checks.
    //
    // Report-only by default. This integration runs inside every `astro
    // build`, the one that deploys Pages included, and a finding from an
    // audit rule should not be able to stop a deploy; AUDIT_FAIL_ON=errors
    // turns it into a gate for a build that wants one.
    //
    // The checks live in a prebuilt binary the package fetches in a
    // postinstall. Installs here run with --ignore-scripts, so the binary is
    // absent unless a workflow fetches it explicitly — without it the
    // integration warns and skips instead of failing.
    postAudit({
      preset: 'standard',
      failOn: process.env.AUDIT_FAIL_ON === 'errors' ? 'errors' : 'never',
      // Written only when asked for: the integration does not create the
      // directory, so an unprepared build would report a write error.
      ...(process.env.AUDIT_REPORTS === '1'
        ? { reports: { markdown: '.audit/report.md', json: '.audit/report.json' } }
        : {}),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    processor: unified({ remarkPlugins: [remarkAlert] }),
    shikiConfig: {
      // github-light's orange (#E36209) is 3.6:1 on the light code surface,
      // which fails AA for small text; the high-contrast variant is built for
      // exactly that and keeps the same palette family.
      themes: { light: 'github-light-high-contrast', dark: 'github-dark-default' },
      wrap: false,
    },
  },
  build: { format: 'directory' },
});
