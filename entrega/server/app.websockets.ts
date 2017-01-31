//import { ReflectGetMetadataInvalidTarget } from 'reflect-metadata/temp/test/spec';
import { Game } from "./app.games";
const io = require('socket.io');
const mongodb = require('mongodb');
import {databaseConnection as database} from './app.database';

export class WebSocketServer {
    public board: number[] = [];
    public io: any;
    public game: Game = new Game();
    

    public initBoard(){
        for(let i=0; i<100; i++) {
            this.board[i]=0;
        }
    }

    public init = (server: any) => {
        this.initBoard();
        this.io = io.listen(server);            
        this.io.sockets.on('connection', (client: any) => {
            client.emit('players', Date.now() + ': Welcome to DAD - Sueca');
            client.broadcast.emit('players', Date.now() + ': A new player has arrived');
            client.on('chat', (data) => this.io.emit('chat', data));
            
            client.on('chatGame', (msgData) => {

                client.join(msgData.id);
                client.emit('chatGame', msgData.name + ': ' + msgData.msg);
                client.to(msgData.id).emit('chatGame', msgData.name + ': ' + msgData.msg);

            });

            client.on('gameNotification', (msgData) => {
                var sessionid = client.id;

                client.join(msgData.id);
                client.emit('gameNotification', msgData.name + ': Welcome to game Room ' + msgData.id);
                client.broadcast.to(msgData.id).emit('gameNotification', Date.now() + ': ' + msgData.name + ' has arrived');


            });

          client.on('gameJoin', (msgData) => {
                        //client.join(msgData.id);
                       
                        var id = new mongodb.ObjectID(msgData.id);
                       database.db.collection('games')
                    .findOne({
                        _id: id
                    })
                    .then(game => {

                        //console.log(game);
                        
                         client.emit('gameJoin', game);
                        client.broadcast.to(msgData.id).emit('gameJoin', game);
                    });
             });

                     
            //Extra Exercise
            client.emit('board', this.board);
            client.on('clickElement', (indexElement) => {
                this.board[indexElement]++;
                if (this.board[indexElement] > 2) {
                    this.board[indexElement] = 0;
                }
                this.notifyAll('board', this.board);
            });

        });
    };
   public notifyAll = (channel: string, message: any) => {
        this.io.sockets.emit(channel, message);
    }; 

   public notifyGameId = (channel: string, message: any, gameId: any) => {
       this.io.sockets.emit(channel,message, gameId);
   } 
};
