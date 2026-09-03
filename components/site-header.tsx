import { siteConfig } from '@/site.config';
import { SearchLauncher } from '@/components/search-experience';
import { SiteLink as Link } from '@/components/site-link';

export const primaryNav = [
  ['Writing', '写作', '/writing/'],
  ['Research', '研究', '/research/'],
  ['Archive', '归档', '/archive/'],
  ['About', '关于', '/about/'],
] as const;

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content / 跳至正文</a>
      <header className="site-header">
        <Link href="/" className="brand" aria-label={`${siteConfig.name}, home`}>
          <span className="brand-mark" aria-hidden="true">F／凡</span>
          <span className="brand-name">{siteConfig.name}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation / 主导航">
          {primaryNav.map(([en, zh, href]) => (
            <Link href={href} key={href}><span>{en}</span><span lang="zh-CN">{zh}</span></Link>
          ))}
        </nav>
        <SearchLauncher />
      </header>
      <nav className="mobile-nav" aria-label="Compact navigation / 紧凑导航">
        {primaryNav.map(([en, zh, href]) => (
          <Link href={href} key={href}>{en} <span lang="zh-CN">{zh}</span></Link>
        ))}
      </nav>
    </>
  );
}
