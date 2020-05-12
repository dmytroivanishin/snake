import { animateRAFInterval } from "./utils";
import Snake from "./snake";
import Food from "./food";

const state = {
    snake: {
        tail: [
            {x: 2, y: 2, d: "right", h: false},
            {x: 3, y: 2, d: "right", h: false},
            {x: 4, y: 2, d: "right", h: false},
            {x: 5, y: 2, d: "right", h: false},
            {x: 6, y: 2, d: "right", h: false},
            {x: 7, y: 2, d: "right", h: false},
            {x: 8, y: 2, d: "right", h: true}

            // {x: 2, y: 2, d: "right", h: false},
            // {x: 3, y: 2, d: "right", h: false},
            // {x: 4, y: 2, d: "right", h: false},
            // {x: 4, y: 3, d: "right", h: false},
            // {x: 3, y: 2, d: "right", h: false},
            // {x: 3, y: 3, d: "right", h: false},
            // {x: 3, y: 2, d: "right", h: true}
        ],
        lastPosTail: {},
        direction: "right"
    },
    food: {
        didAte: true,
        apples: {}
    },
    score: 0,
    gameOver: false
};

const snake = new Snake(state);
const food = new Food(state);

window.addEventListener("load", () => {

    const canvas = document.getElementById("game-field");
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 660;

    const _renderScore = () => {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, 600, 60);

        ctx.fillStyle = "black";
        ctx.font = "normal 30px Arial, sans-serif";
        ctx.fillText(state.score, 60, 60 / 2 + 30 / 3);

        ctx.fillStyle = "red";
        ctx.fillRect(15, 60 / 2 - 30 / 2, 30, 30);
    };

    const _renderSnake = (snake, x, y) => {
        for(let s = 0; s < snake.tail.length; s+=1) {
            if(x === snake.tail[s].x && y === snake.tail[s].y) {
                ctx.fillStyle = "blue";
                ctx.fillRect(x*30, y*30 + 60, 30, 30);
                if(snake.tail[s].h){
                    ctx.fillStyle = "aqua";
                    ctx.fillRect(x*30, y*30 + 60, 30, 30);
                }
            }
        }
    };

    const _renderFood = (food, x, y) => {
        if(x === food.apples.x && y === state.food.apples.y) {
            ctx.fillStyle = "red";
            ctx.fillRect(x*30, y*30 + 60, 30, 30);
        }
    };

    const renderGame = () => {
        ctx.clearRect(0, 0, 600, 660);

        _renderScore();

        for(let y = 0; y < 20; y+=1) {
            for(let x = 0; x < 20; x+=1) {

                _renderSnake(state.snake, x, y);
                _renderFood(state.food, x, y);   

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

        }, 500);
    });

});


