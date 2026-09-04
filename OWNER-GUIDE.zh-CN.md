# Fan（凡）’s Log 站长操作说明书

这份说明书写给不需要理解前端代码、但需要长期维护自己博客的站长。默认做法是：**你负责提供真实内容并确认预览，Codex 负责整理双语文件、检查、提交、推送和部署。**

- 正式网站：<https://fan-log.mex456898.chatgpt.site>
- 公开源码：<https://github.com/ManYmf/fan-log>
- 当前状态：Demo。示例文章、研究资料和页面文案不代表真实履历。

## 先记住三条规则

1. **GitHub 推送不等于网站上线。** `git push` 只更新公开源码；还要把同一个版本部署到 Sites，正式网站才会更新。
2. **不要把草稿或隐私放进 `content/posts/`。** 这里的内容会进入公开仓库，并在下次部署时进入公开网站。
3. **两台电脑不要共同操作百度同步盘里的同一个 `.git` 文件夹。** 每台电脑使用自己的独立克隆，开始前先拉取，结束后先推送，再换电脑。

## 最省心的日常流程

每次发文只需要四步：

1. 把中文原稿、已有英文稿、可靠资料和发布要求交给 Codex。
2. 让 Codex 先创建文章并打开本地预览，明确说“暂不提交、暂不部署”。
3. 你阅读英文版和中文版，确认事实、措辞、引用和是否公开。
4. 发送本说明书后面的“检查并发布”提示词；Codex 完成检查、GitHub 推送和 Sites 部署。

推荐把写作和发布拆成两个指令。这样，在你确认预览之前，文章不会被公开。

### 可复制：新建文章提示词

```text
请在当前 fan-log 项目中新增一篇完整双语文章。

中文原稿：
【粘贴正文，或给出本地文件路径】

英文稿：
【有就粘贴；没有则写“请忠实翻译，不额外添加事实”】

文章类型：research / essay
发布日期：YYYY-MM-DD
希望使用的标签：【从现有标签中选择；不确定时请推荐】
是否首页精选：是 / 否
可靠资料或参考文献：【链接、DOI、BibTeX；没有就写“无”】

请生成稳定的小写英文 slug，并创建 meta.yaml、en.mdx、zh.mdx。
不要虚构单位、履历、研究结果、引文或参考文献；不确定的事实请标出。
先运行内容校验和构建，再打开本地完整预览供我检查。
本轮不要提交、不要推送、不要部署。
```

### 可复制：修改旧文章提示词

```text
请修改文章 content/posts/【原 slug】。
保持目录名和永久网址不变，同时更新完整英文和完整中文；如内容有实质变化，请补充 updatedAt。
请检查引用、公式、脚注和中英文一致性，运行校验并打开本地预览。
本轮不要提交、不要推送、不要部署。
```

### 可复制：检查并正式发布提示词

```text
我已确认当前 fan-log 的预览和公开内容。
请先检查工作区和远端状态，不要覆盖未说明的修改；拉取 GitHub main 的最新版本后，运行完整内容校验、契约测试、构建、构建验证、lint 和 TypeScript 检查。
请向我说明将提交哪些文件。确认没有冲突或错误后，提交并推送到 GitHub 的 main 分支。
然后把同一个提交部署到现有的 Fan（凡）’s Log Sites 项目；不要创建新项目，保持目前的公开访问设置。
部署成功后打开并验证正式网址。如果出现冲突或检查失败，不要强推、不要部署，先告诉我具体问题。
```

## 这个博客如何运作

```text
你的原稿
   ↓
双语内容文件（meta.yaml + en.mdx + zh.mdx）
   ↓
内容校验与静态构建
   ↓
Git 提交 → GitHub（公开源码和版本记录）
   ↓
Sites 保存并部署同一提交
   ↓
正式网站、RSS、站点地图和中英文搜索更新
```

几个容易混淆的词：

- **slug**：文章网址里最后一段稳定的英文名称，例如 `the-quiet-work-of-attention`。
- **构建（build）**：把内容文件转换成浏览器可以直接访问的网站文件。
- **提交（commit）**：为一批修改建立一个可追踪、可恢复的版本。
- **推送（push）**：把本地提交发送到 GitHub。
- **部署（deploy）**：把某个已验证版本设为正式网站。
- **main**：当前公开仓库的主分支。

构建会自动生成 RSS、`sitemap.xml`、`robots.txt` 和 Pagefind 搜索索引。不要手工修改这些生成结果。

## 新文章的文件结构

