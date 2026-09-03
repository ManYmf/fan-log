import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteLink as Link } from '@/components/site-link';
import { getPosts, researchData } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Research / 研究',
  description: 'Research directions in human–AI collaboration, trust calibration, and tools for thought. 人机协作、信任校准与思考工具。',
  alternates: { canonical: '/research/' },
};

const readings = [
  ['Licklider, 1960', 'Man-Computer Symbiosis', 'https://doi.org/10.1109/THFE2.1960.4503259'],
  ['Horvitz, 1999', 'Principles of Mixed-Initiative User Interfaces', 'https://doi.org/10.1145/302979.303030'],
  ['Amershi et al., 2019', 'Guidelines for Human-AI Interaction', 'https://doi.org/10.1145/3290605.3300233'],
] as const;

export default function ResearchPage() {
  const notes = getPosts().filter((post) => post.kind === 'research');
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main" className="index-page" data-pagefind-body>
        <header className="page-heading research-heading">
          <div className="page-number">INDEX — 02</div>
          <h1>Research<span lang="zh-CN">研究</span></h1>
          <div className="page-lede">
            <p>{researchData.statement.en}</p>
            <p lang="zh-CN">{researchData.statement.zh}</p>
          </div>
          <p className="honesty-note">DEMO PROFILE — No institution, publication, or completed study is claimed here.<span lang="zh-CN">示例档案——此处不声明机构归属、发表成果或已完成研究。</span></p>
        </header>

        <section className="research-areas" aria-labelledby="areas-title">
          <div className="section-label"><p id="areas-title">Current questions</p><p lang="zh-CN">当前问题</p><span>03 LINES</span></div>
          <div className="area-list">
            {researchData.areas.map((area, index) => (
              <article key={area.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{area.title.en}<small lang="zh-CN">{area.title.zh}</small></h2>
                <div><p>{area.description.en}</p><p lang="zh-CN">{area.description.zh}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="research-columns">
          <div>
            <div className="mini-heading"><span>Working notes</span><span lang="zh-CN">研究札记</span></div>
            {notes.map((post) => (
              <Link className="research-link" href={`/writing/${post.slug}/`} key={post.slug}>
                <span><strong>{post.title.en}</strong><small lang="zh-CN">{post.title.zh}</small></span><ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
          <div>
            <div className="mini-heading"><span>Selected reading</span><span lang="zh-CN">参考阅读</span></div>
            {readings.map(([author, title, href]) => (
              <a className="research-link" href={href} target="_blank" rel="noreferrer" key={href}>
                <span><strong>{title}</strong><small>{author}</small></span><ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </section>

        <section className="empty-research">
          <div><span>Projects</span><span lang="zh-CN">项目</span></div>
          <p>Project records will appear here when real material is provided.<span lang="zh-CN">提供真实资料后，项目记录会显示在这里。</span></p>
          <div><span>Publications</span><span lang="zh-CN">成果</span></div>
          <p>No publications are attributed to this demo profile.<span lang="zh-CN">此示例档案未署名任何发表成果。</span></p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
