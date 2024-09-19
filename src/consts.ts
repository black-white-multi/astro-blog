import type { Metadata, Site } from "@types";

export const SITE: Site = {
  TITLE: "BlackWhtie",
  DESCRIPTION: "黑白多工作室",
  EMAIL: "sprite2345@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 2,
  NUM_PUBLICATIONS_ON_HOMEPAGE: 3,
  SITEURL: 'https://www.blackwhite.fun' // Update here to link the RSS icon to your website rss
};

export const HIGHLIGHTAUTHOR = "BlackWhtie"

export const HOME: Metadata = {
  TITLE: "主页",
  DESCRIPTION: "Astro Micro is an accessible theme for Astro.",
};

export const BLOG: Metadata = {
  TITLE: "博客",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const RESEARCH: Metadata = {
  TITLE: "Publications",
  DESCRIPTION:
    "A collection of my publications with links to paper, repositories and live demos.",
};

export const CV: Metadata = {
  TITLE: "CV",
  DESCRIPTION:
    "your cv",
};

export const TAGS: Metadata = {
  TITLE: "TAGS",
  DESCRIPTION:
    "blog tag filter",
};

export const ABOUT: Metadata = {
  TITLE: "关于",
  DESCRIPTION:
    "A self-intro",
};