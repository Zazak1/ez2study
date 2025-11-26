"""
工作流相关的 Pydantic 模型
"""
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


# ===== 节点相关 =====
class NodeConfigBase(BaseModel):
    """节点配置基类"""
    pass


class LLMNodeConfig(NodeConfigBase):
    """LLM 节点配置"""
    provider: str = Field(..., description="模型供应商")
    model: str = Field(..., description="模型名称")
    temperature: float = Field(0.7, ge=0, le=2)
    max_tokens: Optional[int] = None
    system_prompt: Optional[str] = None


class WorkflowNodeBase(BaseModel):
    """工作流节点基础模型"""
    node_id: str
    type: str
    name: str
    description: Optional[str] = None
    position_x: int = 0
    position_y: int = 0
    config: Dict[str, Any] = {}


class WorkflowNodeCreate(WorkflowNodeBase):
    """创建工作流节点"""
    pass


class WorkflowNodeResponse(WorkflowNodeBase):
    """工作流节点响应"""
    id: int
    workflow_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# ===== 连接边相关 =====
class WorkflowEdgeBase(BaseModel):
    """工作流连接边基础模型"""
    edge_id: str
    source_node_id: str
    target_node_id: str
    source_handle: Optional[str] = None
    target_handle: Optional[str] = None
    config: Dict[str, Any] = {}


class WorkflowEdgeCreate(WorkflowEdgeBase):
    """创建工作流连接边"""
    pass


class WorkflowEdgeResponse(WorkflowEdgeBase):
    """工作流连接边响应"""
    id: int
    workflow_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# ===== 工作流相关 =====
class WorkflowBase(BaseModel):
    """工作流基础模型"""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    config: Dict[str, Any] = {}


class WorkflowCreate(WorkflowBase):
    """创建工作流"""
    nodes: List[WorkflowNodeCreate] = []
    edges: List[WorkflowEdgeCreate] = []


class WorkflowUpdate(BaseModel):
    """更新工作流"""
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    config: Optional[Dict[str, Any]] = None
    nodes: Optional[List[WorkflowNodeCreate]] = None
    edges: Optional[List[WorkflowEdgeCreate]] = None


class WorkflowResponse(WorkflowBase):
    """工作流响应"""
    id: int
    user_id: int
    status: str
    version: int
    created_at: datetime
    updated_at: datetime
    nodes: List[WorkflowNodeResponse] = []
    edges: List[WorkflowEdgeResponse] = []
    
    class Config:
        from_attributes = True


class WorkflowListResponse(BaseModel):
    """工作流列表响应"""
    id: int
    name: str
    description: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# ===== 工作流执行相关 =====
class WorkflowExecuteRequest(BaseModel):
    """工作流执行请求"""
    input_data: Dict[str, Any] = Field(default_factory=dict)


class WorkflowExecutionResponse(BaseModel):
    """工作流执行响应"""
    id: int
    workflow_id: int
    user_id: int
    status: str
    input_data: Dict[str, Any]
    output_data: Dict[str, Any]
    error_message: Optional[str]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    duration: Optional[float]
    created_at: datetime
    
    class Config:
        from_attributes = True


class NodeExecutionResponse(BaseModel):
    """节点执行响应"""
    id: int
    node_id: str
    status: str
    input_data: Dict[str, Any]
    output_data: Dict[str, Any]
    error_message: Optional[str]
    duration: Optional[float]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True

