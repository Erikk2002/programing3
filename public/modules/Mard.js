var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Mard extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
            this.life = 70;
            this.directions = [];
        }
        newDirections() {
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
            this.newDirections()
            var found = [];
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    if (matrix[y][x] == character) {
                        found.push(this.directions[i]);
                    }
                }
            }
            return found;
        }
        mul() {
            
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
    
            if (newCell) {
                mardHashiv++;
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 6;
                let mard = new Mard(x, y);
                mardArr.push(mard);
    
                this.life = 300;
            }
        }
        eat() {
            let emptyCells = this.chooseCell(2);
            let emptyCells1 = this.chooseCell(1);
            let emptyCells2 = this.chooseCell(3);
            let newCell = random(emptyCells.concat(emptyCells1.concat(emptyCells2)));
    
            if (newCell) {
                this.life++;
    
                let x = newCell[0];
                let y = newCell[1];
    
    
                matrix[y][x] = 6;
                matrix[this.y][this.x] = 0;
    
    
                this.y = y;
                this.x = x;
    
                if (this.life >= 100) {
                    this.mul();
                }
            } else {
                this.move()
            }
        }
        move() {
            this.life--;
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
    
            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];
    
    
                matrix[y][x] = 6;
                matrix[this.y][this.x] = 0;
    
                this.y = y;
                this.x = x;
            }
            if (this.life < 0) {
                this.die();
            }
        }
        die() {
            matrix[this.y][this.x] = 0;
    
            for (let i in mardArr) {
                if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
                    mardArr.splice(i, 1)
                }
            }
        }
    }