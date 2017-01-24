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
                this.value = 11;
                this.points = 11;
                this.img = "" + suit + index + ".png";
                this.played = false;
                this.turned = false;
                break;
        }
    }
    Card.prototype.toString = function () {
        return this.suit;
    };
    return Card;
}());
exports.Card = Card;
