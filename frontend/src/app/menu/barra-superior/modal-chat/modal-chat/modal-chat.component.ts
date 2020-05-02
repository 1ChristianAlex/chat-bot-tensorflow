import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { isNull } from 'util';


@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss']
})
export class ModalChatComponent implements OnInit {

  mensagens: string[] = []; 
  valor : string;


  constructor() { }

  ngOnInit(): void {
  }

  preencherMensagem(){

  }
  onSubmit(){
    return this.valor != null ? this.valor:null;
  }
  enviarDado(){
  if (!isNull(this.valor)){
    this.mensagens.push(this.valor)
  }
  this.mensagens = this.mensagens.filter(mensagem => !isNull(mensagem));
  this.valor = null;

  }
}
