import Winner from "./Winner.js";
import Answer from "./Answer.js";

export default class GuessNumber {
    #number;
    #tries;
    static TOTAL_TRIES;
    constructor(tries = 6) {
        this.#number = this.#getRandomIntInclusive(0, 360);
        this.#tries = 0;
        GuessNumber.TOTAL_TRIES = tries;
    }
    #getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    check(n) {
        let obj = { number: n, tries: this.#tries };
        if (++this.#tries > GuessNumber.TOTAL_TRIES) {
            obj.winner = Winner.LOSE;
            obj.answer = Answer.NONE;
            obj.number = this.#number;
        } else if (n < this.#number) {
            obj.winner = Winner.NONE;
            obj.answer = Answer.SMALLER;
        } else if (n > this.#number) {
            obj.winner = Winner.NONE;
            obj.answer = Answer.BIGGER;
        } else {
            obj.winner = Winner.WIN;
            obj.answer = Answer.NONE;
        }
        let diff = Math.abs(n - this.#number);
        obj.close = [diff <= 5, diff > 5 && diff <= 10, diff > 10 && diff <= 20, diff > 20 && diff <= 50, diff > 50 && diff <= 100, diff > 100];
        return obj;
    }
    getNumber() {
        return this.#number;
    }
    getTries() {
        return this.#tries;
    }
}