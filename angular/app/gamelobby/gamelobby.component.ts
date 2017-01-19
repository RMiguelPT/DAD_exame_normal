import { Component } from '@angular/core';
import { router } from "./../app.router";
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';



@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `gamelobby.component.html`
})
export class GameLobbyComponent { 
        public player = sessionStorage.getItem('name').toString();
        public avatar = sessionStorage.getItem('avatar');
        private userId = sessionStorage.getItem('_id');
        public pathLogout = 'http://localhost:7777/api/v1/';
        public isLogged = true;
        private allGames: any[] = [];
        private userGames: any[] = [];
        private Path: string;
        

    constructor (private authentication: AuthenticationService, public router: Router,public http: Http, private authenticationService: AuthenticationService){
       this.Path = 'http://localhost:7777/api/v1/';
       this.getGamesPending();

    }

    getGamesPending() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .get(this.Path + 'pendingGames', <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.allGames = response.json();
                console.log(response.json());
            },
            error => {
                //alert(error.text());
                console.log(error.text());
            }
            );

    }

    logout(event: any, username: any, password: any) {
      this.authenticationService.logout();
  }
}
