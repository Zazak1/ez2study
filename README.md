# Ez2Study Web Experience

Ez2Study 目前聚焦于一个高质感的 **React + Vite** 前端体验，包含官网落地页、登录/注册流程以及完整的 UI 组件体系。原本的工作流后端已被移除，新的服务端会在后续迭代中重建；本仓库现阶段专注于前端交互、视觉语言与部署脚手架。

## ✨ 功能速览

- **沉浸式官网**：Hero、特性、关于与联系模块，采用珠光白 + 流体光斑设计。
- **认证体验**：登录/注册表单、状态提示与交互吉祥物，预留与后端 API 对接的接口。
- **组件库**：导航、脚注、动画背景、Mascot 等模块化组件，可在其他页面复用。
- **API 客户端封装**：`src/api/client.js` 内置 Axios 实例与认证 API，方便日后与真实后端联调。

## 🧱 技术栈

| 类别 | 技术 | 说明 |
| --- | --- | --- |
| 框架 | React 18 | 函数组件 + Hooks |
| 构建 | Vite 5 | 极速开发体验、内置 HMR |
| 样式 | Tailwind CSS 3 | 语义化原子类 + 自定义主题 |
| 动画 | Framer Motion | Mascot、光斑等动画控制 |
| 路由 | React Router 6 | SPA 路由配置 |
| 工具 | axios, clsx, lucide-react | API、类名合并、图标库 |

## 📂 目录结构

```
.
├── docs/                     # 文档（启动、状态、SSH 等）
├── web/
│   ├── public/               # 静态资源
│   ├── src/
│   │   ├── api/              # Axios 封装
│   │   ├── components/       # UI 组件
│   │   ├── pages/            # 页面（Home/Auth/Login/Register）
│   │   ├── App.jsx           # 路由入口
│   │   └── main.jsx          # 渲染入口
│   ├── tailwind.config.js    # 主题扩展
│   └── vite.config.js        # Vite 配置
├── README.md
└── LICENSE
```

> 历史上的 `backend/` 目录已被移除；未来如需重建，可在此结构基础上新增 `api/` 或 `services/` 目录，并在文档中同步说明。

## 🚀 本地开发

```bash
cd web
npm install
npm run dev
# 默认 http://localhost:5173
```

### 构建产物

```bash
npm run build
# 产物输出至 web/dist，可直接部署到任意静态托管服务
```

### 与后端联调

- `src/api/client.js` 默认指向 `http://localhost:8000/api/v1`，可在开发阶段修改为实际接口地址。
- 登录/注册请求会在成功后将 `access_token` 缓存到 `localStorage`，便于后续页面读取。
- 若暂未有后端，可在 `authApi` 内部注入 mock 逻辑或使用 MSW 进行本地模拟。

## 📚 文档中心

| 文档 | 说明 |
| --- | --- |
| [`docs/STARTUP.md`](docs/STARTUP.md) | 本地开发、构建与部署指引（前端为主，预留后端对接位） |
| [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) | 当前范围、已完成功能与下一步计划 |
| [`docs/GITHUB_SSH.md`](docs/GITHUB_SSH.md) | 生成并配置 GitHub SSH 密钥的步骤 |

## 🗂️ 下一步规划

1. **后端重建**：基于 FastAPI/Express 等方案补齐认证、工作流 API。
2. **工作流界面**：在现有 UI 基础上扩展画布、节点等交互。
3. **部署方案**：引入 CI/CD（GitHub Actions + Vercel 或自建服务器 rsync 流程）。

## 🤝 贡献

欢迎通过 Pull Request / Issue 提交想法与改进建议。提交前请确保：
- 代码通过 `npm run build`
- 文档、注释与 UI 文案同步更新

## 📄 许可证

本项目使用 [Apache-2.0](LICENSE) 许可证。

---

如需进一步了解部署、SSH、或未来后端规划，请参阅 `/docs` 目录。EOF