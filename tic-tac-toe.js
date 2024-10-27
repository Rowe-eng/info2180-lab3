document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#game-board div");
    
    squares.forEach(square => {
        square.classList.add("square");
    });
});

