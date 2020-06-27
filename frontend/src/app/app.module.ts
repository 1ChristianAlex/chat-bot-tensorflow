import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BarraSuperiorComponent } from './menu/barra-superior/barra-superior/barra-superior.component';
import { ModalChatComponent } from './menu/barra-superior/modal-chat/modal-chat/modal-chat.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SocketChatService } from './socket/services/socket-chat.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, BarraSuperiorComponent, ModalChatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
  exports: [MatSidenavModule, MatButtonModule, MatIconModule],
  providers: [SocketChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
