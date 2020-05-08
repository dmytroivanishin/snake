import animateRAFInterval from "./utils/animateRAFInterval";
import moveSnake from "./utils/moveSnake";

const state = {
    snake: [
        {x: 0, y: 0, d: "right", h: false},
        {x: 1, y: 0, d: "right", h: false},
        {x: 2, y: 0, d: "right", h: false},
        {x: 3, y: 0, d: "right", h: true}
    ]
};

window.addEventListener("load", () => {
    
    document.addEventListener("keydown", (e) => {

        moveSnake(e.keyCode, state.snake)
        console.dir(state.snake);

    });

});