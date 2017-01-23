import { Component } from '@angular/core';
import { AuthenticationService } from "./../_services/authentication.service";
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import {Routes, RouterModule } from '@angular/router';



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
        private allGamesPending: any[] = [];
        private allGamesRunning: any[] = [];
        private userGames: any[] = [];
        private Path: string;
        

    constructor (private authentication: AuthenticationService, public router: Router,public http: Http, private authenticationService: AuthenticationService){
       this.Path = 'http://localhost:7777/api/v1/';
       this.getGamesPending();
       this.getGamesRunnig();

    }

    getGamesPending() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .get(this.Path + 'pendingGames', <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.allGamesPending = response.json();
                console.log(response.json());
            },
            error => {
                //alert(error.text());
                console.log(error.text());
            }
            );


    }
    getGamesRunnig() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .get(this.Path + 'runningGames', <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.allGamesRunning = response.json();
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
