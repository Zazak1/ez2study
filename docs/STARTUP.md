# Ez2Study 启动与部署指南

本文档聚焦 **web 前端** 的开发、构建与部署流程，并为后续接入后端 API 预留扩展位。

## 1. 开发环境

| 依赖 | 建议版本 | 说明 |
| --- | --- | --- |
| Node.js | 18 LTS+ | 推荐使用 `nvm` 管理版本 |
| npm / pnpm | npm 10+ | 本项目默认使用 npm，可按需切换 |
| Git | 2.30+ | 代码管理与同步 |
| 可选：Docker | 24+ | 未来接入后端或容器部署时使用 |

```bash
# 安装依赖
yarn # 亦可 npm install，但仓库默认 npm install

# 启动开发服务器
npm run dev
# 默认端口 http://localhost:5173 （被占用时 Vite 会提示切换）
```

> 首次运行若提示端口被占用，可手动指定：`npm run dev -- --port 5174`

## 2. 项目配置

### 2.1 API Base URL

前端通过 `src/api/client.js` 访问后端：
```ts
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1',
});
```

- **本地联调**：将后端启动在 `8000` 端口即可。
- **无后端时**：可在该文件中直接 return mock 数据，或使用 MSW/Mock Service Worker。
- **生产环境**：在构建前设置 `.env.production`，例如：
  ```env
  VITE_API_BASE=https://api.ez2study.com/api/v1
  ```

### 2.2 样式主题

`src/index.css` 与 `tailwind.config.js` 中维护了一套语义化颜色变量：
- `bg-light-bg`
- `text-text-main`
- `primary-xxx`

如需调整品牌色，只需修改 Tailwind 配置并重新构建。

## 3. 构建与产物

```bash
npm run build
# 产物输出：web/dist
```

常见部署方式：
- Vercel / Netlify（推送即部署）
- Nginx 静态托管（将 dist 内容上传至服务器）
- 对象存储（OSS/COS/S3）开启静态网站托管

详见 [docs/PROJECT_STATUS.md](./PROJECT_STATUS.md) 中的“部署计划”章节。

## 4. 与服务器同步开发（可选）

如果需要边写代码边同步到远程服务器，推荐：

1. **fswatch + rsync**
   ```bash
   fswatch -o ./web | xargs -n1 -I{} rsync -avz --exclude 'node_modules' ./web/ user@server:/var/www/ez2study/web/
   ```

2. **Git + 自动拉取脚本**
   - 本地提交并推送到 `develop` 分支
   - 服务器编写 `post-receive` 钩子或 GitHub Actions 自动拉取并执行 `npm run build`

3. **VS Code Remote SSH**
   - 通过 Remote SSH 直接在服务器上开发，适合低延迟或需要实时查看效果的场景

> 公钥生成与配置见 [docs/GITHUB_SSH.md](./GITHUB_SSH.md)。

## 5. 接入后端的推荐步骤

1. **明确接口协议**：约定 `/auth/login`, `/auth/register`, `/auth/me` 等端点。
2. **更新 Axios Base URL**：指向新后端地址。
3. **处理 CORS**：确保后端允许前端域名跨域访问。
4. **JWT 存储策略**：当前默认写入 `localStorage`，可根据安全策略改为 HttpOnly Cookie。
5. **错误提示**：`Login.jsx` / `Register.jsx` 已内置错误 UI，只需后端返回 `{ "detail": "错误信息" }` 即可展示。

## 6. 常见问题

| 问题 | 解决方案 |
| --- | --- |
| Vite 启动缓慢或报错 | 清理 `node_modules` 并重新安装依赖；检查 Node 版本 |
| Tailwind 类名未生效 | 确保文件位于 `tailwind.config.js` 的 `content` 数组匹配范围内 |
| 构建后白屏 | 检查部署环境是否包含正确的 `index.html` 与 `assets/` 目录；确保服务器启用了 SPA fallback（例如 Nginx `try_files $uri /index.html;`） |
| 登录跳转异常 | 确认后端返回 `access_token`，并检查 `localStorage` 是否被浏览器策略拦截 |

## 7. 下一步

- 当新的后端准备就绪，在 `docs/PROJECT_STATUS.md` 中同步接口清单及联调说明。
- 若要新增页面/模块，请在 `README.md` 与 `docs/PROJECT_STATUS.md` 中补充介绍，保持信息一致。

如有新的环境或部署方式，欢迎补充本指南。EOF