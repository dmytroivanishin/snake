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

    const canvas = document.getElementById("game-field");
    const ctx = canvas.getContext("2d");

    // console.log(ctx);

    // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // ctx.moveTo(6 - (20 / 2), 6 - (20 / 2));
    // ctx.lineTo(6 + (20 / 2), 6 - (20 / 2));
    // ctx.lineTo(6 + (20 / 2), 6 + (20 / 2));
    // ctx.lineTo(6 - (20 / 2), 6 + (20 / 2));
    // ctx.closePath();
    // ctx.fill();

    document.addEventListener("keydown", (e) => {

        setDirection(e.keyCode, state.snake);
        moveSnake(state.snake)
        console.dir(state.snake.direction, state.snake.tail);
        
    });

    // animateRAFInterval.start((time) => {
    //     moveSnake(state.snake);
    //     console.dir(state.snake);
    // }, 1000);


});


