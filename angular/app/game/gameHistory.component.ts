import { Component } from '@angular/core';
import { AuthenticationService } from "./../_services/authentication.service";
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import {Routes, RouterModule } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'gameHistory',
    templateUrl: 'gameHistory.component.html'
})

export class GameHistoryComponent {
    private history: any[] = [];
    private userHistory: any[] = [];
    private Path: string;
    private userId = sessionStorage.getItem('_id');
    private isLogged: boolean;

    constructor(private authentication: AuthenticationService, public router: Router, public http: Http) {
        this.Path = 'http://localhost:7777/api/v1/';
        this. isLogged = this.authentication.isLoggedIn();
        //this.getGameHistory();
    }









}