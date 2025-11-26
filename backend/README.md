# Ez2Study AI Platform Backend

一个类似 Dify.ai 的工作流可视化开发平台后端系统。

## 功能特性

- 🔄 **工作流引擎**: 可视化工作流设计和执行
- 🤖 **AI 模型集成**: 支持多个 AI 模型供应商（OpenAI, Anthropic, Cohere 等）
- 📝 **提示词管理**: 提示词模板创建、版本管理
- 🔗 **节点系统**: 可扩展的节点类型（LLM、条件、循环、工具调用等）
- 🎯 **智能体构建**: 通过语言化描述构建完整智能体
- 📊 **执行监控**: 工作流执行历史和性能分析

## 技术栈

- **框架**: FastAPI (异步高性能)
- **数据库**: PostgreSQL + SQLAlchemy (ORM)
- **缓存**: Redis
- **任务队列**: Celery
- **认证**: JWT
- **AI SDK**: OpenAI, Anthropic, Cohere 等官方 SDK

## 快速开始

### 1. 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的配置
```

### 3. 初始化数据库

```bash
alembic upgrade head
```

### 4. 启动服务

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

访问 http://localhost:8000/docs 查看 API 文档

## 项目结构

```
backend/
├── app/
│   ├── api/
│   │   └── v1/           # API 路由
│   │       ├── workflows.py
│   │       ├── nodes.py
│   │       ├── agents.py
│   │       └── providers.py
│   ├── core/             # 核心配置
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── models/           # 数据库模型
│   │   ├── workflow.py
│   │   ├── node.py
│   │   └── execution.py
│   ├── schemas/          # Pydantic 模型
│   │   └── workflow.py
│   ├── services/         # 业务逻辑
│   │   ├── workflow_engine.py
│   │   ├── ai_providers.py
│   │   └── prompt_manager.py
│   └── utils/            # 工具函数
├── tests/                # 测试
├── alembic/              # 数据库迁移
├── requirements.txt
└── README.md
```

## API 端点

### 工作流管理
- `POST /api/v1/workflows` - 创建工作流
- `GET /api/v1/workflows` - 获取工作流列表
- `GET /api/v1/workflows/{id}` - 获取工作流详情
- `PUT /api/v1/workflows/{id}` - 更新工作流
- `DELETE /api/v1/workflows/{id}` - 删除工作流

### 工作流执行
- `POST /api/v1/workflows/{id}/execute` - 执行工作流
- `GET /api/v1/workflows/{id}/executions` - 获取执行历史

### 节点管理
- `GET /api/v1/nodes/types` - 获取所有节点类型
- `POST /api/v1/nodes` - 创建自定义节点

### AI 模型供应商
- `GET /api/v1/providers` - 获取支持的模型供应商
- `POST /api/v1/providers/test` - 测试模型连接

## 开发指南

详见文档...

