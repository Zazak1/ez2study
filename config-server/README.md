# EduAI 配置管理服务

该服务用于在服务器端集中管理移动 App 的运行参数（API 基础地址、公告通知、功能开关等），并提供简单的 Web 控制台。

## 功能概览

- `GET /api/config`：App 拉取最新配置。
- `POST /api/config`：管理员更新配置，需携带 `x-admin-token` 头。
- `GET /api/announcement`：仅获取公告内容。
- `GET /admin`：Web 控制台。

所有配置持久化在根目录的 `config.json` 中，写入时会自动更新时间戳。

## 本地运行

```bash
cd config-server
npm install
ADMIN_TOKEN=自定义密钥 npm start
```

访问 `http://localhost:8080/admin` 打开控制台。

## Docker 部署

服务器公网 IP：`115.190.195.114`。登陆服务器后执行：

```bash
cd /path/to/config-server
docker build -t eduai-config .
docker run -d \
  --name eduai-config \
  -p 8080:8080 \
  -e ADMIN_TOKEN=替换为安全值 \
  -v $(pwd)/config.json:/app/config.json \
  eduai-config
```

部署完成后：
- 控制台访问 `http://115.190.195.114:8080/admin`
- App 拉取 `http://115.190.195.114:8080/api/config`

## API 数据格式

```json
{
  "apiBaseUrl": "https://api.example.com/v1",
  "announcement": {
    "enabled": true,
    "title": "欢迎",
    "message": "最新功能上线",
    "level": "info"
  },
  "featureFlags": {
    "digitalHuman": true,
    "cameraSearch": true
  },
  "updatedAt": "2025-11-29T00:00:00.000Z"
}
```

## 安全建议

1. 使用复杂的 `ADMIN_TOKEN` 并通过 https 暴露。
2. 将服务置于防火墙或反向代理后，限制可访问的来源。
3. 若有多位管理员，可将控制台放置在内网/VPN。

