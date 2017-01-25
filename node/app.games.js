"use strict";
var mongodb = require('mongodb');
var util = require('util');
var app_database_1 = require('./app.database');
var app_deck_1 = require("./app.deck");
var Game = (function () {
    function Game() {
        var _this = this;
        this.handleError = function (err, response, next) {
            response.send(500, err);
            next();
        };
        this.returnGame = function (id, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .findOne({
                _id: id
            })
                .then(function (game) {
                if (game === null) {
                    response.send(404, 'Game not found');
                }
                else {
                    response.json(game);
                }
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGames = function (request, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .find({
                state: 'playing'
            })
                .toArray()
                .then(function (games) {
                response.json(games || []);
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGamesPending = function (request, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .find({
                state: 'pending'
            })
                .toArray()
                .then(function (games) {
                response.json(games || []);
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGamesRunnig = function (request, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .find({
                state: 'playing'
            })
                .toArray()
                .then(function (games) {
                response.json(games || []);
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGamesFinished = function (request, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .find({
                state: 'finished'
            })
                .toArray()
                .then(function (games) {
                response.json(games || []);
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGame = function (request, response, next) {
            var id = new mongodb.ObjectID(request.params.id);
            _this.returnGame(id, response, next);
        };
        this.updateGame = function (request, response, next) {
            var id = new mongodb.ObjectID(request.params.id);
            var game = request.body;
            if (game === undefined) {
                response.send(400, 'No game data');
                return next();
            }
            delete game._id;
            app_database_1.databaseConnection.db.collection('games')
                .updateOne({
                _id: id
            }, {
                $set: game
            })
                .then(function (result) { return _this.returnGame(id, response, next); })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.createGame = function (request, response, next) {
            var game = request.body;
            if (game === undefined) {
                response.send(400, 'No game data');
                return next();
            }
            app_database_1.databaseConnection.db.collection('games')
                .insertOne(game)
                .then(function (result) { return _this.returnGame(result.insertedId, response, next); })
                .catch(function (err) { return _this.handleError(err, response, next); });
            var deck;
            deck = new app_deck_1.Deck();
            // deck.createDeck();
        };
        this.deleteGame = function (request, response, next) {
            var id = new mongodb.ObjectID(request.params.id);
            app_database_1.databaseConnection.db.collection('games')
                .deleteOne({
                _id: id
            })
                .then(function (result) {
                if (result.deletedCount === 1) {
                    response.json({
                        msg: util.format('Game -%s- Deleted', id)
                    });
                }
                else {
                    response.send(404, 'No game found');
                }
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        // Routes for the games
        this.init = function (server, settings) {
            server.get(settings.prefix + 'games', settings.security.authorize, _this.getGames);
            //server.get(settings.prefix + 'games/:id', settings.security.authorize, this.getGame);
            //server.get(settings.prefix + 'games/:id', this.getGame);
            server.get(settings.prefix + 'finishedGames', _this.getGamesFinished);
            server.put(settings.prefix + 'games/:id', settings.security.authorize, _this.updateGame);
            server.post(settings.prefix + 'games', settings.security.authorize, _this.createGame);
            server.get(settings.prefix + 'pendingGames', _this.getGamesPending);
            server.get(settings.prefix + 'runningGames', _this.getGamesRunnig);
            server.del(settings.prefix + 'games/:id', settings.security.authorize, _this.deleteGame);
            console.log("Games routes registered");
        };
    }
    return Game;
}());
exports.Game = Game;
