# CodeIsle · 代码之屿

个人技术站点：Markdown 博客、纯前端开发工具、AI 航路图。

- 仓库：[ltian-code/ltian-code.github.io](https://github.com/ltian-code/ltian-code.github.io)
- 站点：[https://ltian-code.github.io/](https://ltian-code.github.io/)（推送后需把 Pages Source 设为 GitHub Actions）
- 栈：Nuxt 4 · Vue 3 · Tailwind CSS · Less · Pinia

当前是阶段 4：静态生成 + Actions 发布。博客、十个工具、AI 导航都可在本地打开。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。需要 Node **≥ 22.5**。

## 静态产出

```bash
npm run generate
```

产物在 `.output/public`。GitHub Actions 会在推送 `main` 后执行同样的命令并部署 Pages。

仓库 Settings → Pages → **Source = GitHub Actions**。不要把 `main` 源码直接当作网站根目录。

## 订阅

- RSS：`/rss.xml`
- Sitemap：`/sitemap.xml`

文章评论用 Giscus（GitHub Discussions）。打开仓库 Discussions 后，到 [giscus.app](https://giscus.app) 取 `categoryId`，填进 `app/app.config.ts`。
