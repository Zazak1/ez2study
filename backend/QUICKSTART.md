# Ez2Study AI Platform 快速开始指南

## 前提条件

- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose（可选）

## 方法一：Docker Compose 部署（推荐）

### 1. 启动所有服务

```bash
cd backend
docker-compose up -d
```

这将启动：
- PostgreSQL 数据库（端口 5432）
- Redis 缓存（端口 6379）
- 后端 API 服务（端口 8000）

### 2. 检查服务状态

```bash
docker-compose ps
```

### 3. 访问 API 文档

打开浏览器访问：http://localhost:8000/docs

## 方法二：手动部署

### 1. 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 2. 启动 PostgreSQL 和 Redis

使用 Docker：
```bash
# PostgreSQL
docker run -d \
  --name ez2study_postgres \
  -e POSTGRES_USER=ez2study \
  -e POSTGRES_PASSWORD=ez2study_pass \
  -e POSTGRES_DB=ez2study_db \
  -p 5432:5432 \
  postgres:15-alpine

# Redis
docker run -d \
  --name ez2study_redis \
  -p 6379:6379 \
  redis:7-alpine
```

### 3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入以下配置：

```env
# 数据库
DATABASE_URL=postgresql+asyncpg://ez2study:ez2study_pass@localhost:5432/ez2study_db

# Redis
REDIS_URL=redis://localhost:6379/0

# AI 供应商（至少配置一个）
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
COHERE_API_KEY=...

# JWT 密钥（生产环境请使用强密钥）
SECRET_KEY=your-super-secret-key-change-in-production
JWT_SECRET_KEY=your-jwt-secret-key
```

### 4. 初始化数据库

```bash
alembic upgrade head
```

### 5. 启动后端服务

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 测试 API

### 1. 访问 API 文档

打开浏览器访问：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 2. 健康检查

```bash
curl http://localhost:8000/health
```

### 3. 创建一个简单的工作流

```bash
curl -X POST "http://localhost:8000/api/v1/workflows" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "我的第一个工作流",
    "description": "测试工作流",
    "nodes": [
      {
        "node_id": "start-1",
        "type": "start",
        "name": "开始",
        "position_x": 100,
        "position_y": 100,
        "config": {}
      },
      {
        "node_id": "llm-1",
        "type": "llm",
        "name": "AI 生成",
        "position_x": 300,
        "position_y": 100,
        "config": {
          "provider": "openai",
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              "role": "user",
              "content": "{{input.message}}"
            }
          ]
        }
      },
      {
        "node_id": "end-1",
        "type": "end",
        "name": "结束",
        "position_x": 500,
        "position_y": 100,
        "config": {}
      }
    ],
    "edges": [
      {
        "edge_id": "edge-1",
        "source_node_id": "start-1",
        "target_node_id": "llm-1"
      },
      {
        "edge_id": "edge-2",
        "source_node_id": "llm-1",
        "target_node_id": "end-1"
      }
    ]
  }'
```

### 4. 执行工作流

```bash
# 将返回的工作流 ID 替换到 {workflow_id}
curl -X POST "http://localhost:8000/api/v1/workflows/{workflow_id}/execute" \
  -H "Content-Type: application/json" \
  -d '{
    "input_data": {
      "message": "你好，请介绍一下人工智能"
    }
  }'
```

### 5. 测试 AI 供应商

```bash
curl -X POST "http://localhost:8000/api/v1/providers/test" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "openai",
    "model": "gpt-3.5-turbo",
    "prompt": "Hello, how are you?"
  }'
```

## 示例：创建提示词模板

```bash
curl -X POST "http://localhost:8000/api/v1/prompts" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "代码生成助手",
    "description": "生成指定语言的代码",
    "content": "请使用 {{language}} 编写一个程序，实现以下功能：\n{{requirement}}",
    "variables": [
      {
        "name": "language",
        "type": "string",
        "required": true,
        "description": "编程语言"
      },
      {
        "name": "requirement",
        "type": "string",
        "required": true,
        "description": "功能需求"
      }
    ]
  }'
```

## 示例：创建智能体

```bash
curl -X POST "http://localhost:8000/api/v1/agents" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "代码助手",
    "description": "帮助用户编写和解释代码",
    "system_prompt": "你是一个专业的编程助手，精通多种编程语言。",
    "config": {
      "provider": "openai",
      "model": "gpt-4"
    }
  }'
```

## 常见问题

### 1. 数据库连接失败

检查 PostgreSQL 是否正在运行：
```bash
docker ps | grep postgres
```

### 2. Redis 连接失败

检查 Redis 是否正在运行：
```bash
docker ps | grep redis
```

### 3. AI API 调用失败

确保在 `.env` 文件中配置了正确的 API 密钥。

### 4. 端口被占用

如果 8000 端口被占用，可以修改启动命令：
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

## 下一步

1. 查看 [架构文档](ARCHITECTURE.md) 了解系统设计
2. 查看 [API 文档](http://localhost:8000/docs) 学习所有端点
3. 在前端可视化编辑器中设计工作流
4. 集成更多 AI 模型供应商
5. 添加认证和权限控制

## 停止服务

### Docker Compose

```bash
docker-compose down
```

### 手动部署

按 `Ctrl+C` 停止 uvicorn 进程，然后停止数据库：

```bash
docker stop ez2study_postgres ez2study_redis
```