每篇公开文章都必须有自己的目录：

```text
content/posts/<slug>/
├── meta.yaml
├── en.mdx
└── zh.mdx
```

例如：

```text
content/posts/my-first-field-note/
├── meta.yaml
├── en.mdx
└── zh.mdx
```

发布后的网址会是：

```text
https://fan-log.mex456898.chatgpt.site/writing/my-first-field-note/
```

slug 只允许小写英文字母、数字和单个连字符，不能使用中文、空格、下划线或大写字母。文章发布后不要改 slug，否则旧链接会失效。

## `meta.yaml` 模板

```yaml
title:
  en: "English title"
  zh: "中文标题"
summary:
  en: "A complete one- or two-sentence English summary."
  zh: "一到两句完整的中文摘要。"
publishedAt: "2026-09-04"
kind: essay
tags:
  - attention
featured: false
demo: false
readingMinutes:
  en: 5
  zh: 4
```

字段含义：

- `title`：中英文标题，二者都必须填写。
- `summary`：列表、搜索、RSS 和页面元信息使用的中英文摘要。
- `publishedAt`：首次发布日期，必须是真实日期并保留引号，格式为 `YYYY-MM-DD`。
- `updatedAt`：可选；实质修改旧文章时添加，格式同上。
- `kind`：只能是 `research`（研究札记）或 `essay`（随笔）。
- `tags`：至少一个，只能使用下表中的标签，不能重复。
- `featured`：是否参加首页精选。建议同一时间只保留一篇为 `true`；若多篇为 `true`，日期最新的一篇优先。
- `demo`：真实文章写 `false`，示例文章写 `true`。
- `readingMinutes`：中英文预计阅读分钟数，必须是大于等于 1 的整数。

可选字段 `externalUrl` 和 `related` 已保留在数据结构中，但当前页面不会展示；在真正需要前不要自行添加。

不要加入 `draft` 字段，连 `draft: false` 也不允许。草稿必须放到公开内容目录之外。

## 当前可用标签

| 标签键 | 英文显示名 | 中文显示名 |
| --- | --- | --- |
| `human-ai-interaction` | Human–AI interaction | 人机交互 |
| `interface-design` | Interface design | 界面设计 |
| `knowledge-work` | Knowledge work | 知识工作 |
| `trust` | Trust | 信任 |
| `responsible-ai` | Responsible AI | 负责任 AI |
| `attention` | Attention | 注意力 |
| `reflective-practice` | Reflective practice | 反思实践 |
| `everyday-life` | Everyday life | 日常生活 |

新增标签不只是写一个新词，还要同步修改校验器和中英文显示名。请把这类修改交给 Codex。

## 正文写法

文章页面已经从 `meta.yaml` 生成一级标题，因此 `en.mdx` 和 `zh.mdx` 都从二级标题开始，不要再写 `# 文章标题`。两种语言必须各自是完整文章；网页会自动先显示英文，再显示中文。

### 常用 Markdown

```markdown
## Section title / 小节标题

普通段落，包含 **粗体**、*斜体* 和 [链接](https://example.com)。

> 这是一段引用或特别说明。

- 无序列表
- 第二项

1. 有序列表
2. 第二项
```

### 表格

```markdown
| Dimension | Observation | Implication |
| --- | --- | --- |
| Trust | Confidence rose | Add verification |
| Attention | Interruptions increased | Protect focus |
```

### 脚注

英文脚注使用英文前缀：

```markdown
This claim needs a clarification.[^en-note-1]

[^en-note-1]: The complete English footnote.
```

中文脚注使用中文区域前缀：

```markdown
这里需要补充说明。[^zh-note-1]

[^zh-note-1]: 完整的中文脚注。
```

普通标题的网页锚点会自动添加语言前缀。除非确有需要，不要手写 HTML 或自定义 ID。

### 公式

行内公式：

```markdown
Reflective demand can be written as $D = u \times i$.
```

块级公式的两个 `$$` 必须成对出现：

```markdown
$$
D = u \times i
$$
```

### 代码块

````markdown
```python
def calibrate(confidence: float) -> float:
    return min(max(confidence, 0.0), 1.0)
```
````

当前明确支持 `typescript`、`javascript`、`json`、`bash`、`python` 和 `markdown`。不确定语言名称时让 Codex 选择。

MDX 会把 `{}` 和 `<>` 解释成代码表达式或组件。正文里如果只是展示这些符号，最好放在反引号代码中，或让 Codex 处理转义。

## 学术引用与 BibTeX

