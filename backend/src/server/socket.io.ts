import '../config/dotenv';
import express from 'express';
import server from 'http';
import io from 'socket.io';
import { Chat } from './chat';
import { writeBlob, googleSpeech } from '../classes';

const hostname = 'localhost';
const PORT = 5555;

const app = express();
const http = server.createServer(app);
const sock = io(http);

const runServer = () => {
  sock.on('connection', (socket) => {
    console.log('socket is running ');
    console.log('connection by', socket.client.id);

    socket.on('chat-mensage', async (data: string) => {
      const chatResponse = await Chat(data);
      console.log(data);
      socket.emit('chat-response', { response: chatResponse });
    });

    socket.on('chat-audio', async (data: ArrayBuffer) => {
      const audioPath = await writeBlob(data);
      const google = new googleSpeech();
      const transcribe = await google.audioText(audioPath);
      socket.emit('chat-response', { response: transcribe });
    });
  });
  http.listen(PORT, hostname, () => {
    console.log(`App is running http://${hostname}:${PORT}`);
  });
};

export default runServer;
