import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, CornerDownRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteLink as Link } from '@/components/site-link';
import { mdxComponents } from '@/components/mdx-components';
import { formatDate, getPost, getPosts, kindLabel, tagLabels } from '@/lib/content';
import { siteConfig } from '@/site.config';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = `${post.title.en} / ${post.title.zh}`;
  const description = `${post.summary.en} ${post.summary.zh}`;
  return {
    title,
    description,
    alternates: { canonical: `/writing/${post.slug}/` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/writing/${post.slug}/`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.author.en],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const index = posts.findIndex((entry) => entry.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index < posts.length - 1 ? posts[index + 1] : undefined;
  const kind = kindLabel(post.kind);
  const EnContent = post.EnContent;
  const ZhContent = post.ZhContent;

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main" className="article-page" data-pagefind-body>
        <header className="article-hero">
          <div className="article-kicker">
            <Link href="/writing/"><ArrowLeft size={14} /> Writing / 写作</Link>
            <span>{kind.en} / <span lang="zh-CN">{kind.zh}</span></span>
            {post.demo && <span className="demo-badge">DEMO / 示例</span>}
          </div>
          <h1 data-pagefind-meta="title">
            {post.title.en}
            <span lang="zh-CN">{post.title.zh}</span>
          </h1>
          <div className="article-summary">
            <p>{post.summary.en}</p>
            <p lang="zh-CN">{post.summary.zh}</p>
          </div>
          <div className="article-meta">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, 'en')} · {formatDate(post.publishedAt, 'zh')}</time>
            <span>{post.readingMinutes.en} min EN · {post.readingMinutes.zh} 分钟 中文</span>
            <span>Fan / 凡</span>
          </div>
        </header>

        <div className="article-layout">
          <aside className="article-rail" aria-label="Article languages / 文章语言">
            <p>READING ORDER<br /><span lang="zh-CN">阅读顺序</span></p>
            <a href="#article-en"><span>01</span> English</a>
            <a href="#article-zh"><span>02</span> 中文</a>
            <div className="rail-line" aria-hidden="true" />
            <p>English first.<br />Chinese follows.<span lang="zh-CN">先英文，后中文。</span></p>
          </aside>

          <div className="article-content">
            <section id="article-en" className="language-section" lang="en">
              <div className="language-heading"><span>01 / ENGLISH</span><span>Complete English version</span></div>
              <article className="prose"><EnContent components={mdxComponents} /></article>
            </section>

            <div className="language-divider" aria-hidden="true"><span>EN</span><CornerDownRight size={17} /><span>中文</span></div>

            <section id="article-zh" className="language-section" lang="zh-CN">
              <div className="language-heading"><span>02 / 中文</span><span>完整中文版本</span></div>
              <article className="prose prose-zh"><ZhContent components={mdxComponents} /></article>
            </section>
          </div>
        </div>

        <footer className="article-footer">
          <div className="article-tags">
            <span>Filed under / 归档于</span>
            {post.tags.map((tag) => {
              const label = tagLabels[tag as keyof typeof tagLabels];
              return <Link key={tag} href={`/tags/${tag}/`}>{label.en} · <span lang="zh-CN">{label.zh}</span></Link>;
            })}
          </div>
          <nav className="post-nav" aria-label="Adjacent writing / 相邻文章">
            {newer ? (
              <Link href={`/writing/${newer.slug}/`}><ArrowLeft size={17} /><span>Newer / 较新<strong>{newer.title.en}<small lang="zh-CN">{newer.title.zh}</small></strong></span></Link>
            ) : <span />}
            {older && (
              <Link href={`/writing/${older.slug}/`}><span>Older / 较早<strong>{older.title.en}<small lang="zh-CN">{older.title.zh}</small></strong></span><ArrowRight size={17} /></Link>
            )}
          </nav>
        </footer>
      </main>
      <SiteFooter />
    </div>
  );
}
