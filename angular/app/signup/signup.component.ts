import { Component } from '@angular/core';
import { router } from "./../app.router";
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `signup.component.html`
})
export class SignUpComponent { 
    
    
    
    constructor(public router: Router, public http: Http) {


    }


    
    createPlayer(name: any, username: any, passwordHash: any, passwordConfirmation: any, email: any) {
        console.log("Entrou - SIGNUP");
        let avatar = "";
        let totalVictories = 0;


        let body = JSON.stringify({ name, username, passwordHash, email, avatar, totalVictories });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .post('http://localhost:7777/api/v1/players/createPlayer', body, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                alert("Registation success");
                this.router.navigate(['login']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );


        }
    }
