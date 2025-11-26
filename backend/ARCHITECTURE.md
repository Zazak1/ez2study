# Ez2Study AI Platform 后端架构文档

## 系统架构概览

Ez2Study 是一个类似 Dify.ai 的工作流可视化开发平台，采用现代化的微服务架构设计。

```
┌─────────────────────────────────────────────────────────┐
│                     前端 (React)                         │
│            可视化工作流编辑器 + 管理界面                  │
└────────────────────┬────────────────────────────────────┘
                     │ REST API / WebSocket
┌────────────────────▼────────────────────────────────────┐
│                  后端 API 层 (FastAPI)                   │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ 工作流管理    │  │  智能体管理   │  │ 提示词管理    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│                   业务逻辑层                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ 工作流引擎    │  │ AI供应商集成 │  │ 提示词渲染器  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    数据访问层                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  PostgreSQL  │  │    Redis     │  │   Celery     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  外部 AI 服务                            │
│     OpenAI  │  Anthropic  │  Cohere  │  其他...        │
└─────────────────────────────────────────────────────────┘
```

## 核心模块

### 1. 工作流引擎 (Workflow Engine)

**职责：**
- 解析工作流定义（节点和边）
- 执行工作流逻辑
- 管理执行上下文和变量
- 处理节点间的数据流转

**核心特性：**
- 支持多种节点类型（LLM、条件、循环、HTTP、代码等）
- DAG（有向无环图）执行
- 异步执行支持
- 错误处理和重试机制

**文件位置：** `app/services/workflow_engine.py`

### 2. AI 供应商集成 (AI Providers)

**职责：**
- 统一的 AI 模型调用接口
- 支持多个 AI 供应商
- 请求/响应格式标准化

**支持的供应商：**
- OpenAI (GPT-3.5, GPT-4)
- Anthropic (Claude 3)
- Cohere (Command)
- 可扩展到更多供应商

**文件位置：** `app/services/ai_providers.py`

### 3. 提示词管理 (Prompt Manager)

**职责：**
- 提示词模板的 CRUD 操作
- 变量插值和渲染
- 版本管理
- 使用统计

**文件位置：** `app/services/prompt_manager.py`

## 数据模型

### 核心实体

#### 1. Workflow（工作流）
```python
- id: 工作流唯一标识
- name: 工作流名称
- description: 描述
- status: 状态（draft/published/archived）
- config: 配置（JSON）
- nodes: 关联的节点列表
- edges: 关联的连接边列表
```

#### 2. WorkflowNode（工作流节点）
```python
- id: 节点数据库ID
- node_id: 节点前端ID
- type: 节点类型（start/end/llm/prompt/condition等）
- name: 节点名称
- config: 节点配置（JSON）
- position_x, position_y: 画布位置
```

#### 3. WorkflowEdge（工作流连接边）
```python
- id: 边数据库ID
- edge_id: 边前端ID
- source_node_id: 源节点ID
- target_node_id: 目标节点ID
- config: 边配置（条件、标签等）
```

#### 4. WorkflowExecution（工作流执行记录）
```python
- id: 执行ID
- workflow_id: 关联的工作流
- status: 执行状态（pending/running/success/failed）
- input_data: 输入数据
- output_data: 输出数据
- duration: 执行时长
```

## 节点类型

### 1. 开始节点 (START)
- 工作流的入口点
- 接收初始输入数据

### 2. 结束节点 (END)
- 工作流的出口点
- 返回最终输出数据

### 3. LLM 节点 (LLM)
- 调用 AI 模型
- 配置：provider, model, temperature, max_tokens
- 支持消息历史和系统提示词

### 4. 提示词节点 (PROMPT)
- 渲染提示词模板
- 支持变量插值

### 5. 条件节点 (CONDITION)
- 条件判断
- 支持多种运算符（==, !=, >, <, contains等）

### 6. 循环节点 (LOOP)
- 循环执行子流程
- 支持遍历数组

### 7. 代码节点 (CODE)
- 执行自定义 Python 代码
- 沙箱环境（生产环境需要）

