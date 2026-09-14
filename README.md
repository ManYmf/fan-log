# 凡的笔记

[访问博客](https://fan.gitbook.io/fan-log/) · [内容许可](gitbook/license/README.md)

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
  writing/
    README.md                 写作索引
    baoyan-journey/
      README.md               《保研历程》正文
      images/                 本文配图与 sources.json
    <文章 slug>/
      README.md               其他文章正文
      images/                 有配图时创建，存放本文图片与 sources.json
  research/
    README.md                 研究总览
    <条目 slug>/README.md     独立研究条目
  learning/
    README.md                 学习总览
    cs336/README.md            CS336 学习历程
    cs231/README.md            CS231 学习历程
  archive/README.md           归档
  tags/README.md              标签
  about/README.md             关于
  references/README.md        参考文献
  license/README.md           文章内容许可
  .gitbook/assets/             全站共用图片
    site/                     首页封面、头像原图与旧版图标
    fan-avatar-rounded.svg    线上头像的固定入口
templates/
  中文文章草稿模板.md           新文章模板，不参与发布
  理工男自救指南写作模板.md     专题提纲与写作提示，不参与发布
```

## 内容维护

**Git Sync 已启用，连接 GitHub 的 `ManYmf/fan-log` 仓库与 `main` 分支。** 推送到 `main` 后，GitBook 会自动同步；在 GitBook 网页中合并修改稿后，内容也会自动提交回 GitHub。电脑上的本地文件仍需运行 `git pull --ff-only` 才能取回这些更新。

每个页面使用独立目录，正文统一命名为 `README.md`，配图放在同目录的 `images/` 中。CS336 与 CS231 分别写在 `gitbook/learning/cs336/README.md` 和 `gitbook/learning/cs231/README.md`；也可以把独立笔记交给 Codex，说明所属课程。文内链接、图片路径、目录层级和相关总览由 Codex 整理，准备发布时再提交并推送。

1. 本地写作前先拉取最新提交，再复制[中文文章草稿模板](templates/中文文章草稿模板.md)到 `.drafts-private/<文章 slug>/README.md`，私人图片放在同目录的 `images/` 中。
2. 每篇文章保留中文标题、摘要、日期、标签、完整正文和参考文献。代码、文献作者及原题保留原文。
3. 准备公开的文章目录放在 `gitbook/writing/<文章 slug>/`、`gitbook/research/<条目 slug>/` 或 `gitbook/learning/<笔记 slug>/`。在 `gitbook/SUMMARY.md` 对应板块下面缩进添加指向新 `README.md` 的链接，并更新对应的写作索引、研究总览或学习总览；按内容需要维护首页、归档和相关标签页。目录中的 slug 使用稳定名称，例如 `baoyan-journey`。
4. 检查正文、公式、代码、脚注和链接，再按当次发布要求处理修改稿。只需预览时，明确说明“本轮不发布”。

本地 `.drafts-private/` 被 Git 忽略，且位于 GitBook 内容目录之外；私人草稿不要放入 `gitbook/`。

创建私人草稿的示例：

```powershell
New-Item -ItemType Directory -Path .drafts-private/my-article/images -Force
Copy-Item -LiteralPath templates/中文文章草稿模板.md -Destination .drafts-private/my-article/README.md
```

《理工男自救指南》已暂时从线上撤下，原文保存在本地 `.drafts-private/engineer-self-rescue-guide/README.md`，不参与 Git 跟踪或 GitBook 发布。继续写作可参考[专题写作模板](templates/理工男自救指南写作模板.md)；以后需要重新公开时，再将文章放回发布目录并恢复相关索引。

### GitBook 网页预览与同步检查

本仓库的正文页面都使用 `README.md`，主要通过本地 Git 维护。GitBook 官方提醒：启用 Git Sync 时，在网页中编辑 `README.md` 可能造成冲突或重复页面。因此修改正文、目录和图片后，应从仓库提交并推送，再到[站点编辑后台](https://app.gitbook.com/o/egSGUcjUIbDQZzPmhboO/sites/site_mYynC)查看 **Git Sync** 状态及页面预览。[GitBook 内容配置说明](https://gitbook.com/docs/docs-as-code/git-sync/content-configuration)

若已有网页修改草稿需要合并，先核对其与本地修改是否重叠；合并后通过 `git pull --ff-only` 取回同步结果，并检查文件布局。无需重新创建站点或重新连接 Git Sync。

移动或重命名页面时，同步更新 `SUMMARY.md`、相关总览和所有站内相对链接。仓库路径改变后，公开页面 URL 需按原有 slug 在 GitBook 中核对；不要仅根据文件路径推断 URL 不变。发布后检查原地址和导航，若确认地址发生变化，再配置相应重定向。

### 在电脑上修改并自动发布

在本仓库目录打开终端，先取回最新内容：

```powershell
git pull --ff-only
```

编辑并保存需要更新的文件。例如修改 `gitbook/about/README.md` 后：

```powershell
git diff -- gitbook/about/README.md
git add -- gitbook/about/README.md
git commit -m "更新关于页"
git push origin main
```

发布文章或图片时，将上面的文件路径替换为本次实际修改的文章目录，例如 `gitbook/writing/baoyan-journey/`，一起提交正文、图片和来源记录；新增或移动页面还要提交 `gitbook/SUMMARY.md` 等相关索引及链接修改。仅保存文件或本地提交不会更新网站，推送到 `main` 后才会触发同步。在 GitBook 的 **Git Sync** 中确认成功，再打开博客检查。

若拉取提示本地有未提交的修改或分支无法快进，先保留本地改动并处理冲突，再继续推送；不要使用强制推送。为减少冲突，尽量避免在网页和电脑上同时修改同一页。

## 图片与格式

文章图片放在正文所属目录的 `images/` 中。例如，《保研历程》正文为 `gitbook/writing/baoyan-journey/README.md`，配图放在 `gitbook/writing/baoyan-journey/images/`，正文使用 `![图片说明](images/图片名.png)` 引用。研究和学习页面沿用相同规则；没有配图时无需创建空的 `images/` 目录。复制、备份或迁移文章时带走整个文章目录。

每篇的图片与 `sources.json` 放在同一个 `images/` 目录；来源记录中的 `file` 相对该图片目录，`article` 相对 GitBook 内容根目录 `gitbook/`，例如 `writing/baoyan-journey/README.md`。迁移文章目录时一并更新来源记录与站内链接。

三篇示例文章各配一张 AI 情境插画与一张相关的网络图片。AI 插画在图注中标明；网络图片保留作者、来源链接、许可及修改说明。各篇的完整来源和生成提示词保存在自身图片目录的 `sources.json` 中，第三方图片遵循各自许可。

首页封面为 `gitbook/.gitbook/assets/site/fan-notes-cover.jpg`，在首页正文第一块显示，位于标题下方、简介之前。头像原图 `fan-avatar.jpg` 和旧版图标 `favicon-zh.svg` 也归档在 `site/` 中。

线上头像保留固定入口 `gitbook/.gitbook/assets/fan-avatar-rounded.svg`。该 SVG 已内嵌头像数据，沿用旧图标的圆角和青色细边框；GitBook 站点外观设置直接引用它的 GitHub 地址，同时用于左上角图标和浏览器标签页图标，浅色和深色模式使用同一张头像。移动这个固定入口前必须同步更新站点外观设置。当前连接器无法设置原生封面位置；以后手工设置原生封面时，移除正文中的同一张图，避免重复。

站点背景通过 GitBook 外观设置维护：使用 `gradient` 主题，浅色 Tint 为 `#2586C8`，深色 Tint 为 `#3677A8`，保留青色主色和默认深色模式。Tint 是 GitBook 生成配色的种子色，并非直接铺在页面上的底色；浅色背景从右上方的淡蓝色 `#E8F4FF` 向左下方的白色过渡，深色背景从蓝灰色 `#293137` 过渡到炭灰色 `#1D1D1D`。避免再使用接近白色的中性 Tint，以免渐变两端颜色过近、看起来像纯色。当前使用原生渐变，没有添加全站背景图片。

页面之间使用相对 Markdown 链接。行内公式使用 `$$公式$$`，块公式使用单独多行的 `$$`，脚注使用 `[^标识]` 与对应定义。参考文献直接列出作者、年份、原题和可核查链接。

## Git Sync 配置

当前站点的项目目录和空间映射均为 `./`，由仓库根目录的 `.gitbook.yaml` 指向 `./gitbook/`。`gitbook-docs.yaml` 是 GitBook 首次同步时生成的站点配置；保留现有空间的 `key: space-1`，避免新建重复空间。不要再把空间映射改成 `./gitbook/`，否则内容根目录会被重复拼接。

首次同步采用 GitBook → GitHub，已保留线上中文页面。后续正常写作无需切换同步方向，也无需反复重新连接。GitBook 可能自动整理 Markdown 的空格、列表和脚注编号，按同步后的版本继续编辑即可。

参考：[启用 GitHub 同步](https://gitbook.com/docs/docs-as-code/git-sync/enabling-github-sync)、[内容配置](https://gitbook.com/docs/docs-as-code/git-sync/content-configuration)。

本仓库不需要安装依赖或执行前端构建。文章与编辑内容采用[知识共享署名 4.0 国际许可](gitbook/license/README.md)，代码采用 [MIT 许可](LICENSE)。
