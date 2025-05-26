import uuid
import time


class LLMStack:
    def __init__(self):
        self.conversation_id = str(uuid.uuid4())
        self.messages = []

    def trace(self,**kwargs):
        self.user_id = kwargs.get('user_id')
        self.label = kwargs.get('label')
        self.model = kwargs.get('model')

    def log(self,**kwargs):
        self.response = kwargs.get('response')
        self.metadata  = kwargs.get('metadata')


