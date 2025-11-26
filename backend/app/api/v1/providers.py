"""
AI 模型供应商 API 路由
"""
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.services.ai_providers import AIProviderFactory

router = APIRouter()


class ProviderInfo(BaseModel):
    """供应商信息"""
    name: str
    display_name: str
    models: List[str]
    supported_features: List[str]


class TestProviderRequest(BaseModel):
    """测试供应商请求"""
    provider: str
    model: str
    prompt: str = "Hello, how are you?"


class TestProviderResponse(BaseModel):
    """测试供应商响应"""
    success: bool
    response: str = ""
    error: str = ""
    usage: Dict[str, Any] = {}


@router.get("/", response_model=List[ProviderInfo])
async def list_providers():
    """获取支持的 AI 模型供应商列表"""
    providers = [
        {
            "name": "openai",
            "display_name": "OpenAI",
            "models": [
                "gpt-4",
                "gpt-4-turbo-preview",
                "gpt-3.5-turbo",
                "gpt-3.5-turbo-16k"
            ],
            "supported_features": ["chat", "completion", "streaming"]
        },
        {
            "name": "anthropic",
            "display_name": "Anthropic (Claude)",
            "models": [
                "claude-3-opus-20240229",
                "claude-3-sonnet-20240229",
                "claude-3-haiku-20240307"
            ],
            "supported_features": ["chat", "completion"]
        },
        {
            "name": "cohere",
            "display_name": "Cohere",
            "models": [
                "command",
                "command-light",
                "command-nightly"
            ],
            "supported_features": ["chat", "completion"]
        }
    ]
    
    return providers


@router.post("/test", response_model=TestProviderResponse)
async def test_provider(request: TestProviderRequest):
    """测试 AI 模型供应商连接"""
    try:
        provider = AIProviderFactory.get_provider(request.provider)
        
        result = await provider.text_completion(
            prompt=request.prompt,
            model=request.model
        )
        
        return TestProviderResponse(
            success=True,
            response=result,
            usage={}
        )
    
    except ValueError as e:
        return TestProviderResponse(
            success=False,
            error=f"不支持的供应商: {str(e)}"
        )
    
    except Exception as e:
        return TestProviderResponse(
            success=False,
            error=f"测试失败: {str(e)}"
        )


@router.get("/{provider_name}/models")
async def get_provider_models(provider_name: str):
    """获取供应商支持的模型列表"""
    models_map = {
        "openai": [
            {"id": "gpt-4", "name": "GPT-4", "context_window": 8192},
            {"id": "gpt-4-turbo-preview", "name": "GPT-4 Turbo", "context_window": 128000},
            {"id": "gpt-3.5-turbo", "name": "GPT-3.5 Turbo", "context_window": 4096},
            {"id": "gpt-3.5-turbo-16k", "name": "GPT-3.5 Turbo 16K", "context_window": 16384}
        ],
        "anthropic": [
            {"id": "claude-3-opus-20240229", "name": "Claude 3 Opus", "context_window": 200000},
            {"id": "claude-3-sonnet-20240229", "name": "Claude 3 Sonnet", "context_window": 200000},
            {"id": "claude-3-haiku-20240307", "name": "Claude 3 Haiku", "context_window": 200000}
        ],
        "cohere": [
            {"id": "command", "name": "Command", "context_window": 4096},
            {"id": "command-light", "name": "Command Light", "context_window": 4096}
        ]
    }
    
    if provider_name not in models_map:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"供应商 {provider_name} 不存在"
        )
    
    return models_map[provider_name]

