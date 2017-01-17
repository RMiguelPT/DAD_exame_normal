"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(router, http) {
        this.router = router;
        this.http = http;
        this.player = '';
        this.islogged = false;
    }
    LoginComponent.prototype.getPlayer = function (event, username, password) {
        var _this = this;
        console.log("Entrou - LOGIN");
        var body = JSON.stringify({ username: username, password: password });
        var name = JSON.stringify({ password: password });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:7777/api/v1/login', body, { headers: headers })
            .subscribe(function (response) {
            if (response.ok) {
                sessionStorage.setItem('_id', response.json().id);
                sessionStorage.setItem('id_token', response.json().token);
                sessionStorage.setItem('name', response.json().name);
                sessionStorage.setItem('totalvictories', response.json().totalvictories);
                sessionStorage.setItem('username', response.json().username);
                sessionStorage.setItem('avatar', response.json().avatar);
            }
            console.log(response);
            _this.islogged = true;
            _this.router.navigate(['gamelobby']);
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: "login.component.html"
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map