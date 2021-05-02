//for the game board
var turn = "red";
var player1 = "red";
var player2 = "yellow";
var winner = "";

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
var column;
var lastPosition;

//Array to check win
let winArray = [[0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]];

//Initialize the board
let board = document.getElementById("board");

//On mouse enter highlight the column with the player color
//$(".column") returns everything with a class name of column
$(".column").mouseenter(function() {

        this.style.border = "1px solid " + player1;
        this.style.backgroundColor = player1;
    
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
    column = clickedCol.substring(6);

    //Substring the id of the column just to get the number
    lastPosition = placeToken(column);

    //Moved to placeToken
    //changeTurn();

    computer(column, lastPosition);

    //Moved to placeToken
    //changeTurn();

    //Changes the column color back to the board color and border
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

        var winPlayer = 0;
        var winner;

        //place token of the player color
        var length = indexes[colNum].length;

        if(length>0) {

            //Get the location of where to place a token
            //The row of the column that gets placed is popped from the array at the end of this function
            var place = indexes[colNum][length-1];

            //Place a token by changing the background color
            document.getElementById(place).style.backgroundColor = turn;

            if(turn == player1) {

                winPlayer = 1;

                //Move history for player1
                var history = document.getElementById("history");
                history.innerHTML += colNum + ",";

                //Need to mark location in the win array as having a player1 token
                winArray[colNum][length-1] = 1;

            }
            else{

                winPlayer = 2;

                //Move history for player 2
                var history2 = document.getElementById("history2");
                history2.innerHTML += colNum + ",";

                //Need to mark location in the win array as having a player2 token
                winArray[colNum][length-1] = 2;
            }

            //Remove the row that has a token in it now from the index array
            indexes[colNum].pop();

            //Check for win
            winner = checkWin(colNum, length-1, winPlayer);
            
            if(winner != null)
                gameOver(winner);

            changeTurn();

            //Displays the arrays in the console in your browser
            console.table(indexes);
            console.log("///////////////////////////////////////////////////\n///////////////////////////////////////////////////")
            console.table(winArray);

            return length;

        }
    

}

function gameOver(winner) {

    //Make the page not interactable by displaying an overlay
    document.getElementById("overlay").style.display = "block";

    if(winner == 2)
        alert("The computer won!");
    else if(winner == 1)
        alert("You beat the computer!");
    else
        alert("The game was a draw");
    
    if(window.confirm("Would you like to play again?")) {
        location.reload();
    }

}

function checkWin(col, row, player) {

    var size = 0;

    for(var i in indexes) {
        if(indexes[i].length > 0)
            size++;
    }

    if(size == 0)
        return "draw";

    var count = 0;

    //Horizontal Check
    for(var i = 0; i < 8; i++) {

        if(winArray[i][row] == player) {

            count++;
            if(count >= 4)
                return player;

        }
        else
            count = 0;
    }

    //Vertical Check
    for(var i = 0; i < 8; i++) {

        if(winArray[col][i] == player) {

            count++;
            if(count >= 4)
                return player;

        }
        else
            count = 0;
    }

    //Diagonal Left to Right Bottom Half
    for(var rowStart = 0; rowStart < 5; rowStart++) {

        for(var dRow = rowStart, dCol = 0; dRow < 8 && dCol < 8; dRow++, dCol++) {

            if(winArray[dCol][dRow] == player) {

                count++;
                if(count >= 4)
                    return player;

            }
            else
                count = 0;

        }

    }

    //Diagonal Left to Right Top Half
    for(var colStart = 1; colStart < 5; colStart++) {

        for(var dRow = 0, dCol = colStart; dRow < 8 && dCol < 8; dRow++, dCol++) {

            if(winArray[dCol][dRow] == player) {

                count++;
                if(count >= 4)
                    return player;

            }
            else
                count = 0;

        }

    }

    //Diagonal Right to Left Bottom Half
    for(var rowStart = 0; rowStart < 5; rowStart++) {

        for(var dRow = rowStart, dCol = 7; dRow < 8 && dCol >= 0; dRow++, dCol--) {

            if(winArray[dCol][dRow] == player) {

                count++;
                if(count >= 4)
                    return player;

            }
            else
                count = 0;

        }

    }

    //Diagonal Right to Left Top Half
    for(var colStart = 6; colStart > 2; colStart--) {

        for(var dRow = 0, dCol = colStart; dRow < 8 && dCol >= 0; dRow++, dCol--) {

            if(winArray[dCol][dRow] == player) {

                count++;
                if(count >= 4)
                    return player;

            }
            else
                count = 0;

        }

    }
    
}

function computer(lastCol, lastRow) {

    lastCol = Math.floor(lastCol);

    var newCol = lastCol;
    var max = 0;
    var min = 0;

    if(lastCol >= 2 && lastCol <= 5) {
        min = lastCol - 2;
        max = lastCol + 2;
    }
    else if(lastCol < 2) {
        min = 0;
        max = lastCol + 2;
    }
    else if(lastCol > 5) {
        min = lastCol - 2;
        max = 7;
    }

    max = Math.floor(max);
    min = Math.floor(min);

    if(lastRow > 0)
        newCol = getRandom(min, max);
    else {

        do {
            newCol = getRandom(min, max);
        }
        while(lastCol == newCol);

    }

    placeToken(newCol);

}

function getRandom(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

}