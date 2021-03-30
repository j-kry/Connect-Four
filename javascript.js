//for the game board
var turn = "";
var player1 = "";
var player2 = "";

//Array to keep track of which row has a token placed
var indexes = [8, 8, 8, 8, 8, 8, 8, 8];
var clickedCol = "";

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

    placeToken(clickedCol, clickedCol.substring(6));

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

function placeToken(column, num) {

    //We need to get the id of the bottom-most dot

    //column number --> example "c1"
    var col = "c" + num;
    //column's row index --> example "dot1"
    var row = "dot" + indexes[num-1];
    //complete id --> example "c1dot1"
    var together = col + row;

    //place token of the player color
    document.getElementById(together).style.backgroundColor = turn;
    //decrement the column index
    indexes[num-1]--;

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

    if(turn == "" && player2 == "") {
        alert("You must pick a color for each player!");
    }
    else {
        colorModal.style.display = "none";
        board.style.display = "block";
    }
}

//COLOR PICKER JAVASCRIPT CODE
//Think we need to get rid of hex values
let colorInput1 = document.querySelector('#color1');
let colorInput2 = document.querySelector('#color2');
// let hexInput1 = document.querySelector('#hex1');
// let hexInput2 = document.querySelector('#hex2');

colorInput1.addEventListener('input', () =>{
    let color1  = colorInput1.value;

    //changes background color for now
    document.body.style.backgroundColor = color1;
    player1 = color1;
    turn = player1;
});

colorInput2.addEventListener('input', () =>{
   let color2 = colorInput2.value;

    //changes background color for now
    player2 = color2;
});
//end color picker