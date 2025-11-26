"""
工作流 API 路由
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.workflow import Workflow, WorkflowNode, WorkflowEdge
from app.schemas.workflow import (
    WorkflowCreate,
    WorkflowUpdate,
    WorkflowResponse,
    WorkflowListResponse,
    WorkflowExecuteRequest,
    WorkflowExecutionResponse
)
from app.services.workflow_engine import WorkflowEngine

router = APIRouter()


@router.post("/", response_model=WorkflowResponse, status_code=status.HTTP_201_CREATED)
async def create_workflow(
    workflow_data: WorkflowCreate,
    db: AsyncSession = Depends(get_db)
):
    """创建工作流"""
    # TODO: 从认证中获取用户 ID
    user_id = 1  # 临时硬编码
    
    # 创建工作流
    workflow = Workflow(
        name=workflow_data.name,
        description=workflow_data.description,
        user_id=user_id,
        config=workflow_data.config
    )
    db.add(workflow)
    await db.flush()
    
    # 创建节点
    for node_data in workflow_data.nodes:
        node = WorkflowNode(
            workflow_id=workflow.id,
            node_id=node_data.node_id,
            type=node_data.type,
            name=node_data.name,
            description=node_data.description,
            position_x=node_data.position_x,
            position_y=node_data.position_y,
            config=node_data.config
        )
        db.add(node)
    
    # 创建连接边
    for edge_data in workflow_data.edges:
        edge = WorkflowEdge(
            workflow_id=workflow.id,
            edge_id=edge_data.edge_id,
            source_node_id=edge_data.source_node_id,
            target_node_id=edge_data.target_node_id,
            source_handle=edge_data.source_handle,
            target_handle=edge_data.target_handle,
            config=edge_data.config
        )
        db.add(edge)
    
    await db.commit()
    await db.refresh(workflow)
    
    return workflow


@router.get("/", response_model=List[WorkflowListResponse])
async def list_workflows(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """获取工作流列表"""
    # TODO: 从认证中获取用户 ID
    user_id = 1
    
    result = await db.execute(
        select(Workflow)
        .where(Workflow.user_id == user_id)
        .offset(skip)
        .limit(limit)
    )
    workflows = result.scalars().all()
    
    return workflows


@router.get("/{workflow_id}", response_model=WorkflowResponse)
async def get_workflow(
    workflow_id: int,
    db: AsyncSession = Depends(get_db)
):
    """获取工作流详情"""
    result = await db.execute(
        select(Workflow).where(Workflow.id == workflow_id)
    )
    workflow = result.scalar_one_or_none()
    
    if not workflow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="工作流不存在"
        )
    
    return workflow


@router.put("/{workflow_id}", response_model=WorkflowResponse)
async def update_workflow(
    workflow_id: int,
    workflow_data: WorkflowUpdate,
    db: AsyncSession = Depends(get_db)
):
    """更新工作流"""
    result = await db.execute(
        select(Workflow).where(Workflow.id == workflow_id)
    )
    workflow = result.scalar_one_or_none()
    
    if not workflow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="工作流不存在"
        )
    
    # 更新基本信息
    update_data = workflow_data.model_dump(exclude_unset=True, exclude={"nodes", "edges"})
    for key, value in update_data.items():
        setattr(workflow, key, value)
    
    # 如果提供了节点和边，则更新
    if workflow_data.nodes is not None:
        # 删除旧节点
        await db.execute(
            select(WorkflowNode).where(WorkflowNode.workflow_id == workflow_id)
        )
        
        # 创建新节点
        for node_data in workflow_data.nodes:
            node = WorkflowNode(
                workflow_id=workflow.id,
                node_id=node_data.node_id,
                type=node_data.type,
                name=node_data.name,
                description=node_data.description,
                position_x=node_data.position_x,
                position_y=node_data.position_y,
                config=node_data.config
            )
            db.add(node)
    
    if workflow_data.edges is not None:
        # 删除旧边
        await db.execute(
            select(WorkflowEdge).where(WorkflowEdge.workflow_id == workflow_id)
        )
        
        # 创建新边
        for edge_data in workflow_data.edges:
            edge = WorkflowEdge(
                workflow_id=workflow.id,
                edge_id=edge_data.edge_id,
                source_node_id=edge_data.source_node_id,
                target_node_id=edge_data.target_node_id,
                source_handle=edge_data.source_handle,
                target_handle=edge_data.target_handle,
                config=edge_data.config
            )
            db.add(edge)
    
    # 增加版本号
    workflow.version += 1
    
    await db.commit()
    await db.refresh(workflow)
    
    return workflow


@router.delete("/{workflow_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_workflow(
    workflow_id: int,
    db: AsyncSession = Depends(get_db)
):
    """删除工作流"""
    result = await db.execute(
        select(Workflow).where(Workflow.id == workflow_id)
    )
    workflow = result.scalar_one_or_none()
    
    if not workflow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="工作流不存在"
        )
    
    await db.delete(workflow)
    await db.commit()


@router.post("/{workflow_id}/execute", response_model=WorkflowExecutionResponse)
async def execute_workflow(
    workflow_id: int,
    execute_request: WorkflowExecuteRequest,
    db: AsyncSession = Depends(get_db)
):
    """执行工作流"""
    # TODO: 从认证中获取用户 ID
    user_id = 1
    
    try:
        engine = WorkflowEngine(db)
        execution = await engine.execute_workflow(
            workflow_id=workflow_id,
            user_id=user_id,
            input_data=execute_request.input_data
        )
        
        return execution
    
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"工作流执行失败: {str(e)}"
        )


@router.get("/{workflow_id}/executions", response_model=List[WorkflowExecutionResponse])
async def list_workflow_executions(
    workflow_id: int,
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
):
    """获取工作流执行历史"""
    from app.models.execution import WorkflowExecution
    
    result = await db.execute(
        select(WorkflowExecution)
        .where(WorkflowExecution.workflow_id == workflow_id)
        .order_by(WorkflowExecution.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    executions = result.scalars().all()
    
    return executions

