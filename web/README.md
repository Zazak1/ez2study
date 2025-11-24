# Ez2Study Web Frontend

<div align="center">
  <img src="../web/public/favicon.svg" width="100" height="100" alt="Logo">
  <h3>Modern, Interactive, Intelligent.</h3>
</div>

这是 Ez2Study 的 Web 前端项目，基于 **React 18**、**Vite** 和 **Tailwind CSS** 构建。我们采用了全新的**珠光白 (Pearl White)** 设计语言，致力于提供极致流畅和愉悦的用户体验。

## ✨ 特性概览

- **🎨 珠光白极简设计**：
  - 摒弃了沉重的暗黑风格，采用清透的白色与柔和的蓝紫渐变。
  - **玻璃拟态 (Glassmorphism)** 卡片，配合细腻的阴影处理，营造悬浮感。
  - **流体光斑背景**：鼠标移动时，淡雅的彩色光晕会随之流动，增加页面的生命力。

- **🤖 交互式吉祥物**：
  - 在登录/注册页面引入了 SVG 动画机器人。
  - 具备 **Idle (闲置)**、**Focus (聚焦)** 和 **Blind (捂眼)** 三种状态，与用户输入实时互动。

- **⚡️ 极致性能**：
  - 基于 Vite 构建，秒级冷启动。
  - 组件懒加载与代码分割。

## 🛠️ 技术栈详情

| 类别 | 技术 | 说明 |
| --- | --- | --- |
| **框架** | React 18 | 用于构建用户界面的 JavaScript 库 |
| **构建工具** | Vite | 下一代前端工具链，极速 HMR |
| **样式** | Tailwind CSS | 原子化 CSS 框架，高效构建定制设计 |
| **动画** | Framer Motion | 生产级动画库，处理复杂的 SVG 和布局动画 |
| **路由** | React Router 6 | 声明式路由管理 |
| **图标** | Lucide React | 统一、美观的 SVG 图标库 |

## 📂 目录结构说明

```
web/
├── src/
│   ├── components/
│   │   ├── AuthMascot.jsx    # 交互式吉祥物组件 (SVG动画核心)
│   │   ├── MouseSpotlight.jsx # 鼠标跟随光斑特效
│   │   ├── Navbar.jsx        # 响应式导航栏
│   │   ├── Hero.jsx          # 首页首屏展示
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx          # 落地页 (Landing Page)
│   │   └── Auth.jsx          # 认证页 (登录/注册)
│   ├── index.css             # 全局样式 & Tailwind 指令
│   ├── App.jsx               # 根组件 & 路由配置
│   └── main.jsx              # 入口文件
├── public/                   # 静态资源
├── tailwind.config.js        # Tailwind 主题配置 (色彩/字体/阴影)
└── vite.config.js            # Vite 配置
```

## 🔧 开发与调试

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
默认运行在 `http://localhost:5173`。

### 3. 样式定制
所有的颜色变量和主题配置都集中在 `tailwind.config.js` 中。如果您想调整配色：
- 修改 `theme.extend.colors` 下的 `primary`, `secondary`, `accent` 对象。
- `bg-light-bg` 和 `text-text-main` 等语义化类名在 `index.css` 中定义。

## 🧩 主要组件解析

### `AuthMascot.jsx`
这是一个纯 SVG 组件，使用 Framer Motion 控制动画。
- 接收 `mood` prop (`'idle' | 'focused' | 'blind'`)。
- 通过 `variants` 定义不同情绪下的眼睛形状、手臂位置和头部旋转角度。

### `MouseSpotlight.jsx`
使用 `useMotionValue` 和 `useSpring` 追踪鼠标位置，创建一个大范围的模糊圆形渐变层 (`mix-blend-multiply`)，实现柔和的背景光效。

## 📄 License

Apache-2.0
