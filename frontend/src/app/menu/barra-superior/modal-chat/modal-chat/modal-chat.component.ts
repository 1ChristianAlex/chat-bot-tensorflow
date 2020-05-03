import { Component, OnInit, ViewChild } from '@angular/core';
import { isNull } from 'util';
import { SocketChatService } from 'src/app/services/socket-chat.service';
@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss'],
})
export class ModalChatComponent implements OnInit {
  mensagens: string[] = [];
  valor: string;

  mensagens: string[] = [];
  valor: string;
  usuario = true;
  constructor(private Socket: SocketChatService) {}

  ngOnInit(): void {}

  preencherMensagem() {}
  onSubmit() {
    return this.valor != null ? this.valor : null;
  }
  enviarDado() {
    if (this.valor) {
      this.mensagens.push(this.valor);
      this.Socket.SendMensage(this.valor);
    }
    this.mensagens = this.mensagens.filter((mensagem) => !isNull(mensagem));
    this.valor = null;
  }
}
