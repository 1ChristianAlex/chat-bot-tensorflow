import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SocketChatService {
  constructor(private HttpClient: HttpClient) {}
  private hostname = 'localhost';
  private PORT = 5555;
  private answer: string;

  public async SendMensage(mensage) {
    const body = new FormData();
    body.append('mensage', mensage);
    const res = await this.HttpClient.post(
      `http://${this.hostname}:${5555}/mensage`,
      body
    ).toPromise();
    return res;
  }
  public async sendAudio(audio: Blob) {
    const body = new FormData();

    body.append('audio', audio);

    this.HttpClient.post(`http://${this.hostname}:${5555}/audio`, body)
      .toPromise()
      .then(() => {
        console.log('audio send');
      });
  }
}
