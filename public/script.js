let matrix = [];
let side = 10;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let waterArr = [];
let fishArr = [];
let count = 1;
function setup() {
    matrixGenerator(40, 50, 5, 3, 1);
    frameRate(7);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#B3672B');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {

                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            {
                if (matrix[y][x] == 3) {
                    let predator = new Predator(x, y);
                    predatorArr.push(predator);
                }
                if (matrix[y][x] == 4) {
                    let water = new Water(x, y);
                    waterArr.push(water);
                }
                if (matrix[y][x] == 5) {
                    let fish = new Fish(x, y);
                    fishArr.push(fish)
                }
            }
        }
    }
    function matrixGenerator(matrixSize, grass, grassEater, predator, water, fish) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = [];
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grass; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 1;
        }
        for (let i = 0; i < grassEater; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 2;
        }

        for (let i = 0; i < predator; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 3;
        }
        for (let i = 0; i < water; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 4;
        }
        for (let i = 0; i < fish; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 5;


        }
    }

}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("orange");
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("#3977ff")
            }
            else if (matrix[y][x] == 5) {
                fill("#145252")
            }
            rect(x * side, y * side, side, side);
        }
    }
    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in waterArr) {
        waterArr[i].mul();
        if (waterArr.length == 30 && count == 1) {
            let curr = random(waterArr);

            matrix[curr.y][curr.x] = 5;
            let fish = new Fish(curr.x, curr.y);
            fishArr.push(fish)

            for (let i in waterArr) {
                if (waterArr[i].x == curr.x && waterArr[i].y == curr.y) {
                    waterArr.splice(i, 1)
                }
            }
            count = 0;
        }
    }
    for (var i in fishArr) {
        fishArr[i].move();
    }
}