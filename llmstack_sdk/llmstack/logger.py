import uuid
import time
import os
import requests
from typing import List, Dict, Optional, Any

# Optional: load from .env during development
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv is optional

# Fetch configuration from environment
API_KEY = os.environ.get("API_KEY")
URL = os.environ.get("URL")


class Logger:
    
    @staticmethod
    def log(model: str, start_time: float, response: Dict[str, Any]):
        duration = time.time() - start_time
        usage = response.get("usage", {})
        choices = response.get("choices", [{}])

        payload = {
            "model": model,
            "duration": duration,
            "prompt_tokens": usage.get("prompt_tokens", 0),
            "completion_tokens": usage.get("completion_tokens", 0),
            "total_tokens": usage.get("total_tokens", 0),
            "assistant_message": choices[0].get("message", {}),
        }

        try:
            res = requests.post(
                url=URL,
                json=payload,
                headers={"Authorization": f"Bearer {API_KEY}"}
            )
            res.raise_for_status()
        except requests.RequestException as e:
            print(f"[LLM-TRACE] Logging failed: {e}")


class Trace:
    def __init__(
        self,
        model: str,
        user_id: Optional[str],
        label: str,
        meta_data: Optional[Dict[str, Any]] = None
    ):
        self.model = model
        self.user_id = user_id
        self.label = label
        self.meta_data = meta_data or {}
        self.trace_id = str(uuid.uuid4())
        self.start_time = time.time()

    def end(self, response: Dict[str, Any]):
        Logger.log(model=self.model, start_time=self.start_time, response=response)


class OpenAILLMStack:
    def __init__(self, model: str, messages: List[Dict[str, str]]):
        self.conversation_id = str(uuid.uuid4())
        self.messages = messages
        self.model = model

    def trace(
        self,
        user_id: Optional[str],
        label: str,
        meta_data: Optional[Dict[str, Any]] = None
    ) -> Trace:
        return Trace(model=self.model, user_id=user_id, label=label, meta_data=meta_data)
