"use strict";
var io = require('socket.io');
var WebSocketServer = (function () {
    function WebSocketServer() {
        var _this = this;
        this.board = [];
        this.init = function (server) {
            _this.initBoard();
            _this.io = io.listen(server);
            _this.io.sockets.on('connection', function (client) {
                client.emit('players', Date.now() + ': Welcome to DAD - Sueca');
                client.broadcast.emit('players', Date.now() + ': A new player has arrived');
                client.on('chat', function (data) { return _this.io.emit('chat', data); });
                client.on('chatGame', function (msgData) {
                    client.join(msgData.id);
                    client.emit('chatGame', msgData.name + ': ' + msgData.msg);
                    client.to(msgData.id).emit('chatGame', msgData.name + ': ' + msgData.msg);
                });
                client.on('gameNotification', function (msgData) {
                    var sessionid = client.id;
                    client.join(msgData.id);
                    client.emit('gameNotification', msgData.name + ': Welcome to game Room ' + msgData.id);
                    client.broadcast.to(msgData.id).emit('gameNotification', Date.now() + ': ' + msgData.name + ' has arrived');
                });
                //Extra Exercise
                client.emit('board', _this.board);
                client.on('clickElement', function (indexElement) {
                    _this.board[indexElement]++;
                    if (_this.board[indexElement] > 2) {
                        _this.board[indexElement] = 0;
                    }
                    _this.notifyAll('board', _this.board);
                });
            });
        };
        this.notifyAll = function (channel, message) {
            _this.io.sockets.emit(channel, message);
        };
        this.notifyGameId = function (channel, message, gameId) {
            _this.io.sockets.emit(channel, message, gameId);
        };
    }
    WebSocketServer.prototype.initBoard = function () {
        for (var i = 0; i < 100; i++) {
            this.board[i] = 0;
        }
    };
    return WebSocketServer;
}());
exports.WebSocketServer = WebSocketServer;
;
