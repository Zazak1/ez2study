"""
工作流执行相关模型
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Enum, Float
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base


class ExecutionStatus(str, enum.Enum):
    """执行状态"""
    PENDING = "pending"  # 等待执行
    RUNNING = "running"  # 执行中
    SUCCESS = "success"  # 成功
    FAILED = "failed"  # 失败
    CANCELLED = "cancelled"  # 已取消
    TIMEOUT = "timeout"  # 超时


class WorkflowExecution(Base):
    """工作流执行记录表"""
    __tablename__ = "workflow_executions"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # 执行状态
    status = Column(Enum(ExecutionStatus), default=ExecutionStatus.PENDING)
    
    # 输入输出
    input_data = Column(JSON, default={})
    output_data = Column(JSON, default={})
    
    # 错误信息
    error_message = Column(Text, nullable=True)
    
    # 执行时间统计
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    duration = Column(Float, nullable=True)  # 执行时长（秒）
    
    # 时间戳
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # 关系
    workflow = relationship("Workflow", back_populates="executions")
    node_executions = relationship("NodeExecution", back_populates="workflow_execution", cascade="all, delete-orphan")


class NodeExecution(Base):
    """节点执行记录表"""
    __tablename__ = "node_executions"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_execution_id = Column(Integer, ForeignKey("workflow_executions.id"), nullable=False)
    node_id = Column(String(100), nullable=False)
    
    # 执行状态
    status = Column(Enum(ExecutionStatus), default=ExecutionStatus.PENDING)
    
    # 输入输出
    input_data = Column(JSON, default={})
    output_data = Column(JSON, default={})
    
    # 错误信息
    error_message = Column(Text, nullable=True)
    
    # 执行时间统计
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    duration = Column(Float, nullable=True)
    
    # 时间戳
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # 关系
    workflow_execution = relationship("WorkflowExecution", back_populates="node_executions")