正文中的单条引用：

```markdown
Appropriate reliance requires calibrated trust [@lee2004trust].
```

多条引用：

```markdown
This design lineage spans mixed initiative and human–AI guidelines [@horvitz1999mixedinitiative; @amershi2019guidelines].
```

每个 `@引用键` 都必须在 `content/references.bib` 中有对应的 BibTeX 条目，大小写完全一致。构建会自动按 APA 作者—年份形式排版，并生成文末参考文献。

引用原则：

- 不要让模型凭记忆虚构作者、题目、DOI、页码或发表场所。
- 优先提供 DOI、论文主页或完整 BibTeX。
- 新资料应先核实，再加入文献库和正文。
- 缺失引用键会使校验失败；非法 BibTeX 可能使构建失败。

## 草稿、隐私和公开范围

### 什么会公开

- 推送到公开 GitHub 仓库的所有已提交文件会立即公开，即使 Sites 还没部署。
- `content/posts/` 下的所有文章目录都被视为待发布内容，没有隐藏开关。
- Git 历史可能保留后来删除的内容。

因此，不要在项目里提交身份证件、私人地址、密码、访问令牌、未授权数据、保密论文或不希望长期公开的草稿。

### 草稿放在哪里

- 可放在 `.drafts-private/`；它已被 Git 忽略，不会进入 GitHub。
- 更敏感或需要跨电脑同步的草稿，放到项目之外的私人同步空间。
- 当前工作副本位于百度同步盘，所以“没有进入 GitHub”不代表“没有进入百度同步”。请根据内容敏感程度选择位置。

如果秘密或访问令牌已经推送，不要只删除文件：立即停止发布、撤销或轮换该秘密，然后让 Codex 清理 Git 历史。

## 本地预览

以下命令都在包含 `package.json` 的项目根目录运行。

快速预览页面：

```powershell
npm run dev
```

终端会显示一个 `localhost` 地址。完成检查后，在终端按 `Ctrl+C` 停止。

要测试包含全文搜索在内的完整静态结果：

```powershell
npm run build
npm run start
```

`npm run start` 会显示另一个本地地址。检查首页、文章、中英文、引用、公式、搜索、归档和标签后按 `Ctrl+C`。

## 发布前完整检查

通常让 Codex 执行即可；手动运行时依次使用：

```powershell
npm run validate:content
npm run test:contracts
npm run build
npm run verify
npm run lint
npx tsc --noEmit --incremental false
```

检查失败时不要跳过。常见原因包括：

- slug 含中文、空格、大写或下划线；
- 少了 `en.mdx` 或 `zh.mdx`；
- 中英文标题、摘要或正文缺失；
- 日期没加引号，或日期本身不存在；
- YAML 使用 Tab、缩进错误或加入了未知字段；
- 标签不存在或重复；
- 任一语言正文少于约 500 个非空字符；
- 引用键不存在或大小写不一致；
- `$$`、代码块或 MDX 符号没有闭合；
- 在公开文章目录里写了任何 `draft` 字段。

## 手动提交到 GitHub（备用流程）

如果你不想操作命令行，直接使用前面的“检查并正式发布”提示词。以下只是备用说明。

开始编辑前：

```powershell
git status
git pull --rebase origin main
```

若 `git status` 显示你不认识的修改，或拉取发生冲突，立即停止并让 Codex 处理。

检查通过后，先看清即将提交的文件：

```powershell
git status
```

只添加这篇文章和确实需要的生成文件：

```powershell
git add -- content/posts/<slug>
git add -- public/rss.xml public/sitemap.xml public/robots.txt
```

只有新增或修改了引用时才运行：

```powershell
git add -- content/references.bib
```

确认暂存范围并提交：

```powershell
git diff --cached --stat
git commit -m "content: publish <slug>"
git push origin main
```

不要使用 `git push --force`、`git reset --hard` 或 `git clean -fd` 来“快速解决”问题。遇到 `push rejected`、冲突或意外文件时停下，让 Codex 检查。

## 部署到 Sites

这个仓库没有一个可供站长直接运行的 `npm run deploy`。GitHub 推送完成后，仍需让 Codex 把同一个提交发布到已有 Sites 项目。

发布时应满足：

1. 使用 `.openai/hosting.json` 中已有的项目，不新建站点。
2. 构建和检查全部通过。
3. GitHub 与 Sites 的源码都指向同一个提交。
4. 保存一个新版本，再部署并等待成功状态。
5. 打开正式网址验证；不要把内部 Sites Git 远端当成普通 GitHub 远端手动推送。

