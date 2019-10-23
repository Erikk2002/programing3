var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Wather extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }   
       
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        watherHashiv++
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply >= 8) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;

            let wather = new Wather(x, y);
            watherArr.push(wather);

            this.multiply = 0;
        }


    }
}