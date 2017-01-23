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
var authentication_service_1 = require("./../_services/authentication.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var GameLobbyComponent = (function () {
    function GameLobbyComponent(authentication, router, http, authenticationService) {
        this.authentication = authentication;
        this.router = router;
        this.http = http;
        this.authenticationService = authenticationService;
        this.player = sessionStorage.getItem('name').toString();
        this.avatar = sessionStorage.getItem('avatar');
        this.userId = sessionStorage.getItem('_id');
        this.pathLogout = 'http://localhost:7777/api/v1/';
        this.isLogged = true;
        this.allGamesPending = [];
        this.allGamesRunning = [];
        this.userGames = [];
        this.Path = 'http://localhost:7777/api/v1/';
        this.getGamesPending();
        this.getGamesRunnig();
    }
    GameLobbyComponent.prototype.getGamesPending = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .get(this.Path + 'pendingGames', { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            _this.allGamesPending = response.json();
            console.log(response.json());
        }, function (error) {
            //alert(error.text());
            console.log(error.text());
        });
    };
    GameLobbyComponent.prototype.getGamesRunnig = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .get(this.Path + 'runningGames', { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            _this.allGamesRunning = response.json();
            console.log(response.json());
        }, function (error) {
            //alert(error.text());
            console.log(error.text());
        });
    };
    GameLobbyComponent.prototype.logout = function (event, username, password) {
        this.authenticationService.logout();
    };
    return GameLobbyComponent;
}());
GameLobbyComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: "gamelobby.component.html"
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router, http_1.Http, authentication_service_1.AuthenticationService])
], GameLobbyComponent);
exports.GameLobbyComponent = GameLobbyComponent;
//# sourceMappingURL=gamelobby.component.js.map