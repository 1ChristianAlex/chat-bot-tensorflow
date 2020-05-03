from src.chat import chat
from src.server import serverInstance

serverInstance.createServer()
serverInstance.appendFunction('chat-response', chat)
