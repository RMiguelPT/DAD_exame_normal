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
var Observable_1 = require("rxjs/Observable");
var io = require("socket.io-client");
var WebSocketService = (function () {
    function WebSocketService() {
        if (!this.socket) {
            this.socket = io("http://localhost:7777");
        }
    }
    WebSocketService.prototype.sendChatMessage = function (message) {
        this.socket.emit('chat', message);
    };
    WebSocketService.prototype.getPlayersMessages = function () {
        return this.listenOnChannel('players');
    };
    WebSocketService.prototype.getChatMessages = function () {
        return this.listenOnChannel('chat');
    };
    // Extra Exercise
    WebSocketService.prototype.sendClickElementMessage = function (index) {
        this.socket.emit('clickElement', index);
    };
    WebSocketService.prototype.getBoardMessages = function () {
        return this.listenOnChannel('board');
    };
    WebSocketService.prototype.sendChatMessageGame = function (message, gameId) {
        this.socket.emit('chat', message);
    };
    WebSocketService.prototype.getPlayersMessagesGame = function () {
        return this.listenOnChannel('players');
    };
    WebSocketService.prototype.sendGameChatMessage = function (msgData) {
        this.socket.emit('chatGame', msgData);
    };
    WebSocketService.prototype.sendGamePlayersMessage = function (msgData) {
        this.socket.emit('gameNotification', msgData);
    };
    WebSocketService.prototype.getGameChatMessages = function () {
        return this.listenOnChannel('chatGame');
    };
    WebSocketService.prototype.getGamePlayersMessages = function () {
        return this.listenOnChannel('gameNotification');
    };
    WebSocketService.prototype.listenOnChannel = function (channel) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            _this.socket.on(channel, function (data) {
                observer.next(data);
            });
            return function () { return _this.socket.disconnect(); };
        });
    };
    return WebSocketService;
}());
WebSocketService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], WebSocketService);
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=websocket.service.js.map