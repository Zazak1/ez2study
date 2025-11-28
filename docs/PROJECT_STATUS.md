# Ez2Study 项目状态概览

> 更新时间：2025-11-26

## 1. 当前范围

- ✅ **聚焦前端体验**：落地页、登录、注册、组件库与 API 客户端
- ⏳ **后端暂缺**：原 FastAPI 工作流服务已移除，后续将以全新架构重新引入
- 🧩 **文档体系**：README + docs/ 下的专题文档（启动、部署、SSH）

## 2. 已完成功能

### 前端
- 珠光白主题 UI、响应式布局
- 导航、Hero、Features、About、Contact、Footer 等模块
- 登录/注册页面 + 动画吉祥物 + 状态提示
- Axios API 客户端，包含登录、注册、`/me` 请求
- Vite + Tailwind + Framer Motion 工程化配置

### 工具 & 配置
- SSH 密钥生成脚本与文档（`docs/GITHUB_SSH.md`）
- 项目启动指南（`docs/STARTUP.md`）
- npm 脚本、Tailwind 主题、自定义 CSS 变量

## 3. 待办与规划

| 优先级 | 事项 | 说明 |
| --- | --- | --- |
| ⭐️ | 重建后端服务 | 重新设计认证、工作流、提示词等 API，并与前端联调 |
| ⭐️ | 部署自动化 | 引入 CI/CD（GitHub Actions + Vercel/服务器 rsync） |
| ⭐️ | 状态管理优化 | 引入 Zustand/Redux 以支撑更多页面状态 |
| ⭐️ | 安全机制 | 调整 Token 存储策略、加入 CSRF/速率限制、校验逻辑 |
| ⭐️ | 可视化工作流 | 在前端实现节点画布、连接、保存逻辑 |
| ⭐️ | 国际化 | 使用 i18n 库对文案进行抽离 |

## 4. 文件组织

```
.
├── docs/
│   ├── PROJECT_STATUS.md   # 本文档
│   ├── STARTUP.md          # 启动/部署指南
│   └── GITHUB_SSH.md       # SSH 指南
├── web/                    # 前端项目
│   ├── src/api/            # Axios 客户端
│   ├── src/components/     # UI 组件
│   ├── src/pages/          # 页面
│   └── package.json
└── README.md               # 项目介绍（前端为主）
```

> 未来如果重新引入后端，可在此处记录新的目录结构，并链接至对应文档。

## 5. 部署建议

| 场景 | 建议方案 |
| --- | --- |
| 纯静态前端 | Vercel / Netlify / GitHub Pages / OSS |
| 自建服务器 | Nginx + `npm run build` 产物 + `try_files` 配置 |
| 实时同步 | `fswatch + rsync` 或 VS Code Remote SSH |
| 完整 CI/CD | GitHub Actions → 构建 → scp/rsync 部署 → 重载 Nginx |

详细部署脚本与方案会在后端/CI 准备就绪后追加到 `docs/`。

## 6. 里程碑

| 里程碑 | 状态 | 备注 |
| --- | --- | --- |
| 初版官网 + 认证页 | ✅ 完成 | 已上线到本地环境 | 
| 文档重构 | ✅ 完成 | README & docs 目录已更新 |
| SSH/部署准备 | ✅ 完成 | 新密钥及说明文档 |
| 后端重建 | ⏳ 规划中 | 需要重新定义数据模型与 API |
| 工作流编辑器 | ⏳ 规划中 | 待后端和数据结构确定 |

## 7. 协作提醒

- **更新文档**：新增功能或调整目录时，请同步 `README.md` 与 `docs/` 相应文件。
- **提交规范**：推荐遵循 `type(scope): description` 的提交格式，如 `feat(auth): add login error state`。
- **设计资源**：颜色、阴影、动画参数集中在 Tailwind & `index.css`，请统一修改。
- **后端接口**：在尚未重建前，请谨慎修改 API 客户端以免引入耦合。

---

若需了解更多细节，请查阅 `docs/STARTUP.md`（启动流程）与 `README.md`（整体介绍）。EOF