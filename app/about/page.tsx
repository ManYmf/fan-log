import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'About / 关于',
  description: 'About Fan and this bilingual notebook. 关于 Fan 与这本双语笔记。',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main" className="index-page about-page">
        <header className="page-heading">
          <div className="page-number">INDEX — 04</div>
          <h1>About<span lang="zh-CN">关于</span></h1>
        </header>
        <div className="about-grid">
          <aside>
            <div className="about-monogram" aria-hidden="true"><span>F</span><span lang="zh-CN">凡</span></div>
            <dl>
              <div><dt>Name / 名称</dt><dd>Fan / 凡</dd></div>
              <div><dt>Notebook / 笔记</dt><dd>Edition 00 · Demo</dd></div>
              <div><dt>Languages / 语言</dt><dd>English → 中文</dd></div>
              <div><dt>Focus / 方向</dt><dd>AI × HCI</dd></div>
            </dl>
          </aside>
          <div className="about-copy">
            <section lang="en">
              <span>01 / ENGLISH</span>
              <h2>A notebook for work that is not finished.</h2>
              <p>Fan（凡）’s Log is a bilingual place for research notes and personal essays. Its central questions concern human–AI interaction: how interfaces influence judgment, how trust is calibrated, and how knowledge tools might preserve room for reflection.</p>
              <p>This first edition is deliberately a demo. It demonstrates the structure and voice of the site without inventing an affiliation, biography, publication record, or contact identity. Those details can be added from one configuration file when real material is ready.</p>
              <p>The writing remains public and revisable. Research notes can hold provisional models; essays can keep observations that do not yet need to become arguments.</p>
            </section>
            <section lang="zh-CN">
              <span>02 / 中文</span>
              <h2>给尚未完成的工作留一本笔记。</h2>
              <p>Fan（凡）’s Log 是一处容纳研究札记与个人随笔的双语空间。它关心人机交互中的几个核心问题：界面如何影响判断，信任如何得到校准，以及知识工具怎样为反思保留余地。</p>
              <p>首个版本被明确标记为示例。它展示网站的结构与声音，但不会虚构机构归属、个人履历、发表成果或联系方式。真实资料准备好后，只需在统一配置中补充即可。</p>
              <p>这里的文字保持公开，也保留修改。研究札记可以容纳暂定的模型，随笔则保存那些暂时不需要成为论点的观察。</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
