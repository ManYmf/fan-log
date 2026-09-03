import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { siteConfig } from '../site.config.ts';

const root = process.cwd();
const postsRoot = path.join(root, 'content', 'posts');
const publicRoot = path.join(root, 'public');

const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (character) => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
})[character] ?? character);

const posts = fs.readdirSync(postsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const metaPath = path.join(postsRoot, entry.name, 'meta.yaml');
    return { slug: entry.name, ...parse(fs.readFileSync(metaPath, 'utf8')) };
  })
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const tags = [...new Set(posts.flatMap((post) => post.tags))]
  .sort((a, b) => a.localeCompare(b));

const items = posts.map((post) => {
  const url = `${siteConfig.url}/writing/${post.slug}/`;
  const kind = post.kind === 'research'
    ? 'Research note / 研究札记'
    : 'Essay / 随笔';

  return `    <item>
      <title>${escapeXml(`${post.title.en} / ${post.title.zh}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeXml(kind)}</category>
      <description>${escapeXml(`${post.summary.en} ${post.summary.zh}`)}</description>
    </item>`;
}).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(`${siteConfig.description.en} ${siteConfig.description.zh}`)}</description>
    <language>en-zh</language>
${items}
  </channel>
</rss>
`;

const routes = [
  '',
  '/writing/',
  '/research/',
  '/archive/',
  '/about/',
  '/search/',
  ...posts.map((post) => `/writing/${post.slug}/`),
  ...tags.map((tag) => `/tags/${tag}/`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${escapeXml(`${siteConfig.url}${route}`)}</loc></url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
`;

fs.mkdirSync(publicRoot, { recursive: true });
fs.writeFileSync(path.join(publicRoot, 'rss.xml'), rss);
fs.writeFileSync(path.join(publicRoot, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicRoot, 'robots.txt'), robots);

console.log(`Generated RSS, sitemap, and robots.txt for ${posts.length} posts.`);
