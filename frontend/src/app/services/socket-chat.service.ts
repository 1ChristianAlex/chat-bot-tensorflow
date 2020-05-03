import { Injectable } from '@angular/core';
import socket from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketChatService {
  constructor(private socketClient: socket) {}

  private io = this.socketClient;
}
