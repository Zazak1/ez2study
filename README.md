# Ez2Study - AI 智能学习平台

一个集成了工作流可视化开发平台的 AI 智能学习系统，类似于 Dify.ai 的架构设计。

## 📋 项目概览

Ez2Study 是一个现代化的 AI 驱动学习平台，包含：
- 🎨 **现代化前端界面**：基于 React + Tailwind CSS 的响应式设计
- 🔄 **工作流可视化开发**：类似 Dify.ai 的可视化工作流编辑器
- 🤖 **智能体构建**：通过语言化描述和提示词构建完整智能体
- 🔌 **多模型支持**：支持 OpenAI、Anthropic、Cohere 等多个 AI 供应商
- 📝 **提示词管理**：强大的提示词模板系统

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────┐
│         前端 (React + Vite)                  │
│   - 登录注册页面                             │
│   - 可视化工作流编辑器                        │
│   - 智能体管理界面                           │
│   - 提示词模板管理                           │
└──────────────┬──────────────────────────────┘
               │ REST API
┌──────────────▼──────────────────────────────┐
│         后端 (FastAPI)                       │
│   - 工作流引擎                               │
│   - AI 模型集成                              │
│   - 提示词渲染器                             │
│   - 执行历史追踪                             │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│    数据层 (PostgreSQL + Redis)               │
│   - 工作流定义存储                           │
│   - 执行记录存储                             │
│   - 缓存和队列                               │
└─────────────────────────────────────────────┘
```

## 🚀 快速开始

### 前端

```bash
cd web
npm install
npm run dev
```

访问: http://localhost:5173

### 后端

#### 使用 Docker Compose（推荐）

```bash
cd backend
docker-compose up -d
```

#### 手动部署

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# 编辑 .env 配置文件
alembic upgrade head
uvicorn app.main:app --reload
```

访问 API 文档: http://localhost:8000/docs

## 📚 文档

- [后端架构文档](backend/ARCHITECTURE.md)
- [快速开始指南](backend/QUICKSTART.md)
- [前端 README](web/README.md)
- [后端 README](backend/README.md)

## ✨ 主要功能

### 1. 工作流可视化开发

- 拖拽式节点编辑器
- 支持多种节点类型：
  - 🎯 LLM 模型节点
  - 📝 提示词节点
  - 🔀 条件判断节点
  - 🔁 循环节点
  - 🌐 HTTP 请求节点
  - 💻 代码执行节点
  - 🔧 工具调用节点
- 实时执行和调试
- 执行历史追踪

### 2. AI 模型集成

支持多个 AI 模型供应商：
- **OpenAI**: GPT-3.5, GPT-4
- **Anthropic**: Claude 3 (Opus, Sonnet, Haiku)
- **Cohere**: Command 系列

统一的 API 接口，轻松切换模型。

### 3. 智能体系统

- 通过自然语言描述创建智能体
- 关联工作流实现复杂逻辑
- 对话式交互界面
- 可配置的系统提示词

### 4. 提示词模板管理

- 创建可复用的提示词模板
- 支持变量插值
- 版本控制
- 使用统计

## 🎨 前端技术栈

- **框架**: React 18
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router v6
- **动画**: Framer Motion
- **图标**: Lucide React

## 🔧 后端技术栈

- **框架**: FastAPI
- **数据库**: PostgreSQL
- **ORM**: SQLAlchemy (Async)
- **缓存**: Redis
- **迁移**: Alembic
- **AI SDK**: OpenAI, Anthropic, Cohere

## 📦 项目结构

```
.
├── web/                    # 前端项目
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── pages/         # 页面组件
│   │   └── index.css      # 全局样式
│   └── package.json
│
├── backend/               # 后端项目
│   ├── app/
│   │   ├── api/          # API 路由
│   │   ├── core/         # 核心配置
│   │   ├── models/       # 数据库模型
│   │   ├── schemas/      # Pydantic 模型
│   │   ├── services/     # 业务逻辑
│   │   └── main.py       # 应用入口
│   ├── alembic/          # 数据库迁移
│   ├── requirements.txt
│   └── docker-compose.yml
│
└── README.md
```

## 🔑 环境变量配置

### 后端 `.env` 示例

```env
# 数据库
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/ez2study_db

# Redis
REDIS_URL=redis://localhost:6379/0

# AI 供应商
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
COHERE_API_KEY=...

# JWT
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key

# CORS
BACKEND_CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 🌟 核心特性

### 工作流引擎

- ✅ DAG（有向无环图）执行
- ✅ 异步执行支持
- ✅ 变量上下文管理
- ✅ 错误处理和重试
- ✅ 执行历史记录
- ✅ 性能监控

### AI 供应商管理

- ✅ 统一的接口抽象
- ✅ 多供应商支持
- ✅ 自动格式转换
- ✅ 使用量统计
- ✅ 连接测试

### 提示词系统

- ✅ 模板创建和管理
- ✅ 变量插值
- ✅ 版本控制
- ✅ 使用统计
- ✅ 公开/私有模式

## 🛣️ 开发路线图

- [x] 基础架构搭建
- [x] 工作流引擎实现
- [x] AI 模型集成
- [x] 提示词管理
- [x] RESTful API
- [ ] 用户认证和授权
- [ ] 可视化工作流编辑器（前端）
- [ ] WebSocket 实时通信
- [ ] 工作流模板市场
- [ ] 团队协作功能
- [ ] 监控和分析面板

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📄 许可证

Apache-2.0

## 👥 团队

Ez2Study Team

---

**注意**: 这是一个学习和研究项目。在生产环境使用前，请确保：
1. 配置强密钥和密码
2. 实现完整的认证授权系统
3. 添加速率限制
4. 使用代码执行沙箱
5. 进行安全审计
