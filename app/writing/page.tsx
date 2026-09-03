import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteLink as Link } from '@/components/site-link';
import { PostCard } from '@/components/post-card';
import { getPosts, getTagCounts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Writing / 写作',
  description: 'Bilingual research notes and essays. 双语研究札记与个人随笔。',
  alternates: { canonical: '/writing/' },
};

export default function WritingPage() {
  const posts = getPosts();
  const tags = getTagCounts();
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main" className="index-page">
        <header className="page-heading">
          <div className="page-number">INDEX — 01</div>
          <h1>Writing<span lang="zh-CN">写作</span></h1>
          <div className="page-lede">
            <p>Research notes for questions still in motion, and essays for the observations that resist becoming arguments.</p>
            <p lang="zh-CN">研究札记容纳仍在移动的问题，随笔则保存那些暂时不愿成为论点的观察。</p>
          </div>
        </header>

        <section className="tag-index" aria-labelledby="tag-heading">
          <div><span id="tag-heading">Browse by signal</span><span lang="zh-CN">按主题浏览</span></div>
          <div className="tag-cloud">
            {tags.map((tag) => (
              <Link href={`/tags/${tag.key}/`} key={tag.key}>
                {tag.label.en} · <span lang="zh-CN">{tag.label.zh}</span><sup>{tag.count}</sup>
              </Link>
            ))}
          </div>
        </section>

        <section className="post-grid" aria-label="All writing / 全部文章">
          {posts.map((post, index) => <PostCard post={post} index={index + 1} key={post.slug} />)}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
