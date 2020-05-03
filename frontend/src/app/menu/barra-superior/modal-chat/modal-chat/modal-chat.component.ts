import { Component, OnInit, ViewChild } from '@angular/core';
import { isNull } from 'util';
import { SocketChatService } from '../../../../socket/services/socket-chat.service';
import { Conversa } from '../../../model/Conversa';

@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss'],
})
export class ModalChatComponent implements OnInit {
  mensagens: Conversa[] = [];
  valor: string;
  usuario = true;

  @ViewChild('chatWindow') chatWindow: HTMLDivElement;

  constructor(private Socket: SocketChatService) {}

  ngOnInit(): void {}

  onSubmit() {
    return this.valor != null ? this.valor : null;
  }

  async preencherMensagem() {
    const response = await this.Socket.GetResponse();

    this.mensagens.push({
      mensagem: response,
      usuario: false,
      error: false,
    });
  }

  enviarDado() {
    console.log(this.chatWindow);

    if (this.valor) {
      this.mensagens.push({
        mensagem: this.valor,
        usuario: true,
        error: false,
      });
      this.Socket.SendMensage(this.valor);
      this.preencherMensagem();
    } else {
      this.preencherMensagemVazia();
    }
    this.mensagens = this.mensagens.filter((mensagem) => !isNull(mensagem));
    this.valor = null;
  }
  preencherMensagemVazia() {
    this.mensagens.push({
      mensagem: 'Favor Digitar uma Mensagem...',
      usuario: false,
      error: true,
    });
  }
}
