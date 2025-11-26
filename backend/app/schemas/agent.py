"""
智能体相关的 Pydantic 模型
"""
from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


class AgentBase(BaseModel):
    """智能体基础模型"""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    system_prompt: Optional[str] = None
    config: Dict[str, Any] = {}
    is_public: bool = False


class AgentCreate(AgentBase):
    """创建智能体"""
    workflow_id: Optional[int] = None


class AgentUpdate(BaseModel):
    """更新智能体"""
    name: Optional[str] = None
    description: Optional[str] = None
    system_prompt: Optional[str] = None
    config: Optional[Dict[str, Any]] = None
    is_public: Optional[bool] = None
    workflow_id: Optional[int] = None


class AgentResponse(AgentBase):
    """智能体响应"""
    id: int
    user_id: int
    workflow_id: Optional[int]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class AgentChatRequest(BaseModel):
    """智能体对话请求"""
    message: str = Field(..., min_length=1)
    conversation_id: Optional[str] = None
    context: Dict[str, Any] = {}


class AgentChatResponse(BaseModel):
    """智能体对话响应"""
    response: str
    conversation_id: str
    metadata: Dict[str, Any] = {}

