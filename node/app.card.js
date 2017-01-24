"use strict";
var mongodb = require('mongodb');
var util = require('util');
var Card = (function () {
    /**
     *
     *
     */
    function Card(suit, index) {
        //console.log("On app.cards.ts" + suit);
        //console.log(this.suit);
        this.suit = suit;
        switch (index) {
            case 1:
                this.strenght = 11;
                this.points = 11;
                this.img = "" + suit + index + ".png";
                break;
            case 7:
                this.strenght = 10;
                this.points = 10;
                this.img = "" + suit + index + ".png";
                break;
            case 11:
                this.strenght = 7;
                this.points = 2;
                this.img = "" + suit + index + ".png";
                break;
            case 12:
                this.strenght = 8;
                this.points = 3;
                this.img = "" + suit + index + ".png";
                break;
            case 13:
                this.strenght = 9;
                this.points = 4;
                this.img = "" + suit + index + ".png";
                break;
            default:
                this.strenght = index - 1;
                this.points = 0;
                this.img = "" + suit + index + ".png";
                break;
        }
        this.played = false;
        this.turned = false;
    }
    Card.prototype.toString = function () {
        return this.img + "\n" + "strenght: " +
            this.strenght + "\n" + "POINTS: " + this.points;
    };
    return Card;
}());
exports.Card = Card;
