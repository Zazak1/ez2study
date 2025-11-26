"""
提示词模板管理服务
"""
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.prompt import PromptTemplate
from app.schemas.prompt import PromptTemplateCreate, PromptTemplateUpdate


class PromptManager:
    """提示词模板管理器"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_template(
        self,
        user_id: int,
        template_data: PromptTemplateCreate
    ) -> PromptTemplate:
        """创建提示词模板"""
        template = PromptTemplate(
            user_id=user_id,
            name=template_data.name,
            description=template_data.description,
            content=template_data.content,
            variables=template_data.variables,
            config=template_data.config,
            is_public=template_data.is_public
        )
        
        self.db.add(template)
        await self.db.commit()
        await self.db.refresh(template)
        
        return template
    
    async def get_template(self, template_id: int) -> Optional[PromptTemplate]:
        """获取提示词模板"""
        result = await self.db.execute(
            select(PromptTemplate).where(PromptTemplate.id == template_id)
        )
        return result.scalar_one_or_none()
    
    async def list_templates(
        self,
        user_id: int,
        skip: int = 0,
        limit: int = 100
    ) -> List[PromptTemplate]:
        """列出用户的提示词模板"""
        result = await self.db.execute(
            select(PromptTemplate)
            .where(PromptTemplate.user_id == user_id)
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()
    
    async def update_template(
        self,
        template_id: int,
        template_data: PromptTemplateUpdate
    ) -> Optional[PromptTemplate]:
        """更新提示词模板"""
        result = await self.db.execute(
            select(PromptTemplate).where(PromptTemplate.id == template_id)
        )
        template = result.scalar_one_or_none()
        
        if not template:
            return None
        
        # 更新字段
        update_data = template_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(template, key, value)
        
        # 增加版本号
        if any(k in update_data for k in ["content", "variables"]):
            template.version += 1
        
        await self.db.commit()
        await self.db.refresh(template)
        
        return template
    
    async def delete_template(self, template_id: int) -> bool:
        """删除提示词模板"""
        result = await self.db.execute(
            select(PromptTemplate).where(PromptTemplate.id == template_id)
        )
        template = result.scalar_one_or_none()
        
        if not template:
            return False
        
        await self.db.delete(template)
        await self.db.commit()
        
        return True
    
    def render_template(
        self,
        template: PromptTemplate,
        variables: Dict[str, Any]
    ) -> str:
        """渲染提示词模板"""
        content = template.content
        
        # 简单的变量替换
        for var_def in template.variables:
            var_name = var_def["name"]
            var_value = variables.get(var_name)
            
            # 如果变量必需但未提供，使用默认值或抛出错误
            if var_value is None:
                if var_def.get("required", True):
                    if "default" in var_def:
                        var_value = var_def["default"]
                    else:
                        raise ValueError(f"缺少必需变量: {var_name}")
                else:
                    var_value = var_def.get("default", "")
            
            # 替换变量
            content = content.replace(f"{{{{{var_name}}}}}", str(var_value))
        
        return content
    
    async def increment_usage(self, template_id: int):
        """增加模板使用次数"""
        result = await self.db.execute(
            select(PromptTemplate).where(PromptTemplate.id == template_id)
        )
        template = result.scalar_one_or_none()
        
        if template:
            template.usage_count += 1
            await self.db.commit()