### 8. HTTP 节点 (HTTP)
- 发送 HTTP 请求
- 支持 GET/POST/PUT/DELETE

### 9. 工具节点 (TOOL)
- 调用外部工具和API
- 可扩展

### 10. 变量节点 (VARIABLE)
- 设置和管理变量
- 数据转换

## API 端点

### 工作流管理
- `POST /api/v1/workflows` - 创建工作流
- `GET /api/v1/workflows` - 获取工作流列表
- `GET /api/v1/workflows/{id}` - 获取工作流详情
- `PUT /api/v1/workflows/{id}` - 更新工作流
- `DELETE /api/v1/workflows/{id}` - 删除工作流
- `POST /api/v1/workflows/{id}/execute` - 执行工作流
- `GET /api/v1/workflows/{id}/executions` - 获取执行历史

### 智能体管理
- `POST /api/v1/agents` - 创建智能体
- `GET /api/v1/agents` - 获取智能体列表
- `GET /api/v1/agents/{id}` - 获取智能体详情
- `PUT /api/v1/agents/{id}` - 更新智能体
- `DELETE /api/v1/agents/{id}` - 删除智能体
- `POST /api/v1/agents/{id}/chat` - 与智能体对话

### 提示词管理
- `POST /api/v1/prompts` - 创建提示词模板
- `GET /api/v1/prompts` - 获取提示词列表
- `GET /api/v1/prompts/{id}` - 获取提示词详情
- `PUT /api/v1/prompts/{id}` - 更新提示词
- `DELETE /api/v1/prompts/{id}` - 删除提示词
- `POST /api/v1/prompts/render` - 渲染提示词

### AI 供应商
- `GET /api/v1/providers` - 获取支持的供应商列表
- `POST /api/v1/providers/test` - 测试供应商连接
- `GET /api/v1/providers/{name}/models` - 获取模型列表

## 技术栈

### 核心框架
- **FastAPI**: 现代、高性能的 Web 框架
- **SQLAlchemy**: ORM 和数据库抽象层
- **Alembic**: 数据库迁移工具
- **Pydantic**: 数据验证和设置管理

### 数据存储
- **PostgreSQL**: 主数据库
- **Redis**: 缓存和任务队列

### AI/ML
- **OpenAI SDK**: GPT 系列模型
- **Anthropic SDK**: Claude 系列模型
- **Cohere SDK**: Command 系列模型

### 异步处理
- **asyncio**: Python 异步编程
- **Celery**: 分布式任务队列（可选）

## 部署

### Docker Compose 部署

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 手动部署

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 3. 初始化数据库
alembic upgrade head

# 4. 启动服务
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 扩展指南

### 添加新的节点类型

1. 在 `app/models/workflow.py` 的 `NodeType` 枚举中添加新类型
2. 在 `app/services/workflow_engine.py` 的 `_execute_node` 方法中添加处理逻辑
3. 实现具体的执行方法（如 `_execute_xxx_node`）

### 添加新的 AI 供应商

1. 在 `app/services/ai_providers.py` 中创建新的 Provider 类
2. 继承 `AIProvider` 基类
3. 实现 `chat_completion` 和 `text_completion` 方法
4. 在 `AIProviderFactory` 中注册新供应商

## 安全注意事项

1. **API 密钥管理**: 使用环境变量，不要硬编码
2. **代码执行**: CODE 节点需要沙箱环境
3. **输入验证**: 所有用户输入都经过 Pydantic 验证
4. **认证授权**: 实现 JWT 认证（TODO）
5. **速率限制**: 防止滥用（TODO）

## 性能优化

1. **异步执行**: 所有 I/O 操作使用 async/await
2. **数据库连接池**: SQLAlchemy 连接池管理
3. **缓存策略**: Redis 缓存常用数据
4. **并发控制**: 限制同时执行的工作流数量

## 监控和日志

- 使用 Loguru 进行日志管理
- 记录工作流执行详情
- 性能指标收集（TODO）
- 错误追踪（TODO）

