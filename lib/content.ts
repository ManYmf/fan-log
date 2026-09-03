import type { ComponentType } from 'react';
import { parse } from 'yaml';
import { z } from 'zod';

type MdxComponent = ComponentType<{ components?: Record<string, unknown> }>;
type MdxModule = { default: MdxComponent };

const localizedSchema = z.object({
  en: z.string().trim().min(1),
  zh: z.string().trim().min(1),
});

const postMetaSchema = z
  .object({
    title: localizedSchema,
    summary: localizedSchema,
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    kind: z.enum(['research', 'essay']),
    tags: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).min(1),
    featured: z.boolean(),
    demo: z.boolean(),
    readingMinutes: z.object({
      en: z.number().int().positive(),
      zh: z.number().int().positive(),
    }),
    externalUrl: z.url().optional(),
    related: z.array(z.string()).optional(),
  })
  .strict();

const researchSchema = z.object({
  statement: localizedSchema,
  areas: z.array(
    z.object({
      id: z.string(),
      title: localizedSchema,
      description: localizedSchema,
    }),
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      title: localizedSchema,
      description: localizedSchema,
      url: z.url().optional(),
    }),
  ),
  publications: z.array(
    z.object({
      id: z.string(),
      title: localizedSchema,
      authors: z.array(z.string()),
      year: z.number().int(),
      venue: z.string(),
      status: z.string(),
      doi: z.string().optional(),
      pdf: z.url().optional(),
      code: z.url().optional(),
    }),
  ),
});

const metaSources = import.meta.glob('../content/posts/*/meta.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const enModules = import.meta.glob('../content/posts/*/en.mdx', {
  eager: true,
}) as Record<string, MdxModule>;

const zhModules = import.meta.glob('../content/posts/*/zh.mdx', {
  eager: true,
}) as Record<string, MdxModule>;

function slugFromPath(path: string) {
  const match = path.replaceAll('\\', '/').match(/\/posts\/([^/]+)\//);
  if (!match) throw new Error(`Cannot derive post slug from ${path}`);
  return match[1];
}

function findBySlug<T>(modules: Record<string, T>, slug: string, filename: string) {
  const entry = Object.entries(modules).find(([path]) =>
    path.replaceAll('\\', '/').endsWith(`/posts/${slug}/${filename}`),
  );
  if (!entry) throw new Error(`Missing ${filename} for post ${slug}`);
  return entry[1];
}

export type PostMeta = z.infer<typeof postMetaSchema>;

export type Post = PostMeta & {
  slug: string;
  EnContent: MdxComponent;
  ZhContent: MdxComponent;
};

const posts: Post[] = Object.entries(metaSources)
  .map(([path, source]) => {
    const slug = slugFromPath(path);
    const raw = parse(source) as Record<string, unknown>;
    if ('draft' in raw) {
      throw new Error(`${slug}: draft content must stay outside content/posts`);
    }

    const meta = postMetaSchema.parse(raw);
    const enModule = findBySlug(enModules, slug, 'en.mdx');
    const zhModule = findBySlug(zhModules, slug, 'zh.mdx');
    return {
      ...meta,
      slug,
      EnContent: enModule.default,
      ZhContent: zhModule.default,
    };
  })
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const tagLabels = {
  'human-ai-interaction': { en: 'Human–AI interaction', zh: '人机交互' },
  'interface-design': { en: 'Interface design', zh: '界面设计' },
  'knowledge-work': { en: 'Knowledge work', zh: '知识工作' },
  trust: { en: 'Trust', zh: '信任' },
  'responsible-ai': { en: 'Responsible AI', zh: '负责任 AI' },
  attention: { en: 'Attention', zh: '注意力' },
  'reflective-practice': { en: 'Reflective practice', zh: '反思实践' },
  'everyday-life': { en: 'Everyday life', zh: '日常生活' },
} satisfies Record<string, { en: string; zh: string }>;

export type TagKey = keyof typeof tagLabels;

for (const post of posts) {
  for (const tag of post.tags) {
    if (!(tag in tagLabels)) throw new Error(`${post.slug}: unknown tag ${tag}`);
  }
}

const researchSources = import.meta.glob('../content/research.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const researchSource = Object.values(researchSources)[0];
if (!researchSource) throw new Error('Missing content/research.yaml');

export const researchData = researchSchema.parse(parse(researchSource));

export function getPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByTag(tag: string) {
  return posts.filter((post) => post.tags.includes(tag));
}

export function getTagCounts() {
  return Object.entries(tagLabels)
    .map(([key, label]) => ({
      key: key as TagKey,
      label,
      count: posts.filter((post) => post.tags.includes(key)).length,
    }))
    .filter((tag) => tag.count > 0)
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

export function formatDate(date: string, language: 'en' | 'zh') {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'zh-CN', {
    year: 'numeric',
    month: language === 'en' ? 'short' : 'long',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

export function kindLabel(kind: Post['kind']) {
  return kind === 'research'
    ? { en: 'Research note', zh: '研究札记' }
    : { en: 'Essay', zh: '随笔' };
}
