# 凡的笔记

[访问博客](https://fan.gitbook.io/fan-log/) · [内容许可](gitbook/license.md)

这里保存 GitBook 中文博客的页面、目录和图片。站点包含研究札记、个人随笔与学习历程，现有三篇写作文章和研究档案保留示例标记。

## 仓库结构

```text
gitbook-docs.yaml              GitBook 站点和空间映射
.gitbook.yaml                 GitBook 内容目录配置
README.md                     维护说明
LICENSE                       代码的 MIT 许可
.gitignore                    私人草稿和临时文件的忽略规则
.gitattributes                文本换行约定
gitbook/
  README.md                   首页
  SUMMARY.md                  页面目录
  writing/                    写作索引和中文文章
  research.md                 研究总览
  research/                   独立研究条目
  learning.md                 学习总览
  learning/                   CS336、CS231 学习历程
  archive.md                  归档
  tags.md                     标签
  about.md                    关于
  references.md               参考文献
  license.md                  文章内容许可
  .gitbook/assets/             首页封面、站点图标、文章配图与来源记录
templates/
  中文文章草稿模板.md           新文章模板，不参与发布
  理工男自救指南写作模板.md     专题提纲与写作提示，不参与发布
```

## 内容维护

**Git Sync 已启用，连接 GitHub 的 `ManYmf/fan-log` 仓库与 `main` 分支。** 推送到 `main` 后，GitBook 会自动同步；在 GitBook 网页中合并修改稿后，内容也会自动提交回 GitHub。电脑上的本地文件仍需运行 `git pull --ff-only` 才能取回这些更新。

日常写作可以只维护单篇 Markdown。CS336 与 CS231 分别写在 `gitbook/learning/cs336.md` 和 `gitbook/learning/cs231.md`；也可以把独立笔记交给 Codex，说明所属课程。文内链接、图片路径、目录层级和相关总览由 Codex 整理，准备发布时再提交并推送。

1. 本地写作前先拉取最新提交，再复制[中文文章草稿模板](templates/中文文章草稿模板.md)到 `.drafts-private/`；也可以直接在 GitBook 中创建修改草稿。
2. 每篇文章保留中文标题、摘要、日期、标签、完整正文和参考文献。代码、文献作者及原题保留原文。
3. 写作文章放在 `gitbook/writing/`，研究条目放在 `gitbook/research/`，学习记录放在 `gitbook/learning/`。在 `gitbook/SUMMARY.md` 对应板块下面缩进添加链接，并更新对应的写作索引、研究总览或学习总览；按内容需要维护首页、归档和相关标签页。现有文件名与页面路径保持稳定。
4. 检查正文、公式、代码、脚注和链接，再按当次发布要求处理修改稿。只需预览时，明确说明“本轮不发布”。

本地 `.drafts-private/` 被 Git 忽略，且位于 GitBook 内容目录之外；私人草稿不要放入 `gitbook/`。

《理工男自救指南》使用[专题写作模板](templates/理工男自救指南写作模板.md)，围绕交往实践与恋爱动机反思展开。复制到 `.drafts-private/` 后补充个人经历；博客中的[文章页面](gitbook/writing/engineer-self-rescue-guide.md)目前仅保留待补充提纲。

### 手动在 GitBook 网页更新

1. 打开[站点编辑后台](https://app.gitbook.com/o/egSGUcjUIbDQZzPmhboO/sites/site_mYynC)，进入“凡的笔记”的内容区，选择需要修改的页面，例如“关于”。
2. 点击 **Edit（编辑）**，创建修改草稿；直接修改页面中的相应段落。
3. 如果已在本地修改 `gitbook/about.md`，将改过的段落复制到网页编辑器的对应位置。Windows 粘贴 Markdown 使用 **Ctrl + Shift + V**，然后检查格式。页面标题单独编辑；不要把首行 `# 关于` 再粘贴到正文中。底部导航无需改动时直接保留；需要新增站内链接时，在编辑器里选择对应页面。
4. 编辑内容会自动保存到草稿。点击 **Preview（预览）** 检查，再点击 **Merge（合并）** 更新已发布站点；若编辑页未显示合并按钮，可进入 **Overview（概览）** 查找。
5. 打开公开页面检查结果，必要时刷新浏览器。Git Sync 会将合并后的内容写回 GitHub；下次在电脑上继续编辑前，先运行 `git pull --ff-only`。

首页和写作索引使用 `README.md` 文件，按 GitBook 官方建议在仓库中维护；普通文章和“关于”可以在网页编辑。手动网页编辑不需要重新创建站点。

参考：[GitBook 修改草稿与合并](https://gitbook.com/docs/collaborate/change-requests/change-requests-in-a-space)、[Markdown 粘贴](https://gitbook.com/docs/create-content/formatting/markdown)。

### 在电脑上修改并自动发布

在本仓库目录打开终端，先取回最新内容：

```powershell
git pull --ff-only
```

编辑并保存需要更新的文件。例如修改 `gitbook/about.md` 后：

```powershell
git diff -- gitbook/about.md
git add -- gitbook/about.md
git commit -m "更新关于页"
git push origin main
```

发布文章或图片时，将上面的文件路径替换为本次实际修改的文件；新增页面还要提交 `gitbook/SUMMARY.md` 等相关索引。仅保存文件或本地提交不会更新网站，推送到 `main` 后才会触发同步。在 GitBook 的 **Git Sync** 中确认成功，再打开博客检查。

若拉取提示本地有未提交的修改或分支无法快进，先保留本地改动并处理冲突，再继续推送；不要使用强制推送。为减少冲突，尽量避免在网页和电脑上同时修改同一页。

## 图片与格式

三篇示例文章各配一张 AI 情境插画与一张相关的网络图片。AI 插画在图注中标明；网络图片保留作者、来源链接、许可及修改说明。六张配图的完整来源和生成提示词保存在 `gitbook/.gitbook/assets/example-image-sources.json`，第三方图片遵循各自许可。

首页封面为 `gitbook/.gitbook/assets/fan-notes-cover.jpg`，在首页正文第一块显示，位于标题下方、简介之前。站点头像为同目录下的 `fan-avatar-rounded.svg`，内嵌原图 `fan-avatar.jpg`，沿用旧图标的圆角和青色细边框；通过 GitBook 站点外观设置引用仓库中的 SVG，同时用于左上角图标和浏览器标签页图标，浅色和深色模式使用同一张头像；`favicon-zh.svg` 保留为旧版图标。当前连接器无法设置原生封面位置；以后手工设置原生封面时，移除正文中的同一张图，避免重复。

站点背景通过 GitBook 外观设置维护：使用 `gradient` 主题，浅色 Tint 为 `#2586C8`，深色 Tint 为 `#3677A8`，保留青色主色和默认深色模式。Tint 是 GitBook 生成配色的种子色，并非直接铺在页面上的底色；浅色背景从右上方的淡蓝色 `#E8F4FF` 向左下方的白色过渡，深色背景从蓝灰色 `#293137` 过渡到炭灰色 `#1D1D1D`。避免再使用接近白色的中性 Tint，以免渐变两端颜色过近、看起来像纯色。当前使用原生渐变，没有添加全站背景图片。

页面之间使用相对 Markdown 链接。行内公式使用 `$$公式$$`，块公式使用单独多行的 `$$`，脚注使用 `[^标识]` 与对应定义。参考文献直接列出作者、年份、原题和可核查链接。

## Git Sync 配置

当前站点的项目目录和空间映射均为 `./`，由仓库根目录的 `.gitbook.yaml` 指向 `./gitbook/`。`gitbook-docs.yaml` 是 GitBook 首次同步时生成的站点配置；保留现有空间的 `key: space-1`，避免新建重复空间。不要再把空间映射改成 `./gitbook/`，否则内容根目录会被重复拼接。

首次同步采用 GitBook → GitHub，已保留线上中文页面。后续正常写作无需切换同步方向，也无需反复重新连接。GitBook 可能自动整理 Markdown 的空格、列表和脚注编号，按同步后的版本继续编辑即可。

参考：[启用 GitHub 同步](https://gitbook.com/docs/docs-as-code/git-sync/enabling-github-sync)、[内容配置](https://gitbook.com/docs/docs-as-code/git-sync/content-configuration)。

本仓库不需要安装依赖或执行前端构建。文章与编辑内容采用[知识共享署名 4.0 国际许可](gitbook/license.md)，代码采用 [MIT 许可](LICENSE)。
