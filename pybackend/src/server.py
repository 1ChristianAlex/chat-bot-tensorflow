import socket
import json


class Server:

    HOST = socket.gethostname()
    PORT = 5555
    socketServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    functions = []

    def createServer(self):
        self.socketServer.bind((self.HOST, self.PORT))
        self.socketServer.listen(5)
        while True:
            print('waiting for a connection')
            client, addr = self.socketServer.accept()
            with client:
                print('Connected by', addr)
                if len(self.functions) > 0:
                    for functionObject in self.functions:
                        data = client.recv(1024).decode('utf-8')
                        dataJson = json.load(data)
                        if dataJson['mensage'] == functionObject['mensageType']:
                            resultFunction = functionObject['function']

                            client.send(
                                bytes(resultFunction(dataJson['data']), 'utf-8'))
                            break

    def sendMessage(self, typeMessage, message, address, port, json=True):
        try:
            connection = socket.create_connection((address, port))
            with connection:
                data = message
                if(json):
                    data = json.dumps(
                        {"message": typeMessage, 'data': message})

                connection.send(bytes(data, 'utf-8'))
        except:
            print(f'{typeMessage} refuse')

    def appendFunction(self, mensageType, func, args=False):
        def executeFunction(dataMensage):
            if args:
                return func(args, dataMensage)
            return func()

        functionDic = {
            'mensageType': mensageType,
            'function': executeFunction
        }

        self.functions.append(functionDic)


serverInstance = Server()
