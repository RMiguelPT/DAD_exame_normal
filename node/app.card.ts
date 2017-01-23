const mongodb = require('mongodb');
const util = require('util');
import {HandlerSettings} from './handler.settings';
import {databaseConnection as database} from './app.database';
import { Deck } from "./app.deck";

export class Card {

    private suit: string;
    private value: number;
    private img: string;
    private points: number;
    private played: boolean;
    private turned: boolean;

/**
 *    
 *    
 */
    constructor(suit: string, index: number) {
        //console.log("On app.cards.ts" + suit);
        //console.log(this.suit);
        this.suit = suit;
        switch (index){
            case 1: 
                this.value = 11;
                this.points = 11;
                this.img = "" + suit + index + ".png";
                this.played = false;
                this.turned = false;
                break;
                
        }
        
    }
    toString(){
        return this.suit;
    }
}