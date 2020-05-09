import animateRAFInterval from "./utils/animateRAFInterval";
import moveSnake, { setDirection } from "./utils/moveSnake";

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
    
    document.addEventListener("keydown", (e) => {

        setDirection(e.keyCode, state.snake);
        moveSnake(state.snake)
        console.dir(state.snake.direction, state.snake.tail);
        
    });

});

// animateRAFInterval.fn(() => {
//     moveSnake(state.snake);
//     console.dir(state.snake.direction, state.snake.tail);
// }, 2000)