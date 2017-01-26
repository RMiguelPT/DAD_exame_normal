import { Component, Input, OnInit } from '@angular/core';
import {WebSocketService } from '../notifications/websocket.service';
import { NewGameComponent } from './../game/newGame.component';
import { GameService } from "./../_services/game.service";
import { elementAt } from 'rxjs/operator/elementAt';

@Component({
    moduleId: module.id,
    selector: 'board',
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.css']
})
export class BoardComponent implements OnInit{
    public elementos: number[] = [];
    public creatorName ='';
    public creatorAvatar :any;
    public player2Name='';
    public player2Avatar: any;
    public player3Name='';
    public player3Avatar: any;
    public player4Name='';
    public player4Avatar: any;

    constructor(private websocketService: WebSocketService, private gameService: GameService ) {
       
    }

    ngOnInit() {
        this.elementos = [];
        this.websocketService.getBoardMessages().subscribe((m:any) => {
            console.log(m);
            this.elementos = m;
        });
         this.getCreatorName();
         this.getCreatorAvatar();
         this.getPlayer2Name();
         this.getPlayer2Avatar();
         this.getPlayer3Name();
         this.getPlayer3Avatar();
         this.getPlayer4Name();
         this.getPlayer4Avatar();

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

    getCreatorAvatar() {
        this.creatorAvatar = this.gameService.getCreatorAvatar();
    }

    getPlayer2Name() {
        this.player2Name = this.gameService.getPlayer2Name();
    }

    getPlayer2Avatar() {
        this.player2Avatar = this.gameService.getPlayer2Avatar();
    }

     getPlayer3Name() {
        this.player3Name = this.gameService.getPlayer3Name();
    }

    getPlayer3Avatar() {
        this.player3Avatar = this.gameService.getPlayer3Avatar();
    }

     getPlayer4Name() {
        this.player4Name = this.gameService.getPlayer4Name();
    }

    getPlayer4Avatar() {
        this.player4Avatar = this.gameService.getPlayer4Avatar();
    }
}



