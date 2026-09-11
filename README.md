# 凡的笔记

[访问博客](https://fan.gitbook.io/fan-log/) · [内容许可](gitbook/license.md)

这里保存 GitBook 中文博客的页面、目录和图片。站点包含研究札记与个人随笔，当前三篇文章和研究档案均保留示例标记。

## 仓库结构

```text
.gitbook.yaml                 GitBook 内容目录配置
README.md                     维护说明
LICENSE                       代码的 MIT 许可
.gitignore                    私人草稿和临时文件的忽略规则
.gitattributes                文本换行约定
gitbook/
  README.md                   首页
  SUMMARY.md                  页面目录
  writing/                    写作索引和三篇中文文章
  research.md                 研究
  archive.md                  归档
  tags.md                     标签
  about.md                    关于
  references.md               参考文献
  license.md                  文章内容许可
  .gitbook/assets/             首页封面和站点图标
templates/
  中文文章草稿模板.md           新文章模板，不参与发布
```

## 内容维护

**目前以 GitBook 在线内容为准，Git Sync 尚未开启。** 本地文件是内容副本，修改后不会自动更新网站；通过已连接的 GitBook 编辑并合并修改稿，才会更新公开页面。需要同步本地副本时，先读取最新在线内容，避免覆盖网页端的新修改。

1. 在 GitBook 中写作，或复制[中文文章草稿模板](templates/中文文章草稿模板.md)到本地 `.drafts-private/`，把中文稿交给 Codex 整理。
2. 每篇文章保留中文标题、摘要、日期、标签、完整正文和参考文献。代码、文献作者及原题保留原文。
3. 新文章放在 `gitbook/writing/`，同时维护 `SUMMARY.md`、写作索引、首页、归档和相关标签页。现有文件名与页面路径保持稳定。
4. 检查正文、公式、代码、脚注和链接，再按当次发布要求处理修改稿。只需预览时，明确说明“本轮不发布”。

本地 `.drafts-private/` 被 Git 忽略，且位于 GitBook 内容目录之外；私人草稿不要放入 `gitbook/`。

### 手动在 GitBook 网页更新

1. 打开[站点编辑后台](https://app.gitbook.com/o/egSGUcjUIbDQZzPmhboO/sites/site_mYynC)，进入“凡的笔记”的内容区，选择需要修改的页面，例如“关于”。
2. 点击 **Edit（编辑）**，创建修改草稿；直接修改页面中的相应段落。
3. 如果已在本地修改 `gitbook/about.md`，将改过的段落复制到网页编辑器的对应位置。Windows 粘贴 Markdown 使用 **Ctrl + Shift + V**，然后检查格式。页面标题单独编辑；不要把首行 `# 关于` 再粘贴到正文中。底部导航无需改动时直接保留；需要新增站内链接时，在编辑器里选择对应页面。
4. 编辑内容会自动保存到草稿。点击 **Preview（预览）** 检查，再点击 **Merge（合并）** 更新已发布站点；若编辑页未显示合并按钮，可进入 **Overview（概览）** 查找。
5. 打开公开页面检查结果，必要时刷新浏览器。网页修改不会自动写回本地 Markdown，可自行同步相同改动，或请 Codex 取回最新内容。

当前仅保存本地文件、提交或推送 GitHub，都不会自动发布到 GitBook；自动同步需要另行连接 Git Sync。手动网页编辑不需要重新创建站点。

参考：[GitBook 修改草稿与合并](https://gitbook.com/docs/collaborate/change-requests/change-requests-in-a-space)、[Markdown 粘贴](https://gitbook.com/docs/create-content/formatting/markdown)。

## 图片与格式

首页封面为 `gitbook/.gitbook/assets/fan-notes-cover.jpg`，在首页正文第一块显示，位于标题下方、简介之前。站点图标为同目录下的 `favicon.svg`。当前连接器无法设置原生封面位置；以后手工设置原生封面时，移除正文中的同一张图，避免重复。

页面之间使用相对 Markdown 链接。行内公式使用 `$$公式$$`，块公式使用单独多行的 `$$`，脚注使用 `[^标识]` 与对应定义。参考文献直接列出作者、年份、原题和可核查链接。

## 可选的 Git Sync

需要自动同步时，将现有 GitBook 空间连接到本仓库根目录，由 `.gitbook.yaml` 指向 `./gitbook/`；不要再次映射到 `gitbook/` 子目录。首次同步前核对双方内容和同步方向，保留最新版本。连接后，推送到同步分支或合并 GitBook 修改稿可能更新公开站点。

本仓库不需要安装依赖或执行前端构建。文章与编辑内容采用[知识共享署名 4.0 国际许可](gitbook/license.md)，代码采用 [MIT 许可](LICENSE)。
