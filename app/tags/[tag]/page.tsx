import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteLink as Link } from '@/components/site-link';
import { PostCard } from '@/components/post-card';
import { getPostsByTag, getTagCounts, tagLabels } from '@/lib/content';

type PageProps = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTagCounts().map((tag) => ({ tag: tag.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = tagLabels[tag as keyof typeof tagLabels];
  if (!label) return {};
  return {
    title: `${label.en} / ${label.zh}`,
    description: `Writing filed under ${label.en}. “${label.zh}”主题下的全部文章。`,
    alternates: { canonical: `/tags/${tag}/` },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const label = tagLabels[tag as keyof typeof tagLabels];
  if (!label) notFound();
  const posts = getPostsByTag(tag);

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main" className="index-page">
        <header className="page-heading compact-heading">
          <Link className="back-link" href="/writing/"><ArrowLeft size={14} /> All writing / 全部写作</Link>
          <div className="page-number">TAG — {String(posts.length).padStart(2, '0')}</div>
          <h1>{label.en}<span lang="zh-CN">{label.zh}</span></h1>
        </header>
        <section className="post-grid" aria-label="Tagged writing / 标签文章">
          {posts.map((post, index) => <PostCard post={post} index={index + 1} key={post.slug} />)}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
