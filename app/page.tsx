import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteLink as Link } from '@/components/site-link';
import { getPosts, kindLabel } from '@/lib/content';

export default function Home() {
  const entries = getPosts();
  const featured = entries.find((entry) => entry.featured) ?? entries[0];

  return (
    <div className="site-shell">
      <SiteHeader />

      <div className="demo-ribbon" role="note">
        <span>DEMO EDITION 00</span>
        <span lang="zh-CN">示例版本 · 内容可替换</span>
        <span className="demo-line" aria-hidden="true" />
        <span>AI / HCI · FIELD NOTES</span>
      </div>

      <main id="main">
        <section className="intro-grid" aria-labelledby="intro-title">
          <div className="intro-copy">
            <div className="eyebrow"><span className="status-dot" aria-hidden="true" />FIELD NOTES ON HUMAN × MACHINE</div>
            <h1 id="intro-title">
              <span>Ideas need</span>
              <span className="accent-line">room to revise.</span>
              <span lang="zh-CN">思想需要一块</span>
              <span lang="zh-CN" className="accent-line">可以反复修改的空地。</span>
            </h1>
            <div className="intro-statement">
              <p>I study how interfaces shape judgment, collaboration, and the quiet habits behind knowledge work.</p>
              <p lang="zh-CN">我关注界面如何塑造判断、协作，以及知识工作背后那些安静的习惯。</p>
            </div>
            <div className="intro-actions">
              <Link href="/writing/" className="primary-link">
                Enter the notebook <span lang="zh-CN">进入笔记</span><ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/research/" className="text-link">Research index <span lang="zh-CN">研究索引</span></Link>
            </div>
          </div>

          <aside className="profile-panel" aria-label="Notebook profile / 笔记档案">
            <div className="profile-topline"><span>PROFILE / 档案</span><span>F—001</span></div>
            <div className="profile-monogram" aria-hidden="true"><span>F</span><span lang="zh-CN">凡</span></div>
            <dl className="profile-data">
              <div><dt>Focus / 方向</dt><dd>Human–AI Interaction<br /><span lang="zh-CN">人机交互</span></dd></div>
              <div><dt>Method / 方法</dt><dd>Design inquiry<br /><span lang="zh-CN">设计探究</span></dd></div>
              <div><dt>Writing / 写作</dt><dd>English → 中文</dd></div>
            </dl>
            <p className="profile-note">This demo profile claims no institution or published work.<span lang="zh-CN">此示例档案不声明机构归属或已发表成果。</span></p>
          </aside>
        </section>

        <section className="featured-grid" aria-labelledby="featured-heading">
          <div className="section-label">
            <p id="featured-heading">Selected field note</p><p lang="zh-CN">精选研究札记</p><span>01 — 03</span>
          </div>
          <Link href={`/writing/${featured.slug}/`} className="featured-card">
            <div className="featured-meta">
              <span>{kindLabel(featured.kind).en.toUpperCase()} · 001</span>
              <span>{featured.readingMinutes.en} MIN EN · {featured.readingMinutes.zh} 分钟 中文</span>
            </div>
            <h2>{featured.title.en}<span lang="zh-CN">{featured.title.zh}</span></h2>
            <div className="featured-bottom">
              <p>{featured.summary.en}<span lang="zh-CN">{featured.summary.zh}</span></p>
              <span className="round-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
            </div>
          </Link>
        </section>

        <section className="latest-section" aria-labelledby="latest-heading">
          <div className="section-label">
            <p id="latest-heading">Latest entries</p><p lang="zh-CN">近期条目</p><Link href="/archive/">View archive / 查看归档</Link>
          </div>
          <div className="entry-list">
            {entries.map((entry, index) => {
              const kind = kindLabel(entry.kind);
              return (
              <Link key={entry.slug} href={`/writing/${entry.slug}/`} className="entry-row">
                <span className="entry-index">{String(index + 1).padStart(3, '0')}</span>
                <span className="entry-title">{entry.title.en}<span lang="zh-CN">{entry.title.zh}</span></span>
                <span className="entry-kind">{kind.en.replace(' note', '')} / {kind.zh.replace('札记', '')}</span>
                <time dateTime={entry.publishedAt}>{entry.publishedAt.replaceAll('-', '.')}</time>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
