# logger_sdk.py

import time
import uuid
import requests
from settings import API_URL, API_KEY, DEFAULT_MODEL

class ConversationLoggerSDK:
    def __init__(self, model=None):
        self.api_url = API_URL
        self.api_key = API_KEY
        self.model = model or DEFAULT_MODEL
        self.conversation_id = str(uuid.uuid4())
        self.messages = []

    def _log_message(self, role, content, tokens=None):
        self.messages.append({
            "role": role,
            "content": content,
            "timestamp": time.time(),
            "tokens": tokens
        })

    def _send_logs(self, extra_metadata=None):
        data = {
            "conversation_id": self.conversation_id,
            "messages": self.messages,
            "model": self.model,
            "metadata": extra_metadata or {}
        }
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        response = requests.post(f"{self.api_url}/log_conversation", json=data, headers=headers)
        return response.status_code == 200

    def call_llm(self, prompt):
        self._log_message("user", prompt)
        start = time.time()

        from openai import ChatCompletion
        response = ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": msg["role"], "content": msg["content"]} for msg in self.messages
            ]
        )

        output = response["choices"][0]["message"]["content"]
        tokens_used = response.get("usage", {}).get("total_tokens")

        self._log_message("assistant", output, tokens=tokens_used)
        latency = int((time.time() - start) * 1000)

        self._send_logs(extra_metadata={
            "temperature": 0.7,
            "total_tokens": tokens_used,
            "latency_ms": latency
        })

        return output
