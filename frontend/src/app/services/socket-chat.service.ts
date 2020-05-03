import { Injectable } from '@angular/core';
import { connect } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketChatService {
  private hostname = 'localhost';
  private PORT = 5555;

  private Socket = connect(`http://${this.hostname}:${this.PORT}`);

  public SendMensage(mensage: string) {
    this.Socket.emit('chat-mensage', mensage);

    this.Socket.on('chat-response', (response) => {
      console.log(response);
    });
  }

  constructor() {}
}
