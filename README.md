# Fan（凡）’s Log

`Fan（凡）’s Log` is a fixed-dark, bilingual personal blog for AI/HCI research notes and reflective essays. English appears first and Chinese follows; each post keeps both complete versions at one stable URL.

> **Status:** Demo. The initial posts and research profile are clearly marked samples. No affiliation, publication record, contact detail, or other real-world credential is implied.

Target public repository: [`ManYmf/fan-log`](https://github.com/ManYmf/fan-log)

> **Owner guide / 站长操作说明书：** [中文写作、跨电脑同步与发布全流程](./OWNER-GUIDE.zh-CN.md)

## Stack

- Vinext, React, TypeScript, and shadcn components
- Markdown/MDX with GFM, footnotes, KaTeX, Shiki, and BibTeX-backed APA author–year citations
- Static output in `dist/client`
- Pagefind for one bilingual full-text index
- OpenAI Sites for hosting

Node.js 22.13 or newer is required. The committed lockfile is the dependency source of truth.

## Local development

```bash
npm install
npm run dev
```

Before committing or publishing:

```bash
npm run validate:content
npm run test:contracts
npm run build
npm run verify
```

`npm run start` serves the completed static build with its Pagefind index for final local checks.

## Content contract

Each public post lives at `content/posts/<ascii-slug>/`; the directory name is its permanent URL and should not change with the title. Every post directory must contain:

- `meta.yaml` — bilingual titles and summaries, publication date, `research | essay` type, tag keys, featured state, and bilingual reading time; update date and related links are optional.
- `en.mdx` — the complete English article.
- `zh.mdx` — the complete Chinese article.

Use lowercase ASCII tag keys with bilingual display names. Prefix authored heading, footnote, and citation IDs with the language when adding explicit IDs. Shared references belong in `content/references.bib`; research areas and records belong in `content/research.yaml`. Missing translations, invalid metadata, unknown citations, invalid formulas, and drafts in the public content tree intentionally fail validation or build.

## Drafts and two-computer workflow

Private drafts belong in `.drafts-private/`, which is ignored by Git. Never commit `draft: true` material under `content/posts/`. If a private draft must move between computers, use a separate private sync location.

GitHub is the only source-of-truth for publishable source. Keep an independent clone on each computer, preferably outside cloud-sync folders; do not operate the same `.git` working copy through Baidu Sync Disk on two computers.

For each update:

1. Run `git pull --rebase` in that computer's clone.
2. Edit or import completed content.
3. Run content validation, build, and verification.
4. Commit and push the exact tested source.
5. Publish that commit to Sites.

Install dependencies separately on each computer and commit changes to `package-lock.json`; never commit `node_modules`, build output, or caches.

## Licensing

Source code is licensed under the [MIT License](./LICENSE). Original writing and editorial content are licensed under [CC BY 4.0](./CONTENT-LICENSE.md). Third-party quotations, citations, trademarks, and linked materials remain subject to their respective owners' terms.

---

# Fan（凡）’s Log

`Fan（凡）’s Log` 是一个固定深色、完整双语的个人博客，用于记录 AI/HCI 研究札记与个人随笔。每篇文章先呈现完整英文，再呈现完整中文，并共享一个稳定网址。

> **状态：** Demo。首版文章和研究资料均为明确标注的示例，不代表任何真实单位、论文成果、联系方式或其他现实履历。

目标公开仓库：[`ManYmf/fan-log`](https://github.com/ManYmf/fan-log)

## 技术栈

- Vinext、React、TypeScript 与 shadcn 组件
- Markdown/MDX，支持 GFM、脚注、KaTeX、Shiki，以及由 BibTeX 驱动的 APA 作者—年份引用
- 静态产物输出到 `dist/client`
- Pagefind 生成统一的中英文全文索引
- OpenAI Sites 托管

需要 Node.js 22.13 或更高版本；已提交的锁文件是依赖版本的唯一依据。

## 本地开发

```bash
npm install
npm run dev
```

提交或发布前运行：

```bash
npm run validate:content
npm run test:contracts
npm run build
npm run verify
```

`npm run start` 会通过 Pagefind 启动完成的静态构建，供发布前本地检查。

## 内容约定

公开文章位于 `content/posts/<ascii-slug>/`。目录名同时是永久网址，不应随标题变化。每篇文章必须包含：

- `meta.yaml`：中英文标题与摘要、发布日期、`research | essay` 类型、标签键、精选状态和中英文阅读时长；更新日期与关联链接可选。
- `en.mdx`：完整英文正文。
- `zh.mdx`：完整中文正文。

标签键使用小写 ASCII，并提供中英文显示名。若手工指定标题、脚注或引用 ID，请添加语言前缀。统一参考文献存放在 `content/references.bib`，研究方向与记录存放在 `content/research.yaml`。翻译缺失、元数据不合法、引用键不存在、公式非法或公开内容目录出现草稿时，校验或构建会主动失败。

## 草稿与跨电脑工作流

私有草稿放在已被 Git 忽略的 `.drafts-private/` 中。不要在 `content/posts/` 提交含 `draft: true` 的内容；如需跨电脑传递私有草稿，请使用独立的私有同步空间。

GitHub 是可发布源码的唯一版本中心。每台电脑都应使用各自的独立克隆，最好位于云同步目录之外；不要让两台电脑共同操作百度同步盘中的同一个 `.git` 工作副本。

每次更新流程：

1. 在当前电脑的克隆中运行 `git pull --rebase`。
2. 编辑或导入已完成的内容。
3. 执行内容校验、构建与验证。
4. 提交并推送经过测试的源码。
5. 将该提交发布到 Sites。

两台电脑分别安装依赖，并提交 `package-lock.json` 的变更；不要提交 `node_modules`、构建产物或缓存。

## 许可

源代码采用 [MIT License](./LICENSE)。原创文章与编辑内容采用 [CC BY 4.0](./CONTENT-LICENSE.md)。第三方引文、引用资料、商标和外链内容仍受各自权利人的条款约束。
