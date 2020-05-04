import asyncio
import websockets
import json
import re


class Server:

    HOST = 'localhost'
    PORT = 5555
    functions = []

    def createWebSocket(self):
        async def echo(websocket, path):
            async for message in websocket:
                if len(self.functions) > 0:
                    for functionObject in self.functions:
                        if message.find(str.encode(functionObject['mensageType'])):
                            resultFunction = functionObject['function']
                            await websocket.send(resultFunction(message))
                            break
                        else:
                            await websocket.send('Not found')

        asyncio.get_event_loop().run_until_complete(
            websockets.serve(echo, self.HOST, self.PORT))
        asyncio.get_event_loop().run_forever()

    def appendFunction(self, mensageType, func):
        def executeFunction(dataMensage):
            return func(dataMensage)

        functionDic = {
            'mensageType': mensageType,
            'function': executeFunction
        }

        self.functions.append(functionDic)


serverInstance = Server()
