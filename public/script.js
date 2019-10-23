
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 10;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterLiveCountElement = document.getElementById('grassEaterLiveCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let predatorLiveCountElement = document.getElementById('predatorLiveCount');
    let watherCountElement = document.getElementById('watherCount');
    let watherLiveCountElement = document.getElementById('watherLiveCount');
    let fishCountElement = document.getElementById('fishCount');
    let fishLiveCountElement = document.getElementById('fishLiveCount');
    let mardCountElement = document.getElementById('mardCount');
    let mardLiveCountElement = document.getElementById('mardLiveCount');

    let weatherElement = document.getElementById('weather');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        grassEaterLiveCountElement.innerText = data.grassEaterLiveCounter;
        predatorCountElement.innerText = data.predatorCounter;
        predatorLiveCountElement.innerText = data.predatorLiveCounter;
        watherCountElement.innerText = data.watherCounter;
        watherLiveCountElement.innerText = data.watherLiveCounter;
        fishCountElement.innerText = data.fishCounter;
        fishLiveCountElement.innerText = data.fishLiveCounter;
        mardCountElement.innerText = data.mardCounter;
        mardLiveCountElement.innerText = data.mardLiveCounter;
        weatherElement.innerText = data.weather;
     
        createCanvas(matrix[0].length * side, matrix.length * side);
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == "summer"){
                        fill("green");
                    }
                    else if (data.weather == "autumn"){
                        fill ("orange");
                    }
                    else if (data.weather == "winther"){
                        fill ("rgb(204, 255, 255)");
                    }
                    else if (data.weather == "spring"){
                        fill("rgb(123, 163, 107)");
                    }
                    rect(j * side, i * side, side, side);
                }
                 else if (matrix[i][j] == 2) {
                    fill("pink");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
              
                }
                else if (matrix[i][j] == 6) {
                    fill('black');
                    rect(j * side, i * side, side, side);
              
                }
            }
        }
    }
}