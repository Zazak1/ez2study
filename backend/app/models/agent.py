"""
智能体模型
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Boolean
from app.core.database import Base


class Agent(Base):
    """智能体表"""
    __tablename__ = "agents"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # 关联的工作流
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=True)
    
    # 智能体配置
    config = Column(JSON, default={})
    
    # 系统提示词
    system_prompt = Column(Text, nullable=True)
    
    # 是否公开
    is_public = Column(Boolean, default=False)
    
    # 时间戳
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

