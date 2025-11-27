# Ez2Study - 快速启动指南

## 🚀 当前运行状态

### ✅ 前端已运行
- **状态**: 正在运行
- **地址**: http://localhost:5174/
- **端口**: 5174（因为 5173 被占用）

### ⏸️ 后端待启动

## 📋 启动后端的三种方式

### 方式一：Docker Compose（推荐）

**前提条件**: Docker Desktop 必须运行

1. **启动 Docker Desktop**
   - 打开 Docker Desktop 应用
   - 等待 Docker 图标显示为绿色（运行中）

2. **启动后端服务**
   ```bash
   cd backend
   docker-compose up -d
   ```

3. **查看服务状态**
   ```bash
   docker-compose ps
   ```

4. **访问 API 文档**
   - http://localhost:8000/docs（Swagger UI）
   - http://localhost:8000/redoc（ReDoc）

5. **查看日志**
   ```bash
   docker-compose logs -f backend
   ```

6. **停止服务**
   ```bash
   docker-compose down
   ```

---

### 方式二：手动启动（开发模式）

**前提条件**: 需要手动安装 PostgreSQL 和 Redis

#### 步骤 1: 安装依赖

```bash
cd backend

# 创建虚拟环境（推荐）
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# 或
.\venv\Scripts\activate  # Windows

# 安装依赖
pip install -r requirements.txt
```

#### 步骤 2: 启动数据库服务

**PostgreSQL**:
```bash
# 使用 Docker
docker run -d \
  --name ez2study_postgres \
  -e POSTGRES_USER=ez2study \
  -e POSTGRES_PASSWORD=ez2study_pass \
  -e POSTGRES_DB=ez2study_db \
  -p 5432:5432 \
  postgres:15-alpine
```

**Redis**:
```bash
# 使用 Docker
docker run -d \
  --name ez2study_redis \
  -p 6379:6379 \
  redis:7-alpine
```

或使用 Homebrew (macOS):
```bash
brew install postgresql@15 redis
brew services start postgresql@15
brew services start redis
```

#### 步骤 3: 配置环境变量

```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件，最低配置：
```env
DATABASE_URL=postgresql+asyncpg://ez2study:ez2study_pass@localhost:5432/ez2study_db
REDIS_URL=redis://localhost:6379/0
OPENAI_API_KEY=你的OpenAI密钥（可选）
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
```

#### 步骤 4: 初始化数据库

```bash
# 运行数据库迁移
alembic upgrade head
```

#### 步骤 5: 启动后端服务

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 步骤 6: 访问服务

- API 文档: http://localhost:8000/docs
- 健康检查: http://localhost:8000/health

---

### 方式三：简化版（无数据库，仅测试 API）

**仅用于快速测试 API 结构，不能执行工作流**

```bash
cd backend

# 安装最小依赖
pip install fastapi uvicorn pydantic pydantic-settings

# 临时修改数据库连接（可选）
# 注释掉 main.py 中的 init_db() 调用

# 启动服务
uvicorn app.main:app --reload
```

**注意**: 这种方式只能查看 API 文档，不能实际调用需要数据库的接口。

---

## 🔍 验证服务运行

### 前端验证
打开浏览器访问: http://localhost:5174/

应该看到：
- ✅ 首页正常显示
- ✅ 导航栏正常
- ✅ 点击"登录"可以进入登录页面

### 后端验证

#### 1. 访问 API 文档
http://localhost:8000/docs

应该看到：
- ✅ Swagger UI 界面
- ✅ 4 个 API 分组（workflows, agents, prompts, providers）

#### 2. 测试健康检查
```bash
curl http://localhost:8000/health
```

应该返回：
```json
{"status": "healthy"}
```

#### 3. 测试 API（获取供应商列表）
```bash
curl http://localhost:8000/api/v1/providers
```

应该返回支持的 AI 供应商列表。

---

## 🐛 常见问题

### 问题 1: Docker 未运行
```
Cannot connect to the Docker daemon
```

**解决方案**: 
- 打开 Docker Desktop 应用
- 等待 Docker 启动完成

### 问题 2: 端口被占用
```
Error: Port 8000 is already in use
```

**解决方案**:
```bash
# 查找占用端口的进程
lsof -ti:8000

# 结束进程
kill -9 $(lsof -ti:8000)

# 或使用其他端口
uvicorn app.main:app --port 8001
```

### 问题 3: 数据库连接失败
```
Could not connect to database
```

**解决方案**:
1. 确认 PostgreSQL 正在运行
2. 检查 `.env` 中的 `DATABASE_URL` 配置
3. 检查数据库用户名和密码

### 问题 4: Python 依赖安装失败

**解决方案**:
```bash
# 升级 pip
pip install --upgrade pip

# 使用虚拟环境
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 问题 5: 前端访问后端失败（CORS）

**解决方案**:
检查 `backend/.env` 中的 CORS 配置：
```env
BACKEND_CORS_ORIGINS=http://localhost:5174,http://localhost:5173
```

---

## 📊 服务端口总览

| 服务 | 端口 | 地址 |
|------|------|------|
| 前端 | 5174 | http://localhost:5174 |
| 后端 API | 8000 | http://localhost:8000 |
| API 文档 | 8000 | http://localhost:8000/docs |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |

---

## 🎯 推荐启动顺序

### 完整开发环境

1. **启动 Docker Desktop** （如果使用 Docker）
2. **启动后端**
   ```bash
   cd backend
   docker-compose up -d
   # 或手动启动
   ```
3. **验证后端**: 访问 http://localhost:8000/docs
4. **前端已运行**: http://localhost:5174/

### 快速测试

如果只是想看看前端界面：
- 前端已经运行: http://localhost:5174/

如果要测试完整功能（包括 AI 调用）：
- 需要启动后端并配置 AI API 密钥

---

## 💡 下一步操作

### 1. 测试工作流创建
访问 API 文档: http://localhost:8000/docs
找到 `POST /api/v1/workflows` 端点，点击 "Try it out" 进行测试。

### 2. 测试 AI 供应商
访问 `POST /api/v1/providers/test` 端点，测试 AI 模型连接。

### 3. 前后端联调
- 前端: http://localhost:5174/
- 后端: http://localhost:8000
- 确保两者可以正常通信

---

**提示**: 
- 🟢 前端当前已运行在 http://localhost:5174/
- 🟡 后端需要手动启动（推荐使用 Docker Compose）
- 📚 详细文档请查看 `backend/QUICKSTART.md`

