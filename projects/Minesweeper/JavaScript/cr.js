'use strict'

var gBoard;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gMinesBackCount = gLevel.MINES;

var isGameEnd = false;
var startTime = 0;
var endTime = null;


// gGame.isOn === false - the game haven't begin
// gGame.inOn === true - the game is running
// isGameEnd === true - the game ends by victory or lose

function initGame() {
    gGame.isOn = false;
    isGameEnd = false;
    startTime = 0;
    endTime = null;
    gMinesBackCount = gLevel.MINES;

    var time = document.querySelector('.time span');
    time.innerHTML = 0;


    gBoard = buildBoard();
    renderBoard(gBoard);

    var mines = document.querySelector('.mines span');
    mines.innerHTML = `${gLevel.MINES}`;

    getSmiley('<img onclick="initGame()" src="img/smiley.png">');

    // TODO Hints
    // var hint = document.querySelectorAll('.hint');
    // hint.innerHTML = `<img onclick="getHint()" src="img/hint.png">`;
}


function buildBoard() {
    var size = gLevel.SIZE;
    var board = new Array(size);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(size);
    }

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var cell = createCell();
            cell.location.i = i;
            cell.location.j = j;
            board[i][j] = cell;
        }
    }
    // console.log(board);
    return board;
}


function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '<table ><tbody border="1" class=".board">';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cellClass = getClassName({ i: i, j: j })
            strHTML += `\t<td class="cell ${cellClass}" onmousedown="cellClicked(event,${i},${j})" >\n`;
            strHTML += '\t</td>\n</tbody><table>';
        }
    }
    elBoard.innerHTML = strHTML;
}


function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        location: {
            i: -1,
            j: -1
        }
    }
    return cell;
}


function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.classList.add(value);

    //if the cells on the board are already mapped with mines and minesAroundCount
    if (gGame.isOn) {
        elCell = document.querySelector(`.cell-${location.i}-${location.j}`);

        var cell = gBoard[location.i][location.j];

        // if it is a mine the player looses
        if (cell.isMine) {
            var minePic = '<img src="img/mine.png">'
            elCell = document.querySelectorAll('.mine');
            for (var i = 0; i < gLevel.MINES; i++) {
                elCell[i].innerHTML = `${minePic}`
            }
            isGameEnd = true;
            getSmiley('<img onclick="initGame()" src="img/losesmiley.png">');
        } else {
            var numInCell = cell.minesAroundCount;
            if (numInCell === 0) {  // if it is 0
                elCell.innerHTML = `${''}`;

            } else {  // if it's another number
                elCell.innerHTML = `${numInCell}`;
            }
        }
    }
}


function setMines(mines, size, location) {
    //  check that the random locations are not the same and not the clicked cell
    //CR: could've used an array with empty spots instead of trying to randomize it
    var arr = [];

    while (arr.length < mines) {
        var i = Math.floor(Math.random() * size);
        var j = Math.floor(Math.random() * size);

        if ((i !== location.i || j !== location.j) && (!gBoard[i][j].isMine)) {
            arr.push({ i: i, j: j });
            renderCell({ i: i, j: j }, 'mine')
            gBoard[i][j].isMine = true;
        }
    }
    setBoardCount();
}


function setMinesNegsCount(iIdx, jIdx) {
    // counting gBoard.minesAroundCount for every cell on the board 
    for (var i = iIdx - 1; i <= iIdx + 1; i++) {
        if (i < 0 || i > gLevel.SIZE - 1) continue;
        for (var j = jIdx - 1; j <= jIdx + 1; j++) {
            if (j < 0 || j > gLevel.SIZE - 1) continue;
            if (i === iIdx && j === jIdx) continue;
            if (gBoard[i][j].isMine === true) {
                gBoard[iIdx][jIdx].minesAroundCount += 1;
            }
        }
    }
}


function setBoardCount() {
    // all the cells on the board are sent to setMinesNegsCount to count mines at their negs
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            setMinesNegsCount(i, j);
        }
    }
}


function expandShown(iIdx, jIdx) {
    // expand cells to 2 levels
    for (var i = iIdx - 2; i <= iIdx + 2; i++) {
        if (i < 0 || i > gLevel.SIZE - 1) continue;
        for (var j = jIdx - 2; j <= jIdx + 2; j++) {
            if (j < 0 || j > gLevel.SIZE - 1) continue;
            if (gBoard[i][j].isMine !== true && gBoard[i][j].isMine !== true) {
                // do not expand to cells with mines!

                renderCell({ i: i, j: j }, 'shown');
            }
        }
    }
}


