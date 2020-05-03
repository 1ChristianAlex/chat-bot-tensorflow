import { Component, OnInit, ViewChild ,ChangeDetectorRef} from '@angular/core';
import { isNull } from 'util';
import { SocketChatService } from '../../../../socket/services/socket-chat.service';
<<<<<<< HEAD
import { Conversa }  from '../../../model/Conversa';
import { DomSanitizer } from '@angular/platform-browser';

declare var MediaRecorder: any;
=======
import { Conversa } from '../../../model/Conversa';
>>>>>>> bb660012c493fc722194a307cba023b9d999260c

@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss'],
})
<<<<<<< HEAD

export class ModalChatComponent implements OnInit {
  chunks = [];
  audioFiles = [];
  mensagens: Conversa[] = [];
  valor: string;
  usuario: boolean = true;
  mediaRecorder:any;
  constructor(private Socket: SocketChatService, private dom: DomSanitizer, private cd: ChangeDetectorRef) {}
=======
export class ModalChatComponent implements OnInit {
  mensagens: Conversa[] = [];
  valor: string;
  usuario = true;

  @ViewChild('chatWindow') chatWindow: HTMLDivElement;
>>>>>>> bb660012c493fc722194a307cba023b9d999260c



  onSubmit() {
    return this.valor != null ? this.valor : null;
  }

  async preencherMensagem() {
    const response = await this.Socket.GetResponse();

    this.mensagens.push({
      mensagem: String(response),
      usuario: false,
      error: false,
<<<<<<< HEAD
      audio:false
    })
=======
    });
>>>>>>> bb660012c493fc722194a307cba023b9d999260c
  }

  enviarDado() {
    console.log(this.chatWindow);

    if (this.valor) {
<<<<<<< HEAD
       this.mensagens.push({
        mensagem: String(this.valor),
        usuario: true,
        error: false,
        audio:false
       })      
=======
      this.mensagens.push({
        mensagem: this.valor,
        usuario: true,
        error: false,
      });
>>>>>>> bb660012c493fc722194a307cba023b9d999260c
      this.Socket.SendMensage(this.valor);
      this.preencherMensagem();
    } else {
      this.preencherMensagemVazia();
    }
    this.mensagens = this.mensagens.filter((mensagem) => !isNull(mensagem));
    this.valor = null;
  }
<<<<<<< HEAD
  ngOnInit(): void {
    navigator.getUserMedia(
			{audio: true},
			stream => {
				console.log(stream);
				this.mediaRecorder = new MediaRecorder(stream);
				this.mediaRecorder.onstop = e => {
					console.log('data available after MediaRecorder.stop() called.');

					// var clipName = prompt('Enter a name for your sound clip');

					// var clipContainer = document.createElement('article');
					// var clipLabel = document.createElement('p');
					// var audio = document.createElement('audio');
					// var deleteButton = document.createElement('button');

					// clipContainer.classList.add('clip');
					// audio.setAttribute('controls', '');
					// deleteButton.innerHTML = 'Delete';
					// clipLabel.innerHTML = clipName;

					// clipContainer.appendChild(audio);
					// clipContainer.appendChild(clipLabel);
					// clipContainer.appendChild(deleteButton);
					// soundClips.appendChild(clipContainer);

					// audio.controls = true;
					var blob = new Blob(this.chunks, {type: 'audio/ogg; codecs=opus'});
					this.chunks = [];
					var audioURL = URL.createObjectURL(blob);
          // audio.src = audioURL;
  
           this.mensagens.push({
            mensagem:  this.dom.bypassSecurityTrustUrl(audioURL),
            usuario: true,
            error: false,
            audio:true
           })   
					this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
					console.log(audioURL);
					console.log('recorder stopped');
					this.cd.detectChanges();
				};
				this.mediaRecorder.ondataavailable = e => {
					this.chunks.push(e.data);
				};
			},
			() => {
				alert('Error capturing audio.');
			},
		);
     
  }


  preencherMensagemVazia(){
    this.mensagens.push({
      mensagem: String("Favor Digitar uma Mensagem..."),
      usuario: false, 
      error: true,
      audio:false
    })
=======
  preencherMensagemVazia() {
    this.mensagens.push({
      mensagem: 'Favor Digitar uma Mensagem...',
      usuario: false,
      error: true,
    });
>>>>>>> bb660012c493fc722194a307cba023b9d999260c
  }

  pararAudio(){
    this.mediaRecorder.stop();
		console.log(this.mediaRecorder.state);
    console.log('recorder stopped');

  }

  comecarAudio(){
	  this.mediaRecorder.start();
		console.log(this.mediaRecorder.state);
		console.log('recorder started');
  }
}

