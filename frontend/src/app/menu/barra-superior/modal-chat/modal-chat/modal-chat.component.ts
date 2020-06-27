import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { isNull } from 'util';
import { SocketChatService } from '../../../../socket/services/socket-chat.service';
import { Conversa } from '../../../model/Conversa';
import { DomSanitizer } from '@angular/platform-browser';

declare var MediaRecorder: any;

@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss'],
})
export class ModalChatComponent implements OnInit {
  chunks = [];
  audioFiles = [];
  mensagens: Conversa[] = [];
  valor: string;
  usuario = true;
  mediaRecorder: any;
  canRecord = true;
  constructor(
    private Socket: SocketChatService,
    private dom: DomSanitizer,
    private cd: ChangeDetectorRef
  ) { }

  onSubmit() {
    return this.valor != null ? this.valor : null;
  }
  selectedFile: File

<<<<<<< HEAD
  async onFileChanged(event) {

    this.selectedFile = event.target.files[0];

    this.enviarImagem(this.selectedFile)

  }
  async enviarImagem(imagem: File) {

    this.mensagens.push({
      mensagem: "Arquivo enviado com sucesso", 
      usuario: true, 
      audio: false,
      error: false,
      imagem:true
    }); 
    const response = (await this.Socket.sendImage(imagem))
    

  }
  async preencherMensagem(response: string) {
=======
  async preencherMensagem(response) {
>>>>>>> dbe38e14a2c362456e0ccd4e5d479d8231ad7509
    this.mensagens.push({
      mensagem: String(response),
      usuario: false,
      error: false,
      audio: false,
      imagem:false
    });
  }

  async enviarDado() {
    if (this.valor) {
      this.mensagens.push({
        mensagem: String(this.valor),
        usuario: true,
        error: false,
        audio: false,
        imagem:false
      });
      const response: any = await this.Socket.SendMensage(this.valor);

      this.preencherMensagem(response.data);
    } else {
      this.preencherMensagemVazia();
    }
    this.mensagens = this.mensagens.filter((mensagem) => !isNull(mensagem));
    this.valor = null;
  }
  ngOnInit(): void {
    navigator.getUserMedia(
      { audio: true },
      (stream) => {
        const options = {
          audioBitsPerSecond: 48000,
          mimeType: 'audio/webm; codecs=opus',
        };
        this.mediaRecorder = new MediaRecorder(stream, options);
        this.mediaRecorder.onstop = async (e) => {
          console.log('data available after MediaRecorder.stop() called.');
<<<<<<< HEAD
=======

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

          // const blob = new Blob(this.chunks, {
          //   type: 'audio/wav',
          // });

>>>>>>> dbe38e14a2c362456e0ccd4e5d479d8231ad7509
          const blob = new Blob(this.chunks, {
            type: 'audio/webm; codecs=opus',
          });

          this.chunks = [];
          const audioURL = URL.createObjectURL(blob);
          // audio.src = audioURL;

          this.mensagens.push({
            mensagem: this.dom.bypassSecurityTrustUrl(audioURL),
            usuario: true,
            error: false,
            audio: true,
            imagem: false
          });
          this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
          console.log('recorder stopped');
          this.cd.detectChanges();
        };
        this.mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
        };
      },
      () => {
        alert('Error capturing audio.');
      }
    );
  }

  preencherMensagemVazia() {
    this.mensagens.push({
      mensagem: String('Favor Digitar uma Mensagem...'),
      usuario: false,
      error: true,
      audio: false,
      imagem: false
    });
  }

  pararAudio() {
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder.state);
    console.log('recorder stopped');
  }

  comecarAudio() {
    this.mediaRecorder.start();
    console.log(this.mediaRecorder.state);
    console.log('recorder started');
    setTimeout(() => {
      this.pararAudio();
    }, 5000);
    this.Socket.startAudioBack().then((res: any) => {
      this.mensagens.push({
        mensagem: String(res.pergunta),
        usuario: true,
        error: false,
        audio: false,
      });
      this.preencherMensagem(res.data);
    });
    setInterval(() => {
      this.canRecord = true;
    }, 1000);
  }
}
