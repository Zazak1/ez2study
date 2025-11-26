"""
工作流执行引擎
负责解析和执行工作流
"""
from typing import Dict, Any, List, Optional
from datetime import datetime
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.workflow import Workflow, WorkflowNode, WorkflowEdge, NodeType
from app.models.execution import WorkflowExecution, NodeExecution, ExecutionStatus
from app.services.ai_providers import AIProviderFactory
from app.core.config import settings


class WorkflowEngine:
    """工作流执行引擎"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.execution_context: Dict[str, Any] = {}
    
    async def execute_workflow(
        self,
        workflow_id: int,
        user_id: int,
        input_data: Dict[str, Any]
    ) -> WorkflowExecution:
        """
        执行工作流
        """
        # 获取工作流定义
        result = await self.db.execute(
            select(Workflow).where(Workflow.id == workflow_id)
        )
        workflow = result.scalar_one_or_none()
        
        if not workflow:
            raise ValueError(f"工作流 {workflow_id} 不存在")
        
        # 创建执行记录
        execution = WorkflowExecution(
            workflow_id=workflow_id,
            user_id=user_id,
            status=ExecutionStatus.RUNNING,
            input_data=input_data,
            started_at=datetime.utcnow()
        )
        self.db.add(execution)
        await self.db.commit()
        await self.db.refresh(execution)
        
        try:
            # 构建节点图
            nodes_dict = {node.node_id: node for node in workflow.nodes}
            edges_list = workflow.edges
            
            # 初始化执行上下文
            self.execution_context = {
                "input": input_data,
                "variables": {},
                "node_outputs": {}
            }
            
            # 查找开始节点
            start_node = next(
                (node for node in workflow.nodes if node.type == NodeType.START),
                None
            )
            
            if not start_node:
                raise ValueError("工作流缺少开始节点")
            
            # 执行工作流（从开始节点开始）
            await self._execute_from_node(
                start_node.node_id,
                nodes_dict,
                edges_list,
                execution.id
            )
            
            # 更新执行记录
            execution.status = ExecutionStatus.SUCCESS
            execution.output_data = self.execution_context.get("output", {})
            execution.completed_at = datetime.utcnow()
            execution.duration = (
                execution.completed_at - execution.started_at
            ).total_seconds()
            
            await self.db.commit()
            await self.db.refresh(execution)
            
            return execution
            
        except asyncio.TimeoutError:
            execution.status = ExecutionStatus.TIMEOUT
            execution.error_message = "工作流执行超时"
            execution.completed_at = datetime.utcnow()
            await self.db.commit()
            raise
            
        except Exception as e:
            execution.status = ExecutionStatus.FAILED
            execution.error_message = str(e)
            execution.completed_at = datetime.utcnow()
            await self.db.commit()
            raise
    
    async def _execute_from_node(
        self,
        node_id: str,
        nodes_dict: Dict[str, WorkflowNode],
        edges_list: List[WorkflowEdge],
        execution_id: int
    ):
        """
        从指定节点开始执行
        """
        node = nodes_dict.get(node_id)
        if not node:
            return
        
        # 创建节点执行记录
        node_execution = NodeExecution(
            workflow_execution_id=execution_id,
            node_id=node_id,
            status=ExecutionStatus.RUNNING,
            started_at=datetime.utcnow()
        )
        self.db.add(node_execution)
        await self.db.commit()
        
        try:
            # 执行节点
            output = await self._execute_node(node)
            
            # 保存节点输出到上下文
            self.execution_context["node_outputs"][node_id] = output
            
            # 更新节点执行记录
            node_execution.status = ExecutionStatus.SUCCESS
            node_execution.output_data = output
            node_execution.completed_at = datetime.utcnow()
            node_execution.duration = (
                node_execution.completed_at - node_execution.started_at
            ).total_seconds()
            await self.db.commit()
            
            # 如果是结束节点，保存最终输出
            if node.type == NodeType.END:
                self.execution_context["output"] = output
                return
            
            # 查找下一个节点
            next_edges = [e for e in edges_list if e.source_node_id == node_id]
            
            # 执行下一个节点
            for edge in next_edges:
                # 如果是条件边，检查条件
                if edge.config.get("condition"):
                    if not self._evaluate_condition(edge.config["condition"], output):
                        continue
                
                await self._execute_from_node(
                    edge.target_node_id,
                    nodes_dict,
                    edges_list,
                    execution_id
                )
        
        except Exception as e:
            node_execution.status = ExecutionStatus.FAILED
            node_execution.error_message = str(e)
            node_execution.completed_at = datetime.utcnow()
            await self.db.commit()
            raise
    
    async def _execute_node(self, node: WorkflowNode) -> Dict[str, Any]:
        """
        执行单个节点
        """
        if node.type == NodeType.START:
            return self.execution_context["input"]
        
        elif node.type == NodeType.END:
            # 从前一个节点获取输出
            return self.execution_context.get("node_outputs", {})
        
        elif node.type == NodeType.LLM:
            return await self._execute_llm_node(node)
        
        elif node.type == NodeType.PROMPT:
            return await self._execute_prompt_node(node)
        
        elif node.type == NodeType.CONDITION:
            return await self._execute_condition_node(node)
        
        elif node.type == NodeType.CODE:
            return await self._execute_code_node(node)
        
        elif node.type == NodeType.HTTP:
            return await self._execute_http_node(node)
        
        elif node.type == NodeType.VARIABLE:
            return await self._execute_variable_node(node)
        
        elif node.type == NodeType.TRANSFORM:
            return await self._execute_transform_node(node)
        
        else:
            raise ValueError(f"不支持的节点类型: {node.type}")
    
    async def _execute_llm_node(self, node: WorkflowNode) -> Dict[str, Any]:
        """执行 LLM 节点"""
        config = node.config
        provider_name = config.get("provider", "openai")
        model = config.get("model", "gpt-3.5-turbo")
        temperature = config.get("temperature", 0.7)
        max_tokens = config.get("max_tokens")
        
        # 获取输入消息
        messages = config.get("messages", [])
        
        # 替换消息中的变量
        resolved_messages = self._resolve_variables(messages)
        
        # 调用 AI 供应商
        provider = AIProviderFactory.get_provider(provider_name)
        result = await provider.chat_completion(
            messages=resolved_messages,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        return {
            "output": result["content"],
            "usage": result.get("usage", {}),
            "model": result.get("model")
        }
    
    async def _execute_prompt_node(self, node: WorkflowNode) -> Dict[str, Any]:
        """执行提示词节点"""
        config = node.config
        prompt_template = config.get("template", "")
        
        # 替换模板中的变量
        rendered_prompt = self._render_template(
            prompt_template,
            self.execution_context
        )
        
        return {"prompt": rendered_prompt}
    
    async def _execute_condition_node(self, node: WorkflowNode) -> Dict[str, Any]:
        """执行条件节点"""
        config = node.config
        condition = config.get("condition", {})
        
        result = self._evaluate_condition(
            condition,
            self.execution_context["node_outputs"]
        )
        
        return {"result": result}
    
    async def _execute_code_node(self, node: WorkflowNode) -> Dict[str, Any]:
        """执行代码节点（简化版，实际应该使用沙箱）"""
        config = node.config
        code = config.get("code", "")
        
        # 警告：这是简化版实现，生产环境应使用安全的代码执行沙箱
        local_vars = {
            "context": self.execution_context,
            "output": {}
        }
        
        exec(code, {}, local_vars)
        
        return local_vars.get("output", {})
    
    async def _execute_http_node(self, node: WorkflowNode) -> Dict[str, Any]:
        """执行 HTTP 请求节点"""
        import httpx
        
        config = node.config
        method = config.get("method", "GET")
        url = self._render_template(config.get("url", ""), self.execution_context)
        headers = config.get("headers", {})
        body = config.get("body")
        
        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=method,
                url=url,
                headers=headers,
                json=body
            )
            
            return {
                "status_code": response.status_code,
                "headers": dict(response.headers),
                "body": response.json() if response.headers.get("content-type", "").startswith("application/json") else response.text
            }
    
    async def _execute_variable_node(self, node: WorkflowNode) -> Dict[str, Any]:
        """执行变量节点"""
        config = node.config
        variable_name = config.get("name")
        variable_value = config.get("value")
        
        # 解析变量值
        resolved_value = self._resolve_variables(variable_value)
        
        # 保存到上下文
        self.execution_context["variables"][variable_name] = resolved_value
        
        return {variable_name: resolved_value}
    
    async def _execute_transform_node(self, node: WorkflowNode) -> Dict[str, Any]:
        """执行数据转换节点"""
        config = node.config
        transform_type = config.get("type", "jmespath")
        expression = config.get("expression", "")
        
        if transform_type == "jmespath":
            import jmespath
            data = self.execution_context["node_outputs"]
            result = jmespath.search(expression, data)
            return {"result": result}
        
        return {}
    
    def _resolve_variables(self, data: Any) -> Any:
        """解析数据中的变量引用"""
        if isinstance(data, str):
            # 简单的变量替换：{{variable_name}}
            import re
            pattern = r'\{\{(.+?)\}\}'
            
            def replacer(match):
                var_path = match.group(1).strip()
                return str(self._get_nested_value(self.execution_context, var_path))
            
            return re.sub(pattern, replacer, data)
        
        elif isinstance(data, list):
            return [self._resolve_variables(item) for item in data]
        
        elif isinstance(data, dict):
            return {k: self._resolve_variables(v) for k, v in data.items()}
        
        return data
    
    def _render_template(self, template: str, context: Dict[str, Any]) -> str:
        """渲染模板"""
        return self._resolve_variables(template)
    
    def _evaluate_condition(self, condition: Dict[str, Any], data: Dict[str, Any]) -> bool:
        """评估条件"""
        # 简化的条件评估
        operator = condition.get("operator", "==")
        left = self._get_nested_value(data, condition.get("left", ""))
        right = condition.get("right")
        
        if operator == "==":
            return left == right
        elif operator == "!=":
            return left != right
        elif operator == ">":
            return left > right
        elif operator == "<":
            return left < right
        elif operator == ">=":
            return left >= right
        elif operator == "<=":
            return left <= right
        elif operator == "contains":
            return right in left
        
        return False
    
    def _get_nested_value(self, data: Dict[str, Any], path: str) -> Any:
        """获取嵌套数据"""
        keys = path.split(".")
        value = data
        
        for key in keys:
            if isinstance(value, dict):
                value = value.get(key)
            else:
                return None
        
        return value

