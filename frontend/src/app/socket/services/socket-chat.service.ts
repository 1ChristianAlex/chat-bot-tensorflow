import { Injectable } from '@angular/core';
import { connect } from 'socket.io-client';
import { promise } from 'protractor';

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
