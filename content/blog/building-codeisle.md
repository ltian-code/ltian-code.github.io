---
title: 本岛搭建笔记：Nuxt 4 与 GitHub Pages
description: CodeIsle 阶段 0–1 的取舍：锁 Nuxt 4、User Site、先不要打开 Pages，以及用 Markdown 写博客。
date: 2026-08-17
tags:
  - CodeIsle
  - Nuxt
  - GitHub Pages
draft: false
---

这篇记下 CodeIsle 从空脚手架到「能写文章」的决定，方便以后的自己（和 Agent）对上上下文。

## 仓库：User Site

GitHub 用仓库名决定网址。本仓是 `ltian-code.github.io`，上线后是站点根路径：

```txt
https://ltian-code.github.io/
```

Nuxt `baseURL` 保持 `/`。如果做成 Project Site（例如 `user.github.io/codeisle/`），静态资源路径必须带仓库名前缀，漏配会整站 404。

## 现在不要打开 Pages

`main` 里是源码，不是 `nuxt generate` 的产物。现在到仓库 Settings → Pages 里选 branch 部署，访问只会看到 404。等 Actions 跑通 `generate` 再开，Source 选 GitHub Actions。

## 博客怎么写

文章是 Markdown，放在 `content/blog/`。frontmatter 最少要有标题、日期、摘要：

```yaml
title: 一篇笔记
description: 一句话说明。
date: 2026-08-17
tags:
  - Nuxt
draft: false
```

`draft: true` 的文件不会出现在列表里。常用字段：`title`、`description`、`date`、`tags`、`draft`。

## 阶段切法

| 阶段 | 目标 |
| --- | --- |
| 0 | 壳、导航、主题 |
| 1 | 写 md 就能在 `/blog` 看到（本文所在） |
| 2 | 五个纯前端工具 |
| 3 | AI 导航 |
| 4 | Pages 真正上线 |

工具逻辑会从 MIT 开源项目摘函数，界面按本岛重做，不整仓拷贝。
