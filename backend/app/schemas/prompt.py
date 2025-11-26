"""
提示词模板相关的 Pydantic 模型
"""
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


class PromptVariableSchema(BaseModel):
    """提示词变量定义"""
    name: str
    type: str = "string"  # string, number, boolean, array, object
    required: bool = True
    default: Optional[Any] = None
    description: Optional[str] = None


class PromptTemplateBase(BaseModel):
    """提示词模板基础模型"""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    content: str = Field(..., min_length=1)
    variables: List[PromptVariableSchema] = []
    config: Dict[str, Any] = {}
    is_public: bool = False


class PromptTemplateCreate(PromptTemplateBase):
    """创建提示词模板"""
    pass


class PromptTemplateUpdate(BaseModel):
    """更新提示词模板"""
    name: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    variables: Optional[List[PromptVariableSchema]] = None
    config: Optional[Dict[str, Any]] = None
    is_public: Optional[bool] = None


class PromptTemplateResponse(PromptTemplateBase):
    """提示词模板响应"""
    id: int
    user_id: int
    version: int
    usage_count: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class PromptRenderRequest(BaseModel):
    """提示词渲染请求"""
    template_id: int
    variables: Dict[str, Any] = {}


class PromptRenderResponse(BaseModel):
    """提示词渲染响应"""
    rendered_content: str

