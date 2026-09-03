import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const requiredFiles = ['meta.yaml', 'en.mdx', 'zh.mdx'];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const tagPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const allowedTags = new Set([
  'human-ai-interaction',
  'interface-design',
  'knowledge-work',
  'trust',
  'responsible-ai',
  'attention',
  'reflective-practice',
  'everyday-life',
]);

function isValidDate(value) {
  if (!datePattern.test(value ?? '')) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

export function validateContent(root) {
  const postsRoot = path.join(root, 'content', 'posts');
  const bibliographyPath = path.join(root, 'content', 'references.bib');
  const researchPath = path.join(root, 'content', 'research.yaml');
  const errors = [];
  const fail = (message) => errors.push(message);

  if (!fs.existsSync(postsRoot)) fail('Missing content/posts directory.');
  if (!fs.existsSync(bibliographyPath)) fail('Missing content/references.bib.');
  if (!fs.existsSync(researchPath)) fail('Missing content/research.yaml.');

  const bib = fs.existsSync(bibliographyPath)
    ? fs.readFileSync(bibliographyPath, 'utf8')
    : '';
  const bibKeys = new Set([...bib.matchAll(/@\w+\{([^,\s]+)/g)].map((match) => match[1]));
  const postDirs = fs.existsSync(postsRoot)
    ? fs.readdirSync(postsRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    : [];

  if (postDirs.length === 0) fail('At least one published post is required.');

  for (const entry of postDirs) {
    const slug = entry.name;
    const postDir = path.join(postsRoot, slug);
    if (!slugPattern.test(slug)) fail(`${slug}: directory must be a lowercase ASCII slug.`);

    for (const filename of requiredFiles) {
      if (!fs.existsSync(path.join(postDir, filename))) fail(`${slug}: missing ${filename}.`);
    }
    if (!requiredFiles.every((filename) => fs.existsSync(path.join(postDir, filename)))) continue;

    let meta;
    try {
      meta = parse(fs.readFileSync(path.join(postDir, 'meta.yaml'), 'utf8'));
    } catch (error) {
      fail(`${slug}: invalid YAML (${error.message}).`);
      continue;
    }

    if ('draft' in meta) fail(`${slug}: drafts must stay outside content/posts.`);
    for (const field of ['title', 'summary']) {
      if (!meta[field]?.en?.trim() || !meta[field]?.zh?.trim()) {
        fail(`${slug}: ${field} requires en and zh.`);
      }
    }
    if (!isValidDate(meta.publishedAt)) {
      fail(`${slug}: publishedAt must be a valid quoted YYYY-MM-DD date.`);
    }
    if (meta.updatedAt && !isValidDate(meta.updatedAt)) {
      fail(`${slug}: updatedAt must be a valid quoted YYYY-MM-DD date.`);
    }
    if (!['research', 'essay'].includes(meta.kind)) fail(`${slug}: kind must be research or essay.`);
    if (!Array.isArray(meta.tags) || meta.tags.length === 0 || meta.tags.some((tag) => !tagPattern.test(tag))) {
      fail(`${slug}: tags must be non-empty lowercase ASCII slugs.`);
    } else {
      const unknownTags = meta.tags.filter((tag) => !allowedTags.has(tag));
      if (unknownTags.length > 0) fail(`${slug}: unknown tag(s): ${unknownTags.join(', ')}.`);
      if (new Set(meta.tags).size !== meta.tags.length) fail(`${slug}: duplicate tags are not allowed.`);
    }
    if (typeof meta.featured !== 'boolean') fail(`${slug}: featured must be boolean.`);
    if (typeof meta.demo !== 'boolean') fail(`${slug}: demo must be boolean.`);
    if (!Number.isInteger(meta.readingMinutes?.en) || !Number.isInteger(meta.readingMinutes?.zh)
      || meta.readingMinutes.en < 1 || meta.readingMinutes.zh < 1) {
      fail(`${slug}: readingMinutes requires positive integer en and zh values.`);
    }

    for (const language of ['en', 'zh']) {
      const filename = `${language}.mdx`;
      const source = fs.readFileSync(path.join(postDir, filename), 'utf8');
      if (source.trim().length < 500) fail(`${slug}/${filename}: content is unexpectedly short.`);
      if (/^draft\s*:/m.test(source)) fail(`${slug}/${filename}: draft markers are not allowed in published content.`);

      const groups = [...source.matchAll(/\[([^\]]*@[A-Za-z0-9_:.+-]+[^\]]*)\]/g)];
      for (const group of groups) {
        for (const citation of group[1].matchAll(/@([A-Za-z0-9_:.+-]+)/g)) {
          if (!bibKeys.has(citation[1])) {
            fail(`${slug}/${filename}: missing BibTeX key ${citation[1]}.`);
          }
        }
      }

      const displayMathCount = (source.match(/\$\$/g) ?? []).length;
      if (displayMathCount % 2 !== 0) {
        fail(`${slug}/${filename}: unbalanced display-math delimiters.`);
      }
    }
  }

  if (fs.existsSync(researchPath)) {
    try {
      const research = parse(fs.readFileSync(researchPath, 'utf8'));
      if (!research.statement?.en || !research.statement?.zh) {
        fail('research.yaml: statement requires en and zh.');
      }
      if (!Array.isArray(research.areas) || research.areas.length === 0) {
        fail('research.yaml: at least one area is required.');
      }
      if (!Array.isArray(research.projects) || !Array.isArray(research.publications)) {
        fail('research.yaml: projects and publications must be arrays.');
      }
    } catch (error) {
      fail(`research.yaml: invalid YAML (${error.message}).`);
    }
  }

  return { errors, postCount: postDirs.length, bibCount: bibKeys.size };
}
