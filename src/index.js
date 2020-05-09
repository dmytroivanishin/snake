import animateRAFInterval from "./utils/animateRAFInterval";
import { moveSnake, changeDirection } from "./utils/moveSnake";

const state = {
    snake: {
        tail: [
            {x: 0, y: 0, d: "right", h: false},
            {x: 1, y: 0, d: "right", h: false},
            {x: 2, y: 0, d: "right", h: false},
            {x: 3, y: 0, d: "right", h: true}
        ],
        direction: "right"
    }
};


window.addEventListener("load", () => {

    const canvas = document.getElementById("game-field");
    const ctx = canvas.getContext("2d");

    document.addEventListener("keydown", (e) => {

        changeDirection(e.keyCode, state.snake);
        //moveSnake(state.snake)
        
        
        
        
    });

    animateRAFInterval.start((time) => {
        moveSnake(state.snake);
        console.dir(state.snake.direction, state.snake.tail);
    }, 3000);


});


