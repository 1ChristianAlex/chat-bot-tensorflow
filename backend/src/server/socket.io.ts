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

<<<<<<< HEAD
    socket.on('chat-mensage', async (data: string) => {
      const chatResponse = await Chat(data);
=======
    socket.on('chat-mensage', (data: string) => {
      // Chat(data);
>>>>>>> 0471ad9c9c2ac201dae56e6153ea57ed620e8e12
      console.log(data);
      socket.emit('chat-response', { response: chatResponse });
    });
  });
  http.listen(PORT, hostname, () => {
    console.log(`App is running http://${hostname}:${PORT}`);
  });
};

export default runServer;
