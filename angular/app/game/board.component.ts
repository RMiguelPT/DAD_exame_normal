import { Component, Input, OnInit } from '@angular/core';
import {WebSocketService } from '../notifications/websocket.service';
import { NewGameComponent } from './../game/newGame.component';
import { GameService } from "./../_services/game.service";

@Component({
    moduleId: module.id,
    selector: 'board',
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.css']
})
export class BoardComponent implements OnInit{
    public elementos: number[] = [];
    public creatorName ='';
    public player2Name='';
    public player3Name='';
    public player4Name='';

    constructor(private websocketService: WebSocketService, private gameService: GameService ) {
       
    }

    ngOnInit() {
        this.elementos = [];
        this.websocketService.getBoardMessages().subscribe((m:any) => {
            console.log(m);
            this.elementos = m;
        });
         this.getCreatorName();
         this.getPlayer2Name();
         this.getPlayer3Name();
         this.getPlayer4Name();
    }
    
    clickElemento(index: number){
        this.websocketService.sendClickElementMessage(index);
    }

    getColor(elemento: number){
        switch (elemento) {
            case 0: return 'lightgray';
            case 1: return 'blue';
            case 2: return 'red';
        }
        return 'white';
    }

    getCreatorName(){
        this.creatorName = this.gameService.getCreatorName();
    }

    getPlayer2Name() {
        this.player2Name = this.gameService.getPlayer2Name();
    }

     getPlayer3Name() {
        this.player3Name = this.gameService.getPlayer3Name();
    }

     getPlayer4Name() {
        this.player4Name = this.gameService.getPlayer4Name();
    }
}



