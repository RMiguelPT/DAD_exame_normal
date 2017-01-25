import { Component } from '@angular/core';
import { AuthenticationService } from "./../_services/authentication.service";
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import {Routes, RouterModule } from '@angular/router';
import { GameService } from "./../_services/game.service";



@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `gamelobby.component.html`
})
export class GameLobbyComponent { 
        public player = sessionStorage.getItem('name').toString();
        public avatar = sessionStorage.getItem('avatar');
        private uid = sessionStorage.getItem('_id');
        public authToken:string = sessionStorage.getItem('id_token');
        public pathLogout = 'http://localhost:7777/api/v1/';
        public isLogged = true;
        private allGamesPending: any[] = [];
        private allGamesRunning: any[] = [];
        private userGames: any[] = [];
        private Path: string;
        private gameId:any;
        public body:any;

    constructor (private authentication: AuthenticationService, public router: Router,public http: Http, private game : GameService){
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
    joinGame(gameId : any){
      

        let player: any;    
         
        this.gameId = gameId;
        this.getGame(this.gameId);
        this.userGames = [{player: player}];

        this.userGames.push({ player: this.uid, score: 0 });
        this.body = JSON.stringify({ players: this.userGames, state: 'pending' });
        this.updateGame(this.body, this.gameId);

        console.log(gameId);
        console.log(this.userGames);

    }
    getGame(gameId : any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.get(this.Path + 'games/' + gameId, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {

                if (response.json().players.length < 4) {

                    this.userGames = response.json().players;

                    console.log(this.userGames);

                    this.userGames.push({
                        uid: this.uid, name: this.player,
                        statusDate: Date.now(), score: 0, stars:0
                    });

                    
                    this.body = JSON.stringify({ players: this.userGames, state: 'pending' });


                    this.updateGame(this.body, gameId);

                }

            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }

    updateGame(body: any, gameId: any) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.put(this.Path + 'games/' + gameId, body, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.router.navigate(['board', gameId]);

            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );

    }

    logout(event: any, username: any, password: any) {
      this.authentication.logout();
  }
}