正式网址始终是：<https://fan-log.mex456898.chatgpt.site>

由于当前网站是公开的，Codex 在正式部署前可能再次向你确认公开发布范围。这是正常的安全确认。

## 两台电脑如何安全使用

### 当前电脑

当前工作副本位于：

```text
D:\BaiduSyncdisk\个人博客
```

它可以继续作为一台电脑的工作副本，但不要在另一台电脑打开百度同步产生的同一个 `.git` 副本。

### 另一台电脑首次设置

在**非百度、非 OneDrive 等云同步目录**里独立克隆，例如：

```powershell
cd D:\Projects
git clone git@github.com:ManYmf/fan-log.git
cd fan-log
npm ci
```

如果另一台电脑没有配置 GitHub SSH，可使用：

```powershell
git clone https://github.com/ManYmf/fan-log.git
```

HTTPS 推送时仍会要求登录 GitHub。也可以使用 GitHub Desktop 管理拉取和推送，但内容检查与 Sites 部署仍建议交给 Codex。

### 每次换电脑

1. 电脑 A 完成后：检查、提交并 `git push origin main`。
2. 确认推送成功，再关闭电脑 A 上的编辑工作。
3. 电脑 B 开始前：运行 `git status` 和 `git pull --rebase origin main`。
4. 尽量不要在两台电脑同时改同一篇文章。
5. 如果两边都有未推送修改，不要强推；让 Codex 合并。

首次克隆或 `package-lock.json` 更新后运行 `npm ci`。普通写作不需要每天重新安装依赖。

## 从 Demo 切换为真实博客

不要只把 `site.config.ts` 的 `mode` 从 `demo` 改为 `live`。当前首页、关于页、研究页和文章语言栏还有 Demo 专用文案；研究项目、成果和联系方式也需要页面一起接入。

准备好真实资料后，向 Codex 提供：

- 希望公开的中英文作者简介；
- 真实研究方向、项目和成果；
- 经你确认的作者顺序、年份、场所、状态、DOI、PDF 和代码链接；
- 希望公开的邮箱、GitHub、Scholar 或 ORCID；
- 哪些 Demo 文章保留、删除或改写；
- 哪篇真实文章作为首页精选。

可复制提示词：

```text
请把 Fan（凡）’s Log 从 Demo 完整迁移为 Live。我会提供真实资料；任何缺失内容都留空，不得虚构。
请统一更新站点配置、首页、关于、研究页、文章标记和可见的 Demo 文案，使 mode 真正控制展示；把真实项目、成果和非空外部链接接入页面。
先给我本地完整预览，不要提交或部署，等我逐项确认后再发布。
```

至少保留一篇完整双语文章，否则内容校验会失败。删除 Demo 文章时应删除整个文章目录，并重新构建 RSS、站点地图和搜索索引。

## 出错时怎么做

- **预览不对：** 暂停发布，告诉 Codex 具体页面、文字和预期结果。
- **校验或构建失败：** 不要绕过检查，把完整错误交给 Codex 修复。
- **Git 冲突或 push rejected：** 不要强推，让 Codex 先保护两边修改再合并。
- **GitHub 已推送但还没部署：** 正式网站不会变化；修正后再提交即可。
- **错误内容已经部署：** 要求 Codex 恢复上一个正常 Sites 版本，并在 GitHub 中提交修正。
- **旧链接失效：** 检查是否改过已发布文章的 slug；优先恢复原目录名。
- **秘密已经公开：** 立即撤销或轮换秘密，再清理 Git 历史；仅删除最新文件不够。

## 每次发布前的最终清单

- [ ] 中英文都是完整文章，不只是摘要或机器直译草稿。
- [ ] 姓名、机构、研究结果、日期、链接和引用均已人工确认。
- [ ] slug 合法且没有改动旧文章的永久网址。
- [ ] `meta.yaml` 字段完整，真实文章为 `demo: false`，没有任何 `draft` 字段。
- [ ] 没有隐私、密码、令牌、保密材料或无权公开的内容。
- [ ] 本地预览中的表格、脚注、公式、代码和参考文献正常。
- [ ] 英文和中文搜索都能找到文章。
- [ ] 所有检查通过，GitHub 推送成功。
- [ ] 部署的是同一个已验证提交，正式网址已打开确认。

如果你不确定任何一步，停在“本地预览”阶段，并告诉 Codex：**“先不要公开，请解释当前状态和下一步。”**
