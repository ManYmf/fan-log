import { SiteLink as Link } from '@/components/site-link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span>Fan（凡）’s Log</span>
        <span>Notes in public, always revisable.</span>
        <span lang="zh-CN">公开书写，保留修改。</span>
      </div>
      <nav className="footer-license" aria-label="Footer / 页脚">
        <Link href="/rss.xml">RSS</Link>
        <span>Writing · CC BY 4.0</span>
        <span>Code · MIT</span>
        <span>2026</span>
      </nav>
    </footer>
  );
}
