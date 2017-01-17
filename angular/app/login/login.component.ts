import { Component } from '@angular/core';
import { router } from "./../app.router";
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';



@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `login.component.html`
})
export class LoginComponent {
    public player = '';
    public islogged = false;

     constructor (public router: Router,public http: Http){
       
    }

    getPlayer(event: any, username: any, password: any) {
        console.log("Entrou - LOGIN");
       

        let body = JSON.stringify({username, password});
        let name = JSON.stringify({password});
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://localhost:7777/api/v1/login', body, {headers: headers})
        .subscribe(
            response => {
                if (response.ok) {
                    sessionStorage.setItem('_id', response.json().id);
                    sessionStorage.setItem('id_token', response.json().token);
                    sessionStorage.setItem('name', response.json().name);
                    sessionStorage.setItem('totalvictories', response.json().totalvictories);
                    sessionStorage.setItem('username', response.json().username);
                    sessionStorage.setItem('avatar', response.json().avatar);
                }

                console.log(response);
                this.islogged = true;
                this.router.navigate(['gamelobby']);
            }, 
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }
 }