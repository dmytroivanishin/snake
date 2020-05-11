import { animateRAFInterval } from "./utils";
import Snake from "./snake";
import Food from "./food";

const state = {
    snake: {
        tail: [
            {x: 0, y: 0, d: "right", h: false},
            {x: 1, y: 0, d: "right", h: false},
            {x: 2, y: 0, d: "right", h: false},
            {x: 3, y: 0, d: "right", h: true}
        ],
        lastPosTail: {},
        direction: "right"
    },
    food: {
        didAte: true,
        apples: {}
    }
};

const snake = new Snake(state);
const food = new Food(state);

window.addEventListener("load", () => {
    const canvas = document.getElementById("game-field");
    const ctx = canvas.getContext("2d");

    canvas.style.width = "600px";
    canvas.style.height = "600px";

    const renderGame = () => {
        ctx.clearRect(0, 0, 600, 600);

        for(let y = 0; y < 20; y+=1){
            for(let x = 0; x < 20; x+=1){

                for(let s = 0; s < state.snake.tail.length; s+=1){
                    if(x === state.snake.tail[s].x && y === state.snake.tail[s].y){
                        ctx.fillStyle = "blue";
                        ctx.fillRect(x*30, y*30, 30, 30)
                    }
                }

                if(x === state.food.apples.x && y === state.food.apples.y){
                    ctx.fillStyle = "red";
                    ctx.fillRect(x*30, y*30, 30, 30)
                }

            }
        }
    };

    food.addNewFood();
    renderGame();

    document.addEventListener("keydown", (e) => {

        animateRAFInterval.cancel();

        snake.changeDirection(e.keyCode);
        snake.checkGrowth();
        food.addNewFood();

        renderGame();

        animateRAFInterval.start(() => {

            snake.moveSnake();
            snake.checkGrowth();
            food.addNewFood();

            renderGame();

        }, 200);
    });

});


