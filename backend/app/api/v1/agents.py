"""
智能体 API 路由
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.agent import Agent
from app.schemas.agent import (
    AgentCreate,
    AgentUpdate,
    AgentResponse,
    AgentChatRequest,
    AgentChatResponse
)

router = APIRouter()


@router.post("/", response_model=AgentResponse, status_code=status.HTTP_201_CREATED)
async def create_agent(
    agent_data: AgentCreate,
    db: AsyncSession = Depends(get_db)
):
    """创建智能体"""
    # TODO: 从认证中获取用户 ID
    user_id = 1
    
    agent = Agent(
        name=agent_data.name,
        description=agent_data.description,
        user_id=user_id,
        workflow_id=agent_data.workflow_id,
        system_prompt=agent_data.system_prompt,
        config=agent_data.config,
        is_public=agent_data.is_public
    )
    
    db.add(agent)
    await db.commit()
    await db.refresh(agent)
    
    return agent


@router.get("/", response_model=List[AgentResponse])
async def list_agents(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """获取智能体列表"""
    # TODO: 从认证中获取用户 ID
    user_id = 1
    
    result = await db.execute(
        select(Agent)
        .where(Agent.user_id == user_id)
        .offset(skip)
        .limit(limit)
    )
    agents = result.scalars().all()
    
    return agents


@router.get("/{agent_id}", response_model=AgentResponse)
async def get_agent(
    agent_id: int,
    db: AsyncSession = Depends(get_db)
):
    """获取智能体详情"""
    result = await db.execute(
        select(Agent).where(Agent.id == agent_id)
    )
    agent = result.scalar_one_or_none()
    
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="智能体不存在"
        )
    
    return agent


@router.put("/{agent_id}", response_model=AgentResponse)
async def update_agent(
    agent_id: int,
    agent_data: AgentUpdate,
    db: AsyncSession = Depends(get_db)
):
    """更新智能体"""
    result = await db.execute(
        select(Agent).where(Agent.id == agent_id)
    )
    agent = result.scalar_one_or_none()
    
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="智能体不存在"
        )
    
    # 更新字段
    update_data = agent_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(agent, key, value)
    
    await db.commit()
    await db.refresh(agent)
    
    return agent


@router.delete("/{agent_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_agent(
    agent_id: int,
    db: AsyncSession = Depends(get_db)
):
    """删除智能体"""
    result = await db.execute(
        select(Agent).where(Agent.id == agent_id)
    )
    agent = result.scalar_one_or_none()
    
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="智能体不存在"
        )
    
    await db.delete(agent)
    await db.commit()


@router.post("/{agent_id}/chat", response_model=AgentChatResponse)
async def chat_with_agent(
    agent_id: int,
    chat_request: AgentChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """与智能体对话"""
    result = await db.execute(
        select(Agent).where(Agent.id == agent_id)
    )
    agent = result.scalar_one_or_none()
    
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="智能体不存在"
        )
    
    # 如果智能体关联了工作流，执行工作流
    if agent.workflow_id:
        from app.services.workflow_engine import WorkflowEngine
        
        engine = WorkflowEngine(db)
        try:
            execution = await engine.execute_workflow(
                workflow_id=agent.workflow_id,
                user_id=1,  # TODO: 从认证获取
                input_data={
                    "message": chat_request.message,
                    "context": chat_request.context
                }
            )
            
            response_text = execution.output_data.get("output", "")
            
            return AgentChatResponse(
                response=response_text,
                conversation_id=chat_request.conversation_id or str(execution.id),
                metadata={
                    "execution_id": execution.id,
                    "status": execution.status
                }
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"智能体执行失败: {str(e)}"
            )
    
    # 如果没有关联工作流，使用简单的 LLM 调用
    from app.services.ai_providers import AIProviderFactory
    
    try:
        provider_name = agent.config.get("provider", "openai")
        model = agent.config.get("model", "gpt-3.5-turbo")
        
        provider = AIProviderFactory.get_provider(provider_name)
        
        messages = []
        if agent.system_prompt:
            messages.append({"role": "system", "content": agent.system_prompt})
        
        messages.append({"role": "user", "content": chat_request.message})
        
        result = await provider.chat_completion(
            messages=messages,
            model=model
        )
        
        import uuid
        conversation_id = chat_request.conversation_id or str(uuid.uuid4())
        
        return AgentChatResponse(
            response=result["content"],
            conversation_id=conversation_id,
            metadata={
                "usage": result.get("usage", {}),
                "model": result.get("model")
            }
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"对话失败: {str(e)}"
        )

