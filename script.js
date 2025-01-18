var board;
var score = 0;
var rows = 4;
var columns = 4;

// Precompute the Fibonacci sequence up to a large enough value
const fibonacci = [1, 1];
while (fibonacci[fibonacci.length - 1] < 1597) {
    fibonacci.push(fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]);
}

window.onload = function() {
    setGame();
};

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setFibonacciTile();
    setFibonacciTile();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        tile.classList.add("x" + num.toString());
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setFibonacciTile();
    } else if (e.code == "ArrowRight") {
        slideRight();
        setFibonacciTile();
    } else if (e.code == "ArrowUp") {
        slideUp();
        setFibonacciTile();
    } else if (e.code == "ArrowDown") {
        slideDown();
        setFibonacciTile();
    }
    document.getElementById("score").innerText = score;
});

function filterZero(row) {
    return row.filter(num => num != 0); // create new array of all nums != 0
}

function slide(row) {
    row = filterZero(row); // Remove zeroes
    for (let i = 0; i < row.length - 1; i++) {
        // Check if the sum of row[i] and row[i+1] is a Fibonacci number
        if (isFibonacciSum(row[i], row[i + 1])) {
            row[i] = row[i] + row[i + 1]; // Merge tiles
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row); // Remove zeroes again
    while (row.length < columns) {
        row.push(0); // Add zeroes to the end
    }
    return row;
}

function isFibonacciSum(a, b) {
    return fibonacci.includes(a + b);
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setFibonacciTile() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            // Place a random Fibonacci number at the start of the sequence (1 or 1)
            board[r][c] = fibonacci[Math.floor(Math.random() * 2)];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
            found = true;
        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}
