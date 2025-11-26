"""
AI 模型供应商服务
统一的 AI 模型调用接口，支持多个供应商
"""
from typing import Dict, Any, Optional, List
from abc import ABC, abstractmethod
import openai
from anthropic import Anthropic
import cohere
from app.core.config import settings


class AIProvider(ABC):
    """AI 供应商基类"""
    
    @abstractmethod
    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> Dict[str, Any]:
        """聊天补全"""
        pass
    
    @abstractmethod
    async def text_completion(
        self,
        prompt: str,
        model: str,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:
        """文本补全"""
        pass


class OpenAIProvider(AIProvider):
    """OpenAI 供应商"""
    
    def __init__(self):
        self.client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "gpt-3.5-turbo",
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> Dict[str, Any]:
        """聊天补全"""
        try:
            response = await self.client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                **kwargs
            )
            
            return {
                "content": response.choices[0].message.content,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens,
                },
                "model": response.model,
                "finish_reason": response.choices[0].finish_reason
            }
        except Exception as e:
            raise Exception(f"OpenAI API 错误: {str(e)}")
    
    async def text_completion(
        self,
        prompt: str,
        model: str = "gpt-3.5-turbo-instruct",
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:
        """文本补全"""
        messages = [{"role": "user", "content": prompt}]
        result = await self.chat_completion(messages, model, temperature, max_tokens, **kwargs)
        return result["content"]


class AnthropicProvider(AIProvider):
    """Anthropic (Claude) 供应商"""
    
    def __init__(self):
        self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    
    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "claude-3-sonnet-20240229",
        temperature: float = 0.7,
        max_tokens: Optional[int] = 1024,
        **kwargs
    ) -> Dict[str, Any]:
        """聊天补全"""
        try:
            # 转换消息格式
            anthropic_messages = []
            system_prompt = None
            
            for msg in messages:
                if msg["role"] == "system":
                    system_prompt = msg["content"]
                else:
                    anthropic_messages.append({
                        "role": msg["role"],
                        "content": msg["content"]
                    })
            
            response = self.client.messages.create(
                model=model,
                messages=anthropic_messages,
                system=system_prompt,
                temperature=temperature,
                max_tokens=max_tokens or 1024,
                **kwargs
            )
            
            return {
                "content": response.content[0].text,
                "usage": {
                    "prompt_tokens": response.usage.input_tokens,
                    "completion_tokens": response.usage.output_tokens,
                    "total_tokens": response.usage.input_tokens + response.usage.output_tokens,
                },
                "model": response.model,
                "finish_reason": response.stop_reason
            }
        except Exception as e:
            raise Exception(f"Anthropic API 错误: {str(e)}")
    
    async def text_completion(
        self,
        prompt: str,
        model: str = "claude-3-sonnet-20240229",
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:
        """文本补全"""
        messages = [{"role": "user", "content": prompt}]
        result = await self.chat_completion(messages, model, temperature, max_tokens, **kwargs)
        return result["content"]


class CohereProvider(AIProvider):
    """Cohere 供应商"""
    
    def __init__(self):
        self.client = cohere.AsyncClient(api_key=settings.COHERE_API_KEY)
    
    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "command",
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> Dict[str, Any]:
        """聊天补全"""
        try:
            # 转换消息格式
            chat_history = []
            message = ""
            
            for msg in messages:
                if msg["role"] == "user":
                    message = msg["content"]
                elif msg["role"] == "assistant":
                    chat_history.append({
                        "role": "CHATBOT",
                        "message": msg["content"]
                    })
            
            response = await self.client.chat(
                message=message,
                chat_history=chat_history,
                model=model,
                temperature=temperature,
                max_tokens=max_tokens,
                **kwargs
            )
            
            return {
                "content": response.text,
                "usage": {
                    "prompt_tokens": response.meta.tokens.input_tokens if hasattr(response.meta, 'tokens') else 0,
                    "completion_tokens": response.meta.tokens.output_tokens if hasattr(response.meta, 'tokens') else 0,
                },
                "model": model,
                "finish_reason": "complete"
            }
        except Exception as e:
            raise Exception(f"Cohere API 错误: {str(e)}")
    
    async def text_completion(
        self,
        prompt: str,
        model: str = "command",
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:
        """文本补全"""
        messages = [{"role": "user", "content": prompt}]
        result = await self.chat_completion(messages, model, temperature, max_tokens, **kwargs)
        return result["content"]


class AIProviderFactory:
    """AI 供应商工厂"""
    
    _providers: Dict[str, AIProvider] = {}
    
    @classmethod
    def get_provider(cls, provider_name: str) -> AIProvider:
        """获取供应商实例"""
        if provider_name not in cls._providers:
            if provider_name == "openai":
                cls._providers[provider_name] = OpenAIProvider()
            elif provider_name == "anthropic":
                cls._providers[provider_name] = AnthropicProvider()
            elif provider_name == "cohere":
                cls._providers[provider_name] = CohereProvider()
            else:
                raise ValueError(f"不支持的 AI 供应商: {provider_name}")
        
        return cls._providers[provider_name]
    
    @classmethod
    def list_providers(cls) -> List[str]:
        """列出所有支持的供应商"""
        return ["openai", "anthropic", "cohere"]

