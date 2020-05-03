import express from 'express';
import server from 'http';
import io from 'socket.io';
import { Chat } from './chat';

const hostname = 'localhost';
const PORT = 5555;

const app = express();
const http = server.createServer(app);
const sock = io(http);

const runServer = () => {
  sock.on('connection', (socket) => {
    console.log('socket is running ');
    console.log('connection by', socket.client.id);

    socket.on('chat-mensage', (data: string) => {
      Chat(data);
      console.log(JSON.parse(data));
      socket.emit('legal');
    });
  });
  http.listen(PORT, hostname, () => {
    console.log(`App is running http://${hostname}:${PORT}`);
  });
};

export default runServer;
