import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { GameService } from "./../_services/game.service";
import { Component, Input, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import {Routes, RouterModule } from '@angular/router';
import { WebSocketService } from '../notifications/websocket.service';
import { AuthenticationService } from './../_services/authentication.service';
import { BoardComponent } from './board.component';



@Component({
	moduleId: module.id,
	selector: 'newGame',
	templateUrl: 'newGame.component.html'
})

export class NewGameComponent implements OnInit {
    public Players: any[] = [];
	public authToken: any;
	private path: string;
	private uid: any;
	private userName: any;
    private beginDate: any;
    private endDate: any;
    private winner1: any;
    private winner2: any;
    private creator: any;

	constructor(public router: Router, public http: Http, private websocketService: WebSocketService, private gameService: GameService) {
		this.uid = sessionStorage.getItem('_id');
		this.userName = sessionStorage.getItem('username');
		this.authToken = sessionStorage.getItem('id_token');
		this.path = 'http://localhost:7777/api/v1/';
        this.beginDate = Date.now();
        this.endDate='';
        this.winner1='';
        this.winner2='';
        this.creator = sessionStorage.getItem('name');

		
	}

	
	 ngOnInit() {
        this.setCreatorName(this.userName);
    }

    createGame() {

		let player: any = {
			uid: this.uid, name: this.userName,
			statusDate: Date.now(), score: 0, stars:0
		};

		this.Players = [{
			player: player
		}];

		let playerID = sessionStorage.getItem('_id') + ' - ' + this.userName;
		alert(playerID);

		let body = JSON.stringify({ beginDate: this.beginDate, endDate: this.endDate, winner1: this.winner1, winner2: this.winner2, 
			creator: playerID, players: this.Players, state: 'pending' });
		
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'bearer ' + this.authToken);
		console.log(body);

		this.http
			.post(this.path + 'games', body,
			<RequestOptionsArgs>{ headers: headers, withCredentials: false })
			.subscribe(response => {

				if (response.ok) {
					this.router.navigate(['board', response.json()._id]);

				}
			}, error => {

				alert(error.text());
				console.log(error.text());
			}


			);
	}


		setCreatorName(username: any) {
	        this.gameService.setCreatorName(this.userName);
	  }
}