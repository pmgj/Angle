import GuessNumber from "./GuessNumber.js";
import Winner from "./Winner.js";

class GUI {
    constructor() {
        this.game = new GuessNumber();
        this.row = 1;
    }
    checkWord() {
        let td1 = document.querySelector(`main tbody tr:nth-child(${this.row}) td:first-child`);
        let td2 = document.querySelector(`main tbody tr:nth-child(${this.row}) td:last-child`);
        let angle = parseInt(td1.textContent);
        let mr = this.game.check(angle);
        if (mr.winner === Winner.LOSE) {
            this.unregisterEvents();
            message.textContent = `You lose! ${this.game.getNumber()}`;
            message.className = "bg-secondary text-white";
        } else if (mr.winner === Winner.WIN) {
            this.unregisterEvents();
            message.textContent = "Congratulations!";
            message.className = "bg-success text-white";
            td1.classList.add("bg-success");
            td1.classList.add("text-white");
        }

        if (mr.answer === Winner.SMALLER) {
            td1.classList.add(mr.close ? "bg-warning" : "bg-danger");
            td1.classList.add("text-white");
            td2.textContent = "⬆️";
        } else if (mr.answer === Winner.BIGGER) {
            td1.classList.add(mr.close ? "bg-warning" : "bg-danger");
            td1.classList.add("text-white");
            td2.textContent = "⬇️";
        }
        this.row++;
    }
    removeLetter() {
        let td = document.querySelector(`main tbody tr:nth-child(${this.row}) td:first-child`);
        if (td.textContent.length === 0) {
            return;
        }
        td.textContent = td.textContent.substring(0, td.textContent.length - 1);
    }
    addLetter(letter) {
        let td = document.querySelector(`main tbody tr:nth-child(${this.row}) td:first-child`);
        if (td.textContent.length >= 3) {
            return;
        }
        td.textContent += letter;
    }
    process(key) {
        switch (key) {
            case "Enter":
                this.checkWord();
                break;
            case "Backspace":
                this.removeLetter();
                break;
            default:
                if (key >= '0' && key <= '9')
                    this.addLetter(key);
        }
    }
    keyPressed(evt) {
        this.process(evt.key);
    }
    buttonPressed(evt) {
        this.process(evt.currentTarget.dataset.value);
    }
    fillBoard() {
        let tbody = document.querySelector("main tbody");
        for (let i = 0; i < this.game.getTries(); i++) {
            let tr = tbody.insertRow();
            tr.insertCell();
            tr.insertCell();
        }
    }
    createAngle() {
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(90, 50);
        ctx.arc(50, 50, 40, 0, this.game.getNumber() * Math.PI / 180, false);
        ctx.lineTo(50, 50);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(50, 50, 40, 0, this.game.getNumber() * Math.PI / 180, false);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.arc(50, 50, 10, 0, this.game.getNumber() * Math.PI / 180, false);
        ctx.stroke();
        ctx.closePath();
    }
    unregisterEvents() {
        window.onkeyup = undefined;
        let buttons = document.querySelectorAll("button");
        buttons.forEach(b => b.onclick = undefined);
    }
    registerEvents() {
        this.createAngle();
        this.fillBoard();
        window.onkeyup = this.keyPressed.bind(this);
        let buttons = document.querySelectorAll("button");
        buttons.forEach(b => b.onclick = this.buttonPressed.bind(this));
    }
}
let gui = new GUI();
gui.registerEvents();