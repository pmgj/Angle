import Winner from "./Winner.js";

export default class GuessNumber {
    constructor(tries = 6) {
        this.number = this.getRandomIntInclusive(0, 360);
        this.tries = tries;
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    check(n) {
        let obj = {};
        if (--this.tries <= 0) {
            obj.winner = Winner.LOSE;
        }
        if (n < this.number) {
            obj.answer = Winner.SMALLER;
        } else if (n > this.number) {
            obj.answer = Winner.BIGGER;
        } else {
            obj.winner = Winner.WIN;
        }
        obj.close = Math.abs(n - this.number) <= 5 ? true : false;
        return obj;
    }
    getNumber() {
        return this.number;
    }
    getTries() {
        return this.tries;
    }
}