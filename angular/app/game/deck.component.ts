import { Component, Input, OnInit } from '@angular/core';
import {WebSocketService } from '../notifications/websocket.service';
import { NewGameComponent } from './../game/newGame.component';
import { GameService } from "./../_services/game.service";

enum Suit {
    copas,
    espadas,
    ouros,
    paus,
}

@Component({
    moduleId: module.id,
    selector: 'deck',
    templateUrl: 'deck.component.html'
    //styleUrls: ['board.component.css']
})
export class DeckComponent implements OnInit{
   
      static Suit = Suit;

    constructor(private websocketService: WebSocketService, private gameService: GameService ) {
       
    }

    ngOnInit() {

    }



}