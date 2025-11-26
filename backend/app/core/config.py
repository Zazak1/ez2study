"""
核心配置模块
"""
from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl


class Settings(BaseSettings):
    """应用配置"""
    
    # 应用基础配置
    APP_NAME: str = "Ez2Study AI Platform"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    SECRET_KEY: str = "your-secret-key-change-in-production"
    
    # 服务器配置
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # 数据库配置
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/ez2study_db"
    
    # Redis 配置
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # JWT 认证配置
    JWT_SECRET_KEY: str = "your-jwt-secret-key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # AI 模型供应商配置
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    COHERE_API_KEY: str = ""
    REPLICATE_API_TOKEN: str = ""
    
    # CORS 配置
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000"
    ]
    
    # 工作流引擎配置
    MAX_WORKFLOW_EXECUTION_TIME: int = 300  # 秒
    MAX_CONCURRENT_WORKFLOWS: int = 10
    MAX_WORKFLOW_NODES: int = 50
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

