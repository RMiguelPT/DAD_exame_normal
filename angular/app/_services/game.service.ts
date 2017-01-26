import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class GameService {
    private creatorName = '';
    private player2Name = '';
    private player3Name = '';
    private player4Name = '';
     public authToken:string = sessionStorage.getItem('id_token');
     private Path: string;


    
constructor(public router: Router, private http: Http){}
    
     setPlayer2Name(name: any) {
        this.player2Name = name;
    }

    getPlayer2Name(){
        return this.player2Name;
        

    }

     setPlayer3Name(name: any) {
        this.player3Name = name;
        
    
    }

    getPlayer3Name(){
        return this.player3Name;
    }

     setPlayer4Name(name: any) {
        this.player4Name = name;
       
    
    }

    getPlayer4Name(){
        return this.player4Name;
    }


    setCreatorName(creator: any) {
        this.creatorName = creator;
    
    }

    getCreatorName(){
        return this.creatorName;
    }

    /*
    updateBoardNames(gameId: any) {
        let totPlayers: any;
        let games: any[] = [];
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.get(this.Path + 'games/' + gameId, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                //get the total players number
                totPlayers = response.json().players.length;
                games = response.json().players;
                if (totPlayers < 4) {
                    this.getGame(this.gameId);
                    this.userGames = [{player: player}];
                    this.body = JSON.stringify({ players: this.userGames, state: 'pending' });
                    this.updateGame(this.body, this.gameId);
                    for (let item of games) {
                            if (i==1) {
                                console.log(item.name);
                                this.game.setPlayer2Name(item.name);
                            }

                            if (i==2) {
                                console.log(item.name);
                                this.game.setPlayer3Name(item.name);
                            }

                            if (i==3) {
                                console.log(item.name);
                                this.game.setPlayer4Name(item.name);
                            }

                        }
                
                }else {
                   
                    
                }
        },
            error => {
                //alert(error.text());
                console.log(error.text());
            }
            );   
    }
    
*/
}






