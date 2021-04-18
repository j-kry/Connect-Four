//for the game board
var turn = "";
var player1 = "";
var player2 = "";

//Array to keep track of which row has a token placed
var indexes = [[0,1,2,3,4,5,6,7],
               [8,9,10,11,12,13,14,15],
               [16,17,18,19,20,21,22,23],
               [24,25,26,27,28,29,30,31],
               [32,33,34,35,36,37,38,39],
               [40,41,42,43,44,45,46,47],
               [48,49,50,51,52,53,54,55],
               [56,57,58,59,60,61,62,63]];
var clickedCol = "";

//Keep track of placed tokens
var currentBoard = [];
let currentBoardLength = 64;
for(var i = 0; i <currentBoardLength; i++) {
    currentBoard[i] = 0;
}

//Array with all winning combinations
let winArray = [];

let board = document.getElementById("board");

$(document).ready(function () {
    board.style.display = "none";
});

//On mouse enter highlight the column with the player color
//$(".column") returns everything with a class name of column
$(".column").mouseenter(function() {

    if(turn == player1) {
        this.style.border = "1px solid " + player1;
        this.style.backgroundColor = player1;
    }
    else {
        this.style.border = "1px solid " + player2;
        this.style.backgroundColor = player2;
    }
});

//On mouse leave turn the color back to normal
$(".column").mouseleave(function() {
    this.style.border = "1px solid #000";
    this.style.backgroundColor = "#1d70ec";
});

//When any column is clicked
$(".column").click(function() {

    //Get the id of the column
    clickedCol = this.id;

    placeToken(clickedCol.substring(6));

    changeTurn();

    //TODO make color change to next players color
    this.style.border = "1px solid #000";
    this.style.backgroundColor = "#1d70ec";

});

function changeTurn() {

    if(turn == player1)
        turn = player2;
    else
        turn = player1;

}

function placeToken(colNum) {


        var arrayLabel = document.getElementById("printArray");
        arrayLabel.innerHTML = "";

        //We need to get the id of the bottom-most dot

        //place token of the player color
        var length = indexes[colNum.length];
        var place = indexes[colNum[length-1]];
        alert(place);
        //document.getElementById(place + "").style.backgroundColor = turn;

        if(turn == player1) {
            var history = document.getElementById("history");
            history.innerHTML += colNum + ",";

            //Need to mark location in the array as having a player1 token
            // currentBoard[currentBoardLength - indexes[colNum-1] * colNum] = 1;
        }
        else{
            var history2 = document.getElementById("history2");
            history2.innerHTML += colNum + ",";

            //Need to mark location in the array as having a player2 token
            currentBoard[currentBoardLength - indexes[colNum-1] * colNum] = 2;
        }

        //decrement the column index
        indexes[colNum.pop()];

        // for(var i = 0; i < currentBoardLength; i++) {
        //     arrayLabel.innerHTML += currentBoard[i]  + ",";
        // }
    

}
//end game board script

//For the modal box on game.html
// Get the modal
var gameTypeModal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// When the user clicks the button, open the modal 
btn.onclick = function() {
    gameTypeModal.style.display = "block";
}
//end modal box script

// Get the button that opens the modal1 and closes current modal
var colorModal = document.getElementById("myModal1");
var btn1 = document.getElementById("myBtn1");


// When the user clicks the button, open the modal 
function colorFunction() {
    gameTypeModal.style.display = "none";
    colorModal.style.display = "block";
    
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("begin")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {

    // if(turn == "" || player2 == "") {
    //     alert("You must pick a color for each player!");
    // }
    // else {
    //     colorModal.style.display = "none";
    //     board.style.display = "block";
    // }
    //////////////////////////////////////////////Delete this after debugging//////////////////////////////////////////////
    player1="blue";
    player2="red";
    turn = player1;
    colorModal.style.display = "none";
    board.style.display = "block";
}

//COLOR PICKER

// let colorInput1 = document.querySelector('#color1');
// let colorInput2 = document.querySelector('#color2');

// colorInput1.addEventListener('input', () =>{
//     let color1  = colorInput1.value;

//     player1 = color1;
//     turn = player1;
// });

// colorInput2.addEventListener('input', () =>{
//     let color2 = colorInput2.value;

//     player2 = color2;
// });
//end color picker

//user chooses player opponent
function player() {
    
}
//end user chooses player opponent

//user chooses computer opponent
function computer() {
    
}
//end user chooses computer opponent
