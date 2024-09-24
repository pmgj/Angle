import Answer from "./Answer.js";
import GuessNumber from "./GuessNumber.js";
import Winner from "./Winner.js";

class GUI {
    constructor() {
        this.game = null;
    }
    updateTries() {
        document.querySelector("#tries").textContent = this.game.getTries();
        document.querySelector("#totalTries").textContent = GuessNumber.TOTAL_TRIES;
    }
    createAngle() {
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let angle = this.game.getNumber() * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(100 + 70 * Math.cos(angle), 100 + 70 * Math.sin(angle));
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(170, 100);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.arc(100, 100, 30, 0, angle, false);
        ctx.stroke();
        ctx.closePath();
    }
    addResult(a, b, c) {
        let tbody = document.querySelector("table tbody");
        let tr = tbody.insertRow();
        let td1 = tr.insertCell();
        td1.innerHTML = `${a}º`;
        let td2 = tr.insertCell();
        td2.innerHTML = b;
        let td3 = tr.insertCell();
        td3.innerHTML = c;
    }
    disableInput() {
        let input = document.querySelector("#n");
        input.disabled = true;
        let button = document.querySelector("input[type='button']");
        button.value = "Start";
        button.focus();
        button.onclick = () => {
            this.registerEvents();
            input.disabled = false;
            input.focus();
        };
    }
    process() {
        let input = document.querySelector("#n");
        let n = input.valueAsNumber;
        if (isNaN(n)) return;
        let obj = this.game.check(n);
        switch (obj.winner) {
            case Winner.LOSE:
                this.addResult(obj.number, "🤔", "🤔");
                this.disableInput();
                break;
            case Winner.WIN:
                this.addResult(obj.number, "🥳", "🥳");
                this.disableInput();
                break;
            case Winner.NONE:
                let arrow = obj.answer === Answer.BIGGER ? "⬇" : "⬆";
                let texts = ["Boiling!\ud83d\udd25", "Hot!", "Getting Hot", "Warm", "Cold!", "Freezing!\ud83e\udd76"];
                let index = obj.close.findIndex(x => x);
                this.addResult(obj.number, arrow, texts[index]);
                break;
        }
        this.updateTries();
        input.value = "";
        input.focus();
    }
    registerEvents() {
        this.game = new GuessNumber();
        this.updateTries();
        this.createAngle();
        let button = document.querySelector("input[type='button']");
        button.onclick = this.process.bind(this);
        let form = document.forms[0];
        form.onsubmit = (evt) => {
            evt.preventDefault();
            this.process();
        };
        let tbody = document.querySelector("table tbody");
        tbody.innerHTML = "";
    }
}
let gui = new GUI();
gui.registerEvents();