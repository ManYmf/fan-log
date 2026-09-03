export const siteConfig = {
  name: "Fan（凡）’s Log",
  shortName: "F／凡",
  mode: "demo" as const,
  author: { en: "Fan", zh: "凡" },
  description: {
    en: "A bilingual field notebook on human–AI interaction, knowledge work, and attentive living.",
    zh: "一本记录人机交互、知识工作与专注生活的双语田野笔记。",
  },
  url: "https://fan-log.mex456898.chatgpt.site",
  links: { email: "", github: "", scholar: "", orcid: "" },
} as const;

export type SiteConfig = typeof siteConfig;
