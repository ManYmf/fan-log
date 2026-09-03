import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteLink as Link } from '@/components/site-link';

export default function NotFound() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main" className="not-found-page">
        <span>404 / SIGNAL LOST</span>
        <h1>The note is not here.<small lang="zh-CN">这篇笔记不在这里。</small></h1>
        <p>The address may have changed, or the thought may still be a private draft.<span lang="zh-CN">地址可能已经改变，这个想法也可能仍在私人草稿里。</span></p>
        <Link href="/"><ArrowLeft size={16} /> Return home / 返回首页</Link>
      </main>
      <SiteFooter />
    </div>
  );
}