// left click
function cellClicked(ev, i, j) {

    // leftclick on button
    if (ev.which === 1) {


        if (gBoard[i][j].isMarked) return;
        else if (gBoard[i][j].isShown) return;
        else gBoard[i][j].isShown = true;


        // if this is the first click on the board
        if (gGame.isOn === false) {
            // timer start
            timesCount();
            //CR: timer doesn't fully work because of this implementation.
            //CR: Using a timer function instead of an anonymous one might've made this easier for you to implement when changing difficulties for example.
            var interval = setInterval(function () {
                endTime = Date.now();
                var time = document.querySelector('.time span');
                var gameTime = endTime - startTime;
                gameTime = Math.floor(gameTime / 1000);
                time.innerHTML = gameTime;
                if (isGameEnd) {
                    clearInterval(interval);
                }
            }, 1000);

            //sets mines randomly after clicking  
            setMines(gLevel.MINES, gLevel.SIZE, { i: i, j: j });
            gGame.isOn = true;
        }

        // if flag is on can't click this cell
        if (!gBoard[i][j].isMarked) {
            // if the game haven't ended (no victory or lose)
            if (!isGameEnd) {
                renderCell({ i: i, j: j }, 'shown');
            }

            // if clicks '0' expand cells
            if (gBoard[i][j].minesAroundCount === 0) {
                expandShown(i, j);
            }
        }
        // rightclick on button
    } else if (ev.which === 3) {
        document.oncontextmenu = RightMouseDown;
        function RightMouseDown() { return false; }
        rightclick(i, j, 'flag');
    }

    // if player wins stop the time interval
    if (checkVictory()) clearInterval(interval);
}


function rightclick(i, j, value) {
    //CR: value is not really necessary here
    var elCell = document.querySelector(`.cell-${i}-${j}`);

    // if the cell is shown
    //CR: expanding doesn't set the isShown property, causing opened cells to be flaggable
    if (gBoard[i][j].isShown) {
        return;
        // if there is no flag on the cell
    } else if (gBoard[i][j].isMarked === false) {
        // update the model
        gBoard[i][j].isMarked = true;
        // update the DOM
        elCell.classList.add(value);
        var flagPic = '<img src="img/flag.png">';
        //CR: elCell.innerHTML = flagPic would've worked
        elCell.innerHTML = `${flagPic}`;


        // decrease the number of unused flags on the screen by 1
        //CR: flag count goes under 0
        gMinesBackCount--;
        var minesCount = document.querySelector('.mines span');
        minesCount.innerHTML = `${gMinesBackCount}`;
        // if there is a flag on the cell
    } else if (gBoard[i][j].isMarked) {
        // update the model
        elCell.classList.remove(value);
        // update the DOM
        gBoard[i][j].isMarked = false;
        var noFlag = '';
        elCell.innerHTML = `${noFlag}`;

        // encrease the number of unused flags ont the screen by 1
        gMinesBackCount++;
        var minesCount = document.querySelector('.mines span');
        minesCount.innerHTML = `${gMinesBackCount}`;
    }
}


function checkVictory() {
    var shownNum = gLevel.SIZE ** 2 - gLevel.MINES  // number of shown (open) numbers on board
    var flagNum = gLevel.MINES; // number of flags on board

    var shown = document.querySelectorAll('.shown');
    var flag = document.querySelectorAll('.flag');

    //Victory
    if (shown.length === shownNum && flag.length === flagNum) {
        getSmiley('<img onclick="initGame()" src="img/winsmiley.png">');
        console.log('Victory');
        isGameEnd = true;
        return true;
    }
}


function timesCount() {
    if (startTime === 0) {
        startTime = Date.now();
    }
}


function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}


function getLevel(level) {
    switch (level.innerHTML) {
        case ('Beginner'):
            gLevel = { SIZE: 4, MINES: 2 }
            initGame();
            break;
        case ('Medium'):
            gLevel = { SIZE: 6, MINES: 5 }
            initGame();
            break;
        case ('Expert'):
            gLevel = { SIZE: 8, MINES: 15 }
            initGame();
            break;
    }
}


function getSmiley(value) {
    var smileyClass = document.querySelector('.smiley')

    smileyClass.innerHTML = value;

}