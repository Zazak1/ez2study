"""API v1 路由"""
from fastapi import APIRouter
from app.api.v1 import workflows, agents, prompts, providers

api_router = APIRouter()

# 注册子路由
api_router.include_router(workflows.router, prefix="/workflows", tags=["workflows"])
api_router.include_router(agents.router, prefix="/agents", tags=["agents"])
api_router.include_router(prompts.router, prefix="/prompts", tags=["prompts"])
api_router.include_router(providers.router, prefix="/providers", tags=["providers"])

