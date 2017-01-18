import { Authentication } from '../../node/app.authentication';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';

import { NotificationModule } from './notifications/notifications.module';
import {ChatComponent} from './chat.component';
import {BoardComponent} from './game/board.component';
import { WebSocketService } from './notifications/websocket.service';
import { AboutComponent }  from './about/about.component';
import { LoginComponent } from './login/login.component';
import { LogOutComponent } from './logout/logout.component';
import { SignUpComponent } from './signup/signup.component';
import { GameLobbyComponent } from './gamelobby/gamelobby.component';
import { TopTenComponent } from './topten/topten.component';


//services
import { AuthenticationService } from './_services/authentication.service';

@NgModule({
  imports:      [ BrowserModule, NotificationModule, FormsModule, HttpModule,routes ],
  declarations: [ AppComponent, ChatComponent, BoardComponent, AboutComponent, LoginComponent,LogOutComponent, SignUpComponent, GameLobbyComponent, TopTenComponent ],
  providers:    [ WebSocketService, AuthenticationService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
