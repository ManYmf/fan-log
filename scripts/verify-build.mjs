import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, 'dist', 'client');
const errors = [];
const requireFile = (relative) => {
  const full = path.join(output, ...relative.split('/'));
  if (!fs.existsSync(full)) errors.push(`Missing ${relative}`);
  return full;
};

for (const route of [
  'index.html',
  '404.html',
  'writing/index.html',
  'research/index.html',
  'archive/index.html',
  'about/index.html',
  'search/index.html',
  'writing/interfaces-as-epistemic-partners/index.html',
  'writing/calibrating-trust-in-ai-assistance/index.html',
  'writing/the-quiet-work-of-attention/index.html',
  'tags/human-ai-interaction/index.html',
  'tags/attention/index.html',
  'rss.xml',
  'robots.txt',
  'sitemap.xml',
  'pagefind/pagefind.js',
]) requireFile(route);

const articlePath = path.join(output, 'writing', 'interfaces-as-epistemic-partners', 'index.html');
if (fs.existsSync(articlePath)) {
  const html = fs.readFileSync(articlePath, 'utf8');
  for (const marker of ['class="katex', 'class="references', 'data-footnote-ref', 'data-pagefind-body']) {
    if (!html.includes(marker)) errors.push(`Article output lacks ${marker}`);
  }
  if (/\[@[A-Za-z0-9_:.+-]+/.test(html)) errors.push('Article output contains unresolved citation syntax.');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) errors.push(`Duplicate HTML ids: ${[...new Set(duplicates)].join(', ')}`);
}

const codePath = path.join(output, 'writing', 'calibrating-trust-in-ai-assistance', 'index.html');
if (fs.existsSync(codePath) && !fs.readFileSync(codePath, 'utf8').includes('class="shiki')) {
  errors.push('Code article output lacks Shiki highlighting.');
}

if (errors.length) {
  console.error(`Build verification failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Verified static routes, academic rendering, unique anchors, feeds, and search assets.');
