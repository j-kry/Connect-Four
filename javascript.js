//for the game board
var turn = "red";
var player1 = "red";
var player2 = "yellow";

//Array to keep track of which row has a token placed
var indexes = [8, 8, 8, 8, 8, 8, 8, 8];
var clickedCol = "";

//On mouse enter highlight the column with the player color
//$(".column") returns everything with a class name of column
$(".column").mouseenter(function() {

    if(turn == player1) {
        this.style.border = "1px solid " + player1;
        this.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
    }
    else {
        this.style.border = "1px solid " + player2;
        this.style.backgroundColor = "rgba(255, 255, 0, 0.25)";
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
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}
//end modal box script

// Get the button that opens the modal1 and closes current modal
var modal1 = document.getElementById("myModal1");
var btn1 = document.getElementById("myBtn1");


// When the user clicks the button, open the modal 
function colorFunction() {
    modal1.style.display = "block";
    modal.style.display = "none";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("begin")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal1.style.display = "none";
}

//COLOR PICKER JAVASCRIPT CODE
let colorInput = document.querySelector('#color');
let hexInput = document.querySelector('#hex');

colorInput.addEventListener('input', () =>{
    let color = colorInput.value;
    hexInput.value = color;

    //changes background color for now
    document.body.style.backgroundColor = color;
});
//end color picker