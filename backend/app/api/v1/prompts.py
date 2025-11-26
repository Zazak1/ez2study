"""
提示词模板 API 路由
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.prompt import (
    PromptTemplateCreate,
    PromptTemplateUpdate,
    PromptTemplateResponse,
    PromptRenderRequest,
    PromptRenderResponse
)
from app.services.prompt_manager import PromptManager

router = APIRouter()


@router.post("/", response_model=PromptTemplateResponse, status_code=status.HTTP_201_CREATED)
async def create_prompt_template(
    template_data: PromptTemplateCreate,
    db: AsyncSession = Depends(get_db)
):
    """创建提示词模板"""
    # TODO: 从认证中获取用户 ID
    user_id = 1
    
    manager = PromptManager(db)
    template = await manager.create_template(user_id, template_data)
    
    return template


@router.get("/", response_model=List[PromptTemplateResponse])
async def list_prompt_templates(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """获取提示词模板列表"""
    # TODO: 从认证中获取用户 ID
    user_id = 1
    
    manager = PromptManager(db)
    templates = await manager.list_templates(user_id, skip, limit)
    
    return templates


@router.get("/{template_id}", response_model=PromptTemplateResponse)
async def get_prompt_template(
    template_id: int,
    db: AsyncSession = Depends(get_db)
):
    """获取提示词模板详情"""
    manager = PromptManager(db)
    template = await manager.get_template(template_id)
    
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="提示词模板不存在"
        )
    
    return template


@router.put("/{template_id}", response_model=PromptTemplateResponse)
async def update_prompt_template(
    template_id: int,
    template_data: PromptTemplateUpdate,
    db: AsyncSession = Depends(get_db)
):
    """更新提示词模板"""
    manager = PromptManager(db)
    template = await manager.update_template(template_id, template_data)
    
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="提示词模板不存在"
        )
    
    return template


@router.delete("/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prompt_template(
    template_id: int,
    db: AsyncSession = Depends(get_db)
):
    """删除提示词模板"""
    manager = PromptManager(db)
    success = await manager.delete_template(template_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="提示词模板不存在"
        )


@router.post("/render", response_model=PromptRenderResponse)
async def render_prompt_template(
    render_request: PromptRenderRequest,
    db: AsyncSession = Depends(get_db)
):
    """渲染提示词模板"""
    manager = PromptManager(db)
    template = await manager.get_template(render_request.template_id)
    
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="提示词模板不存在"
        )
    
    try:
        rendered_content = manager.render_template(template, render_request.variables)
        
        # 增加使用次数
        await manager.increment_usage(render_request.template_id)
        
        return PromptRenderResponse(rendered_content=rendered_content)
    
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

