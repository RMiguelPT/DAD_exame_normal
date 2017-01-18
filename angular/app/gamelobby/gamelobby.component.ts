import { Component } from '@angular/core';
import { router } from "./../app.router";
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';



@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `gamelobby.component.html`
})
export class GameLobbyComponent { 
        public player = sessionStorage.getItem('_id').toString();
        public islogged = false;
        public pathLogout = 'http://localhost:7777/api/v1/';
        public isLogged = true;

    constructor (public router: Router,public http: Http, private authenticationService: AuthenticationService){
       
    }


    logout(event: any, username: any, password: any) {
      this.authenticationService.logout();
  }
}
