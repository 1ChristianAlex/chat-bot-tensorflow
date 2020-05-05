import { Injectable } from '@angular/core';
import { connect } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketChatService {
  private hostname = 'localhost';
  private PORT = 5555;
  private answer: string;
  private Socket = connect(`http://${this.hostname}:${this.PORT}`);

  public SendMensage(mensage: string) {
    this.Socket.emit('chat-mensage', mensage);
  }
  public async SendAudio(audio: Blob) {
    this.Socket.emit('chat-audio', await audio.arrayBuffer());
  }

  constructor() {}

  public GetResponse(): Promise<string> {
    return new Promise((res, rej) => {
      this.Socket.on('chat-response', (response) => {
        this.answer = response.response;
        res(response.response);
      });
    });
  }
}
