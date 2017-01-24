const mongodb = require('mongodb');
const util = require('util');
import {HandlerSettings} from './handler.settings';
import {databaseConnection as database} from './app.database';
import { Card } from "./app.card";

enum Suit {
    copas,
    espadas,
    ouros,
    paus,
}
export class Deck {

    static Suit = Suit;

   private _cards: Array<Card>;

    constructor() {
        this._cards = [];
    }
 
    addCard(card: Card): void {
        // You can bypass runtime type checking here if you're using all TypeScript,
        // because the TypeScript compiler will emit a warning.  Otherwise, see 
        // the JavaScript sample for runtime type checking.
 
        this._cards.push(card);
    }
 
   /* dealCard(): CardComponent {
        if (this._cards.length === 0)
            throw new RangeError('No cards to deal.');
 
        return this._cards.pop();
    }*/
 
  /*  shuffle(numTimes: number = 5): void {
        var cards = this._cards;
        var cardCount = cards.length;
 
        // Do the shuffle operation numTimes times.
        for (var time = 0; time < numTimes; time++) {
            // Visit every card position once per "time"
            for (var index = 0; index < cardCount; index++) {
                // Create a random number in the range of [0, length)
                var numToSwap = Math.floor(Math.random() * cardCount);
                // Swap the cards at index and numToSwap
                var temp = cards[numToSwap];
                cards[numToSwap] = cards[index];
                cards[index] = temp;
            }
        }
    }*/
 
   
   public createDeck(){
       var card;
      for(var suit = Suit.copas ; suit <= Suit.paus; suit++)
      {
          for(var i = 1; i<=10; i++)
          {
              if (suit == Suit.copas){
                card = new Card("c");
              }
              if (suit == Suit.espadas){
                card = new Card("e");
              }
              if (suit == Suit.ouros){
                  card = new Card("o");
              }
              if (suit == Suit.paus){
               card = new Card("p");
              }

              //console.log("" + i + " " + card.toString());
          }
      }
   }


}