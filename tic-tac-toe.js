let x = true;
let win = false;
let psbs = Array(8).fill(["", "", ""]);

window.onload = function () {
    // Reset button functionality
    document.getElementsByClassName("btn")[0].onclick = function () {
        win = false;
        document.getElementById("status").innerHTML = "Move your mouse over a square and click to play an X or an O.";
        psbs = Array(8).fill(["", "", ""]);

        let squares = document.getElementById("board").children;
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerHTML = "";
            squares[i].classList.remove("X", "O", "clicked");
            x = true;
        }
    };

    let squares = document.getElementById("board").children;
    for (let i = 0; i < squares.length; i++) {
        squares[i].setAttribute("class", "square");
        squares[i].addEventListener("mouseover", function () {
            squares[i].classList.add("hover");
        });
        squares[i].addEventListener("mouseout", function () {
            squares[i].classList.remove("hover");
        });

        squares[i].onclick = function () {
            if (!win && squares[i].classList.contains("clicked") === false) {
                squares[i].innerHTML = x ? "X" : "O";
                squares[i].classList.add(x ? "X" : "O", "clicked");
                
                let val = x ? "x" : "o";
                x = !x;

                checkwin(i, val);
            }
        };
    }
};

function checkwin(index, val) {
    let row = Math.floor(index / 3);
    let col = index % 3;

    // Update psbs to record moves
    psbs[row][col] = val;
    psbs[3 + col][row] = val;
    if (row === col) psbs[6][row] = val; // Diagonal
    if (row + col === 2) psbs[7][row] = val; // Anti-diagonal

    // Check for any winning combination
    for (let line of psbs) {
        if (line.every(cell => cell === val)) {
            win = true;
            document.getElementById("status").innerHTML = `Congratulations! ${val.toUpperCase()} is the Winner!`;
            document.getElementById("status").classList.add("you-won");
            break;
        }
    }
}

