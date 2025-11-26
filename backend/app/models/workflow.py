"""
工作流相关模型
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base


class WorkflowStatus(str, enum.Enum):
    """工作流状态"""
    DRAFT = "draft"  # 草稿
    PUBLISHED = "published"  # 已发布
    ARCHIVED = "archived"  # 已归档


class Workflow(Base):
    """工作流表"""
    __tablename__ = "workflows"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(Enum(WorkflowStatus), default=WorkflowStatus.DRAFT)
    
    # 工作流配置（JSON 格式存储画布配置）
    config = Column(JSON, default={})
    
    # 版本控制
    version = Column(Integer, default=1)
    
    # 时间戳
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    nodes = relationship("WorkflowNode", back_populates="workflow", cascade="all, delete-orphan")
    edges = relationship("WorkflowEdge", back_populates="workflow", cascade="all, delete-orphan")
    executions = relationship("WorkflowExecution", back_populates="workflow")


class NodeType(str, enum.Enum):
    """节点类型"""
    START = "start"  # 开始节点
    END = "end"  # 结束节点
    LLM = "llm"  # LLM 模型节点
    PROMPT = "prompt"  # 提示词节点
    CONDITION = "condition"  # 条件判断节点
    LOOP = "loop"  # 循环节点
    CODE = "code"  # 代码执行节点
    HTTP = "http"  # HTTP 请求节点
    TOOL = "tool"  # 工具调用节点
    VARIABLE = "variable"  # 变量节点
    TRANSFORM = "transform"  # 数据转换节点


class WorkflowNode(Base):
    """工作流节点表"""
    __tablename__ = "workflow_nodes"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    
    # 节点标识（前端画布使用）
    node_id = Column(String(100), nullable=False)
    
    # 节点类型
    type = Column(Enum(NodeType), nullable=False)
    
    # 节点名称和描述
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    # 节点位置（画布坐标）
    position_x = Column(Integer, default=0)
    position_y = Column(Integer, default=0)
    
    # 节点配置（JSON 格式）
    config = Column(JSON, default={})
    
    # 时间戳
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    workflow = relationship("Workflow", back_populates="nodes")


class WorkflowEdge(Base):
    """工作流连接边表"""
    __tablename__ = "workflow_edges"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    
    # 边标识
    edge_id = Column(String(100), nullable=False)
    
    # 源节点和目标节点
    source_node_id = Column(String(100), nullable=False)
    target_node_id = Column(String(100), nullable=False)
    
    # 源节点输出端口和目标节点输入端口
    source_handle = Column(String(100), nullable=True)
    target_handle = Column(String(100), nullable=True)
    
    # 边配置（条件、标签等）
    config = Column(JSON, default={})
    
    # 时间戳
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # 关系
    workflow = relationship("Workflow", back_populates="edges")

