let count = true;
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Fish = require("./modules/Fish.js");
let Wather = require("./modules/Wather.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
watherArr = [];
fishArr = [];
matrix = [];

//! Setting global arrays  -- END
grassHashiv = 0;
eatHashiv = 0;
huntHashiv = 0;
waterHashiv = 0;
predatorHashiv = 0;
watherHashiv = 0;


//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, wather, fish) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < wather; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fish; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(40, 50, 5, 3, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
           else  if (matrix[y][x] == 5) {
                let fish = new Fish(x, y);
                fishArr.push(fish);
                
            }
            else if (matrix[y][x] == 4) {
                let wather = new Wather(x, y);
                watherArr.push(wather);
               watherHashiv++;
            }
            else if (matrix[y][x] == 6) {
                let mard = new Mard(x, y);
                mardArr.push(mard);
               mardHashiv++;
            }
        }
    }
}
creatingObjects();

let exanak = 0


function game() {
    exanak++;
    if (exanak <= 10){
        weather = "spring";
    }
    else if (exanak <= 20){
        weather = "summer";
    }
    else if (exanak <= 30){
        weather = "autumn";
    }
    else if (exanak <= 40){
        weather = "winther";
    }
    else if (exanak = 50){
        exanak = 0;
    }



    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (watherArr[0] !== undefined) {
        for (var i in watherArr) {
            watherArr[i].mul();

            if (watherArr.length == 30 && count ) {
                count = false;
                let curr = random(watherArr);
                for (var l = 0; l < 5; l++){
                matrix[curr.y][curr.x] = 5;
                let fish = new Fish(curr.x, curr.y);
                fishArr.push(fish)
                }
                for (let i in watherArr) {
                    if (watherArr[i].x == curr.x && watherArr[i].y == curr.y) {
                        watherArr.splice(i, 1)
                    }
                }
                count = 0;
            }
        }
    }
    if (fishArr[0] !== undefined) {
        for (var i in fishArr) {
            fishArr[i].move();
        }
    }


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)