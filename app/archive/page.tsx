import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteLink as Link } from '@/components/site-link';
import { formatDate, getPosts, kindLabel } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Archive / 归档',
  description: 'Every published note, arranged by year. 按年份整理的全部公开文章。',
  alternates: { canonical: '/archive/' },
};

export default function ArchivePage() {
  const groups = Object.entries(Object.groupBy(getPosts(), (post) => post.publishedAt.slice(0, 4)))
    .sort(([a], [b]) => b.localeCompare(a));
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main" className="index-page">
        <header className="page-heading compact-heading">
          <div className="page-number">INDEX — 03</div>
          <h1>Archive<span lang="zh-CN">归档</span></h1>
          <div className="page-lede"><p>A chronological trace of questions, drafts, and returns.</p><p lang="zh-CN">按时间留下问题、草稿与再次返回的痕迹。</p></div>
        </header>
        <div className="archive-list">
          {groups.map(([year, posts]) => (
            <section key={year} className="archive-year">
              <h2>{year}<span>{posts?.length ?? 0} ENTRIES / 篇</span></h2>
              <div>
                {posts?.map((post) => {
                  const kind = kindLabel(post.kind);
                  return (
                    <Link href={`/writing/${post.slug}/`} key={post.slug}>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, 'en')}</time>
                      <span><strong>{post.title.en}</strong><small lang="zh-CN">{post.title.zh}</small></span>
                      <span>{kind.en} / <span lang="zh-CN">{kind.zh}</span></span>
                      <ArrowUpRight size={16} />
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
