"""
提示词模板模型
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Boolean
from app.core.database import Base


class PromptTemplate(Base):
    """提示词模板表"""
    __tablename__ = "prompt_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # 提示词内容（支持变量插值）
    content = Column(Text, nullable=False)
    
    # 变量定义
    variables = Column(JSON, default=[])  # [{"name": "user_input", "type": "string", "required": true}]
    
    # 模板配置
    config = Column(JSON, default={})
    
    # 版本控制
    version = Column(Integer, default=1)
    
    # 是否公开
    is_public = Column(Boolean, default=False)
    
    # 使用统计
    usage_count = Column(Integer, default=0)
    
    # 时间戳
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

