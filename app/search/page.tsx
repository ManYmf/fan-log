import type { Metadata } from 'next';
import { SearchPanel } from '@/components/search-experience';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Search / 搜索',
  description: 'Search all English and Chinese writing. 搜索全部中英文文章。',
  alternates: { canonical: '/search/' },
};

export default function SearchPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main" className="index-page search-page" data-pagefind-ignore="all">
        <header className="page-heading compact-heading">
          <div className="page-number">UTILITY — 01</div>
          <h1>Search<span lang="zh-CN">搜索</span></h1>
          <div className="page-lede"><p>One index for every English and Chinese article.</p><p lang="zh-CN">用同一个索引检索全部英文与中文文章。</p></div>
        </header>
        <section className="search-page-panel" aria-label="Site search / 站内搜索">
          <SearchPanel />
          <p>Tip: press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> anywhere.<span lang="zh-CN">提示：在任意页面按下快捷键即可搜索。</span></p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
